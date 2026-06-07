import Link from "next/link";
import { transformations } from "@/data/transformations";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function BeforeAfterSection() {
  return (
    <section className="bg-fog px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Pieni vaiva. Selkeä ero." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {transformations.map((item) => (
            <article className="bg-white" key={item.id}>
              <BeforeAfterSlider
                afterLabel={item.afterLabel}
                alt={item.title}
                beforeLabel={item.beforeLabel}
                image={item.image}
              />
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Tag>{item.routine}</Tag>
                  {item.products.map((product) => (
                    <Tag key={product}>{product}</Tag>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <Button className="mt-6" href="/tuotteet" variant="outline">
                  Katso käytetyt tuotteet
                </Button>
              </div>
            </article>
          ))}
        </div>
        <Link className="sr-only" href="/tuotteet">
          Tutustu kaikkiin tuotteisiin
        </Link>
      </div>
    </section>
  );
}
