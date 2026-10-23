"use client";

import Link from "next/link";
import { pad } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { FadeIn } from "@/components/motion/FadeIn";
import { EmakonVisual } from "./visuals/EmakonVisual";

type EmakonEntryProps = {
  number: number;
};

export function EmakonEntry({ number }: EmakonEntryProps) {
  const { t } = useLocale();
  const c = t.emakon;
  const no = `N° ${pad(number)}`;

  return (
    <article aria-labelledby="emakon-entry-title">
      <FadeIn className="mx-auto max-w-[60rem]">
        <p className="eyebrow text-muted">{no} · 2024 — 2025</p>
        <h3 id="emakon-entry-title" className="mt-3 text-display-md">
          {c.title}
        </h3>
        <p className="mt-2 font-serif text-base italic leading-snug text-muted sm:text-lg">
          {c.category}
        </p>
        <p className="mt-4 max-w-measure text-[1.0625rem] leading-relaxed text-fg">{c.tagline}</p>

        <div className="mt-8 lg:mt-10">
          <EmakonVisual ratio="auto" copy={c} />
        </div>

        <p className="mt-8 text-center sm:mt-10">
          <Link href="/work/e-makon" className="eyebrow link-underline inline-block py-3 text-fg">
            {t.work.viewCase}
          </Link>
        </p>
      </FadeIn>
    </article>
  );
}
