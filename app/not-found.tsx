"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <main id="main" className="surface flex flex-1 flex-col">
      <Container className="@container flex max-w-page flex-1 flex-col items-center justify-center pb-24 pt-[calc(var(--nav-h)+4rem)] text-center">
        <p className="eyebrow text-muted">{t.notFound.eyebrow}</p>
        <h1 className="mt-8 text-display-xl">
          <span className="block">{t.notFound.titleLine1}</span>
          <span className="block">
            <em>{t.notFound.titleLine2Em}</em>
          </span>
        </h1>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Button href="/">{t.notFound.backHome}</Button>
          <Link href="/#work" className="eyebrow link-underline py-3 text-fg">
            {t.common.selectedWork}
          </Link>
        </div>
      </Container>
    </main>
  );
}
