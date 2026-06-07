import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HairProductQuiz } from "@/components/quiz/HairProductQuiz";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[82svh] items-end overflow-hidden bg-fog pt-24 sm:min-h-[86svh] lg:min-h-[88svh]">
      <Image
        src="/images/hero/hero-transformation.png"
        alt="KL Texture -hiustuotteilla viimeistelty teksturoitu kampaus"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[42%_center] sm:object-[65%_center]"
      />
      <div className="absolute inset-0 bg-white/70 sm:bg-white/30" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-12 sm:px-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end lg:pb-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-nav text-ink/60">Parturin kehittämä hiustuotesarja</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] text-ink sm:text-7xl lg:text-8xl">
            Paremmat hiukset. <span className="block">Ilman turhaa säätöä.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink/80 sm:text-lg sm:text-ink/70">
            KL Texture syntyi parturituolissa. Jokainen tuote on suunniteltu ratkaisemaan oikea
            hiustenmuotoilun tarve helposti ja luotettavasti.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/#tavoitteet" size="lg">
              Löydä oma rutiinisi
            </Button>
            <Button href="/tuotteet" size="lg" variant="outline">
              Tutustu tuotteisiin
            </Button>
          </div>
        </div>
        <div className="w-full max-w-md lg:ml-auto">
          <HairProductQuiz />
        </div>
      </div>
    </section>
  );
}
