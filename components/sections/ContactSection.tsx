"use client";

import { site } from "@/data/site";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

/** Written like a short letter: the question, one sentence, the address. */
export function ContactSection() {
  const { t } = useLocale();

  return (
    <section id="contact" className="surface-alt" aria-labelledby="contact-title">
      <Container className="max-w-page py-28 text-center lg:py-40">
        <SectionTitle
          eyebrow={t.contact.eyebrow}
          id="contact-title"
          lines={[
            t.contact.titleLine1,
            <>
              {t.contact.titleLine2Before}
              <em>{t.contact.titleLine2Em}</em>
            </>,
          ]}
          titleClassName="text-display-xl"
        />

        <FadeIn as="p" className="mx-auto mt-10 max-w-measure text-lede text-muted lg:mt-12">
          {t.contact.lede}
        </FadeIn>

        <FadeIn className="mt-12 lg:mt-14">
          <a
            href={`mailto:${site.email}`}
            className="inline-block py-2 text-display-md text-accent underline decoration-accent/30 decoration-1 underline-offset-[0.22em] transition-[text-decoration-color] duration-300 hover:decoration-accent"
          >
            {site.email}
          </a>
        </FadeIn>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-10">
          {site.socials
            .filter((s) => s.id !== "email")
            .map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow link-underline inline-block py-3 text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>

        <p className="mt-10 label text-muted">{t.common.availability}</p>
      </Container>
    </section>
  );
}
