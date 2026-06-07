import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Yhteystiedot",
  description: "KL Texture -yhteystiedot."
};

export default function ContactPage() {
  return (
    <section className="bg-fog px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-3xl bg-white p-6 sm:p-10">
        <SectionHeading
          title="Yhteystiedot"
          description="Lisää tähän KL Texturen lopullinen asiakaspalvelun sähköposti, yritystiedot ja sosiaalisen median linkit."
        />
        <div className="mt-8 grid gap-3 text-sm leading-7 text-ink/65">
          <p>Sähköposti: hello@kltexture.fi</p>
          <p>Instagram ja TikTok löytyvät sivuston footerista.</p>
        </div>
      </div>
    </section>
  );
}
