import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SHOPIFY_ADMIN_API_VERSION = "2026-04";

type NewsletterRequestBody = {
  email?: unknown;
  marketingConsent?: unknown;
  topRecommendationHandle?: unknown;
  website?: unknown;
};

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type CustomerNode = {
  email: string;
  id: string;
  tags: string[];
};

function normalizeEmail(email: unknown) {
  if (typeof email !== "string") {
    return null;
  }

  const normalized = email.trim().toLowerCase();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

  return valid ? normalized : null;
}

function normalizeShopDomain(domain: string) {
  return domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getSafeHandle(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  return /^[a-z0-9-]+$/.test(value) ? value : null;
}

function getConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!storeDomain || !clientId || !clientSecret) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    storeDomain: normalizeShopDomain(storeDomain)
  };
}

async function getAdminAccessToken(config: NonNullable<ReturnType<typeof getConfig>>) {
  const response = await fetch(`https://${config.storeDomain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "client_credentials"
    })
  });

  if (!response.ok) {
    throw new Error("Shopify token request failed");
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Shopify token response was missing an access token");
  }

  return data.access_token;
}

async function shopifyGraphQL<T>(
  config: NonNullable<ReturnType<typeof getConfig>>,
  accessToken: string,
  query: string,
  variables: Record<string, unknown>
) {
  const response = await fetch(`https://${config.storeDomain}/admin/api/${SHOPIFY_ADMIN_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error("Shopify GraphQL request failed");
  }

  const data = (await response.json()) as ShopifyGraphQLResponse<T>;

  if (data.errors?.length) {
    throw new Error("Shopify GraphQL returned errors");
  }

  return data.data;
}

async function findCustomerByEmail(
  config: NonNullable<ReturnType<typeof getConfig>>,
  accessToken: string,
  email: string
) {
  const data = await shopifyGraphQL<{
    customers: { edges: { node: CustomerNode }[] };
  }>(
    config,
    accessToken,
    `query findCustomer($query: String!) {
      customers(first: 1, query: $query) {
        edges {
          node {
            id
            email
            tags
          }
        }
      }
    }`,
    { query: `email:${email}` }
  );

  return data?.customers.edges[0]?.node ?? null;
}

async function createCustomer(
  config: NonNullable<ReturnType<typeof getConfig>>,
  accessToken: string,
  email: string,
  tags: string[]
) {
  const data = await shopifyGraphQL<{
    customerCreate: {
      customer: CustomerNode | null;
      userErrors: { field?: string[]; message: string }[];
    };
  }>(
    config,
    accessToken,
    `mutation createCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          tags
        }
        userErrors {
          field
          message
        }
      }
    }`,
    { input: { email, tags } }
  );

  if (data?.customerCreate.userErrors.length || !data?.customerCreate.customer) {
    throw new Error("Shopify customer creation failed");
  }

  return data.customerCreate.customer;
}

async function addTags(
  config: NonNullable<ReturnType<typeof getConfig>>,
  accessToken: string,
  customerId: string,
  tags: string[]
) {
  const data = await shopifyGraphQL<{
    tagsAdd: { userErrors: { field?: string[]; message: string }[] };
  }>(
    config,
    accessToken,
    `mutation addCustomerTags($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        userErrors {
          field
          message
        }
      }
    }`,
    { id: customerId, tags }
  );

  if (data?.tagsAdd.userErrors.length) {
    throw new Error("Shopify customer tagging failed");
  }
}

async function subscribeCustomerToEmailMarketing(
  config: NonNullable<ReturnType<typeof getConfig>>,
  accessToken: string,
  customerId: string
) {
  const data = await shopifyGraphQL<{
    customerEmailMarketingConsentUpdate: {
      customer: { id: string } | null;
      userErrors: { field?: string[]; message: string }[];
    };
  }>(
    config,
    accessToken,
    `mutation updateEmailMarketingConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      input: {
        customerId,
        emailMarketingConsent: {
          consentUpdatedAt: new Date().toISOString(),
          marketingOptInLevel: "SINGLE_OPT_IN",
          marketingState: "SUBSCRIBED"
        }
      }
    }
  );

  if (data?.customerEmailMarketingConsentUpdate.userErrors.length) {
    throw new Error("Shopify email marketing consent update failed");
  }
}

export async function POST(request: Request) {
  let body: NewsletterRequestBody;

  try {
    body = (await request.json()) as NewsletterRequestBody;
  } catch {
    return NextResponse.json({ message: "Virheellinen pyyntö." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);

  if (!email || typeof body.marketingConsent !== "boolean") {
    return NextResponse.json({ message: "Tarkista sähköpostiosoite." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ message: "Virheellinen pyyntö." }, { status: 400 });
  }

  const config = getConfig();

  if (!config) {
    return NextResponse.json(
      { message: "Shopify Admin -asetuksia ei ole määritetty kehitysympäristöön." },
      { status: 503 }
    );
  }

  const safeHandle = getSafeHandle(body.topRecommendationHandle);
  const tags = ["hair-quiz", ...(safeHandle ? [`quiz-top-${safeHandle}`] : [])];

  try {
    const accessToken = await getAdminAccessToken(config);
    let customer = await findCustomerByEmail(config, accessToken, email);

    if (!customer) {
      customer = await createCustomer(config, accessToken, email, tags);
    } else {
      await addTags(config, accessToken, customer.id, tags);
    }

    if (body.marketingConsent) {
      await subscribeCustomerToEmailMarketing(config, accessToken, customer.id);
    }

    return NextResponse.json({
      message: "Kiitos! Tietosi tallennettiin.",
      ok: true,
      subscribed: body.marketingConsent
    });
  } catch {
    return NextResponse.json({ message: "Tallennus ei juuri nyt onnistunut." }, { status: 502 });
  }
}
