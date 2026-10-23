import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know our custom typography utilities are font sizes,
 * otherwise `text-display-sm text-muted` collapses to just `text-muted`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display-hero", "display-xl", "display-lg", "display-md", "display-sm", "lede", "micro", "signature"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/** 1 → "I". Lists on this site stay short; falls back to digits past twelve. */
export function roman(n: number) {
  return ROMAN[n - 1] ?? String(n);
}

/** Joins with a middle dot that never starts a line. */
export function joinDot(items: readonly string[]) {
  return items.join("\u00a0· ");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
