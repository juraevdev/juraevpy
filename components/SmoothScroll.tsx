"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

/**
 * Lenis smooth scroll at the root. Lenis honours prefers-reduced-motion natively
 * (lerp forced to 1), so no extra branching is needed here.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        autoRaf: true,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}

/** Keeps Lenis in sync with route changes and initial hashes. */
function ScrollSync() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const frame = requestAnimationFrame(() => {
      if (hash && document.querySelector(hash)) {
        lenis.scrollTo(hash, { immediate: true, force: true });
      } else {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [lenis, pathname]);

  return null;
}
