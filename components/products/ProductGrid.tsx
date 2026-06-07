"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { productCategories } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

type ProductGridProps = {
  products: Product[];
  showFilters?: boolean;
};

export function ProductGrid({ products, showFilters = true }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof productCategories)[number]>("Kaikki");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "Kaikki") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div>
      {showFilters ? (
        <div className="mb-10 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Tuotesuodatus">
          {productCategories.map((category) => (
            <button
              aria-selected={activeCategory === category}
              className={cn(
                "h-11 shrink-0 border px-4 text-xs font-semibold uppercase tracking-nav transition duration-300 ease-premium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                activeCategory === category
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 bg-white text-ink/65 hover:border-ink hover:text-ink"
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
