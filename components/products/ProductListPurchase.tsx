import type { Product } from "@/data/products";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";
import { ShopifyProductContext } from "@/components/shopify/ShopifyProductContext";
import { escapeHtml } from "@/components/shopify/templateUtils";

type ProductListPurchaseProps = {
  product: Product;
};

const priceClassName = "whitespace-nowrap text-right text-lg font-bold text-ink sm:text-xl lg:text-2xl";
const buttonClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-center text-xs font-bold uppercase tracking-nav text-white transition duration-200 ease-premium hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:bg-ink/20 disabled:text-ink/45 sm:w-auto";

function getPriceTemplate() {
  return `<span class="${priceClassName}"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></span>`;
}

function getCartActionTemplate() {
  const escapedButtonClassName = escapeHtml(buttonClassName);

  return `<button
      aria-disabled="false"
      aria-busy="false"
      class="${escapedButtonClassName}"
      type="button"
      onclick="if (this.dataset.adding === 'true') return; this.dataset.adding = 'true'; this.setAttribute('aria-busy', 'true'); this.setAttribute('aria-disabled', 'true'); this.style.pointerEvents = 'none'; this.style.opacity = '0.72'; this.disabled = true; var label = this.querySelector('[data-add-label]'); if (label) label.textContent = 'LISÄTÄÄN...'; getElementById('${SHOPIFY_CART_ID}').addLine(event).showModal(); setTimeout(function () { if (label) label.textContent = 'LISÄÄ OSTOSKORIIN'; this.dataset.adding = 'false'; this.setAttribute('aria-busy', 'false'); this.setAttribute('aria-disabled', 'false'); this.style.pointerEvents = ''; this.style.opacity = ''; this.disabled = false; }.bind(this), 900);"
      shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale"
    >
      <span data-add-label shopify-attr--hidden="!product.selectedOrFirstAvailableVariant.availableForSale">LISÄÄ OSTOSKORIIN</span>
      <span shopify-attr--hidden="product.selectedOrFirstAvailableVariant.availableForSale">LOPPUUNMYYTY</span>
    </button>`;
}

export function ProductListPrice({ product }: ProductListPurchaseProps) {
  const fallback = <span className={priceClassName}>{product.price}</span>;

  return <ShopifyProductContext fallback={fallback} handle={product.shopifyHandle} template={getPriceTemplate()} />;
}

export function ProductListCartAction({ product }: ProductListPurchaseProps) {
  const fallback = (
    <button
      className={buttonClassName}
      disabled={Boolean(product.shopifyHandle)}
      title={product.shopifyHandle ? "Shopify-tuotetta ladataan" : "Shopify-tuotetta ei ole vielä liitetty"}
      type="button"
    >
      LISÄÄ OSTOSKORIIN
    </button>
  );

  return (
    <ShopifyProductContext fallback={fallback} handle={product.shopifyHandle} template={getCartActionTemplate()} />
  );
}
