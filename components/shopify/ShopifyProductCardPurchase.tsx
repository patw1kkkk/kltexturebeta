import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";
import { ShopifyProductContext } from "@/components/shopify/ShopifyProductContext";
import { getAvailabilityLabel } from "@/components/shopify/templateUtils";

type ShopifyProductCardPurchaseProps = {
  product: Product;
  buttonLabel?: string;
  layout?: "default" | "embedded" | "creator" | "community";
  showShopifyCheckoutIcon?: boolean;
};

const wrapperClassName = "mt-5 flex items-center justify-between gap-4";
const embeddedWrapperClassName = "mt-3 grid gap-2 min-[380px]:flex min-[380px]:items-center min-[380px]:justify-between min-[380px]:gap-3";
const creatorWrapperClassName =
  "mt-4 grid gap-2 min-[420px]:flex min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-3";
const communityWrapperClassName = "mt-3 grid gap-2 text-center";
const priceClassName = "text-sm font-semibold";
const buttonClassName =
  "inline-flex min-h-11 shrink-0 items-center gap-2 text-left text-xs font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:text-black disabled:pointer-events-none disabled:opacity-45";
const embeddedButtonClassName =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 text-left text-[11px] font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:text-black disabled:pointer-events-none disabled:opacity-45";
const creatorButtonClassName =
  "inline-flex min-h-10 shrink-0 items-center justify-center justify-self-start text-left text-[11px] font-bold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-45 min-[420px]:justify-self-end";
const communityButtonClassName =
  "inline-flex min-h-10 w-full shrink-0 items-center justify-center rounded-xl bg-ink px-2.5 text-center text-[9px] font-bold uppercase tracking-[0.08em] text-white transition duration-300 ease-premium hover:bg-[#262626] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:bg-ink/18 disabled:text-ink/42 sm:text-[11px] sm:tracking-nav";
const linkClassName =
  "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-nav text-ink transition group-hover:gap-3";
const shopifyIconClassName = "inline-flex size-4 shrink-0 items-center justify-center text-current opacity-55";

function ShopifyCheckoutIcon() {
  return (
    <span aria-label="Shopify Checkout" className={shopifyIconClassName} role="img" title="Shopify Checkout">
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M7.5 8.5V7a4.5 4.5 0 0 1 9 0v1.5M5.8 8.5h12.4l1 11.2a1.8 1.8 0 0 1-1.8 2H6.6a1.8 1.8 0 0 1-1.8-2l1-11.2Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    </span>
  );
}

const shopifyIconTemplate = `<span aria-label="Shopify Checkout" class="${shopifyIconClassName}" role="img" title="Shopify Checkout"><svg aria-hidden="true" class="size-4" fill="none" viewBox="0 0 24 24"><path d="M7.5 8.5V7a4.5 4.5 0 0 1 9 0v1.5M5.8 8.5h12.4l1 11.2a1.8 1.8 0 0 1-1.8 2H6.6a1.8 1.8 0 0 1-1.8-2l1-11.2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"></path></svg></span>`;

function getLayoutClassNames(layout: "default" | "embedded" | "creator" | "community") {
  if (layout === "creator") {
    return {
      purchaseButtonClass: creatorButtonClassName,
      wrapperClass: `${creatorWrapperClassName} text-ink`
    };
  }

  if (layout === "community") {
    return {
      purchaseButtonClass: communityButtonClassName,
      wrapperClass: communityWrapperClassName
    };
  }

  if (layout === "embedded") {
    return {
      purchaseButtonClass: embeddedButtonClassName,
      wrapperClass: embeddedWrapperClassName
    };
  }

  return {
    purchaseButtonClass: buttonClassName,
    wrapperClass: wrapperClassName
  };
}

function getCardTemplate(buttonLabel: string, showShopifyCheckoutIcon: boolean, layout: "default" | "embedded" | "creator" | "community") {
  const { purchaseButtonClass, wrapperClass } = getLayoutClassNames(layout);
  const soldOutLabel = layout === "community" ? "LOPPUUNMYYTY" : "Loppuunmyyty";

  return `<div class="${wrapperClass}">
    <span class="inline-flex items-center justify-center gap-2"><span class="${priceClassName}"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></span>${showShopifyCheckoutIcon ? shopifyIconTemplate : ""}</span>
    <button class="${purchaseButtonClass}" type="button" onclick="getElementById('${SHOPIFY_CART_ID}').addLine(event).showModal();" shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">${getAvailabilityLabel(buttonLabel, soldOutLabel)}</button>
  </div>`;
}

export function ShopifyProductCardPurchase({
  layout = "default",
  product,
  buttonLabel = "Lisää ostoskoriin",
  showShopifyCheckoutIcon = false
}: ShopifyProductCardPurchaseProps) {
  const { purchaseButtonClass, wrapperClass } = getLayoutClassNames(layout);

  if (!product.shopifyHandle) {
    return (
      <div className={wrapperClass}>
        <span className={priceClassName}>{product.price}</span>
        <Link className={linkClassName} href={`/tuotteet/${product.slug}`}>
          Tutustu tuotteeseen
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const fallback = (
    <div className={wrapperClass}>
      <span className="inline-flex items-center gap-2">
        <span className={priceClassName}>{product.price}</span>
        {showShopifyCheckoutIcon ? <ShopifyCheckoutIcon /> : null}
      </span>
      <button className={purchaseButtonClass} disabled title="Shopify-tuotetta ladataan" type="button">
        {buttonLabel}
      </button>
    </div>
  );

  return (
    <ShopifyProductContext
      fallback={fallback}
      handle={product.shopifyHandle}
      template={getCardTemplate(buttonLabel, showShopifyCheckoutIcon, layout)}
    />
  );
}
