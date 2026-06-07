"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import { HairProductQuiz } from "@/components/quiz/HairProductQuiz";
import { cn } from "@/lib/utils";

type StoryStage = {
  label: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
};

const storyStages: StoryStage[] = [
  {
    label: "01 · PARTURITUOLISSA",
    title: "Ongelma näkyi joka päivä.",
    copy: "Asiakkaat halusivat parempia tuloksia ilman turhaa säätöä.",
    image: "/tyokalut.avif",
    imageAlt: "Parturin työvälineitä KL Texture -tarinaosiossa"
  },
  {
    label: "02 · TESTAUS",
    title: "Sadat tuotteet testissä.",
    copy: "Jäljelle jäi vain se, mikä oikeasti toimii.",
    image: "/kosti-istuu.avif",
    imageAlt: "Kosti Lehtonen parturituolissa"
  }
];

const timelineNodePositions = [0, 34, 68] as const;
const firstTimelineNodeThreshold = 0.01;
const mobileNodeCenterOffset = 12;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const getTimelineNodeThreshold = (index: number, threshold: number) => (index === 0 ? firstTimelineNodeThreshold : threshold);

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

export function StoryTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileRailProgressRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveStage(Number(visible.target.dataset.storyStage || 0));
        }
      },
      { rootMargin: "-36% 0px -42% 0px", threshold: [0.2, 0.4, 0.65] }
    );

    const stages = Array.from(section.querySelectorAll<HTMLElement>("[data-story-stage]"));
    stages.forEach((stage) => observer.observe(stage));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.7;
      const end = Math.max(1, rect.height - viewport * 0.35);
      const nextProgress = clamp((start - rect.top) / end);
      if (mobileRailProgressRef.current) {
        mobileRailProgressRef.current.style.transform = `translateX(-50%) scaleY(${nextProgress})`;
      }
      setScrollProgress(nextProgress);
    };

    let frame = 0;
    let ticking = false;
    const schedule = () => {
      if (ticking) return;

      ticking = true;
      frame = window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const selectStage = (index: number) => {
    setActiveStage(index);
    const targets = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>(`[data-story-stage="${index}"]`) ?? []);
    const target = targets.find((stage) => stage.getClientRects().length > 0);

    target?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
      inline: "center"
    });
  };

  return (
    <section
      className="bg-[#050505] px-4 py-16 text-white sm:px-8 lg:py-20"
      id="tarina-home"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-white/10 pb-7">
          <h2 className="max-w-3xl text-left text-3xl font-semibold leading-[1.04] text-white sm:text-5xl">
            Mistä KL Texture sai alkunsa?
          </h2>
          <p className="mt-3 max-w-xl text-left text-sm leading-6 text-white/58 sm:text-base">
            Ei turhaa valikoimaa. Jokaisella tuotteella on selkeä tehtävä.
          </p>
        </div>

        <MobileTimeline activeStage={activeStage} onSelect={selectStage} progress={scrollProgress} railProgressRef={mobileRailProgressRef} />
        <DesktopTimeline activeStage={activeStage} onSelect={selectStage} rowProgress={clamp(scrollProgress * 2.15)} />
        <HelsinginSanomatFeature />
        <div className="mb-3 mt-12 w-full scroll-mt-24 sm:mb-5 sm:mt-14 lg:mb-6 lg:mt-16" id="hair-type-test">
          <span className="sr-only" id="tuotesuosittelija" aria-hidden="true" />
          <div className="mb-6 h-px w-full bg-white/15" aria-hidden="true" />
          <div className="mb-5 max-w-2xl text-left sm:mb-6">
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Mikä sopii juuri sinun hiuksillesi?
            </h2>
          </div>
          <HairProductQuiz
            cardHeader={{
              heading: "Hair Type Test",
              label: "PERSONOITU SUOSITUS",
              supportingText: "Ansaitse kyselyllä 10% etukoodi"
            }}
            showIntro={false}
            variant="immersive"
          />
        </div>
      </div>
    </section>
  );
}

function HelsinginSanomatFeature() {
  return (
    <article className="mt-10 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] p-3 sm:mt-12 sm:p-4 lg:mt-14 lg:p-5">
      <div className="grid gap-6 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-9">
        <figure className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0d0d0d]">
          <div className="relative aspect-[3/2]">
            <Image
              src="/artikkelikuva.png"
              alt="Helsingin Sanomien feature-juttu Kosti Lehtosen parturimatkasta"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="px-1 pb-2 sm:px-2 lg:px-0 lg:py-4">
          <p className="text-[11px] font-bold uppercase tracking-nav text-white/42">ESILLÄ HELSINGIN SANOMISSA</p>
          <h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Parturista tuotekehittäjäksi.
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
            Helsingin Sanomien feature-jutussa kerrotaan Kosti Lehtosen matkasta autotalliparturista oman hiustuotesarjan
            kehittäjäksi.
          </p>
          <a
            className="mt-6 inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-nav text-white transition hover:text-white/72 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="https://www.hs.fi/feature/art-2000011750703.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Lue artikkeli →
          </a>
        </div>
      </div>
    </article>
  );
}

function DesktopTimeline({
  activeStage,
  onSelect,
  rowProgress
}: {
  activeStage: number;
  onSelect: (index: number) => void;
  rowProgress: number;
}) {
  return (
    <div className="mt-10 hidden lg:block">
      <TimelineRow activeStage={activeStage} lineProgress={rowProgress} onSelect={onSelect}>
        <TimelineStage activeStage={activeStage} index={0} stage={storyStages[0]} />
        <TimelineStage activeStage={activeStage} index={1} stage={storyStages[1]} />
        <MediaInsert active={activeStage === 2} index={2} reserveTop={false} />
      </TimelineRow>
    </div>
  );
}

function TimelineRow({
  activeStage,
  children,
  lineProgress,
  onSelect
}: {
  activeStage: number;
  children: ReactNode;
  lineProgress: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative pt-9">
      <div className="absolute inset-x-0 top-0 h-6" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/[0.16]" />
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/[0.88] transition-[width] duration-300 ease-premium motion-reduce:transition-none"
          style={{ width: `${lineProgress * 100}%` }}
        />
        {timelineNodePositions.map((position, index) => (
          <span
            className={cn(
              "absolute top-1/2 h-7 w-px -translate-x-1/2 translate-y-3 bg-white/18",
              activeStage === index ? "bg-white/34" : ""
            )}
            key={`desktop-connector-${index}`}
            style={{ left: `${position}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 h-6">
        {timelineNodePositions.map((position, index) => (
          <TimelineNode
            active={activeStage === index}
            ariaLabel={index === 2 ? "Valitse media" : `Valitse vaihe ${index + 1}`}
            index={index}
            key={`desktop-node-${index}`}
            onSelect={onSelect}
            reached={lineProgress >= getTimelineNodeThreshold(index, position / 100)}
            style={{ left: `${position}%`, top: "50%" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-7">{children}</div>
    </div>
  );
}

function TimelineStage({
  activeStage,
  index,
  stage
}: {
  activeStage: number;
  index: number;
  stage: StoryStage;
}) {
  const active = activeStage === index;
  const nearby = Math.abs(activeStage - index) <= 1;

  return (
    <article
      className={cn(
        "group relative transition duration-500 ease-premium motion-reduce:translate-y-0 motion-reduce:transition-none",
        active ? "translate-y-0 opacity-100" : nearby ? "translate-y-1 opacity-82" : "translate-y-2 opacity-70"
      )}
      data-story-stage={index}
    >
      <StageCopy active={active} stage={stage} />
      <TimelineVisual active={active} stage={stage} />
    </article>
  );
}

function TimelineNode({
  active,
  ariaLabel,
  index,
  onSelect,
  reached,
  style
}: {
  active: boolean;
  ariaLabel: string;
  index: number;
  onSelect: (index: number) => void;
  reached: boolean;
  style: CSSProperties;
}) {
  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={active}
      className={cn(
        "timeline-node absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        active && reached
          ? "size-5 border-white bg-white shadow-[0_0_0_6px_rgb(255_255_255_/_0.10)]"
          : reached
            ? "size-4 border-white bg-white"
            : "size-4 border-white/80 bg-[#050505] hover:border-white hover:bg-white/20"
      )}
      onClick={() => onSelect(index)}
      style={style}
      type="button"
    />
  );
}

function StageCopy({ active, stage }: { active: boolean; stage: StoryStage }) {
  return (
    <div className={cn("transition-colors duration-300", active ? "text-white" : "text-white/84")}>
      <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-nav", active ? "border-white/24 text-white/68" : "border-white/14 text-white/56")}>
        {stage.label}
      </span>
      <h3 className="mt-4 max-w-[17rem] text-xl font-semibold leading-tight text-white">{stage.title}</h3>
      <p className="mt-2 max-w-[17rem] text-sm leading-6 text-white/56">{stage.copy}</p>
    </div>
  );
}

function TimelineVisual({ active, stage }: { active: boolean; stage: StoryStage }) {
  return (
    <div
      className={cn(
        "relative mt-5 aspect-[4/3] max-w-[260px] overflow-hidden rounded-[16px] border bg-white/[0.03] transition duration-500 ease-premium group-hover:translate-y-[-2px] group-hover:border-white/28 motion-reduce:transform-none",
        active ? "translate-y-0 border-white/42 opacity-100" : "translate-y-2 border-white/16 opacity-86"
      )}
    >
      <Image
        src={stage.image}
        alt={stage.imageAlt}
        fill
        sizes="(min-width: 1024px) 260px, 82vw"
        className={cn(
          "object-cover transition duration-500 ease-premium group-hover:scale-[1.015] motion-reduce:transform-none",
          active ? "opacity-100" : "opacity-85"
        )}
      />
    </div>
  );
}

function MediaInsert({
  active,
  index,
  reserveTop = true
}: {
  active: boolean;
  index: number;
  reserveTop?: boolean;
}) {
  return (
    <aside
      className={cn("relative transition duration-500 ease-premium", reserveTop ? "pt-9" : "", active ? "opacity-100" : "opacity-82")}
      data-story-stage={index}
    >
      <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-nav", active ? "border-white/24 text-white/68" : "border-white/14 text-white/56")}>
        MEDIA
      </span>
      <h3 className="mt-4 text-lg font-semibold leading-tight text-white">KL Texture mediassa</h3>
      <p className="mt-2 max-w-[17rem] text-sm leading-6 text-white/56">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div
        className={cn(
          "relative mt-5 aspect-[16/10] max-w-[280px] overflow-hidden rounded-[14px] border bg-white/[0.04] p-1.5 transition duration-500 ease-premium hover:border-white/28",
          active ? "border-white/38 opacity-100" : "border-white/16 opacity-88"
        )}
      >
        <div className="relative h-full overflow-hidden rounded-[10px] bg-[#111]">
          <Image
            src="/tuotteet.avif"
            alt="KL Texture -hiustuotteet"
            fill
            sizes="(min-width: 1024px) 280px, 82vw"
            className={cn("object-cover", active ? "opacity-100" : "opacity-85")}
          />
        </div>
      </div>
    </aside>
  );
}

function MobileTimeline({
  activeStage,
  onSelect,
  progress,
  railProgressRef
}: {
  activeStage: number;
  onSelect: (index: number) => void;
  progress: number;
  railProgressRef: RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [nodeTops, setNodeTops] = useState<number[]>([]);
  const [nodeThresholds, setNodeThresholds] = useState<number[]>([]);

  useEffect(() => {
    const updateNodeTops = () => {
      const nextTops = itemRefs.current.map((item) => (item ? item.offsetTop + mobileNodeCenterOffset : mobileNodeCenterOffset));
      const containerHeight = Math.max(containerRef.current?.offsetHeight ?? 1, 1);
      setNodeTops(nextTops);
      setNodeThresholds(nextTops.map((top, index) => getTimelineNodeThreshold(index, clamp(top / containerHeight))));
    };

    updateNodeTops();

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateNodeTops);
    if (containerRef.current) observer?.observe(containerRef.current);
    itemRefs.current.forEach((item) => {
      if (item) observer?.observe(item);
    });
    window.addEventListener("resize", updateNodeTops);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateNodeTops);
    };
  }, []);

  return (
    <div className="relative mt-8 lg:hidden" ref={containerRef}>
      <div className="absolute bottom-0 left-0 top-0 w-4">
        <div className="absolute bottom-0 left-1/2 top-0 w-1 -translate-x-1/2 rounded-full bg-white/[0.16]" aria-hidden="true" />
        <div
          ref={railProgressRef}
          className="absolute bottom-0 left-1/2 top-0 w-1 rounded-full bg-white/[0.88]"
          style={{ transform: `translateX(-50%) scaleY(${progress})`, transformOrigin: "top" }}
          aria-hidden="true"
        />
        {nodeTops.map((top, index) => (
          <TimelineNode
            active={activeStage === index}
            ariaLabel={index === 2 ? "Valitse media" : `Valitse vaihe ${index + 1}`}
            index={index}
            key={`mobile-node-${index}`}
            onSelect={onSelect}
            reached={progress >= (nodeThresholds[index] ?? 1)}
            style={{ left: "50%", top }}
          />
        ))}
      </div>
      <div className="grid gap-9 pl-8">
        <TimelineStageMobile
          activeStage={activeStage}
          index={0}
          itemRef={(item) => {
            itemRefs.current[0] = item;
          }}
          stage={storyStages[0]}
        />
        <TimelineStageMobile
          activeStage={activeStage}
          index={1}
          itemRef={(item) => {
            itemRefs.current[1] = item;
          }}
          stage={storyStages[1]}
        />
        <div
          ref={(item) => {
            itemRefs.current[2] = item;
          }}
        >
          <MediaInsert active={activeStage === 2} index={2} />
        </div>
      </div>
    </div>
  );
}

function TimelineStageMobile({
  activeStage,
  index,
  itemRef,
  stage
}: {
  activeStage: number;
  index: number;
  itemRef: (item: HTMLElement | null) => void;
  stage: StoryStage;
}) {
  const active = activeStage === index;
  const nearby = Math.abs(activeStage - index) <= 1;

  return (
    <article
      className={cn(
        "group relative transition duration-500 ease-premium motion-reduce:translate-y-0 motion-reduce:transition-none",
        active ? "translate-y-0 opacity-100" : nearby ? "translate-y-1 opacity-82" : "translate-y-2 opacity-70"
      )}
      data-story-stage={index}
      ref={itemRef}
    >
      <StageCopy active={active} stage={stage} />
      <TimelineVisual active={active} stage={stage} />
    </article>
  );
}
