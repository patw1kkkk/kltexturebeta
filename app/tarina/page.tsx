import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tarina",
  description: "KL Texture syntyi parturityössä oikeiden asiakkaiden tarpeista."
};

export default function StoryPage() {
  return (
    <article className="bg-white">
      <section className="px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-nav text-ink/45">KL Texture syntyi parturityössä</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] sm:text-7xl">
              Hyvän tuotteen pitää tehdä muotoilusta helpompaa.
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-ink/65">
            Tuotteet perustuvat oikeiden asiakkaiden tarpeisiin. Valikoima on tarkoituksella rajattu, jotta jokaisella
            tuotteella on oma selkeä tehtävänsä.
          </p>
        </div>
      </section>
      <section className="px-5 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-[16/10] overflow-hidden bg-fog">
            <Image src="/images/story/kosti-barber.png" alt="Kosti työskentelemässä parturina" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-fog">
            <Image src="/images/products/product-lineup.png" alt="KL Texture -tuotteet" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1fr]">
          <blockquote className="text-3xl font-semibold leading-tight sm:text-5xl">
            “Hyvän tuotteen pitää tehdä muotoilusta helpompaa, ei monimutkaisempaa.”
          </blockquote>
          <div className="grid gap-6 text-base leading-8 text-ink/65">
            <p>
              KL Texture syntyi halusta tehdä toimivan hiustyylin rakentamisesta helpompaa kotona. Parturissa näkee
              nopeasti, mitkä tuotteet ratkaisevat arjen ongelmia ja mitkä jäävät käyttämättä.
            </p>
            <p>
              Siksi sarjassa ei ole kymmeniä vaihtoehtoja. Jokainen tuote vastaa selkeään tarpeeseen: enemmän volyymia,
              parempi rakenne, siistimpi viimeistely tai pehmeämmät hiukset.
            </p>
            <p>
              Tuotteita käytetään päivittäin myös parturityössä, joten niiden pitää olla helppoja, luotettavia ja
              tuntua hyvältä hiuksissa.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-fog px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="Kehitetty todellisiin tarpeisiin" />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {["Parturiympäristö", "Lähikuva hiusten muotoilusta", "Asiakastilanne"].map((title) => (
              <div className="relative aspect-[4/5] overflow-hidden bg-white" key={title}>
                <Image
                  src={title === "Parturiympäristö" ? "/images/story/kosti-barber.png" : "/images/routines/social-routine.png"}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
