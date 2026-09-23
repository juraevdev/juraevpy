"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which `section[id]` currently crosses the vertical middle of the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band around the vertical center of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Reports the theme (`dark` | `light`) of the section sitting under the fixed header.
 */
export function useHeaderTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (sections.length === 0) return;

    const navHeight = 72;
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTheme(entry.target.getAttribute("data-theme") === "light" ? "light" : "dark");
            }
          }
        },
        {
          // Only the strip occupied by the header counts.
          rootMargin: `0px 0px -${Math.max(window.innerHeight - navHeight, 0)}px 0px`,
          threshold: 0,
        },
      );
      sections.forEach((el) => observer!.observe(el));
    };

    connect();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(connect, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, []);

  return theme;
}
