import { cn } from "@/lib/utils";

type VisualFrameProps = {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
  /** Square on phones so the plates never crowd; `lookbook` opens to 16/10, `wide` to 21/9 from `lg`. */
  ratio?: VisualRatio;
  /** Decorative plates hide from AT; interactive demos must leave this false. */
  decorative?: boolean;
};

export type VisualRatio = "4/3" | "lookbook" | "wide" | "auto";

const ratios: Record<VisualRatio, string> = {
  "4/3": "aspect-square sm:aspect-[4/3]",
  lookbook: "aspect-square sm:aspect-[4/3] lg:aspect-[16/10]",
  wide: "aspect-square sm:aspect-[4/3] lg:aspect-[21/9]",
  /** Height follows content — used by the compact TGAI interactive demo. */
  auto: "",
};

/** Shared chrome for the project plates: a quiet card with a title bar. */
export function VisualFrame({
  title,
  meta,
  children,
  className,
  ratio = "4/3",
  decorative = true,
}: VisualFrameProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-xl border border-line bg-card text-fg",
        decorative && "select-none",
        ratios[ratio],
        className,
      )}
      aria-hidden={decorative || undefined}
    >
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-4 text-micro text-muted">
        <span>{title}</span>
        {meta ? <span className="text-muted">{meta}</span> : null}
      </div>
      <div
        className={cn(
          "relative @container",
          ratio === "auto" ? "flex-none" : "min-h-0 flex-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** Text placeholder bar. */
export function Bar({ w, className }: { w: string; className?: string }) {
  return (
    <span className={cn("block h-1 rounded-full bg-fg/10", className)} style={{ width: w }} />
  );
}
