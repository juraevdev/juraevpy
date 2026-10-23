"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Click handler factory for in-page anchors (e.g. "/#work").
 * Scrolls natively on the home page; elsewhere lets <Link> navigate normally.
 */
export function useScrollToAnchor() {
  const pathname = usePathname();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash || pathname !== "/") return;
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView();
      window.history.replaceState(null, "", `#${hash}`);
    },
    [pathname],
  );
}
