"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  className?: string;
};

export function BeforeAfterSlider({
  image,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  alt,
  className
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);
  const beforeSource = beforeImage ?? image;
  const afterSource = afterImage ?? image;

  if (!beforeSource || !afterSource) {
    return null;
  }

  return (
    <div className={cn("relative overflow-hidden bg-ink", className)}>
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={afterSource}
          alt={`${alt}, ${afterLabel}`}
          fill
          sizes="(min-width: 768px) 640px, 100vw"
          className="object-cover"
          style={{ objectPosition: "right center" }}
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src={beforeSource}
            alt={`${alt}, ${beforeLabel}`}
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
            style={{ objectPosition: "left center" }}
          />
        </div>
        <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${position}%` }} />
        <span className="absolute left-4 top-4 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-nav text-ink">
          {beforeLabel}
        </span>
        <span className="absolute right-4 top-4 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-nav text-ink">
          {afterLabel}
        </span>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 bg-black/45 px-4 py-3 backdrop-blur">
        <span className="text-[11px] font-semibold uppercase tracking-nav text-white/70">Vertaa</span>
        <input
          aria-label="Vertaa ennen ja jälkeen"
          className="w-full accent-white"
          max="100"
          min="0"
          onChange={(event) => setPosition(Number(event.target.value))}
          type="range"
          value={position}
        />
        <span className="hidden min-w-10 text-right text-xs font-semibold text-white/70 sm:block">{position}%</span>
      </div>
    </div>
  );
}
