"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { SHOPIFY_CART_ID } from "@/components/shopify/constants";
import { ShopifyProductContext } from "@/components/shopify/ShopifyProductContext";
import { escapeHtml, getAvailabilityLabel } from "@/components/shopify/templateUtils";

type TutorialBundleButtonProps = {
  products: Product[];
  tutorialId: string;
};

type BundleAvailability = "loading" | "ready" | "unavailable";

const buttonClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-5 text-center text-xs font-bold uppercase tracking-nav text-white transition duration-200 ease-premium hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:bg-ink/20 disabled:text-ink/45 sm:w-auto";

function getBundleLineTemplate(tutorialId: string, productId: string, opensCart: boolean) {
  return `<button data-tutorial-bundle-line="${escapeHtml(tutorialId)}" data-product-id="${escapeHtml(
    productId
  )}" style="display:none" type="button" onclick="getElementById('${SHOPIFY_CART_ID}').addLine(event)${
    opensCart ? ".showModal()" : ""
  };" shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">${getAvailabilityLabel(
    "Lisää",
    "Loppuunmyyty"
  )}</button>`;
}

export function TutorialBundleButton({ products, tutorialId }: TutorialBundleButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [availability, setAvailability] = useState<BundleAvailability>("loading");
  const [isAdding, setIsAdding] = useState(false);

  const getLineButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];

    return Array.from(
      container.querySelectorAll<HTMLButtonElement>(`button[data-tutorial-bundle-line="${tutorialId}"]`)
    );
  }, [tutorialId]);

  const inspectAvailability = useCallback(() => {
    const buttons = getLineButtons();

    if (buttons.length < products.length) {
      setAvailability("loading");
      return;
    }

    setAvailability(buttons.some((button) => button.disabled) ? "unavailable" : "ready");
  }, [getLineButtons, products.length]);

  useEffect(() => {
    inspectAvailability();

    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(inspectAvailability);
    observer.observe(container, { attributes: true, childList: true, subtree: true });

    const frame = window.requestAnimationFrame(inspectAvailability);
    const timers = [window.setTimeout(inspectAvailability, 350), window.setTimeout(inspectAvailability, 1200)];

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [inspectAvailability]);

  const handleAddBundle = () => {
    if (isAdding || availability !== "ready") return;

    const buttons = getLineButtons();
    if (buttons.length < products.length || buttons.some((button) => button.disabled)) {
      setAvailability("unavailable");
      return;
    }

    setIsAdding(true);
    buttons.forEach((button) => button.click());

    window.setTimeout(() => {
      setIsAdding(false);
      inspectAvailability();
    }, 450);
  };

  const label = isAdding
    ? "LISÄTÄÄN..."
    : availability === "unavailable"
      ? "PAKETTI EI OLE KOKONAAN SAATAVILLA"
      : "LISÄÄ PAKETTI OSTOSKORIIN";

  return (
    <div className="border-t border-ink/10 pt-5" ref={containerRef}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          aria-busy={isAdding}
          className={buttonClassName}
          disabled={availability !== "ready" || isAdding}
          onClick={handleAddBundle}
          type="button"
        >
          {label}
        </button>
        <p className="text-xs leading-5 text-ink/52 sm:max-w-[16rem] sm:text-right">
          Lisää kaikki tämän tyylin tuotteet yhdellä painalluksella.
        </p>
      </div>

      <div aria-hidden="true">
        {products.map((product, index) =>
          product.shopifyHandle ? (
            <ShopifyProductContext
              fallback={null}
              handle={product.shopifyHandle}
              key={product.shopifyHandle}
              template={getBundleLineTemplate(tutorialId, product.id, index === products.length - 1)}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
