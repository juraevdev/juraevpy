import { cn } from "@/lib/utils";
import { RevealText } from "@/components/motion/RevealText";
import { LineReveal } from "@/components/motion/LineReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { Label } from "./Label";

type SectionTitleProps = {
  index: string;
  label: string;
  lines: readonly string[];
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  /** Optional right-aligned metadata on the label row. */
  meta?: React.ReactNode;
  /** id for the heading element (pair with aria-labelledby on the section). */
  id?: string;
  children?: React.ReactNode;
};

/** Index + label row with a drawn rule, followed by a masked headline reveal. */
export function SectionTitle({
  index,
  label,
  lines,
  className,
  titleClassName,
  as = "h2",
  meta,
  id,
  children,
}: SectionTitleProps) {
  return (
    <div className={cn("@container", className)}>
      <div className="flex items-center gap-5 sm:gap-8">
        <FadeIn y={8} className="flex shrink-0 items-center gap-3">
          <Label tone="fg">{index}</Label>
          <Label>— {label}</Label>
        </FadeIn>
        <LineReveal className="flex-1" />
        {meta ? (
          <FadeIn y={8} delay={0.2} className="hidden shrink-0 sm:block">
            {meta}
          </FadeIn>
        ) : null}
      </div>
      <RevealText
        as={as}
        id={id}
        lines={lines}
        className={cn("mt-8 text-display-lg uppercase lg:mt-12", titleClassName)}
      />
      {children}
    </div>
  );
}
