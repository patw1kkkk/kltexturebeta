import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { Product } from "@/data/products";
import type { Routine } from "@/data/routines";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

type RoutineCardProps = {
  routine: Routine;
  products: Product[];
};

export function RoutineCard({ routine, products }: RoutineCardProps) {
  return (
    <article className="grid overflow-hidden bg-ink text-white lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-[360px]">
        <Image
          src={routine.image}
          alt={routine.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-[0.82]"
        />
      </div>
      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Tag className="border-white/20 text-white/70">{routine.stylingTime}</Tag>
            <Tag className="border-white/20 text-white/70">{routine.products.length} tuotetta</Tag>
          </div>
          <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">{routine.name}</h3>
          <p className="mt-4 text-base leading-7 text-white/70">{routine.result}</p>
          <div className="mt-7">
            <h4 className="text-xs font-semibold uppercase tracking-nav text-white/40">Tuotteet</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {products.map((product) => (
                <span className="border border-white/15 px-3 py-1 text-sm text-white/70" key={product.slug}>
                  {product.name}
                </span>
              ))}
            </div>
          </div>
          <ol className="mt-7 grid gap-3">
            {routine.steps.map((step, index) => (
              <li className="flex gap-3 text-sm leading-6 text-white/70" key={step}>
                <span className="flex size-7 shrink-0 items-center justify-center border border-white/20 text-xs text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="/rutiinit" variant="light">
            Katso rutiini
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <span className="inline-flex items-center gap-2 text-sm text-white/55">
            <Clock className="size-4" aria-hidden="true" />
            {routine.stylingTime}
          </span>
        </div>
      </div>
    </article>
  );
}
