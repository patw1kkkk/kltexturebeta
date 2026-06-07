import { Check } from "lucide-react";
import type { Product } from "@/data/products";

type ProductBenefitsProps = {
  product: Product;
};

export function ProductBenefits({ product }: ProductBenefitsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {product.benefits.map((benefit) => (
        <div className="flex gap-3 border border-ink/10 p-4" key={benefit}>
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="text-sm leading-6 text-ink/70">{benefit}</p>
        </div>
      ))}
    </div>
  );
}
