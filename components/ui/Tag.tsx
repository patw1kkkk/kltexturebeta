import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-nav text-ink/70",
        className
      )}
    >
      {children}
    </span>
  );
}
