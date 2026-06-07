import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBenefits } from "@/components/products/ProductBenefits";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductRecommendations } from "@/components/products/ProductRecommendations";
import { ShopifyProductPurchase } from "@/components/shopify/ShopifyProductPurchase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { getProductBySlug, getRecommendedProducts, products } from "@/data/products";
import { getRoutineByName } from "@/data/routines";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Tuotetta ei löytynyt"
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | KL Texture`,
      description: product.shortDescription,
      images: [{ url: product.images[0], alt: product.name }]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = getRecommendedProducts(product.recommendedProducts);
  const routine = getRoutineByName(product.relatedRoutine);

  return (
    <article className="bg-white">
      <section className="px-5 pb-16 pt-28 sm:px-8 lg:pb-24 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <div className="lg:pt-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <h1 className="text-5xl font-semibold leading-none text-ink sm:text-7xl">{product.name}</h1>
            <p className="mt-6 text-xl leading-8 text-ink/70">{product.promise}</p>
            <ShopifyProductPurchase product={product} />
            <div className="mt-10">
              <ProductBenefits product={product} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-fog px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_0.28fr]">
          <ProductDetails product={product} />
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">Sopii erityisesti</p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-ink/65">
                {product.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {routine ? (
              <div className="mt-4 bg-ink p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-nav text-white/45">Valmis rutiinisuositus</p>
                <h2 className="mt-3 text-2xl font-semibold">{routine.name}</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">{routine.result}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
      <section className="px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.48fr_0.52fr] lg:gap-8">
          <section className="rounded-[28px] border border-ink/10 bg-[#fbfaf7] p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-nav text-ink/42">Luottamus</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">Asiakasarvostelut</h2>
            <div className="mt-6 grid gap-4">
              {product.reviews.map((review) => (
                <blockquote className="rounded-[20px] border border-ink/10 bg-white p-5" key={review.name}>
                  <p className="text-base leading-7 text-ink/72">“{review.text}”</p>
                  <footer className="mt-4 text-sm font-semibold text-ink">— {review.name}</footer>
                </blockquote>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-ink/10 bg-white p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-nav text-ink/42">Tuotteen käyttö</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">Usein kysytyt kysymykset</h2>
            <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink">
                  Voiko tuotetta käyttää päivittäin?
                  <span className="text-xl leading-none text-ink/42 group-open:hidden" aria-hidden="true">+</span>
                  <span className="hidden text-xl leading-none text-ink/42 group-open:inline" aria-hidden="true">−</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-ink/65">
                  Kyllä. Käytä pieni määrä ja pese hiukset normaalisti oman rytmisi mukaan.
                </p>
              </details>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink">
                  Toimiiko tuote muiden KL Texture -tuotteiden kanssa?
                  <span className="text-xl leading-none text-ink/42 group-open:hidden" aria-hidden="true">+</span>
                  <span className="hidden text-xl leading-none text-ink/42 group-open:inline" aria-hidden="true">−</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-ink/65">
                  Kyllä. Tuotteet on suunniteltu toimimaan selkeinä pareina ja rutiineina.
                </p>
              </details>
            </div>
          </section>
        </div>
      </section>
      <section className="bg-fog px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Sopii hyvin yhteen näiden tuotteiden kanssa" />
          <div className="mt-10">
            <ProductRecommendations products={recommendedProducts} />
          </div>
        </div>
      </section>
    </article>
  );
}
