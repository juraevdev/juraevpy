"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";

type Phase = "idle" | "covering" | "covered" | "revealing";

type NavigateOptions = { label?: string; index?: string };

type TransitionContextValue = {
  navigate: (href: string, options?: NavigateOptions) => void;
  phase: Phase;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  phase: "idle",
});

export const usePageTransition = () => useContext(TransitionContext);

const COVER = "inset(0% 0% 0% 0%)";
const BELOW = "inset(100% 0% 0% 0%)";
const ABOVE = "inset(0% 0% 100% 0%)";

function stripHash(href: string) {
  return href.split("#")[0] || "/";
}

/**
 * Route transition: a black plane rises with the destination title,
 * the route swaps underneath, the plane lifts away. ~1.1s total, never a loading screen.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [meta, setMeta] = useState<NavigateOptions>({});
  const pending = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string, options: NavigateOptions = {}) => {
      if (stripHash(href) === pathname) return;
      if (reduced) {
        router.push(href);
        return;
      }
      pending.current = href;
      setMeta(options);
      setPhase("covering");
    },
    [pathname, reduced, router],
  );

  // Route changed while covered → lift the plane.
  useEffect(() => {
    if (phase !== "covered") return;
    if (pending.current && stripHash(pending.current) !== pathname) return;
    pending.current = null;
    const t = setTimeout(() => setPhase("revealing"), 140);
    return () => clearTimeout(t);
  }, [pathname, phase]);

  // Safety valve: never trap the user behind the plane.
  useEffect(() => {
    if (phase !== "covered") return;
    const t = setTimeout(() => setPhase("revealing"), 4000);
    return () => clearTimeout(t);
  }, [phase]);

  const onAnimationComplete = () => {
    if (phase === "covering" && pending.current) {
      setPhase("covered");
      router.push(pending.current);
    } else if (phase === "revealing") {
      setPhase("idle");
      setMeta({});
    }
  };

  const value = useMemo(() => ({ navigate, phase }), [navigate, phase]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="page-transition"
            aria-hidden
            className="fixed inset-0 z-[90] flex flex-col justify-end bg-ink-950 px-gutter pb-[12vh] text-ink-100"
            initial={{ clipPath: BELOW }}
            animate={{ clipPath: phase === "revealing" ? ABOVE : COVER }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT_QUART }}
            onAnimationComplete={onAnimationComplete}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: phase === "revealing" ? 0 : 1 }}
              transition={{
                duration: phase === "revealing" ? 0.3 : 0.6,
                delay: phase === "revealing" ? 0 : 0.2,
                ease: EASE_OUT_EXPO,
              }}
            >
              {meta.index ? (
                <span className="label mb-4 block text-ink-300">{meta.index}</span>
              ) : null}
              {meta.label ? (
                <span className="block text-display-xl uppercase">{meta.label}</span>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

/**
 * Returns an onClick handler that routes through the transition
 * while preserving modifier-click / middle-click browser behaviour.
 */
export function useTransitionLink() {
  const { navigate } = usePageTransition();
  return useCallback(
    (href: string, options?: NavigateOptions) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(href, options);
    },
    [navigate],
  );
}
