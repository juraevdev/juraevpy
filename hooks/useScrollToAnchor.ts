"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Click handler factory for in-page anchors (e.g. "/#work").
 * Smooth-scrolls via Lenis on the home page; elsewhere lets <Link> navigate normally.
 */
export function useScrollToAnchor() {
  const lenis = useLenis();
  const pathname = usePathname();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash || pathname !== "/") return;
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { duration: 1.5, force: true });
      else el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${hash}`);
    },
    [lenis, pathname],
  );
}
