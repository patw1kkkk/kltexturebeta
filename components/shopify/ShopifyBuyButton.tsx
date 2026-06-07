import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";
import { ShopifyProductContext } from "@/components/shopify/ShopifyProductContext";
import { escapeHtml, getAvailabilityLabel } from "@/components/shopify/templateUtils";

type ShopifyBuyButtonProps = {
  productId?: string;
  shopifyHandle?: string;
  buttonLabel?: string;
  className?: string;
  buttonClassName?: string;
  embedCode?: string;
  containerId?: string;
  variant?: "solid" | "inline";
};

const solidButtonClassName =
  "inline-flex h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold uppercase tracking-nav text-white transition duration-300 ease-premium hover:bg-black disabled:pointer-events-none disabled:opacity-50 sm:w-auto";

const inlineButtonClassName =
  "inline-flex min-h-11 items-center gap-2 text-left text-xs font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:text-black disabled:pointer-events-none disabled:opacity-45";

function getButtonTemplate(buttonLabel: string, className: string) {
  return `<button class="${escapeHtml(className)}" type="button" onclick="getElementById('${SHOPIFY_CART_ID}').addLine(event).showModal();" shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">${getAvailabilityLabel(
    buttonLabel
  )}</button>`;
}

export function ShopifyBuyButton({
  buttonClassName,
  productId,
  buttonLabel = "Lisää ostoskoriin",
  className,
  containerId,
  shopifyHandle,
  variant = "solid"
}: ShopifyBuyButtonProps) {
  const buttonClasses = cn(variant === "inline" ? inlineButtonClassName : solidButtonClassName, buttonClassName);
  const fallbackButton = (
    <button
      className={buttonClasses}
      disabled={Boolean(shopifyHandle)}
      title={shopifyHandle ? "Shopify-tuotetta ladataan" : "Shopify-tuotetta ei ole vielä liitetty"}
      type="button"
    >
      <ShoppingBag className="size-4" aria-hidden="true" />
      {buttonLabel}
    </button>
  );

  return (
    <div className={cn("shopify-buy-button", className)} data-product-id={productId} id={containerId}>
      <ShopifyProductContext
        fallback={fallbackButton}
        handle={shopifyHandle}
        template={getButtonTemplate(buttonLabel, buttonClasses)}
      />
    </div>
  );
}
