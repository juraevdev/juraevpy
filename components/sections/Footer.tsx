"use client";

import { site } from "@/data/site";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="surface border-t border-line" aria-label="Footer">
      <Container className="flex max-w-page flex-col items-center gap-5 py-16 text-center lg:py-20">
        <p className="text-signature text-fg">{site.name}</p>
        <p className="label text-muted">
          {t.common.role} · {t.common.city}
        </p>
        <ul className="mt-2 flex flex-wrap justify-center gap-x-8">
          {site.socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="eyebrow link-underline inline-block py-3 text-muted transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <div className="border-t border-line">
        <Container className="flex max-w-page items-center justify-between gap-6 py-5 label text-muted">
          <span>© 2026 {site.name}</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="group -my-3 inline-flex items-center gap-2 py-3 text-fg"
          >
            <span className="link-underline">{t.footer.backToTop}</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out-quart group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </button>
        </Container>
      </div>
    </footer>
  );
}
