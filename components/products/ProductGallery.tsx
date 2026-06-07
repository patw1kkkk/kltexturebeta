"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="grid gap-3">
      <div className="relative aspect-[4/5] overflow-hidden bg-fog">
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            aria-label={`Näytä tuotekuva ${index + 1}`}
            className={cn(
              "relative aspect-[4/5] overflow-hidden border focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
              activeImage === image ? "border-ink" : "border-ink/10"
            )}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image src={image} alt={`${name} kuva ${index + 1}`} fill sizes="140px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
