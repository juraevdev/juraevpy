"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ArrowUpRight } from "@/components/ui/Icons";

type MobileMenuProps = {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
  active: string | null;
};

const CLOSED = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

/** Full-screen navigation for small screens: large type, clip-path curtain. */
export function MobileMenu({ onNavigate, onClose, active }: MobileMenuProps) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950 px-gutter pb-8 pt-[calc(var(--nav-h)+1.5rem)] text-ink-100"
      initial={{ clipPath: CLOSED }}
      animate={{ clipPath: OPEN }}
      exit={{ clipPath: CLOSED, transition: { duration: 0.55, ease: EASE_IN_OUT_QUART } }}
      transition={{ duration: 0.7, ease: EASE_IN_OUT_QUART }}
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />

      <nav aria-label="Mobile" className="relative">
        <span className="label text-ink-300">Menu</span>
        <ul className="mt-6 border-t border-line">
          {navLinks.map((link, i) => (
            <li key={link.id} className="overflow-hidden border-b border-line">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "110%", transition: { duration: 0.35, ease: EASE_IN_OUT_QUART } }}
                transition={{ duration: 0.9, delay: 0.18 + i * 0.06, ease: EASE_OUT_EXPO }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => onNavigate(e, link.href)}
                  className={cn(
                    "flex items-baseline justify-between py-4 text-[clamp(2.5rem,11vw,5rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em]",
                    active === link.id ? "text-ink-0" : "text-ink-100",
                  )}
                >
                  {link.label}
                  <span className="label text-ink-300">0{i + 1}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="relative flex flex-col gap-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO }}
      >
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex items-center gap-2 text-lg tracking-tight text-ink-100"
          onClick={onClose}
        >
          {site.email}
          <ArrowUpRight className="arrow-shift-diag text-[0.9em]" />
        </a>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {site.socials
            .filter((s) => s.id !== "email")
            .map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-underline text-ink-300"
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>
        <StatusIndicator />
      </motion.div>
    </motion.div>
  );
}
