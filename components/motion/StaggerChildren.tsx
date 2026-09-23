"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

type Tag = "div" | "ul" | "ol" | "li" | "span" | "p" | "section";

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  section: motion.section,
} as const;

type StaggerChildrenProps = Omit<HTMLMotionProps<"div">, "children"> & {
  as?: Tag;
  children?: React.ReactNode;
  stagger?: number;
  delay?: number;
  trigger?: "view" | "mount";
};

/** Container: orchestrates children that declare `variants={fadeUp}` (or use <StaggerItem/>). */
export function StaggerChildren({
  as = "div",
  children,
  stagger = 0.08,
  delay = 0,
  trigger = "view",
  ...rest
}: StaggerChildrenProps) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "view" ? "visible" : undefined}
      viewport={trigger === "view" ? viewport : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  as?: Tag;
  children?: React.ReactNode;
  variants?: Variants;
};

export function StaggerItem({ as = "div", children, variants = fadeUp, ...rest }: StaggerItemProps) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component variants={variants} {...rest}>
      {children}
    </Component>
  );
}
