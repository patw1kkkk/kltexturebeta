import type { Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProductProblemGridProps = {
  products: Product[];
};

export function ProductProblemGrid({ products }: ProductProblemGridProps) {
  return (
    <section className="bg-fog px-5 py-20 sm:px-8 lg:py-28" id="tuotteet">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Täsmätuotteet oikeisiin tarpeisiin"
          description="Jokaisella tuotteella on oma selkeä tehtävänsä."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
