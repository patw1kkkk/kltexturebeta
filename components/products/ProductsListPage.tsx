"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductListCartAction, ProductListPrice } from "@/components/products/ProductListPurchase";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import {
  productFilterLabels,
  productListItems,
  productSortOptions,
  recommendedProductOrder,
  type ProductFilter,
  type ProductListCategory,
  type ProductListItem,
  type ProductSort
} from "@/data/product-list";
import { cn } from "@/lib/utils";

type ProductPageItem = {
  listItem: ProductListItem;
  product: Product;
};

type ProductListCardProps = ProductPageItem & {
  onLivePriceChange: (productId: string, price: number) => void;
};

const recommendedOrderMap = new Map<string, number>(
  recommendedProductOrder.map((handle, index) => [handle, index])
);

function getProductByHandle(handle: string) {
  return products.find((product) => product.shopifyHandle === handle);
}

function getDisplayName(listItem: ProductListItem, product: Product) {
  if (listItem.handle === "sea-salt-spray") {
    return "Sea Salt Spray";
  }

  return product.name;
}

function parsePrice(priceText: string) {
  const cleaned = priceText.replace(/\s/g, "").replace(/[^\d,.]/g, "");

  if (!cleaned) return null;

  const normalized =
    cleaned.includes(",") && cleaned.includes(".")
      ? cleaned.replace(/,/g, "")
      : cleaned.replace(",", ".");
  const parsed = Number.parseFloat(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function ProductsPageIntro() {
  return (
    <section className="border-b border-ink/10 bg-white px-5 pt-28 sm:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl pb-10 sm:pb-12 lg:pb-14">
        <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">TUOTTEET</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">
          Kuusi eri työkalua parempiin hiuksiin.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink/62 sm:text-lg">
          Jokaisella tuotteella on oma tehtävänsä. Löydä tuotteet, joilla rakennat juuri haluamasi lopputuloksen.
        </p>
      </div>
    </section>
  );
}

function ProductFilterToolbar({
  activeFilter,
  sort,
  onFilterChange,
  onSortChange
}: {
  activeFilter: ProductFilter;
  sort: ProductSort;
  onFilterChange: (filter: ProductFilter) => void;
  onSortChange: (sort: ProductSort) => void;
}) {
  return (
    <section className="bg-white px-5 py-7 sm:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-ink/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink">Mitä haet hiuksiltasi?</h2>
          <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {productFilterLabels.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  aria-pressed={isActive}
                  className={cn(
                    "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition duration-200 ease-premium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-ink/16 bg-white text-ink/76 hover:border-ink/40 hover:text-ink"
                  )}
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  type="button"
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
        <label className="flex w-full items-center justify-between gap-3 rounded-full border border-ink/12 bg-white px-4 py-2.5 text-sm text-ink/64 sm:w-auto sm:justify-start">
          <span className="shrink-0 font-medium">Järjestä:</span>
          <select
            aria-label="Järjestä tuotteet"
            className="min-h-8 min-w-0 bg-transparent pr-1 text-sm font-semibold text-ink outline-none"
            onChange={(event) => onSortChange(event.target.value as ProductSort)}
            value={sort}
          >
            {productSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

function ProductImagePanel({ displayName, product }: { displayName: string; product: Product }) {
  const availableImages = product.images.filter(Boolean).slice(0, 3);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedImage = availableImages[selectedImageIndex] ?? availableImages[0];

  return (
    <div className="grid gap-3">
      <Link
        aria-label={`Lue lisää tuotteesta ${displayName}`}
        className="group relative flex aspect-[4/3] min-h-[220px] items-center justify-center overflow-hidden rounded-[1.35rem] bg-[#f3eee7] p-6 outline-none transition duration-300 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:aspect-[5/4] lg:aspect-auto lg:min-h-[315px] lg:p-8"
        href={`/tuotteet/${product.slug}`}
      >
        {selectedImage ? (
          <img
            alt={`${displayName} tuotepakkaus`}
            className="h-full w-full object-contain transition duration-300 ease-premium group-hover:scale-[1.025]"
            src={selectedImage}
          />
        ) : null}
      </Link>
      {availableImages.length > 1 ? (
        <div className="flex justify-center gap-2 lg:justify-start">
          {availableImages.map((image, index) => {
            const selected = index === selectedImageIndex;

            return (
              <button
                aria-label={`Näytä ${displayName} kuva ${index + 1}`}
                aria-pressed={selected}
                className={cn(
                  "relative size-14 overflow-hidden rounded-xl border bg-white p-1.5 transition duration-200 ease-premium hover:border-ink/35 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:size-16",
                  selected ? "border-2 border-ink" : "border-ink/10"
                )}
                key={`${product.id}-thumb-${image}`}
                onClick={() => setSelectedImageIndex(index)}
                type="button"
              >
                <img alt="" aria-hidden="true" className="h-full w-full object-contain" src={image} />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ProductTagPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, 2).map((tag) => (
        <span
          className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-[0.67rem] font-bold uppercase tracking-nav text-ink/58"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProductProblem({ listItem }: { listItem: ProductListItem }) {
  return (
    <div className="rounded-[1.1rem] bg-fog/70 px-4 py-4 sm:px-5">
      <h3 className="text-sm font-semibold text-ink">{listItem.problemHeading}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/62">{listItem.problemCopy}</p>
    </div>
  );
}

function ProductBenefits({ benefits }: { benefits: string[] }) {
  return (
    <ul className="grid gap-2 text-sm font-medium text-ink/78 sm:grid-cols-3">
      {benefits.map((benefit) => (
        <li className="flex gap-2.5" key={benefit}>
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Check aria-hidden="true" className="size-3.5" />
          </span>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  );
}

function ProductUseSections({ listItem }: { listItem: ProductListItem }) {
  return (
    <div className="grid gap-4 text-sm leading-6 text-ink/64 sm:grid-cols-2">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-nav text-ink/42">{listItem.suitableForHeading}</h3>
        <p className="mt-2">{listItem.suitableForCopy}</p>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-nav text-ink/42">{listItem.usageHeading}</h3>
        <p className="mt-2">{listItem.usageCopy}</p>
      </div>
    </div>
  );
}

function ProductActions({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-3 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        className="inline-flex min-h-10 items-center gap-1 text-xs font-bold uppercase tracking-nav text-ink underline-offset-4 transition hover:underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        href={`/tuotteet/${product.slug}`}
      >
        LUE LISÄÄ <ArrowRight aria-hidden="true" className="size-3.5" />
      </Link>
      <ProductListCartAction product={product} />
    </div>
  );
}

function ProductListCard({ listItem, onLivePriceChange, product }: ProductListCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const displayName = getDisplayName(listItem, product);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const readLivePrice = () => {
      const money = card.querySelector("shopify-money");
      const price = parsePrice(money?.textContent ?? "");

      if (price !== null) {
        onLivePriceChange(product.id, price);
      }
    };

    readLivePrice();
    const observer = new MutationObserver(readLivePrice);
    observer.observe(card, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [onLivePriceChange, product.id]);

  return (
    <article
      className="rounded-[1.75rem] border border-ink/10 bg-white p-3 shadow-[0_20px_60px_rgb(11_11_11/0.06)] sm:p-4 lg:grid lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,1fr)] lg:gap-8 lg:p-5"
      data-product-card={listItem.handle}
      ref={cardRef}
    >
      <ProductImagePanel displayName={displayName} product={product} />
      <div className="flex min-w-0 flex-col gap-4 px-2 py-4 sm:px-3 lg:py-2">
        <div className="flex flex-col gap-4 min-[520px]:flex-row min-[520px]:items-start min-[520px]:justify-between">
          <div className="min-w-0">
            <ProductTagPills tags={listItem.tags} />
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{displayName}</h2>
            <p className="mt-2 max-w-2xl text-base font-semibold leading-snug text-ink/86 sm:text-lg">{listItem.headline}</p>
          </div>
          <div className="shrink-0 min-[520px]:pt-1">
            <ProductListPrice product={product} />
          </div>
        </div>
        <ProductProblem listItem={listItem} />
        <ProductBenefits benefits={listItem.benefits} />
        <ProductUseSections listItem={listItem} />
        <ProductActions product={product} />
      </div>
    </article>
  );
}

function ProductList({
  items,
  onLivePriceChange,
  viewKey
}: {
  items: ProductPageItem[];
  onLivePriceChange: (productId: string, price: number) => void;
  viewKey: string;
}) {
  return (
    <section className="bg-white px-5 pb-10 sm:px-8 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="product-list-results grid gap-5 sm:gap-6" key={viewKey}>
          {items.map((item) => (
            <ProductListCard
              key={item.listItem.handle}
              listItem={item.listItem}
              onLivePriceChange={onLivePriceChange}
              product={item.product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsTutorialsCta() {
  return (
    <section className="bg-white px-5 pb-16 pt-4 sm:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.65rem] border border-ink/10 bg-fog px-5 py-7 text-center sm:px-8 lg:px-10 lg:py-9">
          <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">TUTORIAALIT</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            Katso, miten tuotteet toimivat yhdessä.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/62 sm:text-base">
            Valitse tyyli ja seuraa selkeitä ohjeita sen rakentamiseen.
          </p>
          <Link
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-xs font-bold uppercase tracking-nav text-white transition duration-200 ease-premium hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            href="/kayttoohjeet"
          >
            TUTUSTU TUTORIAALEIHIN
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProductsListPage() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("Kaikki tuotteet");
  const [sort, setSort] = useState<ProductSort>("recommended");
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  const handleLivePriceChange = useCallback((productId: string, price: number) => {
    setLivePrices((currentPrices) => {
      if (currentPrices[productId] === price) return currentPrices;
      return { ...currentPrices, [productId]: price };
    });
  }, []);

  const pageItems = useMemo<ProductPageItem[]>(() => {
    return productListItems.flatMap((listItem) => {
      const product = getProductByHandle(listItem.handle);

      if (!product) return [];

      return [
        {
          listItem,
          product
        }
      ];
    });
  }, []);

  const visibleItems = useMemo(() => {
    const filtered = pageItems.filter(({ listItem }) => {
      if (activeFilter === "Kaikki tuotteet") return true;
      return listItem.categories.includes(activeFilter as ProductListCategory);
    });

    return [...filtered].sort((first, second) => {
      if (sort === "recommended") {
        return (
          (recommendedOrderMap.get(first.listItem.handle) ?? Number.MAX_SAFE_INTEGER) -
          (recommendedOrderMap.get(second.listItem.handle) ?? Number.MAX_SAFE_INTEGER)
        );
      }

      if (sort === "name-asc") {
        return getDisplayName(first.listItem, first.product).localeCompare(
          getDisplayName(second.listItem, second.product),
          "fi"
        );
      }

      const firstPrice = livePrices[first.product.id] ?? parsePrice(first.product.price) ?? 0;
      const secondPrice = livePrices[second.product.id] ?? parsePrice(second.product.price) ?? 0;

      return sort === "price-asc" ? firstPrice - secondPrice : secondPrice - firstPrice;
    });
  }, [activeFilter, livePrices, pageItems, sort]);

  const productListViewKey = visibleItems.map(({ listItem }) => listItem.handle).join("|");

  return (
    <main className="bg-white">
      <ProductsPageIntro />
      <ProductFilterToolbar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onSortChange={setSort}
        sort={sort}
      />
      <ProductList items={visibleItems} onLivePriceChange={handleLivePriceChange} viewKey={productListViewKey} />
      <ProductsTutorialsCta />
    </main>
  );
}
