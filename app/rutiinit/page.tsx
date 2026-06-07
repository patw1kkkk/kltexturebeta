import type { Metadata } from "next";
import { RoutineDetails } from "@/components/routines/RoutineDetails";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { routines } from "@/data/routines";

export const metadata: Metadata = {
  title: "Rutiinit",
  description: "Valmiit KL Texture -hiusrutiinit eri lopputuloksiin."
};

export default function RoutinesPage() {
  return (
    <section className="bg-white px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Hyvä hiustyyli ei vaadi kymmentä tuotetta."
          description="Valitse tavoite ja seuraa yksinkertaista rutiinia."
        />
        <div className="mt-12">
          {routines.map((routine) => (
            <RoutineDetails
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
