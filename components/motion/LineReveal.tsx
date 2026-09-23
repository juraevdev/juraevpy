"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewport } from "@/lib/motion";

type LineRevealProps = {
  className?: string;
  delay?: number;
  duration?: number;
  /** Direction the line grows from. */
  from?: "left" | "right" | "top";
  trigger?: "view" | "mount";
};

/** A 1px rule that draws itself. */
export function LineReveal({
  className,
  delay = 0,
  duration = 1.4,
  from = "left",
  trigger = "view",
}: LineRevealProps) {
  const vertical = from === "top";
  const hidden = vertical ? { scaleY: 0 } : { scaleX: 0 };
  const shown = vertical ? { scaleY: 1 } : { scaleX: 1 };

  return (
    <motion.div
      aria-hidden
      className={cn(vertical ? "w-px bg-line" : "h-px w-full bg-line", className)}
      style={{ originX: from === "right" ? 1 : 0, originY: 0 }}
      initial={hidden}
      animate={trigger === "mount" ? shown : undefined}
      whileInView={trigger === "view" ? shown : undefined}
      viewport={trigger === "view" ? viewport : undefined}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
    />
  );
}
