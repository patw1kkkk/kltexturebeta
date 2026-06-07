import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ShopifyElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "shopify-cart": ShopifyElementProps;
      "shopify-context": ShopifyElementProps & {
        handle?: string;
        type?: "product";
      };
      "shopify-store": ShopifyElementProps & {
        country?: string;
        language?: string;
        "store-domain"?: string;
      };
    }
  }
}
