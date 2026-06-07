import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("mb-4 text-xs font-semibold uppercase tracking-nav", isLight ? "text-white/45" : "text-ink/50")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("text-3xl font-semibold leading-[1.05] sm:text-5xl", isLight ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-7 sm:text-lg", isLight ? "text-white/65" : "text-ink/65")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
