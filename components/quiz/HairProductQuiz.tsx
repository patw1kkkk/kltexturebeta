"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { products, type Product } from "@/data/products";
import type {
  DesiredResultAnswer,
  FinishAnswer,
  HairShapeAnswer,
  HairTypeAnswer,
  QuizAnswers
} from "@/lib/recommendations";
import { getProductRecommendations } from "@/lib/recommendations";
import { getRecommendationReason } from "@/lib/recommendationReason";
import { ShopifyProductCardPurchase } from "@/components/shopify/ShopifyProductCardPurchase";
import { cn } from "@/lib/utils";

type StepId = keyof QuizAnswers;

type QuizOption<T extends string> = {
  label: string;
  value: T;
};

type QuizStep<T extends string> = {
  id: StepId;
  categoryLabel: string;
  question: string;
  options: QuizOption<T>[];
};

const steps: QuizStep<string>[] = [
  {
    id: "hairType",
    categoryLabel: "HIUSTYYPPI",
    question: "Millaiset hiuksesi ovat?",
    options: [
      { label: "Ohut tai helposti latistuva", value: "fine-flat" satisfies HairTypeAnswer },
      { label: "Normaali", value: "normal" satisfies HairTypeAnswer },
      { label: "Paksu tai vaikeasti hallittava", value: "thick-unruly" satisfies HairTypeAnswer },
      { label: "Kuiva, pörröinen tai käsitelty", value: "dry-frizzy-treated" satisfies HairTypeAnswer }
    ]
  },
  {
    id: "hairShape",
    categoryLabel: "HIUSTEN MUOTO",
    question: "Mikä kuvaa hiuksiasi parhaiten?",
    options: [
      { label: "Suorat", value: "straight" satisfies HairShapeAnswer },
      { label: "Laineikkaat", value: "wavy" satisfies HairShapeAnswer },
      { label: "Kiharat", value: "curly" satisfies HairShapeAnswer }
    ]
  },
  {
    id: "desiredResult",
    categoryLabel: "TAVOITE",
    question: "Minkä lopputuloksen haluat?",
    options: [
      { label: "Lisää volyymia", value: "volume" satisfies DesiredResultAnswer },
      { label: "Rento ja teksturoitu look", value: "texture" satisfies DesiredResultAnswer },
      { label: "Kiiltävä ja siisti viimeistely", value: "shine" satisfies DesiredResultAnswer },
      { label: "Vahva pito ja hallinta", value: "hold" satisfies DesiredResultAnswer },
      { label: "Pehmeämmät ja kosteutetummat hiukset", value: "moisture" satisfies DesiredResultAnswer }
    ]
  },
  {
    id: "finish",
    categoryLabel: "VIIMEISTELY",
    question: "Millaisen viimeistelyn haluat?",
    options: [
      { label: "Matta", value: "matte" satisfies FinishAnswer },
      { label: "Luonnollinen", value: "natural" satisfies FinishAnswer },
      { label: "Kiiltävä", value: "shiny" satisfies FinishAnswer },
      { label: "En osaa sanoa", value: "unsure" satisfies FinishAnswer }
    ]
  }
];

const initialAnswers: Partial<QuizAnswers> = {};

type RecommendationResult = ReturnType<typeof getProductRecommendations>[number];

function isComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return Boolean(answers.hairType && answers.hairShape && answers.desiredResult && answers.finish);
}

type HairProductQuizProps = {
  cardHeader?: {
    heading: string;
    label?: string;
    supportingText: string;
  };
  initiallyCollapsed?: boolean;
  showIntro?: boolean;
  variant?: "compact" | "immersive";
};

export function HairProductQuiz({
  cardHeader,
  initiallyCollapsed = false,
  showIntro = true,
  variant = "compact"
}: HairProductQuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(initialAnswers);
  const [expanded, setExpanded] = useState(!initiallyCollapsed);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "stored" | "not-stored" | "error">("idle");
  const [message, setMessage] = useState("");

  const currentStep = steps[stepIndex];
  const completed = isComplete(answers);
  const recommendations = useMemo(() => (completed ? getProductRecommendations(products, answers) : []), [answers, completed]);
  const immersive = variant === "immersive";
  const topRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1, 3);
  const topRecommendationReason = completed && topRecommendation ? getRecommendationReason(answers, topRecommendation.product) : "";
  const normalizedEmail = email.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  const selectOption = (value: string) => {
    setAnswers((current) => ({ ...current, [currentStep.id]: value }));
    setStatus("idle");
    setMessage("");

    if (stepIndex < steps.length - 1) {
      window.setTimeout(() => setStepIndex((current) => current + 1), 120);
    }
  };

  const resetQuiz = () => {
    setAnswers(initialAnswers);
    setStepIndex(0);
    setResultsVisible(false);
    setEmail("");
    setHoneypot("");
    setStatus("idle");
    setMessage("");
  };

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid) {
      setStatus("error");
      setMessage("Kirjoita toimiva sähköpostiosoite.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          marketingConsent: false,
          topRecommendationHandle: recommendations[0]?.product.shopifyHandle,
          website: honeypot
        })
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus("not-stored");
        setMessage(data?.message || "Sähköpostin tallennus ei juuri nyt onnistunut.");
        setResultsVisible(true);
        return;
      }

      setStatus("stored");
      setMessage(data?.message || "Sähköpostiosoite tallennettiin.");
      setResultsVisible(true);
    } catch {
      setStatus("not-stored");
      setMessage("Sähköpostin tallennus ei juuri nyt onnistunut.");
      setResultsVisible(true);
    }
  };

  const skipEmail = () => {
    setEmail("");
    setHoneypot("");
    setStatus("idle");
    setMessage("");
    setResultsVisible(true);
  };

  if (!expanded) {
    return (
      <div className="rounded-[22px] border border-ink/10 bg-[#f7f3ec] p-5 shadow-[0_18px_50px_rgba(31,27,24,0.07)]">
        {showIntro ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-nav text-ink/45">TUOTESUOSITTELIJA</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">Löydä sinulle sopiva tuote.</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">Neljä nopeaa kysymystä. Tulokset heti.</p>
          </>
        ) : null}
        <button
          className={cn(
            "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-ink px-5 text-sm font-semibold uppercase tracking-nav text-white transition duration-300 ease-premium hover:bg-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            showIntro ? "mt-5" : ""
          )}
          onClick={() => setExpanded(true)}
          type="button"
        >
          Aloita testi
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden border text-ink",
        immersive
          ? "rounded-[32px] border-[rgba(255,255,255,0.18)] bg-[#f6f1ea] shadow-[0_24px_70px_rgba(0,0,0,0.20)]"
          : "rounded-[26px] border-ink/10 bg-[#f7f3ec] shadow-[0_18px_60px_rgba(31,27,24,0.06)]",
        immersive ? "p-5 sm:p-6 lg:p-7" : "p-4 sm:p-5"
      )}
    >
      {cardHeader ? (
        <div className="mb-4 sm:mb-5">
          {cardHeader.label ? (
            <span className="mb-3 inline-flex rounded-full bg-[#111] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-nav text-white">
              {cardHeader.label}
            </span>
          ) : null}
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl">{cardHeader.heading}</h2>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {steps.map((step, index) => {
          const active = !completed && index === stepIndex;
          const complete = completed || index < stepIndex;

          return (
            <span
              className={cn(
                "h-1.5 rounded-full transition duration-300 ease-premium",
                active || complete ? "bg-[#111111]" : "bg-[rgba(20,20,20,0.16)]"
              )}
              key={step.id}
            />
          );
        })}
      </div>

      {!completed ? (
        <div className="mt-6 quiz-step-enter" aria-live="polite" key={currentStep.id}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-nav text-ink">
              {String(stepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
            <p className="text-right text-xs font-bold uppercase tracking-nav text-ink">{currentStep.categoryLabel}</p>
          </div>
          <h3 className={cn("mt-5 font-semibold leading-tight text-ink", immersive ? "text-2xl sm:text-4xl" : "text-2xl")}>
            {currentStep.question}
          </h3>
          <div className={cn("mt-5 grid gap-3", immersive ? "sm:grid-cols-2" : "")} role="group" aria-label={currentStep.question}>
            {currentStep.options.map((option) => {
              const selected = answers[currentStep.id] === option.value;

              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    "flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold leading-5 transition duration-300 ease-premium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base sm:leading-6",
                    selected
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white/70 text-ink hover:border-ink/35 hover:bg-white"
                  )}
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  type="button"
                >
                  <span>{option.label}</span>
                  {selected ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <button
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-nav text-ink/60 transition hover:text-ink disabled:opacity-30"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
              type="button"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Takaisin
            </button>
            {cardHeader?.supportingText ? (
              <p className="text-right text-xs font-semibold uppercase tracking-nav text-ink/60">
                {cardHeader.supportingText}
              </p>
            ) : null}
          </div>
        </div>
      ) : !resultsVisible ? (
        <form className="mt-6 quiz-step-enter" onSubmit={submitEmail}>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-nav text-ink/45">SUOSITUKSET</p>
            <h3 className={cn("mt-3 font-semibold leading-tight text-ink", immersive ? "text-2xl sm:text-4xl" : "text-2xl")}>
              Lähetetäänkö suositukset ja alekoodi sähköpostiisi?
            </h3>
            <p className="mt-4 text-sm leading-7 text-ink">
              Saat suosituksesi ja -10 % alekoodin ensimmäiseen tilaukseesi.
            </p>
          </div>

          <div className="mt-5">
            <label className="sr-only" htmlFor="hair-quiz-email">
              Sähköpostiosoite
            </label>
            <input
              aria-describedby={message ? "hair-quiz-email-message" : undefined}
              aria-invalid={status === "error"}
              autoComplete="email"
              className="h-12 w-full rounded-2xl border border-ink/12 bg-white px-4 text-base text-ink outline-none transition focus:border-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              id="hair-quiz-email"
              inputMode="email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setStatus("idle");
                setMessage("");
              }}
              placeholder="Sähköpostiosoite"
              required
              type="email"
              value={email}
            />
            <input
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
              name="website"
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              type="text"
              value={honeypot}
            />
          </div>

          <div className="mt-5 grid gap-3">
            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 text-sm font-semibold uppercase tracking-nav text-white transition duration-300 ease-premium hover:bg-black disabled:cursor-not-allowed disabled:bg-ink/25 disabled:text-ink/45"
              disabled={!emailIsValid || status === "submitting"}
              type="submit"
            >
              {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Näytä suositukset
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center text-xs font-semibold uppercase tracking-nav text-ink/55 transition hover:text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              onClick={skipEmail}
              type="button"
            >
              Ei kiitos
            </button>
          </div>

          {message ? (
            <p
              aria-live="polite"
              className={cn("mt-3 text-sm", status === "error" ? "text-red-700" : "text-ink/60")}
              id="hair-quiz-email-message"
            >
              {message}
            </p>
          ) : null}
        </form>
      ) : (
        <div className="mt-6 quiz-step-enter" aria-live="polite">
          {message && status === "not-stored" ? (
            <p className="mb-4 border-l border-ink/15 pl-4 text-sm leading-6 text-ink/60">{message}</p>
          ) : null}
          <p className="text-xs font-bold uppercase tracking-nav text-ink/45">SINUN SUOSITUKSESI</p>
          <h3 className={cn("mt-3 font-semibold leading-tight text-ink", immersive ? "text-2xl sm:text-4xl" : "text-2xl")}>
            Sinulle sopivin tuote
          </h3>
          {topRecommendation ? (
            <MainProductRecommendationCard
              explanation={topRecommendationReason}
              result={topRecommendation}
            />
          ) : null}

          <p className="mt-6 text-sm font-semibold text-ink">Muita sinulle sopivia tuotteita</p>
          <div className={cn("mt-3 grid gap-3", immersive ? "lg:grid-cols-2" : "")}>
            {secondaryRecommendations.map((result) => (
              <RecommendationCard key={result.product.id} result={result} immersive={immersive} />
            ))}
          </div>

          <button
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-nav text-ink/55 transition hover:text-ink"
            onClick={resetQuiz}
            type="button"
          >
            Tee testi uudelleen
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

function MainProductRecommendationCard({
  explanation,
  result,
}: {
  explanation: string;
  result: RecommendationResult;
}) {
  const { product } = result;

  return (
    <article className="mt-4 overflow-hidden rounded-[22px] border border-ink/10 bg-white">
      <div className="grid gap-0 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch">
        <Link className="relative aspect-[4/3] overflow-hidden bg-fog lg:aspect-auto" href={`/tuotteet/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 340px, 100vw"
            className="object-contain p-5"
          />
        </Link>
        <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-nav text-ink/45">
                {product.recommendationProfile.primaryUse}
              </p>
              <Link className="mt-2 block text-3xl font-semibold leading-tight text-ink" href={`/tuotteet/${product.slug}`}>
                {product.name}
              </Link>
            </div>
            <span aria-label="100 % yhteensopiva" className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-nav text-white">
              100 % YHTEENSOPIVA
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-ink">{explanation}</p>
          <ShopifyProductCardPurchase product={product} />
          <Link
            className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold uppercase tracking-nav text-ink/55 transition hover:gap-3 hover:text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            href={`/tuotteet/${product.slug}`}
          >
            Katso tuote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function RecommendationCard({ result, immersive = false }: { result: RecommendationResult; immersive?: boolean }) {
  const { product } = result;

  return (
    <article className={cn("rounded-[18px] border border-ink/10 bg-white p-3", immersive ? "sm:p-4" : "")}>
      <div className="grid grid-cols-[72px_1fr] gap-3">
        <Link className="relative aspect-[4/5] overflow-hidden rounded-xl bg-fog" href={`/tuotteet/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="72px"
            className="object-contain p-2"
          />
        </Link>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-nav text-ink/45">
                {product.recommendationProfile.primaryUse}
              </p>
              <Link
                className={cn("mt-1 block font-semibold leading-tight text-ink", immersive ? "text-lg" : "text-base")}
                href={`/tuotteet/${product.slug}`}
              >
                {product.name}
              </Link>
            </div>
            <span className="shrink-0 rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-nav text-ink">
              {result.matchPercent} %
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-ink/60">
            {product.recommendationProfile.recommendationText}
          </p>
          <Link
            className="mt-3 inline-flex text-xs font-semibold uppercase tracking-nav text-ink/55 transition hover:text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            href={`/tuotteet/${product.slug}`}
          >
            Katso tuote
          </Link>
        </div>
      </div>
      <ShopifyProductCardPurchase product={product} />
    </article>
  );
}
