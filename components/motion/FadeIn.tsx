"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE_OUT_QUART, DURATION, viewport as defaultViewport } from "@/lib/motion";

type Tag = "div" | "section" | "span" | "p" | "li" | "article" | "header" | "footer";

const tags = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
} as const;

type FadeInProps = Omit<HTMLMotionProps<"div">, "children"> & {
  as?: Tag;
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  /** Vertical offset in px the element travels while fading in. */
  y?: number;
  /** "view" (default) animates when scrolled into view; "mount" animates immediately. */
  trigger?: "view" | "mount";
  once?: boolean;
};

export function FadeIn({
  as = "div",
  children,
  delay = 0,
  duration = DURATION.base,
  y = 20,
  trigger = "view",
  once = true,
  ...rest
}: FadeInProps) {
  const Component = tags[as] as typeof motion.div;
  const target = { opacity: 1, y: 0 };

  return (
    <Component
      initial={{ opacity: 0, y }}
      animate={trigger === "mount" ? target : undefined}
      whileInView={trigger === "view" ? target : undefined}
      viewport={trigger === "view" ? { ...defaultViewport, once } : undefined}
      transition={{ duration, delay, ease: EASE_OUT_QUART }}
      {...rest}
    >
      {children}
    </Component>
  );
}
