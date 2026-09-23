"use client";

import { MotionConfig } from "motion/react";

/** Respects prefers-reduced-motion globally for every motion component. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
