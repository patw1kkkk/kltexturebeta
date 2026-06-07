import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reviews = [
  {
    quote: "Texture Spray teki hiuksista heti helpommin muotoiltavat. Lopputulos ei tunnu yhtään tahmealta.",
    name: "Aleksi"
  },
  {
    quote: "Volume Powder on jäänyt päivittäiseen käyttöön. Pieni määrä riittää ja hiukset pysyvät ilmavina.",
    name: "Eetu"
  },
  {
    quote: "Parasta on se, että tuotteiden välillä ei tarvitse arvailla. Otin suoraan Fluffy Hair -rutiinin.",
    name: "Joel"
  },
  {
    quote: "Leave-in Conditioner toimii hyvin, koska se ei tee hiuksista raskaita.",
    name: "Elias"
  }
];

export function ReviewsSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Mitä asiakkaat sanovat?" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <article className="border border-ink/10 p-5" key={review.name}>
              <div className="flex gap-1 text-ink" aria-label="5 tähteä">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star className="size-4 fill-ink" key={index} aria-hidden="true" />
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-ink/70">“{review.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-ink">— {review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
