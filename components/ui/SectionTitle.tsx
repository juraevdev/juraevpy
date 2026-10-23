import { cn } from "@/lib/utils";
import { RevealText } from "@/components/motion/RevealText";

type SectionTitleProps = {
  eyebrow: string;
  /** Explicit lines; wrap a word in <em> for the italic turn. */
  lines: readonly React.ReactNode[];
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  /** id for the heading element (pair with aria-labelledby on the section). */
  id?: string;
};

/** Centred house-style overline above a serif headline. */
export function SectionTitle({
  eyebrow,
  lines,
  className,
  titleClassName,
  as = "h2",
  id,
}: SectionTitleProps) {
  return (
    <div className={cn("@container text-center", className)}>
      <p className="eyebrow text-muted">{eyebrow}</p>
      <RevealText
        as={as}
        id={id}
        lines={lines}
        className={cn("mt-6 text-display-lg lg:mt-8", titleClassName)}
      />
    </div>
  );
}
