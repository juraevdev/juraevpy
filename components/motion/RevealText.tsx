"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { lineReveal, staggerContainer, viewport } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

type RevealTextProps = {
  /** Explicit lines — line breaks are a design decision, not a browser decision. */
  lines: readonly string[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
  /** Extra room inside each mask (em) so descenders survive the clip. */
  maskPadding?: number;
  id?: string;
};

/**
 * Headline reveal: each line rises from behind a clipping mask.
 */
export function RevealText({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
  maskPadding = 0.08,
  id,
}: RevealTextProps) {
  const Component = tags[as] as typeof motion.h2;

  return (
    <Component
      id={id}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "view" ? "visible" : undefined}
      viewport={trigger === "view" ? viewport : undefined}
    >
      {lines.map((line, i) => (
        <span
          key={`${i}-${line}`}
          className="block overflow-hidden"
          style={{ paddingBottom: `${maskPadding}em`, marginBottom: `-${maskPadding}em` }}
        >
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            variants={lineReveal}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
