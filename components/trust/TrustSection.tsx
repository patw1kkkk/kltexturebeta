"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { FaqSection } from "@/components/faq/FaqSection";

export type TrustReview = {
  quote: string;
  name: string;
  product: string;
};

type TrustSectionProps = {
  reviews: TrustReview[];
};

const reviewPhotoPaths = [
  "/images/reviews/review-01.jpg",
  "/images/reviews/review-02.jpg",
  "/images/reviews/review-03.jpg",
  "/images/reviews/review-04.jpg"
];

export function TrustSection({ reviews }: TrustSectionProps) {
  return (
    <section className="bg-white px-4 py-14 sm:px-8 lg:py-20" aria-labelledby="trust-section-title">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-nav text-ink/45">PALAUTTEET JA KYSYMYKSET</p>
          <h2 id="trust-section-title" className="mt-3 text-4xl font-semibold leading-[1.02] text-ink sm:text-5xl">
            Luottamus syntyy kokemuksesta.
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink/62 sm:text-base">
            Katso, mitä asiakkaat sanovat ja löydä vastaukset yleisimpiin kysymyksiin.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {reviews.map((review, index) => (
            <article
              className="flex h-full min-h-[260px] flex-col justify-between rounded-[22px] border border-ink/10 bg-[#f4f1ec] p-5 text-ink transition duration-200 ease-premium hover:border-ink/18 sm:min-h-[280px] lg:min-h-[320px]"
              key={review.name}
            >
              <div>
                <div className="flex gap-1 text-ink" aria-label="5 tähteä">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star className="size-4 fill-current" key={starIndex} aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-7 text-base leading-7 text-ink">
                  "{review.quote}"
                </p>
              </div>
              <footer className="mt-7 flex items-end justify-between gap-3 border-t border-ink/10 pt-4 text-sm">
                <div className="min-w-0">
                  <span className="block font-semibold text-ink">{review.name}</span>
                  <span className="mt-1 block truncate text-ink/52">{review.product}</span>
                </div>
                <ReviewPhoto src={reviewPhotoPaths[index]} />
              </footer>
            </article>
          ))}
        </div>

        <div className="my-9 h-px bg-ink/10 sm:my-10 lg:my-12" aria-hidden="true" />

        <div className="mx-auto max-w-5xl">
          <FaqSection embedded />
        </div>
      </div>
    </section>
  );
}

function ReviewPhoto({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const alt = "Asiakkaan kuva KL Texture -tuotteista";

  return (
    <div
      className="relative size-12 shrink-0 overflow-hidden rounded-[12px] border border-ink/10 bg-[#eee8df] sm:size-14"
    >
      {loaded && !failed ? null : (
        <div
          aria-label={alt}
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(20,20,20,0.08))] opacity-100"
          role="img"
        />
      )}
      {src && !failed ? (
        <img
          alt={alt}
          aria-hidden={!loaded}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onError={() => {
            setFailed(true);
            setLoaded(false);
          }}
          onLoad={() => setLoaded(true)}
          src={src}
        />
      ) : null}
    </div>
  );
}
