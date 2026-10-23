"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { navLinks, sectionIds } from "@/data/nav";
import { site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLocale } from "@/hooks/useLocale";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { MobileMenu } from "./MobileMenu";
import { MenuToggle } from "./MenuToggle";

const leftLinks = navLinks.filter((l) => l.id !== "contact");
const rightLinks = navLinks.filter((l) => l.id === "contact");

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, locale } = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  const navLabel = (id: (typeof navLinks)[number]["id"]) => t.nav[id];

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

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [menuOpen]);

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
        el.scrollIntoView();
        window.history.replaceState(null, "", `#${hash}`);
      }, menuOpen ? 250 : 0);
    },
    [isHome, menuOpen],
  );

  const renderLink = (link: (typeof navLinks)[number]) => {
    const isActive = isHome && active === link.id;
    return (
      <Link
        href={link.href}
        onClick={(e) => handleAnchor(e, link.href)}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "eyebrow py-3 transition-colors duration-300",
          isActive ? "text-fg" : "text-muted hover:text-fg",
        )}
      >
        {navLabel(link.id)}
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled && !menuOpen
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label={t.nav.primary}
          className="mx-auto grid h-nav w-full max-w-page grid-cols-[1fr_auto_1fr] items-center px-gutter"
        >
          <ul className="hidden items-center gap-10 md:flex">
            {leftLinks.map((link) => (
              <li key={link.id}>{renderLink(link)}</li>
            ))}
          </ul>

          <Link
            href="/"
            className="wordmark col-start-2 py-3 text-fg"
            aria-label={`${site.name} — home`}
            onClick={(e) => {
              if (!isHome) return;
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0 });
              window.history.replaceState(null, "", "/");
            }}
          >
            {site.name}
          </Link>

          <div className="flex items-center justify-end gap-3 md:gap-8">
            <LocaleToggle />
            <ul className="hidden items-center gap-10 md:flex">
              {rightLinks.map((link) => (
                <li key={link.id}>{renderLink(link)}</li>
              ))}
            </ul>
            <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          </div>
        </nav>
      </header>

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
