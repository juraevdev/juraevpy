"use client";

import Link from "next/link";
import { pad } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { FadeIn } from "@/components/motion/FadeIn";
import { TgaiVisual } from "./visuals/TgaiVisual";

type TgaiEntryProps = {
  number: number;
};

/** TGAI Profile lookbook entry: title + tagline above a compact interactive demo. */
export function TgaiEntry({ number }: TgaiEntryProps) {
  const { locale, tgai: t, t: site } = useLocale();
  const no = `N° ${pad(number)}`;

  return (
    <article aria-labelledby="tgai-entry-title">
      <FadeIn className="mx-auto max-w-[60rem]">
        <p className="eyebrow text-muted">
          {no} · {t.period}
        </p>
        <h3 id="tgai-entry-title" className="mt-3 text-display-md">
          {t.title}
        </h3>
        <p className="mt-2 font-serif text-base italic leading-snug text-muted sm:text-lg">
          {t.category}
        </p>
        <p className="mt-4 max-w-measure text-[1.0625rem] leading-relaxed text-fg">{t.tagline}</p>

        <div className="mt-8 lg:mt-10">
          <TgaiVisual locale={locale} ratio="auto" />
        </div>

        <p className="mt-8 text-center sm:mt-10">
          <Link
            href="/work/tgai-profile"
            className="eyebrow link-underline inline-block py-3 text-fg"
          >
            {site.work.viewCase}
          </Link>
        </p>
      </FadeIn>
    </article>
  );
}
