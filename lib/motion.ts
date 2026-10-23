import type { Variants } from "motion/react";

/**
 * Global motion language: quiet and short. Motion confirms, it never performs. No bounce.
 */
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.7,
  reveal: 0.6,
} as const;

/** Default in-view trigger: fire once, slightly before the element is fully visible. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Variants for staggered groups. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Headline line: a short fade with a slight rise. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_OUT_QUART },
  },
};
