"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/data/locale";
import { useLocale } from "@/hooks/useLocale";

type LocaleToggleProps = {
  className?: string;
};

/** Compact UZ | EN switch for the whole site (navbar). */
export function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className={cn("inline-flex items-center gap-1 text-micro", className)}
    >
      {(["uz", "en"] as const satisfies readonly Locale[]).map((code, i) => (
        <span key={code} className="inline-flex items-center gap-1">
          {i > 0 ? (
            <span className="text-muted" aria-hidden>
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={cn(
              "min-h-11 min-w-11 rounded-[2px] px-2 uppercase tracking-[0.12em] transition-colors duration-200",
              locale === code
                ? "font-medium text-fg"
                : "text-muted hover:text-fg focus-visible:text-fg",
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
