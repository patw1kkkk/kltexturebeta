"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { useState } from "react";
import { products, type Product } from "@/data/products";
import { featuredMonthlyTutorialId, getProductByTutorialHandle, getTutorialById } from "@/data/tutorials";
import { CreatorResults } from "@/components/creators/CreatorResults";
import { ShopifyProductPurchase } from "@/components/shopify/ShopifyProductPurchase";
import { StoryTimeline } from "@/components/story/StoryTimeline";
import { TutorialProductCard } from "@/components/tutorials/TutorialProductCard";
import { TrustSection } from "@/components/trust/TrustSection";
import { cn } from "@/lib/utils";

const reviews = [
  {
    quote: "Texture Spray teki hiuksista heti helpommin muotoiltavat. Lopputulos ei tunnu yhtään tahmealta.",
    name: "Aleksi",
    product: "Texture Spray"
  },
  {
    quote: "Volume Powder on jäänyt päivittäiseen käyttöön. Pieni määrä riittää ja hiukset pysyvät ilmavina.",
    name: "Eetu",
    product: "Volume Powder"
  },
  {
    quote: "Parasta on se, että tuotteiden välillä ei tarvitse arvailla. Otin suoraan Fluffy Hair -rutiinin.",
    name: "Joel",
    product: "Fluffy Hair -rutiini"
  }
];

const bestsellerGallery = [
  { src: "/images/products/texture-wax.svg", alt: "Texture Wax -tuote" },
  { src: "/images/products/product-lineup.png", alt: "KL Texture -tuotesarja" },
  { src: "/images/routines/social-routine.png", alt: "Texture Wax osana viimeistelyrutiinia" },
  { src: "/images/story/kosti-barber.png", alt: "Parturin viimeistelyhetki" }
];

const bestsellerBenefits = [
  "Luonnollinen ja eroteltu lopputulos",
  "Muotoiltava pito ilman kovaa tunnetta",
  "Helppo työstää uudelleen päivän aikana",
  "Pieni määrä riittää"
];

function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

type EditorialHomePageProps = {
  monthlyTutorialTitle: string;
};

export function EditorialHomePage({ monthlyTutorialTitle }: EditorialHomePageProps) {
  const featuredProduct =
    products.find((product) => product.featuredSpotlight) ?? getProductBySlug("texture-wax") ?? products[0];

  return (
    <>
      <EditorialHero />
      <TrustBar />
      <BestsellerSpotlight product={featuredProduct} />
      <StoryTimeline />
      <CreatorResults />
      <FeaturedTutorialPreview title={monthlyTutorialTitle} />
      <TrustSection reviews={reviews} />
    </>
  );
}

function EditorialHero() {
  return (
    <section className="relative min-h-[76svh] overflow-hidden bg-ink px-4 pb-10 pt-24 text-white sm:px-8 lg:min-h-[86svh] lg:pb-14 lg:pt-28">
      <Image
        src="/herophoto.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-black/34" />

      <div className="relative z-10 mx-auto flex min-h-[calc(76svh-8.5rem)] w-full max-w-7xl items-end lg:min-h-[calc(86svh-9rem)]">
        <div className="max-w-4xl pb-2">
          <h1
            aria-label="Investoi hiuksiisi kunnollisilla tuotteilla."
            className="max-w-4xl text-[clamp(2.45rem,8vw,5.6rem)] font-semibold leading-[0.98] text-white"
          >
            <span className="block">
              <span className="bg-[image:url('/marker-scribble.svg')] bg-[length:100%_1.08em] bg-center bg-no-repeat px-[0.08em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                Investoi hiuksiisi
              </span>
            </span>
            {" "}
            <span className="block">
              <span className="bg-[image:url('/marker-scribble.svg')] bg-[length:100%_1.08em] bg-center bg-no-repeat px-[0.08em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                kunnollisilla tuotteilla.
              </span>
            </span>
          </h1>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              aria-label="Varaa parturiaika KL Barberin ajanvarauksessa"
              className="inline-flex min-h-12 items-center justify-center border border-white/90 bg-white px-6 text-sm font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:bg-fog focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="https://slotti.fi/booking/klbarber/#/"
              rel="noreferrer"
              target="_blank"
            >
              Varaa parturiaika
            </a>
            <Link
              aria-label="Tutustu KL Texture -tuotteisiin"
              className="inline-flex min-h-12 items-center justify-center border border-white/90 bg-white px-6 text-sm font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:bg-fog focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/tuotteet"
            >
              Tutustu tuotteisiin
            </Link>
            <a
              aria-label="Nappaa 10 prosentin etu Hair type testistä"
              className="inline-flex min-h-12 items-center justify-center border border-white/90 bg-white px-6 text-sm font-semibold uppercase tracking-nav text-ink transition duration-300 ease-premium hover:bg-fog focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="#hair-type-test"
            >
              NAPPAA 10 % ETU
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinnishFlagIcon() {
  return (
    <svg aria-hidden="true" className="h-3 w-[18px] shrink-0 sm:h-3.5 sm:w-[21px]" viewBox="0 0 18 12" fill="none">
      <rect width="18" height="12" rx="1.5" fill="#F9FAFB" />
      <path d="M5 0h3v12H5V0Z" fill="#1E4E8C" />
      <path d="M0 4.5h18v3H0v-3Z" fill="#1E4E8C" />
      <rect x="0.35" y="0.35" width="17.3" height="11.3" rx="1.15" stroke="#141414" strokeOpacity="0.1" strokeWidth="0.7" />
    </svg>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-black px-4 sm:px-8" aria-label="Tuoteluottamus">
      <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center sm:min-h-14">
        <div className="grid w-full grid-cols-2 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-nav">
          <div className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2">
            <Leaf className="size-3.5 shrink-0 sm:size-4" strokeWidth={1.8} aria-hidden="true" />
            <span>PARAFFIN FREE</span>
          </div>
          <div className="flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2">
            <span>TOIMITUS SUOMESTA</span>
            <FinnishFlagIcon />
          </div>
        </div>
      </div>
    </section>
  );
}

function BestsellerSpotlight({ product }: { product: Product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = bestsellerGallery[activeImageIndex] ?? bestsellerGallery[0];
  const setPreviousImage = () => {
    setActiveImageIndex((current) => (current === 0 ? bestsellerGallery.length - 1 : current - 1));
  };
  const setNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % bestsellerGallery.length);
  };

  return (
    <section className="bg-stone-100 px-4 py-12 sm:px-8 lg:py-20" id="bestseller">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-ink/8 bg-[#fbfaf7] p-4 shadow-[0_22px_70px_rgba(31,27,24,0.08)] sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[80px_minmax(0,1fr)_0.82fr] lg:items-stretch">
          <div className="order-2 flex gap-3 overflow-x-auto no-scrollbar lg:order-1 lg:flex-col lg:overflow-visible">
            {bestsellerGallery.map((image, index) => (
              <button
                aria-label={`Näytä kuva ${index + 1}`}
                aria-pressed={index === activeImageIndex}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden rounded-2xl border bg-white transition duration-300 ease-premium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:size-20",
                  index === activeImageIndex ? "border-ink" : "border-ink/10 hover:border-ink/35"
                )}
                key={image.src}
                onClick={() => setActiveImageIndex(index)}
                type="button"
              >
                <Image src={image.src} alt="" fill sizes="88px" className="object-cover" />
              </button>
            ))}
          </div>

          <div className="relative order-1 min-h-[300px] overflow-hidden rounded-[26px] bg-[#f4efe8] lg:order-2 lg:min-h-[460px]">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-contain p-7 sm:p-9 lg:p-12"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <button
                aria-label="Edellinen kuva"
                className="flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-ink shadow-sm backdrop-blur transition hover:border-ink/30 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                onClick={setPreviousImage}
                type="button"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                aria-label="Seuraava kuva"
                className="flex size-11 items-center justify-center rounded-full border border-ink/10 bg-white/85 text-ink shadow-sm backdrop-blur transition hover:border-ink/30 hover:bg-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                onClick={setNextImage}
                type="button"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="order-3 flex flex-col justify-center rounded-[24px] bg-white px-5 py-6 sm:px-7 lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-nav text-white">
                BESTSELLER
              </span>
              <p className="mt-3 text-xs font-bold uppercase tracking-nav text-ink/42">Suosituin viimeistelytuote</p>
            </div>
            <h2 className="mt-3 text-4xl font-semibold leading-none text-ink sm:text-5xl">{product.name}</h2>
            <p className="mt-4 text-base leading-7 text-ink/68">
              Muotoiltavaa pitoa ja eroteltua rakennetta ilman jäykkää tunnetta.
            </p>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-ink/70">
              {bestsellerBenefits.map((benefit) => (
                <li className="flex gap-3" key={benefit}>
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <ShopifyProductPurchase product={product} layout="compact" showSupportText={false} />
            <Link
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-nav text-ink/62 transition hover:gap-3 hover:text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              href={`/tuotteet/${product.slug}`}
            >
              Katso tuote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedTutorialPreview({ title }: { title: string }) {
  const tutorial = getTutorialById(featuredMonthlyTutorialId);

  if (!tutorial) {
    return null;
  }

  const previewSteps = tutorial.previewSteps ?? tutorial.steps;

  return (
    <section
      className="bg-[#111111] bg-cover bg-center px-4 py-16 sm:px-8 lg:py-24"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)), url("/kostileikkaa.png")'
      }}
      aria-labelledby="featured-tutorial-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="featured-tutorial-title" className="text-4xl font-semibold leading-[1.02] text-white sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="mx-auto my-6 h-px w-[92%] max-w-7xl bg-white/25" aria-hidden="true" />

        <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[0.54fr_0.46fr] lg:items-center lg:gap-8 lg:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-nav text-ink/42">TUTORIAALIT</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{tutorial.title}</h3>
              {tutorial.previewDescription ? (
                <p className="mt-3 max-w-xl text-sm leading-6 text-ink/62 sm:text-base">{tutorial.previewDescription}</p>
              ) : null}

              <ol className="mt-6 grid gap-0">
                {previewSteps.map((step, index) => {
                  const product = step.productHandle ? getProductByTutorialHandle(step.productHandle) : undefined;
                  const isLast = index === previewSteps.length - 1;

                  return (
                    <li
                      className={cn("relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3", isLast ? "" : "pb-5")}
                      key={`${tutorial.id}-featured-step-${index}`}
                    >
                      <span className="relative flex size-8 items-center justify-center rounded-full border border-[#111111] bg-[#111111] text-xs font-bold tabular-nums text-white">
                        {index + 1}
                      </span>
                      <div className="pt-1">
                        <p className="text-sm leading-6 text-ink/72 sm:text-base">{step.text}</p>
                        {product && step.productHandle ? (
                          <TutorialProductCard handle={step.productHandle} product={product} />
                        ) : null}
                      </div>
                      {!isLast ? <span className="absolute bottom-1 left-4 top-9 w-px bg-ink/12" aria-hidden="true" /> : null}
                    </li>
                  );
                })}
              </ol>

              <Link
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-bold uppercase tracking-nav text-white transition hover:bg-ink/88 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                href="/kayttoohjeet"
              >
                Näytä kaikki tutoriaalit
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-3 min-[390px]:grid-cols-2 sm:gap-4">
              <figure
                aria-label={tutorial.imagesAvailable ? undefined : tutorial.beforeAlt}
                className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-[#ebe5dc]"
                role={tutorial.imagesAvailable ? undefined : "img"}
              >
                <div className="relative aspect-[4/5]">
                  {tutorial.imagesAvailable ? (
                    <Image
                      src={tutorial.beforeImage}
                      alt={tutorial.beforeAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 390px) 44vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <FeaturedTutorialPlaceholder tone="before" />
                  )}
                </div>
                <figcaption className="absolute left-4 top-4 rounded-full bg-white/72 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/72 backdrop-blur-sm">
                  ENNEN
                </figcaption>
              </figure>

              <figure
                aria-label={tutorial.imagesAvailable ? undefined : tutorial.afterAlt}
                className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-[#ebe5dc]"
                role={tutorial.imagesAvailable ? undefined : "img"}
              >
                <div className="relative aspect-[4/5]">
                  {tutorial.imagesAvailable ? (
                    <Image
                      src={tutorial.afterImage}
                      alt={tutorial.afterAlt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 390px) 44vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <FeaturedTutorialPlaceholder tone="after" />
                  )}
                </div>
                <figcaption className="absolute left-4 top-4 rounded-full bg-white/72 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/72 backdrop-blur-sm">
                  JÄLKEEN
                </figcaption>
              </figure>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function FeaturedTutorialPlaceholder({ tone }: { tone: "before" | "after" }) {
  return (
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
  );
}
