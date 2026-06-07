import type { Product } from "@/data/products";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";
import { ShopifyProductContext } from "@/components/shopify/ShopifyProductContext";
import { getAvailabilityLabel } from "@/components/shopify/templateUtils";

type ShopifyProductPurchaseProps = {
  product: Product;
  showVariantSelector?: boolean;
  showSupportText?: boolean;
  layout?: "default" | "compact";
};

const buttonClassName =
  "inline-flex h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold uppercase tracking-nav text-white transition duration-300 ease-premium hover:bg-black disabled:pointer-events-none disabled:opacity-50 sm:w-auto";

function getPurchaseTemplate(showVariantSelector: boolean, showSupportText: boolean, layout: "default" | "compact") {
  const variantSelector = showVariantSelector
    ? `<div class="mt-6"><shopify-variant-selector></shopify-variant-selector></div>`
    : "";
  const priceClassName = layout === "compact" ? "mt-4 text-2xl font-semibold text-ink" : "mt-6 text-2xl font-semibold text-ink";
  const buttonWrapperClassName = layout === "compact" ? "mt-4" : "mt-8";
  const supportText = showSupportText
    ? `<p class="mt-4 text-sm text-ink/55">Turvallinen maksu Shopifyn kassalla. Toimitus Suomesta.</p>`
    : "";

  return `<div>
    <p class="${priceClassName}"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></p>
    ${variantSelector}
    <div class="${buttonWrapperClassName}">
      <button class="${buttonClassName}" type="button" onclick="getElementById('${SHOPIFY_CART_ID}').addLine(event).showModal();" shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">${getAvailabilityLabel()}</button>
      ${supportText}
    </div>
  </div>`;
}

export function ShopifyProductPurchase({
  product,
  showVariantSelector = false,
  showSupportText = true,
  layout = "default"
}: ShopifyProductPurchaseProps) {
  const priceClassName = layout === "compact" ? "mt-4 text-2xl font-semibold text-ink" : "mt-6 text-2xl font-semibold text-ink";
  const buttonWrapperClassName = layout === "compact" ? "mt-4" : "mt-8";

  const fallback = (
    <>
      <p className={priceClassName}>{product.price}</p>
      <div className={buttonWrapperClassName}>
        <div className="shopify-buy-button" data-product-id={product.shopifyProductId} id={product.shopifyContainerId}>
          <button
            className={buttonClassName}
            disabled={Boolean(product.shopifyHandle)}
            title={product.shopifyHandle ? "Shopify-tuotetta ladataan" : "Shopify-tuotetta ei ole vielä liitetty"}
            type="button"
          >
            Lisää ostoskoriin
          </button>
        </div>
        {showSupportText ? <p className="mt-4 text-sm text-ink/55">Turvallinen maksu Shopifyn kassalla. Toimitus Suomesta.</p> : null}
      </div>
    </>
  );

  return (
    <ShopifyProductContext
      fallback={fallback}
      handle={product.shopifyHandle}
      template={getPurchaseTemplate(showVariantSelector, showSupportText, layout)}
    />
  );
}
