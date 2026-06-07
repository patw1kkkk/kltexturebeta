import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Toimitus ja palautukset",
  description: "KL Texture -toimitusten ja palautusten perustiedot."
};

export default function ShippingPage() {
  return (
    <section className="bg-fog px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-3xl bg-white p-6 sm:p-10">
        <SectionHeading
          title="Toimitus ja palautukset"
          description="Tämä sivu toimii valmiina paikkana lopullisille toimitus- ja palautusehdoille ennen julkaisua."
        />
        <div className="mt-8 grid gap-5 text-sm leading-7 text-ink/65">
          <p>Shopify hallinnoi tilausta, maksua ja toimitustietoja. Lopulliset toimitustavat lisätään Shopify-asetusten mukaan.</p>
          <p>Palautusohjeet, käsittelyaika ja asiakaspalvelun yhteystiedot kannattaa täydentää ennen sivuston julkaisua.</p>
        </div>
      </div>
    </section>
  );
}
