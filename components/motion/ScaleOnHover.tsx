"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type ScaleOnHoverProps = {
  children: React.ReactNode;
  scale?: number;
  className?: string;
};

export function ScaleOnHover({ children, scale = 1.03, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
