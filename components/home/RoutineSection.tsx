import type { Product } from "@/data/products";
import type { Routine } from "@/data/routines";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RoutineSectionProps = {
  routines: Routine[];
  products: Product[];
};

export function RoutineSection({ routines, products }: RoutineSectionProps) {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Valmiit rutiinit eri tyyleihin"
          description="Sinun ei tarvitse arvailla, mitä tuotteita kannattaa käyttää yhdessä."
        />
        <div className="mt-12 grid gap-6">
          {routines.map((routine) => (
            <RoutineCard
              key={routine.id}
              products={products.filter((product) => routine.products.includes(product.slug))}
              routine={routine}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
