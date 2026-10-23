"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { joinDot } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Chapter } from "@/components/ui/Chapter";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectVisual } from "./ProjectVisual";
import { CaseStudyPipeline } from "./CaseStudyPipeline";

type ProjectCaseStudyProps = {
  project: Project;
  next: Project;
};

const prose = "max-w-measure text-[1.0625rem] leading-[1.7] text-fg";

function localizedProjectMeta(project: Project, t: ReturnType<typeof useLocale>["t"]) {
  if (project.slug === "caravan-dispatcher") {
    return { title: t.caravan.title, category: t.caravan.category, summary: t.caravan.tagline };
  }
  if (project.slug === "e-makon") {
    return { title: t.emakon.title, category: t.emakon.category, summary: t.emakon.tagline };
  }
  if (project.slug === "ai-super-app") {
    return { title: t.superapp.title, category: t.superapp.category, summary: t.superapp.tagline };
  }
  return { title: project.title, category: project.category, summary: project.summary };
}

/** Case-study page: title, plate, Problem / System / Engineering / Result, flow, next. */
export function ProjectCaseStudy({ project, next }: ProjectCaseStudyProps) {
  const { t } = useLocale();
  const local = localizedProjectMeta(project, t);
  const nextLocal = localizedProjectMeta(next, t);

  const meta = [
    { label: t.common.roleLabel, value: project.role },
    { label: t.common.periodLabel, value: project.year },
    { label: t.common.typeLabel, value: project.type },
  ];

  return (
    <>
      <section className="surface" aria-labelledby="project-title">
        <Container className="max-w-page pt-[calc(var(--nav-h)+2rem)]">
          <Link
            href="/#work"
            className="group -my-3 inline-flex items-center gap-2 py-3 eyebrow text-muted transition-colors hover:text-fg"
          >
            <ArrowRight className="rotate-180 text-[1.1em] transition-transform duration-300 ease-out-quart group-hover:-translate-x-1" />
            <span>{t.common.selectedWork}</span>
          </Link>

          <div className="@container mx-auto mt-14 max-w-[56rem] text-center lg:mt-20">
            <p className="eyebrow text-muted">{local.category}</p>
            <h1 id="project-title" className="mt-6 text-display-xl lg:mt-8">
              {local.title}
            </h1>
            <p className="mx-auto mt-8 max-w-measure text-lede text-muted lg:mt-10">
              {local.summary}
            </p>

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

        <Container className="mt-16 max-w-page lg:mt-24">
          <ProjectVisual kind={project.visual} />
        </Container>

        <Container className="max-w-page py-24 lg:py-32">
          <div className="mx-auto flex max-w-[60rem] flex-col gap-14 lg:gap-16">
            <FadeIn>
              <Chapter name={t.common.problem}>
                <p className={prose}>{project.problem}</p>
              </Chapter>
            </FadeIn>
            <FadeIn>
              <Chapter name={t.common.system}>
                <p className={prose}>{project.system}</p>
              </Chapter>
            </FadeIn>
            <FadeIn>
              <Chapter name={t.common.engineering}>
                <p className={prose}>{joinDot(project.engineering)}</p>
              </Chapter>
            </FadeIn>
            <FadeIn>
              <Chapter name={t.common.result}>
                <p className={prose}>{project.result}</p>
              </Chapter>
            </FadeIn>
          </div>
        </Container>
      </section>

      {project.pipeline ? (
        <section className="surface-alt border-y border-line" aria-labelledby="flow-title">
          <Container className="max-w-page py-24 lg:py-32">
            <SectionTitle
              eyebrow={t.common.howItRuns}
              id="flow-title"
              lines={[
                t.common.sevenStages,
                <>
                  <em>{t.common.oneWorkflow}</em>
                </>,
              ]}
            />
            <CaseStudyPipeline
              stages={project.pipeline}
              className="mx-auto mt-16 max-w-[60rem] lg:mt-20"
            />
          </Container>
        </section>
      ) : null}

      <section className="surface border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group block"
          aria-label={`${t.common.nextCase}: ${nextLocal.title}`}
        >
          <Container className="@container max-w-page py-24 text-center lg:py-32">
            <p className="eyebrow text-muted">{t.common.nextCase}</p>
            <FadeIn>
              <h2 className="mt-6 text-display-xl lg:mt-8">{nextLocal.title}</h2>
              <p className="mx-auto mt-4 max-w-[30rem] font-serif text-lg italic text-muted">
                {nextLocal.category}
              </p>
            </FadeIn>
            <p className="mt-8">
              <span className="eyebrow link-underline text-fg">{t.common.readCase}</span>
            </p>
          </Container>
        </Link>
      </section>
    </>
  );
}
