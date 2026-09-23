"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_QUART } from "@/lib/motion";
import { navLinks, sectionIds } from "@/data/nav";
import { site } from "@/data/site";
import { useActiveSection, useHeaderTheme } from "@/hooks/useActiveSection";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { MobileMenu } from "./MobileMenu";
import { MenuToggle } from "./MenuToggle";

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useHeaderTheme();
  const active = useActiveSection(sectionIds);

  // Close the menu when the route changes (derived-state reset during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the menu is open; close it on route change.
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash || !isHome) return; // other routes: let <Link> navigate to /#hash
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      setMenuOpen(false);
      // Give the menu overlay a beat to start closing before the page moves.
      window.setTimeout(() => {
        if (lenis) lenis.scrollTo(el, { duration: 1.5, force: true });
        else el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${hash}`);
      }, menuOpen ? 250 : 0);
    },
    [isHome, lenis, menuOpen],
  );

  const light = theme === "light" && !menuOpen;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT_QUART }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500",
          light && "theme-light",
          scrolled && !menuOpen
            ? "border-b border-line bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-nav w-full max-w-[120rem] items-center justify-between px-gutter"
        >
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="label text-fg"
              aria-label={`${site.name} — home`}
              onClick={(e) => {
                if (!isHome) return;
                e.preventDefault();
                setMenuOpen(false);
                if (lenis) lenis.scrollTo(0, { duration: 1.5, force: true });
                else window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", "/");
              }}
            >
              {site.firstName} {site.lastName}
            </Link>
            <StatusIndicator className="hidden xl:flex" showTime={false} />
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = isHome && active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleAnchor(e, link.href)}
                    data-active={isActive}
                    className={cn(
                      "label link-underline py-2 transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-6">
            <Link
              href="/#contact"
              onClick={(e) => handleAnchor(e, "/#contact")}
              data-cursor="button"
              className="group hidden h-10 items-center gap-3 rounded-[2px] border border-line-strong px-4 label text-fg transition-colors duration-500 hover:border-fg sm:inline-flex"
            >
              Let&apos;s talk
              <span aria-hidden className="arrow-shift inline-block">
                →
              </span>
            </Link>
            <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onNavigate={handleAnchor}
            onClose={() => setMenuOpen(false)}
            active={isHome ? active : null}
          />
        )}
      </AnimatePresence>
    </>
  );
}
