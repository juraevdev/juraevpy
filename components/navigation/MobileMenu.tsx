"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_QUART } from "@/lib/motion";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { useLocale } from "@/hooks/useLocale";
import { ArrowUpRight } from "@/components/ui/Icons";

type MobileMenuProps = {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
  active: string | null;
};

/** Full-screen navigation for small screens: a quiet sheet of serif links. */
export function MobileMenu({ onNavigate, onClose, active }: MobileMenuProps) {
  const { t } = useLocale();

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      className="fixed inset-0 z-40 flex flex-col justify-between overscroll-contain bg-bg px-gutter pb-10 pt-[calc(var(--nav-h)+3rem)] text-center text-fg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={(e) => onNavigate(e, link.href)}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "inline-block py-2 font-serif text-[clamp(2.25rem,10vw,3.5rem)] leading-[1.1] tracking-[-0.015em]",
                  active === link.id ? "italic text-fg" : "text-fg",
                )}
              >
                {t.nav[link.id]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col items-center gap-4">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex items-center gap-2 py-2 font-serif text-xl text-fg"
          onClick={onClose}
        >
          {site.email}
          <ArrowUpRight className="arrow-shift-diag text-[0.8em]" />
        </a>
        <ul className="flex flex-wrap justify-center gap-x-8">

          {site.socials
            .filter((s) => s.id !== "email")
            .map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 eyebrow text-muted"
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
}
