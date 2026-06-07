import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/data/products";

type ProductRecommendationsProps = {
  products: Product[];
};

export function ProductRecommendations({ products }: ProductRecommendationsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
