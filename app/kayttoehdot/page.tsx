import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Käyttöehdot",
  description: "KL Texture -käyttöehtojen paikka."
};

export default function TermsPage() {
  return (
    <section className="bg-fog px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-3xl bg-white p-6 sm:p-10">
        <SectionHeading title="Käyttöehdot" description="Tämä sivu on valmis paikka lopullisille käyttöehdoille." />
        <p className="mt-8 text-sm leading-7 text-ink/65">
          Lisää ennen julkaisua verkkokaupan lopulliset ehdot, vastuut, maksuihin liittyvät tiedot ja mahdolliset
          Shopify-kaupan käytännöt.
        </p>
      </div>
    </section>
  );
}
