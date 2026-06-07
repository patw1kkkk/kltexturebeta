import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";

type VideoCardProps = {
  title: string;
  image: string;
  tag?: string;
  className?: string;
};

export function VideoCard({ title, image, tag, className }: VideoCardProps) {
  return (
    <article
      className={cn(
        "group relative aspect-[9/16] w-[72vw] max-w-[280px] shrink-0 overflow-hidden bg-ink text-white sm:w-[260px]",
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 768px) 260px, 72vw"
        className="object-cover transition duration-500 ease-premium group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/24" />
      <div className="absolute left-4 top-4 flex size-11 items-center justify-center border border-white/30 bg-black/20 backdrop-blur">
        <Play className="size-4 fill-white" aria-hidden="true" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-black/55 p-4 backdrop-blur-sm">
        {tag ? <Tag className="mb-3 border-white/20 text-white/75">{tag}</Tag> : null}
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      </div>
    </article>
  );
}
