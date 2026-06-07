import Image from "next/image";
import { Clock } from "lucide-react";
import type { Product } from "@/data/products";
import type { Routine } from "@/data/routines";
import { ShopifyBuyButton } from "@/components/shopify/ShopifyBuyButton";
import { ShopifyBundleButton } from "@/components/shopify/ShopifyBundleButton";
import { Tag } from "@/components/ui/Tag";

type RoutineDetailsProps = {
  routine: Routine;
  products: Product[];
};

export function RoutineDetails({ routine, products }: RoutineDetailsProps) {
  return (
    <article className="grid gap-8 border-t border-ink/10 py-12 lg:grid-cols-[0.85fr_1fr] lg:gap-12">
      <div className="relative aspect-[4/5] overflow-hidden bg-fog">
        <Image src={routine.image} alt={routine.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <div>
        <div className="mb-5 flex flex-wrap gap-2">
          <Tag>{routine.bestFor}</Tag>
          <Tag>
            <Clock className="mr-1 size-3" aria-hidden="true" />
            {routine.stylingTime}
          </Tag>
        </div>
        <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">{routine.name}</h2>
        <p className="mt-5 text-lg leading-8 text-ink/70">{routine.result}</p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/60">{routine.description}</p>
        <div className="mt-8 grid gap-3">
          {routine.steps.map((step, index) => (
            <div className="flex gap-4 border border-ink/10 p-4" key={step}>
              <span className="flex size-8 shrink-0 items-center justify-center bg-ink text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-ink/70">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <div className="border border-ink/10 p-4" key={product.slug}>
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">{product.shortDescription}</p>
              <ShopifyBuyButton
                buttonLabel="Lisää ostoskoriin"
                className="mt-4"
                containerId={`${product.shopifyContainerId ?? `shopify-${product.slug}`}-routine`}
                productId={product.shopifyProductId}
                shopifyHandle={product.shopifyHandle}
              />
            </div>
          ))}
        </div>
        <ShopifyBundleButton
          bundleProductId={routine.bundleShopifyProductId}
          className="mt-8"
          containerId={routine.bundleShopifyContainerId}
        />
      </div>
    </article>
  );
}
