"use client";

import { stack } from "@/data/stack";
import { joinDot, roman } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chapter } from "@/components/ui/Chapter";
import { FadeIn } from "@/components/motion/FadeIn";

export function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="about" className="surface" aria-labelledby="about-title">
      <Container className="max-w-page py-28 lg:py-40">
        <SectionTitle
          eyebrow={t.about.eyebrow}
          id="about-title"
          lines={[
            t.about.titleLine1,
            <>
              {t.about.titleLine2Before}
              <em>{t.about.titleLine2Em}</em>
            </>,
          ]}
        />

        <FadeIn className="mx-auto mt-10 max-w-measure text-center lg:mt-12">
          <p className="text-lede text-muted">{t.about.lede}</p>
          <p className="mt-6 text-signature text-fg">Davlat</p>
        </FadeIn>

        <div className="mx-auto mt-20 flex max-w-[60rem] flex-col gap-16 lg:mt-28 lg:gap-20">
          <FadeIn>
            <Chapter name={t.about.howIWork}>
              <ol>
                {t.about.process.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <span className="font-serif text-lg italic text-muted">{roman(i + 1)}</span>
                    <div>
                      <h4 className="font-serif text-xl leading-snug">{step.title}</h4>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Chapter>
          </FadeIn>

          <FadeIn>
            <Chapter name={t.about.experience}>
              <ol>
                {t.about.experienceItems.map((item) => (
                  <li
                    key={item.period}
                    className="grid gap-x-6 gap-y-1 border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]"
                  >
                    <span className="label pt-1 text-muted">{item.period}</span>
                    <div>
                      <h4 className="font-serif text-xl leading-snug">
                        {item.role}
                        <span className="text-muted">, {item.org}</span>
                      </h4>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                        {item.impact}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Chapter>
          </FadeIn>

          <FadeIn>
            <Chapter name={t.about.tools}>
              <dl>
                {stack.map((cat) => (
                  <div
                    key={cat.id}
                    className="grid gap-x-6 gap-y-1 border-b border-line py-3 text-[0.95rem] first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]"
                  >
                    <dt className="text-muted">{cat.name}</dt>
                    <dd className="text-fg">{joinDot(cat.items.map((item) => item.name))}</dd>
                  </div>
                ))}
              </dl>
            </Chapter>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
