import type { Transition, Variants } from "motion/react";

/**
 * Global motion language.
 * FAST interactions, SLOW transitions, SMOOTH easing. No bounce.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  reveal: 1.2,
} as const;

export const transition = {
  reveal: (delay = 0): Transition => ({
    duration: DURATION.reveal,
    ease: EASE_OUT_EXPO,
    delay,
  }),
  fade: (delay = 0): Transition => ({
    duration: DURATION.base,
    ease: EASE_OUT_QUART,
    delay,
  }),
  spring: { type: "spring", stiffness: 380, damping: 34, mass: 0.7 } as Transition,
  springSoft: { type: "spring", stiffness: 180, damping: 26, mass: 0.6 } as Transition,
};

/** Default in-view trigger: fire once, slightly before the element is fully visible. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Variants for staggered groups. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_QUART },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT_QUART },
  },
};

/** Masked line reveal — translate from below the clipping mask. */
export const lineReveal: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE_OUT_EXPO },
  },
};
