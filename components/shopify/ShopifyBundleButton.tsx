import { PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShopifyBuyButton } from "@/components/shopify/ShopifyBuyButton";

type ShopifyBundleButtonProps = {
  bundleProductId?: string;
  bundleShopifyHandle?: string;
  buttonLabel?: string;
  className?: string;
  embedCode?: string;
  containerId?: string;
};

export function ShopifyBundleButton({
  bundleProductId,
  bundleShopifyHandle,
  buttonLabel = "Hanki koko rutiini",
  className,
  containerId
}: ShopifyBundleButtonProps) {
  if (bundleShopifyHandle) {
    return (
      <ShopifyBuyButton
        buttonLabel={buttonLabel}
        className={className}
        containerId={containerId}
        productId={bundleProductId}
        shopifyHandle={bundleShopifyHandle}
      />
    );
  }

  return (
    <div className={cn("shopify-bundle-button", className)} data-product-id={bundleProductId} id={containerId}>
      <button
        className="inline-flex h-12 w-full items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold uppercase tracking-nav text-white transition duration-300 ease-premium hover:bg-black sm:w-auto"
        title="Rutiinipakettia ei ole vielä liitetty Shopify-tuotteeseen"
        type="button"
      >
        <PackageCheck className="size-4" aria-hidden="true" />
        {buttonLabel}
      </button>
    </div>
  );
}
