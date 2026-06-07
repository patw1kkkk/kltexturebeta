"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { products, type Product } from "@/data/products";
import {
  getProductByTutorialHandle,
  getTutorialById,
  tutorialProductCopy,
  type ProductHandle,
  type Tutorial
} from "@/data/tutorials";
import { ShopifyProductCardPurchase } from "@/components/shopify/ShopifyProductCardPurchase";
import { cn } from "@/lib/utils";

type CreatorTutorialId = "fluffy-fringe" | "messy-textured-crop" | "soft-curtains" | "clean-slick-back";

type CreatorLook = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  tutorialId: CreatorTutorialId;
  tutorial: Tutorial;
};

const TUTORIALS_ROUTE = "/kayttoohjeet";

const creatorTutorialIds = [
  "fluffy-fringe",
  "messy-textured-crop",
  "soft-curtains",
  "clean-slick-back"
] as const satisfies readonly CreatorTutorialId[];

const creatorCardMeta: Record<CreatorTutorialId, Omit<CreatorLook, "tutorial" | "tutorialId">> = {
  "fluffy-fringe": {
    id: "creator-02",
    name: "Creator 02",
    image: "/inf2.jpeg",
    imageAlt: "KL Texture creator look 1"
  },
  "messy-textured-crop": {
    id: "creator-03",
    name: "Creator 03",
    image: "/inf3.jpg",
    imageAlt: "KL Texture creator look 2"
  },
  "soft-curtains": {
    id: "creator-04",
    name: "Creator 04",
    image: "/inf4.jpg",
    imageAlt: "KL Texture creator look 3"
  },
  "clean-slick-back": {
    id: "creator-05",
    name: "Creator 05",
    image: "/inf5.webp",
    imageAlt: "KL Texture creator look 4"
  }
};

function requireTutorial(id: CreatorTutorialId) {
  const tutorial = getTutorialById(id);

  if (!tutorial) {
    throw new Error(`Tutorial "${id}" is missing from shared tutorial data.`);
  }

  return tutorial;
}

const creatorLooks: CreatorLook[] = creatorTutorialIds.map((tutorialId) => ({
  ...creatorCardMeta[tutorialId],
  tutorialId,
  tutorial: requireTutorial(tutorialId)
}));

const firstCreatorLook = creatorLooks[0] ?? {
  ...creatorCardMeta["fluffy-fringe"],
  tutorialId: "fluffy-fringe",
  tutorial: requireTutorial("fluffy-fringe")
};

const lastCreatorLook = creatorLooks[creatorLooks.length - 1] ?? {
  ...creatorCardMeta["clean-slick-back"],
  tutorialId: "clean-slick-back",
  tutorial: requireTutorial("clean-slick-back")
};

const decorativeCreatorPreviews: Record<"left" | "right", CreatorLook> = {
  left: {
    ...firstCreatorLook,
    id: "creator-01",
    image: "/inf1.jpeg",
    imageAlt: ""
  },
  right: {
    ...lastCreatorLook,
    id: "creator-06",
    image: "/inf6.jpg",
    imageAlt: ""
  }
};

const allProductSlugs = [
  "salt-spray",
  "texture-spray",
  "texture-wax",
  "volume-powder",
  "hair-glaze",
  "leave-in-conditioner"
];

const CUSTOMER_COUNT_START = 100;
const CUSTOMER_COUNT_TARGET = 800;
const CREATOR_AUTOPLAY_MS = 3800;
const CREATOR_MANUAL_PAUSE_MS = 8000;
const CREATOR_PRODUCT_EXIT_MS = 140;
const CREATOR_PRODUCT_ENTER_MS = 320;
const CREATOR_PRODUCT_STAGGER_MS = 70;

type ProductsTransitionPhase = "idle" | "exiting" | "entering";

function resolveProduct(productId: string) {
  return products.find((product) => product.slug === productId || product.shopifyHandle === productId);
}

function getLookProducts(look: CreatorLook) {
  return look.tutorial.productHandles.map(getProductByTutorialHandle).filter(Boolean) as Product[];
}

function isProductHandle(handle?: string): handle is ProductHandle {
  return Boolean(handle && handle in tutorialProductCopy);
}

function getCreatorProductCopy(product: Product) {
  if (isProductHandle(product.shopifyHandle)) {
    return tutorialProductCopy[product.shopifyHandle];
  }

  return {
    benefit: product.promise,
    displayName: product.name
  };
}

function getTutorialAnchorHref(tutorialId: string) {
  return `${TUTORIALS_ROUTE}#${tutorialId}`;
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function useCustomerCounter(sectionRef: RefObject<HTMLElement | null>) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? CUSTOMER_COUNT_TARGET : CUSTOMER_COUNT_START);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(CUSTOMER_COUNT_TARGET);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let visibilityInterval = 0;

    const startCounter = () => {
      if (startedRef.current) return;

      startedRef.current = true;
      window.clearInterval(visibilityInterval);
      const startTime = performance.now();
      const duration = 1100;
      const startValue = CUSTOMER_COUNT_START;
      const endValue = CUSTOMER_COUNT_TARGET;

      const tick = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(startValue + (endValue - startValue) * eased));

        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);
    };

    const isVisible = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      return rect.top < viewport * 0.85 && rect.bottom > viewport * 0.15;
    };

    const checkVisibility = () => {
      if (isVisible()) {
        startCounter();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startCounter();
      }
    }, { threshold: 0.08 });

    observer.observe(section);
    window.setTimeout(checkVisibility, 0);
    visibilityInterval = window.setInterval(checkVisibility, 120);
    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(visibilityInterval);
      window.removeEventListener("scroll", checkVisibility);
      observer.disconnect();
    };
  }, [reducedMotion, sectionRef]);

  return count;
}

function CreatorCardContent({ look, selected = false }: { look: CreatorLook; selected?: boolean }) {
  return (
    <div className="relative aspect-[3/4]">
      <Image
        src={look.image}
        alt={look.imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 340px, 82vw"
        className="object-cover transition duration-300 ease-premium group-hover:scale-[1.015]"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/72 via-black/18 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-[11px] font-bold uppercase tracking-nav text-white/66">{look.name}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight">{look.tutorial.title}</h3>
      </div>
      {selected ? (
        <span
          aria-label="Valittu creator"
          className="creator-verified-in absolute right-3 top-3 inline-flex size-7 items-center justify-center rounded-full border border-white/70 bg-white text-ink shadow-[0_8px_22px_rgba(0,0,0,0.16)]"
          role="img"
          title="Valittu creator"
        >
          <BadgeCheck className="size-4" aria-hidden="true" strokeWidth={2.2} />
        </span>
      ) : null}
    </div>
  );
}

function CreatorProductCard({ product }: { product: Product }) {
  const productImage = product.images[0];
  const productCopy = getCreatorProductCopy(product);

  return (
    <article className="group rounded-[20px] border border-ink/10 bg-white p-3 transition duration-200 ease-premium hover:border-ink/18 hover:bg-[#f7f4ef] sm:min-h-[142px] sm:p-4">
      <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
        <Link
          aria-label={`Katso tuote ${productCopy.displayName}`}
          className="relative size-[72px] overflow-hidden rounded-[16px] bg-[#ebe3d8] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:size-[88px]"
          href={`/tuotteet/${product.slug}`}
        >
          {productImage ? (
            <Image
              src={productImage}
              alt={`${productCopy.displayName} tuotekuva`}
              fill
              sizes="(min-width: 640px) 88px, 72px"
              className="object-contain p-2.5 transition duration-300 ease-premium group-hover:scale-[1.035]"
            />
          ) : (
            <span
              aria-label={`${productCopy.displayName} tuotekuva ei ole saatavilla`}
              className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-nav text-ink/38"
              role="img"
            >
              KL
            </span>
          )}
        </Link>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                className="block text-base font-semibold leading-tight text-ink transition hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-lg"
                href={`/tuotteet/${product.slug}`}
              >
                {productCopy.displayName}
              </Link>
              <p className="mt-1 text-sm leading-5 text-ink/68">{productCopy.benefit}</p>
            </div>

            <Link
              aria-label="Katso tuote"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[rgba(20,20,20,0.16)] bg-white text-ink transition duration-200 ease-premium hover:border-ink/30 hover:bg-[#f7f4ef] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              href={`/tuotteet/${product.slug}`}
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ShopifyProductCardPurchase layout="creator" product={product} showShopifyCheckoutIcon />
        </div>
      </div>
    </article>
  );
}

function AllProductsSection() {
  const overviewProducts = allProductSlugs.map(resolveProduct).filter(Boolean) as Product[];

  return (
    <div className="mx-auto mt-10 max-w-6xl border-t border-ink/10 pt-8 sm:mt-12 sm:pt-10">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-3xl font-semibold leading-tight text-ink sm:text-5xl">Kaikki tuotteet</h3>
        <p className="mt-2 text-sm leading-6 text-ink/58">
          Voit selata tuotteita tarkemmin myös{" "}
          <Link
            className="underline decoration-ink/30 underline-offset-4 transition hover:text-ink hover:decoration-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            href="/tuotteet"
          >
            täältä
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {overviewProducts.map((product) => (
          <AllProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function AllProductsCard({ product }: { product: Product }) {
  const productImage = product.images[0];

  return (
    <article className="group relative flex h-[235px] flex-col justify-between rounded-[22px] border border-ink/10 bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.035)] transition duration-200 ease-premium hover:border-ink/18 hover:bg-[#fbfaf7] sm:h-[262px] sm:p-4 lg:h-[272px]">
      <Link
        aria-label="Katso tuote"
        className="absolute right-2.5 top-2.5 z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink transition duration-200 ease-premium hover:border-ink/24 hover:bg-[#f7f4ef] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:right-3 sm:top-3"
        href={`/tuotteet/${product.slug}`}
      >
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>

      <div className="text-center">
        <div className="flex justify-center">
          <Link
            aria-label={`Katso tuote ${product.name}`}
            className="relative size-[86px] overflow-hidden rounded-[16px] bg-[#f0ece5] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:size-[112px] lg:size-[122px]"
            href={`/tuotteet/${product.slug}`}
          >
            {productImage ? (
              <Image
                src={productImage}
                alt={`${product.name} tuotekuva`}
                fill
                sizes="(min-width: 1024px) 122px, (min-width: 640px) 112px, 86px"
                className="object-contain p-2.5 transition duration-300 ease-premium group-hover:scale-[1.025] sm:p-3"
              />
            ) : (
              <span
                aria-label={`${product.name} tuotekuva ei ole saatavilla`}
                className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-nav text-ink/38"
                role="img"
              >
                KL
              </span>
            )}
          </Link>
        </div>

        <Link
          className="mx-auto mt-3 line-clamp-2 block max-w-[12rem] text-center text-sm font-semibold leading-tight text-ink transition hover:text-black focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-base"
          href={`/tuotteet/${product.slug}`}
        >
          {product.name}
        </Link>
      </div>

      <ShopifyProductCardPurchase buttonLabel="LISÄÄ OSTOSKORIIN" layout="community" product={product} />
    </article>
  );
}

export function CreatorResults() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [railHovered, setRailHovered] = useState(false);
  const [railFocused, setRailFocused] = useState(false);
  const [detailsHovered, setDetailsHovered] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [isDesktopCarousel, setIsDesktopCarousel] = useState(false);
  const [manualPauseUntil, setManualPauseUntil] = useState(0);
  const [displayedCreatorIndex, setDisplayedCreatorIndex] = useState(activeIndex);
  const [productsTransitionPhase, setProductsTransitionPhase] = useState<ProductsTransitionPhase>("idle");
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileScrollTimeoutRef = useRef<number | null>(null);
  const mobileScrollFrameRef = useRef<number | null>(null);
  const productTransitionTimersRef = useRef<number[]>([]);
  const displayedCreatorIndexRef = useRef(displayedCreatorIndex);
  const activeIndexRef = useRef(activeIndex);
  const customerCount = useCustomerCounter(sectionRef);
  const reducedMotion = usePrefersReducedMotion();
  const selectedLook = creatorLooks[activeIndex] ?? creatorLooks[0];
  const displayedLook = creatorLooks[displayedCreatorIndex] ?? creatorLooks[0];
  const displayedProducts = useMemo(() => getLookProducts(displayedLook), [displayedLook]);
  const selectedDescription =
    selectedLook.tutorial.carouselDescription ?? selectedLook.tutorial.previewDescription ?? selectedLook.tutorial.description;
  const manuallyPaused = manualPauseUntil > 0;
  const autoplayPaused = !isDesktopCarousel || reducedMotion || !documentVisible || railHovered || railFocused || detailsHovered || manuallyPaused;

  const clearProductTransitionTimers = useCallback(() => {
    productTransitionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    productTransitionTimersRef.current = [];
  }, []);

  const pauseAfterManualInteraction = useCallback(() => {
    setManualPauseUntil(Date.now() + CREATOR_MANUAL_PAUSE_MS);
  }, []);

  const centerMobileCardInRail = useCallback(
    (index: number) => {
      const rail = mobileRailRef.current;
      const selectedCard = mobileCardRefs.current[index];
      if (!rail || !selectedCard || isDesktopCarousel) return;

      rail.scrollTo({
        behavior: reducedMotion ? "auto" : "smooth",
        left: selectedCard.offsetLeft - (rail.clientWidth - selectedCard.offsetWidth) / 2
      });
    },
    [isDesktopCarousel, reducedMotion]
  );

  const selectLook = useCallback(
    (index: number, manual = false, centerOnMobile = false) => {
      setActiveIndex(index);

      if (manual) {
        pauseAfterManualInteraction();
      }

      if (centerOnMobile) {
        window.requestAnimationFrame(() => centerMobileCardInRail(index));
      }
    },
    [centerMobileCardInRail, pauseAfterManualInteraction]
  );

  const syncActiveIndexFromMobileRail = useCallback(() => {
    const rail = mobileRailRef.current;
    if (!rail || isDesktopCarousel) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = activeIndexRef.current;
    let closestDistance = Infinity;

    mobileCardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      setActiveIndex(closestIndex);
    }
  }, [isDesktopCarousel]);

  const queueMobileRailSync = useCallback(() => {
    if (isDesktopCarousel) return;

    if (mobileScrollTimeoutRef.current) {
      window.clearTimeout(mobileScrollTimeoutRef.current);
    }

    mobileScrollTimeoutRef.current = window.setTimeout(() => {
      if (mobileScrollFrameRef.current) {
        window.cancelAnimationFrame(mobileScrollFrameRef.current);
      }

      mobileScrollFrameRef.current = window.requestAnimationFrame(syncActiveIndexFromMobileRail);
    }, 120);
  }, [isDesktopCarousel, syncActiveIndexFromMobileRail]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    displayedCreatorIndexRef.current = displayedCreatorIndex;
  }, [displayedCreatorIndex]);

  useEffect(() => {
    clearProductTransitionTimers();

    if (reducedMotion) {
      displayedCreatorIndexRef.current = activeIndex;
      setDisplayedCreatorIndex(activeIndex);
      setProductsTransitionPhase("idle");
      return undefined;
    }

    if (activeIndex === displayedCreatorIndexRef.current) {
      setProductsTransitionPhase("idle");
      return undefined;
    }

    setProductsTransitionPhase("exiting");

    const exitTimer = window.setTimeout(() => {
      displayedCreatorIndexRef.current = activeIndex;
      setDisplayedCreatorIndex(activeIndex);
      setProductsTransitionPhase("entering");

      const enterTimer = window.setTimeout(() => {
        setProductsTransitionPhase("idle");
        productTransitionTimersRef.current = productTransitionTimersRef.current.filter((timer) => timer !== enterTimer);
      }, CREATOR_PRODUCT_ENTER_MS + CREATOR_PRODUCT_STAGGER_MS + 40);

      productTransitionTimersRef.current.push(enterTimer);
      productTransitionTimersRef.current = productTransitionTimersRef.current.filter((timer) => timer !== exitTimer);
    }, CREATOR_PRODUCT_EXIT_MS);

    productTransitionTimersRef.current = [exitTimer];

    return clearProductTransitionTimers;
  }, [activeIndex, clearProductTransitionTimers, reducedMotion]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateBreakpoint = () => setIsDesktopCarousel(media.matches);

    updateBreakpoint();
    media.addEventListener("change", updateBreakpoint);
    return () => media.removeEventListener("change", updateBreakpoint);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!manualPauseUntil) return;

    const timeout = window.setTimeout(() => {
      setManualPauseUntil(0);
    }, Math.max(0, manualPauseUntil - Date.now()));

    return () => window.clearTimeout(timeout);
  }, [manualPauseUntil]);

  useEffect(() => {
    if (autoplayPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % creatorLooks.length);
    }, CREATOR_AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [autoplayPaused]);

  useEffect(() => {
    return () => {
      if (mobileScrollTimeoutRef.current) {
        window.clearTimeout(mobileScrollTimeoutRef.current);
      }

      if (mobileScrollFrameRef.current) {
        window.cancelAnimationFrame(mobileScrollFrameRef.current);
      }

      clearProductTransitionTimers();
    };
  }, [clearProductTransitionTimers]);

  return (
    <section
      className="overflow-hidden bg-white px-4 py-16 sm:px-8 lg:py-24"
      id="creator-results"
      onBlur={(event) => {
        const nextFocus = event.relatedTarget;
        if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
          setRailFocused(false);
        }
      }}
      onFocus={() => setRailFocused(true)}
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            aria-label={`Yli ${CUSTOMER_COUNT_TARGET}+ tyytyväistä asiakasta`}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-3xl font-semibold leading-tight text-ink sm:text-5xl lg:flex-nowrap"
          >
            <span className="whitespace-nowrap">Yli</span>
            <span className="inline-block min-w-[3ch] whitespace-nowrap tabular-nums">{customerCount}+</span>
            <span className="whitespace-nowrap">tyytyväistä</span>
            <span className="whitespace-nowrap">asiakasta</span>
          </h2>
        </div>

        <div
          className="relative mt-9 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] sm:mt-10 lg:py-2"
          onFocus={() => setRailFocused(true)}
          onBlur={(event) => {
            const nextFocus = event.relatedTarget;
            if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
              setRailFocused(false);
            }
          }}
          onMouseEnter={() => setRailHovered(true)}
          onMouseLeave={() => setRailHovered(false)}
          onMouseMove={() => setRailHovered(true)}
          onPointerDown={pauseAfterManualInteraction}
          onPointerEnter={() => setRailHovered(true)}
          onPointerLeave={() => setRailHovered(false)}
          onPointerMove={() => setRailHovered(true)}
        >
          <div
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-2 touch-pan-x no-scrollbar sm:gap-4 lg:hidden"
            onScroll={queueMobileRailSync}
            ref={mobileRailRef}
          >
            {creatorLooks.map((look, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    "group relative min-w-[82vw] snap-center snap-always overflow-hidden rounded-[22px] border bg-ink text-left transition-[border-color,box-shadow,opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:min-w-[340px]",
                    selected
                      ? "scale-[1.01] border-ink opacity-100 shadow-[inset_0_0_0_3px_#111111,0_0_0_3px_#111111]"
                      : "scale-100 border-ink/10 opacity-72 hover:opacity-95"
                  )}
                  data-creator-card="interactive"
                  key={look.id}
                  onClick={() => selectLook(index, true, true)}
                  ref={(node) => {
                    mobileCardRefs.current[index] = node;
                  }}
                  type="button"
                >
                  <CreatorCardContent look={look} selected={selected} />
                </button>
              );
            })}
          </div>

          <div className="hidden gap-4 lg:flex lg:w-[calc(100%+14rem)] lg:-translate-x-28">
            <div
              aria-hidden="true"
              className="group pointer-events-none relative shrink-0 basis-[calc((100%_-_5rem)/6)] overflow-hidden rounded-[22px] border border-ink/10 bg-ink opacity-40"
              data-creator-card="decorative"
            >
              <CreatorCardContent look={decorativeCreatorPreviews.left} />
            </div>

            {creatorLooks.map((look, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    "group relative shrink-0 basis-[calc((100%_-_5rem)/6)] overflow-hidden rounded-[22px] border bg-ink text-left transition-[border-color,box-shadow,opacity,transform] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                    selected
                      ? "scale-[1.01] border-ink opacity-100 shadow-[inset_0_0_0_3px_#111111,0_0_0_3px_#111111]"
                      : "scale-100 border-ink/10 opacity-82 hover:opacity-95"
                  )}
                  data-creator-card="interactive"
                  key={look.id}
                  onClick={() => selectLook(index, true)}
                  type="button"
                >
                  <CreatorCardContent look={look} selected={selected} />
                </button>
              );
            })}

            <div
              aria-hidden="true"
              className="group pointer-events-none relative shrink-0 basis-[calc((100%_-_5rem)/6)] overflow-hidden rounded-[22px] border border-ink/10 bg-ink opacity-40"
              data-creator-card="decorative"
            >
              <CreatorCardContent look={decorativeCreatorPreviews.right} />
            </div>
          </div>
        </div>

        <div
          aria-label="Creator-valinta"
          className="mt-4"
          style={{ alignItems: "center", display: "flex", gap: "8px", justifyContent: "center" }}
        >
          {creatorLooks.map((look, index) => {
            const selected = index === activeIndex;

            return (
              <button
                aria-current={selected ? "true" : undefined}
                aria-label={`Näytä creator ${index + 1}`}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border transition-[background-color,border-color,opacity,transform] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
                  selected ? "scale-[1.08] border-ink bg-ink" : "scale-100 border-ink/35 bg-transparent hover:border-ink/60"
                )}
                data-creator-dot="true"
                key={look.id}
                onClick={() => selectLook(index, true, true)}
                style={{ height: "10px", width: "10px" }}
                type="button"
              />
            );
          })}
        </div>

        <div
          className="quiz-step-enter mt-7 rounded-[24px] border border-white/10 bg-[#050505] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.16)] transition duration-200 ease-premium sm:p-5 lg:p-6"
          onMouseEnter={() => setDetailsHovered(true)}
          onMouseLeave={() => setDetailsHovered(false)}
          onMouseMove={() => setDetailsHovered(true)}
          onPointerEnter={() => setDetailsHovered(true)}
          onPointerLeave={() => setDetailsHovered(false)}
          onPointerMove={() => setDetailsHovered(true)}
        >
          <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div className="creator-content-in" key={`${selectedLook.id}-details`}>
              <p className="text-xs font-bold uppercase tracking-nav text-[rgba(255,255,255,0.58)]">{selectedLook.name}</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {selectedLook.tutorial.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[rgba(255,255,255,0.76)]">{selectedDescription}</p>
              <Link
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-nav text-white transition hover:gap-3 hover:text-white/76 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={getTutorialAnchorHref(selectedLook.tutorial.id)}
              >
                KATSO TUTORIAALI
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div
              className={cn(
                "grid gap-3",
                productsTransitionPhase === "exiting"
                  ? "creator-products-exiting"
                  : productsTransitionPhase === "entering"
                    ? "creator-products-entering"
                    : "creator-products-idle"
              )}
              key={`creator-products-${displayedLook.id}`}
            >
              {displayedProducts.map((product, index) => (
                <div
                  className="creator-product-card"
                  key={`${displayedLook.id}-${product.shopifyHandle ?? product.slug}`}
                  style={{ animationDelay: `${index * CREATOR_PRODUCT_STAGGER_MS}ms` }}
                >
                  <CreatorProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <AllProductsSection />
      </div>
    </section>
  );
}
