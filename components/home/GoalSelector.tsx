"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const goals = [
  {
    id: "volume",
    title: "Lisää volyymia",
    description: "Kun hiukset tuntuvat litteiltä tai kaipaavat lisää ryhtiä.",
    products: ["Volume Powder", "Texture Spray"],
    routine: "Fluffy Hair"
  },
  {
    id: "texture",
    title: "Lisää rakennetta",
    description: "Kun haluat rennomman, luonnollisen ja erotellun lopputuloksen.",
    products: ["Salt Spray", "Texture Wax", "Texture Spray"],
    routine: "Messy Texture"
  },
  {
    id: "finish",
    title: "Siistimpi viimeistely",
    description: "Kun haluat huolitellun, hallitun tai hieman kiiltävämmän tyylin.",
    products: ["Hair Glaze", "Leave-in Conditioner"],
    routine: "Clean Finish"
  },
  {
    id: "soft",
    title: "Pehmeämmät hiukset",
    description: "Kun hiukset tuntuvat kuivilta, karheilta tai vaikeasti hallittavilta.",
    products: ["Leave-in Conditioner", "Hair Glaze"],
    routine: "Clean Finish"
  }
];

type GoalSelectorProps = {
  products: Product[];
};

export function GoalSelector({ products }: GoalSelectorProps) {
  const [activeGoalId, setActiveGoalId] = useState(goals[0].id);
  const activeGoal = goals.find((goal) => goal.id === activeGoalId) ?? goals[0];

  const recommendedProducts = useMemo(
    () => products.filter((product) => activeGoal.products.includes(product.name)),
    [activeGoal.products, products]
  );

  return (
    <section className="bg-fog px-5 py-20 sm:px-8 lg:py-28" id="tavoitteet">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Miltä haluat hiustesi näyttävän?"
          description="Valitse tavoite. Näytämme siihen sopivat tuotteet ja yksinkertaisen rutiinin."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {goals.map((goal) => (
            <button
              className={cn(
                "min-h-56 border p-5 text-left transition duration-300 ease-premium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                activeGoalId === goal.id
                  ? "border-ink bg-ink text-white"
                  : "border-ink/10 bg-white text-ink hover:border-ink/40"
              )}
              key={goal.id}
              onClick={() => setActiveGoalId(goal.id)}
              type="button"
            >
              <span className="text-xs font-semibold uppercase tracking-nav opacity-50">Tavoite</span>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{goal.title}</h3>
              <p className="mt-4 text-sm leading-6 opacity-70">{goal.description}</p>
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-5 bg-white p-5 sm:p-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">Suositus</p>
            <h3 className="mt-3 text-3xl font-semibold text-ink">{activeGoal.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65">{activeGoal.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/rutiinit">
                Katso suositus
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Link
                className="inline-flex items-center text-sm font-semibold uppercase tracking-nav text-ink/65 transition hover:text-ink"
                href="/tuotteet"
              >
                Tutustu tuotteisiin
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">Tuotteet</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {recommendedProducts.map((product) => (
                  <Link
                    className="border border-ink/12 px-3 py-2 text-sm transition hover:border-ink"
                    href={`/tuotteet/${product.slug}`}
                    key={product.slug}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-ink/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">Rutiini</p>
              <p className="mt-2 text-lg font-semibold text-ink">{activeGoal.routine}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
