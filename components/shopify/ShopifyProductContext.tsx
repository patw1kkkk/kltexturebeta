"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ShopifyProductContextProps = {
  className?: string;
  fallback?: ReactNode;
  handle?: string;
  template: string;
};

const shopifyDebugErrorPatterns = [
  "shopify-context:",
  "Failed to fetch data from Shopify",
  "shopify-money: Component is not in a context template",
  "Storefront API",
  "GraphQL"
];

export function ShopifyProductContext({ className, fallback, handle, template }: ShopifyProductContextProps) {
  const contextRef = useRef<HTMLElement | null>(null);
  const [hasPublicError, setHasPublicError] = useState(false);

  useEffect(() => {
    setHasPublicError(false);
  }, [handle, template]);

  useEffect(() => {
    const context = contextRef.current;
    if (!context || !handle) return;

    const inspectForDebugError = () => {
      const text = context.textContent ?? "";
      const hasDebugError = shopifyDebugErrorPatterns.some((pattern) => text.includes(pattern));

      if (!hasDebugError) return;

      if (process.env.NODE_ENV !== "production") {
        console.warn(`Shopify product context failed for handle "${handle}". Public UI is showing fallback content.`);
      }

      setHasPublicError(true);
    };

    inspectForDebugError();

    const observer = new MutationObserver(inspectForDebugError);
    observer.observe(context, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [handle, template]);

  if (!handle) {
    return <>{fallback ?? null}</>;
  }

  if (hasPublicError) {
    return <div className={className}>{fallback ?? null}</div>;
  }

  return (
    <shopify-context className={className} handle={handle} ref={contextRef} type="product">
      <template dangerouslySetInnerHTML={{ __html: template }} />
      {fallback ? <div shopify-loading-placeholder="true">{fallback}</div> : null}
    </shopify-context>
  );
}
