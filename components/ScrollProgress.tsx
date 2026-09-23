"use client";

import { motion, useScroll } from "motion/react";

/** 1px reading-progress rule along the top edge. Inverts over light sections. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[56] h-px w-full origin-left bg-white mix-blend-difference"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
