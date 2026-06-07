import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tutorial, TutorialStep as TutorialStepType } from "@/data/tutorials";
import { getProductByTutorialHandle, getTutorialProducts, tutorials } from "@/data/tutorials";
import { TutorialBundleButton } from "@/components/tutorials/TutorialBundleButton";
import { TutorialProductCard } from "@/components/tutorials/TutorialProductCard";
import { cn } from "@/lib/utils";

export function TutorialPage() {
  return (
    <main className="bg-white text-ink">
      <TutorialPageIntro />
      <TutorialJumpNav />
      <section className="px-4 pb-14 sm:px-8 lg:pb-20" aria-label="Tutoriaalit">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </section>
      <TutorialBottomCta />
    </main>
  );
}

function TutorialPageIntro() {
  return (
    <section className="px-4 pb-8 pt-28 text-center sm:px-8 sm:pb-10 lg:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-nav text-ink/42">TUTORIAALIT</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl lg:text-6xl">
          Löydä seuraava tyylisi.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink/62 sm:text-base">
          Neljä toimivaa hiustyyliä. Selkeät vaiheet ja oikeat tuotteet niiden rakentamiseen.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink/48">
          Valitse lopputulos, seuraa ohjeita ja lisää tarvittavat tuotteet kerralla ostoskoriin.
        </p>
      </div>
    </section>
  );
}

function TutorialJumpNav() {
  return (
    <nav aria-label="Tutoriaalien pikavalinta" className="px-4 pb-8 sm:px-8 lg:pb-10">
      <div className="mx-auto flex max-w-7xl justify-center">
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tutorials.map((tutorial) => (
            <a
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white px-4 text-xs font-bold uppercase tracking-nav text-ink/70 transition duration-200 ease-premium hover:border-ink/28 hover:bg-[#f7f4ef] hover:text-ink active:border-ink active:bg-ink active:text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              href={`#${tutorial.id}`}
              key={tutorial.id}
            >
              {tutorial.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const products = getTutorialProducts(tutorial);

  return (
    <article
      className="scroll-mt-24 overflow-hidden rounded-[28px] border border-ink/10 bg-white shadow-[0_20px_70px_rgba(20,20,20,0.07)]"
      id={tutorial.id}
    >
      <div className="grid gap-7 p-5 pb-0 sm:p-7 sm:pb-0 lg:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)] lg:gap-8 lg:p-8 lg:pb-0">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-nav text-ink/42">TUTORIAALIT</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{tutorial.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/64 sm:text-base">{tutorial.description}</p>

          <p className="mt-5 rounded-[18px] border border-ink/8 bg-[#fbfaf7] px-4 py-3 text-sm leading-6 text-ink/62">
            {tutorial.suitableFor}
          </p>

          <ol className="mt-6 grid gap-0">
            {tutorial.steps.map((step, stepIndex) => (
              <TutorialStep
                isLast={stepIndex === tutorial.steps.length - 1}
                key={`${tutorial.id}-step-${stepIndex}`}
                step={step}
                stepNumber={stepIndex + 1}
              />
            ))}
          </ol>
        </div>

        <div className="grid gap-5 lg:content-start">
          <TutorialBeforeAfter tutorial={tutorial} />
        </div>
      </div>
      <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8">
        <TutorialBundleButton products={products} tutorialId={tutorial.id} />
      </div>
    </article>
  );
}

function TutorialStep({
  isLast,
  step,
  stepNumber
}: {
  isLast: boolean;
  step: TutorialStepType;
  stepNumber: number;
}) {
  const product = step.productHandle ? getProductByTutorialHandle(step.productHandle) : undefined;

  return (
    <li className={cn("relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3", isLast ? "pb-0" : "pb-5")}>
      <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-ink text-xs font-bold tabular-nums text-white">
        {stepNumber}
      </span>
      <div className="min-w-0 pt-1">
        <p className="text-sm leading-6 text-ink/72 sm:text-base">{step.text}</p>
        {product && step.productHandle ? <TutorialProductCard handle={step.productHandle} product={product} /> : null}
      </div>
      {!isLast ? <span className="absolute bottom-1 left-4 top-9 w-px bg-ink/12" aria-hidden="true" /> : null}
    </li>
  );
}

function TutorialBeforeAfter({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="grid gap-3 min-[390px]:grid-cols-2 lg:grid-cols-2">
      <TutorialImagePanel
        alt={tutorial.beforeAlt}
        imageAvailable={tutorial.imagesAvailable}
        label="ENNEN"
        src={tutorial.beforeImage}
        tone="before"
      />
      <TutorialImagePanel
        alt={tutorial.afterAlt}
        imageAvailable={tutorial.imagesAvailable}
        label="JÄLKEEN"
        src={tutorial.afterImage}
        tone="after"
      />
    </div>
  );
}

function TutorialImagePanel({
  alt,
  imageAvailable,
  label,
  src,
  tone
}: {
  alt: string;
  imageAvailable: boolean;
  label: "ENNEN" | "JÄLKEEN";
  src: string;
  tone: "before" | "after";
}) {
  return (
    <figure
      aria-label={imageAvailable ? undefined : alt}
      className="relative overflow-hidden rounded-[22px] border border-ink/10 bg-[#ebe5dc]"
      role={imageAvailable ? undefined : "img"}
    >
      <div className="relative aspect-[4/5]">
        {imageAvailable ? (
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 390px) 44vw, 100vw" className="object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0",
              tone === "before"
                ? "bg-[radial-gradient(circle_at_42%_18%,rgba(255,255,255,0.55),transparent_26%),linear-gradient(145deg,#d9d1c7,#f4efe8_52%,#cfc6bb)]"
                : "bg-[radial-gradient(circle_at_58%_20%,rgba(255,255,255,0.62),transparent_28%),linear-gradient(145deg,#151515,#6f675e_55%,#ece4da)]"
            )}
          >
            <span className="absolute left-1/2 top-[16%] h-[18%] w-[36%] -translate-x-1/2 rounded-t-full bg-black/18 blur-[1px]" />
            <span className="absolute left-1/2 top-[28%] h-[44%] w-[52%] -translate-x-1/2 rounded-[45%] border border-white/18 bg-white/10" />
            <span className="absolute inset-x-8 bottom-8 h-px bg-black/12" />
          </div>
        )}
      </div>
      <figcaption className="absolute left-4 top-4 rounded-full bg-white/78 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink/72 backdrop-blur-sm">
        {label}
      </figcaption>
    </figure>
  );
}

function TutorialBottomCta() {
  return (
    <section className="px-4 pb-20 sm:px-8 lg:pb-24">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-ink/10 bg-[#fbfaf7] px-5 py-8 text-center shadow-[0_18px_60px_rgba(20,20,20,0.055)] sm:px-8">
        <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">Etkö tiedä, mistä aloittaa?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ink/62 sm:text-base">
          Vastaa nopeaan Hair Type Testiin ja löydä hiuksillesi sopivat tuotteet.
        </p>
        <Link
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-bold uppercase tracking-nav text-white transition duration-200 ease-premium hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          href="/#hair-type-test"
        >
          Tee Hair Type Test
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
