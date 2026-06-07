import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { ShopifyProductCardPurchase } from "@/components/shopify/ShopifyProductCardPurchase";
import { Tag } from "@/components/ui/Tag";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col bg-white">
      <Link
        aria-label={`Tutustu tuotteeseen ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden bg-fog"
        href={`/tuotteet/${product.slug}`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 ease-premium group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4">
          <Tag className="bg-white/90">{product.badge}</Tag>
        </div>
      </Link>
      <div className="flex flex-1 flex-col border-x border-b border-ink/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">{product.problem}</p>
        <h3 className="mt-3 text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-ink/65">{product.shortDescription}</p>
        <ShopifyProductCardPurchase product={product} />
      </div>
    </article>
  );
}
