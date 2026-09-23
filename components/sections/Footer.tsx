"use client";

import { useLenis } from "lenis/react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { ArrowUpRight } from "@/components/ui/Icons";

const TICKER = [
  "System online",
  "Accepting new projects",
  site.focus.join(" · "),
  site.availability,
  "Building real systems",
];

export function Footer() {
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6, force: true });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="surface-dark border-t border-line" aria-label="Footer">
      {/* Status ticker */}
      <div className="overflow-hidden border-b border-line py-3" aria-hidden>
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-12 pr-12 label text-muted">
              {TICKER.map((t) => (
                <li key={t} className="flex items-center gap-12">
                  <span>{t}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-2" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Container className="grid grid-cols-12 gap-x-6 gap-y-12 py-16 lg:py-20">
        <div className="col-span-12 lg:col-span-5">
          <p className="text-display-sm uppercase">{site.name}</p>
          <p className="mt-3 text-sm text-muted">{site.role}</p>
          <p className="mt-8 label text-muted">{site.focus.join(" • ")}</p>
        </div>

        <div className="col-span-6 lg:col-span-3 lg:col-start-7">
          <Label size="sm">Connect</Label>
          <ul className="mt-4 flex flex-col gap-3">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 text-sm text-fg"
                >
                  <span className="link-underline">{s.label}</span>
                  <ArrowUpRight className="arrow-shift-diag text-[0.8em] text-muted" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 lg:col-span-3 lg:col-start-10">
          <Label size="sm">Status</Label>
          <StatusIndicator className="mt-4" />
          <p className="mt-3 text-sm text-muted">{site.availability}</p>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-6 label text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 {site.name}</span>
        <span className="hidden sm:block">Designed &amp; built with Next.js</span>
        <button type="button" onClick={toTop} className="group inline-flex items-center gap-2 label text-fg">
          <span className="link-underline">Back to top</span>
          <span aria-hidden className="inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            ↑
          </span>
        </button>
      </Container>
    </footer>
  );
}
