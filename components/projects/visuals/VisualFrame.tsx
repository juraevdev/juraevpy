import { cn } from "@/lib/utils";

type VisualFrameProps = {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
  /** aspect ratio; `wide` is 4/3 on small screens and 21/9 from `lg` (case-study heroes) */
  ratio?: VisualRatio;
};

export type VisualRatio = "4/3" | "16/9" | "21/9" | "wide";

const ratios: Record<VisualRatio, string> = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
  wide: "aspect-[4/3] lg:aspect-[21/9]",
};

/**
 * Shared chrome for the abstract interface mockups.
 * Always dark (ink-900) regardless of section theme so the visuals read as artefacts.
 */
export function VisualFrame({ title, meta, children, className, ratio = "4/3" }: VisualFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2px] border border-white/10 bg-[#0a0a0a] text-[#f5f5f5] select-none",
        ratios[ratio],
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-hlines opacity-40" />
      <div className="relative flex h-full flex-col">
        <div className="flex h-8 shrink-0 items-center justify-between border-b border-white/10 px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#666]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full border border-[#666]" />
            {title}
          </span>
          {meta ? <span>{meta}</span> : null}
        </div>
        <div className="relative min-h-0 flex-1 @container">{children}</div>
      </div>
    </div>
  );
}

/** Text placeholder bar. */
export function Bar({ w, className }: { w: string; className?: string }) {
  return (
    <span
      className={cn("block h-[3px] rounded-full bg-white/15", className)}
      style={{ width: w }}
    />
  );
}
