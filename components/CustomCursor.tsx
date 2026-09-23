"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Cursor variants are declared on elements via data attributes:
 *   data-cursor="label" data-cursor-label="VIEW CASE"
 *   data-cursor="button" | "link" | "hidden"
 * Plain <a>/<button> fall back to the small outlined ring.
 */
type Variant = "default" | "link" | "button" | "label" | "hidden";

const SIZE: Record<Variant, number> = {
  default: 10,
  link: 36,
  button: 64,
  label: 104,
  hidden: 0,
};

export function CustomCursor() {
  const fine = useFinePointer();
  if (!fine) return null;
  return <Cursor />;
}

function Cursor() {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 900, damping: 62, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 900, damping: 62, mass: 0.5 });

  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  // The element under the pointer changes on navigation without a pointer event — reset.
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setVariant("default");
    setLabel("");
  }

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      const tagged = target.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setVariant((tagged.dataset.cursor as Variant) || "default");
        setLabel(tagged.dataset.cursorLabel ?? "");
        return;
      }

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, summary");
      setVariant(interactive ? "link" : "default");
      setLabel("");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const size = SIZE[variant];
  const ring = variant === "link";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: reduced ? x : sx, y: reduced ? y : sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-white text-black"
        style={{ borderStyle: "solid" }}
        initial={false}
        animate={{
          width: size,
          height: size,
          opacity: visible && variant !== "hidden" ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: ring ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
          borderWidth: ring ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
      >
        <AnimatePresence>
          {variant === "label" && label && (
            <motion.span
              key={label}
              className="label-sm whitespace-nowrap px-2 text-center leading-tight"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
