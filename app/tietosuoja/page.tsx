import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tietosuojaseloste",
  description: "KL Texture -tietosuojaselosteen paikka."
};

export default function PrivacyPage() {
  return (
    <section className="bg-fog px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-3xl bg-white p-6 sm:p-10">
        <SectionHeading
          title="Tietosuojaseloste"
          description="Tämä sivu on valmis paikka lopulliselle tietosuojaselosteelle."
        />
        <p className="mt-8 text-sm leading-7 text-ink/65">
          Lisää julkaisuun mennessä rekisterinpitäjän tiedot, käsiteltävät henkilötiedot, käyttötarkoitukset,
          säilytysajat ja rekisteröidyn oikeudet.
        </p>
      </div>
    </section>
  );
}
