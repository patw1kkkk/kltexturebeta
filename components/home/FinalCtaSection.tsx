import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  return (
    <section className="bg-ink px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Löydä tuotteet, jotka sopivat sinun hiuksillesi.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65">
          Valitse tavoite ja rakenna toimiva rutiini muutamassa sekunnissa.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/#tavoitteet" variant="light">
            Löydä oma rutiinisi
          </Button>
          <Button href="/tuotteet" variant="ghost" className="text-white hover:bg-white/10">
            Tutustu kaikkiin tuotteisiin
          </Button>
        </div>
      </div>
    </section>
  );
}
