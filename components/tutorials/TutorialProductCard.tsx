import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import type { ProductHandle } from "@/data/tutorials";
import { tutorialProductCopy } from "@/data/tutorials";
import { ShopifyProductCardPurchase } from "@/components/shopify/ShopifyProductCardPurchase";

type TutorialProductCardProps = {
  handle: ProductHandle;
  product: Product;
};

export function TutorialProductCard({ handle, product }: TutorialProductCardProps) {
  const copy = tutorialProductCopy[handle];

  return (
    <article className="mt-3 rounded-[18px] border border-ink/10 bg-white p-3 shadow-[0_10px_30px_rgba(20,20,20,0.035)] transition duration-200 ease-premium hover:border-ink/18">
      <div className="grid grid-cols-[58px_minmax(0,1fr)] gap-3">
        <Link
          aria-label={`Katso tuote ${copy.displayName}`}
          className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#f7f4ef]"
          href={`/tuotteet/${product.slug}`}
        >
          <Image
            src={product.images[0]}
            alt={`${copy.displayName} -tuote`}
            fill
            sizes="58px"
            className="object-contain p-2.5"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                className="block text-sm font-semibold leading-tight text-ink transition hover:text-ink/72 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                href={`/tuotteet/${product.slug}`}
              >
                {copy.displayName}
              </Link>
              <p className="mt-1 text-xs leading-5 text-ink/62">{copy.benefit}</p>
            </div>
            <Link
              aria-label={`Katso tuote ${copy.displayName}`}
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-ink/25 hover:bg-[#f7f4ef] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              href={`/tuotteet/${product.slug}`}
            >
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ShopifyProductCardPurchase buttonLabel="LISÄÄ OSTOSKORIIN" layout="embedded" product={product} />
        </div>
      </div>
    </article>
  );
}
