"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { useLocale } from "@/hooks/useLocale";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

/** First paint is the final state: no entrance animation, nothing hidden until hydration. */
export function Hero() {
  const scrollTo = useScrollToAnchor();
  const { t } = useLocale();

  return (
    <section id="top" className="surface flex min-h-svh flex-col" aria-labelledby="hero-title">
      <Container className="flex max-w-page flex-1 flex-col items-center justify-center pb-20 pt-[calc(var(--nav-h)+3rem)] text-center">
        <p className="eyebrow text-muted">
          {t.common.role} · {t.common.city}
        </p>

        <div className="@container mt-10 w-full max-w-[60rem] lg:mt-12">
          <h1 id="hero-title" className="text-display-hero text-fg-strong">
            <span className="block whitespace-nowrap">{t.hero.titleLine1}</span>
            <span className="block whitespace-nowrap">
              {t.hero.titleLine2Before}
              <em className="text-accent">{t.hero.titleLine2Em}</em>
            </span>
          </h1>
        </div>

        <p className="mt-10 max-w-[32rem] text-lede text-muted">{t.hero.lede}</p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Button href="/#work" size="lg" onClick={(e) => scrollTo(e, "/#work")}>
            {t.hero.viewWork}
          </Button>
          <Link
            href="/#contact"
            onClick={(e) => scrollTo(e, "/#contact")}
            className="eyebrow link-underline py-3 text-fg"
          >
            {t.hero.writeToMe}
          </Link>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex max-w-page flex-col items-center gap-2 py-5 sm:flex-row sm:justify-between">
          <StatusIndicator text={t.hero.available} />
          <p className="label text-muted">{t.common.availability}</p>
        </Container>
      </div>
    </section>
  );
}
