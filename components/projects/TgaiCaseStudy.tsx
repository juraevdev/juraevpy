"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { Chapter } from "@/components/ui/Chapter";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { TgaiVisual } from "./visuals/TgaiVisual";

type TgaiCaseStudyProps = {
  next: Project;
};

const prose = "max-w-measure text-[1.0625rem] leading-[1.7] text-fg";

/** Bilingual case study for TGAI Profile only. */
export function TgaiCaseStudy({ next }: TgaiCaseStudyProps) {
  const { locale, tgai: t, t: site } = useLocale();

  const meta = [
    { label: t.roleLabel, value: t.role },
    { label: t.periodLabel, value: t.period },
    { label: t.typeLabel, value: t.type },
  ];

  const chapters = [
    t.chapters.problem,
    t.chapters.decision,
    t.chapters.safety,
    t.chapters.notSpam,
    t.chapters.flow,
    t.chapters.stack,
  ];

  return (
    <>
      <section className="surface" aria-labelledby="tgai-case-title">
        <Container className="max-w-page pt-[calc(var(--nav-h)+2rem)]">
          <Link
            href="/#work"
            className="group -my-3 inline-flex items-center gap-2 py-3 eyebrow text-muted transition-colors hover:text-fg"
          >
            <ArrowRight className="rotate-180 text-[1.1em] transition-transform duration-300 ease-out-quart group-hover:-translate-x-1" />
            <span>{site.common.selectedWork}</span>
          </Link>

          <div className="@container mx-auto mt-14 max-w-[56rem] text-center lg:mt-20">
            <p className="eyebrow text-muted">{t.caseEyebrow}</p>
            <h1 id="tgai-case-title" className="mt-6 text-display-xl lg:mt-8">
              {t.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[30rem] font-serif text-lg italic text-muted">
              {t.category}
            </p>
            <p className="mx-auto mt-8 max-w-measure text-lede text-fg lg:mt-10">{t.tagline}</p>

            <dl className="mx-auto mt-12 grid max-w-[44rem] gap-y-5 border-y border-line py-6 text-sm sm:grid-cols-3 lg:mt-14">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="eyebrow text-muted">{m.label}</dt>
                  <dd className="mt-2 text-fg">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>

        <Container className="mt-16 max-w-[40rem] lg:mt-20">
          <TgaiVisual locale={locale} ratio="auto" />
        </Container>

        <Container className="max-w-page py-24 lg:py-32">
          <div className="mx-auto flex max-w-[60rem] flex-col gap-14 lg:gap-16">
            {chapters.map((chapter) => (
              <FadeIn key={chapter.name}>
                <Chapter name={chapter.name}>
                  <p className={prose}>{chapter.body}</p>
                </Chapter>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="surface border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group block"
          aria-label={`${site.common.nextCase}: ${next.title}`}
        >
          <Container className="@container max-w-page py-24 text-center lg:py-32">
            <p className="eyebrow text-muted">{site.common.nextCase}</p>
            <FadeIn>
              <h2 className="mt-6 text-display-xl lg:mt-8">{next.title}</h2>
              <p className="mx-auto mt-4 max-w-[30rem] font-serif text-lg italic text-muted">
                {next.category}
              </p>
            </FadeIn>
            <p className="mt-8">
              <span className="eyebrow link-underline text-fg">{site.common.readCase}</span>
            </p>
          </Container>
        </Link>
      </section>
    </>
  );
}
