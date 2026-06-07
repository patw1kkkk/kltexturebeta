import Script from "next/script";
import { SHOPIFY_CART_ID, SHOPIFY_STORE_DOMAIN, SHOPIFY_STORE_ID } from "@/components/shopify/constants";

export function ShopifyStorefront() {
  return (
    <>
      <Script
        id="shopify-storefront-web-components"
        src="https://cdn.shopify.com/storefront/web-components.js"
        strategy="afterInteractive"
      />
      <shopify-store
        country="FI"
        id={SHOPIFY_STORE_ID}
        language="fi"
        store-domain={SHOPIFY_STORE_DOMAIN}
      ></shopify-store>
      <shopify-cart
        aria-label="Ostoskori"
        className="kl-shopify-cart"
        id={SHOPIFY_CART_ID}
      >
        <span slot="header">Ostoskori</span>
        <span slot="checkout-button">Siirry kassalle</span>
        <span slot="discounts-title">Alennukset</span>
      </shopify-cart>
    </>
  );
}
