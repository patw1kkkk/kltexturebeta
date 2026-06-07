import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StorySection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-fog">
          <Image
            src="/images/story/kosti-barber.png"
            alt="Kosti työskentelemässä parturina"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl lg:pl-8">
          <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">Rakennettu parturituolin takana</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Tuotteita, joilla on selkeä tarkoitus.
          </h2>
          <div className="mt-6 grid gap-4 text-base leading-7 text-ink/65">
            <p>
              Olen parturi ja olen käyttänyt vuosien aikana satoja erilaisia hiustuotteita. KL Texture syntyi
              halusta tehdä hiustenmuotoilusta helpompaa myös kotona.
            </p>
            <p>
              Sarjaan ei ole valittu kymmeniä turhia tuotteita. Jokaisella tuotteella on oma selkeä tehtävänsä:
              enemmän volyymia, parempi rakenne, siistimpi viimeistely tai pehmeämmät hiukset.
            </p>
            <p>Tuotteet on kehitetty oikeiden asiakkaiden tarpeisiin ja niitä käytetään päivittäin myös parturityössä.</p>
          </div>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button href="/tarina" variant="outline">
              Lue tarina
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <p className="text-sm leading-6 text-ink/55">
              <span className="block font-semibold text-ink">Kosti Lehtonen</span>
              Parturi ja KL Texturen kehittäjä
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
