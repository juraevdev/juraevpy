"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useTransitionLink } from "@/components/PageTransition";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { LineReveal } from "@/components/motion/LineReveal";
import { ProjectVisual } from "./ProjectVisual";
import { CaseStudyGrid } from "./CaseStudyGrid";
import { CaseStudyPipeline } from "./CaseStudyPipeline";

type ProjectCaseStudyProps = {
  project: Project;
  next: Project;
};

/** Dedicated case-study page: statement, visual, PROBLEM / SYSTEM / ENGINEERING / RESULT, flow, next. */
export function ProjectCaseStudy({ project, next }: ProjectCaseStudyProps) {
  const go = useTransitionLink();
  const nextHref = `/work/${next.slug}`;

  return (
    <>
      <section
        data-theme="dark"
        className="surface-dark"
        aria-labelledby="project-title"
      >
        <Container className="pt-[calc(var(--nav-h)+2.5rem)] @container lg:pt-[calc(var(--nav-h)+4rem)]">
          <FadeIn trigger="mount" delay={0.2} y={8}>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-3 label text-muted transition-colors hover:text-fg"
            >
              <ArrowRight className="rotate-180 text-[0.9em] transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              <span className="link-underline">Selected work</span>
            </Link>
          </FadeIn>

          <div className="mt-12 flex items-center gap-5 sm:gap-8 lg:mt-16">
            <FadeIn trigger="mount" delay={0.3} y={8} className="flex shrink-0 items-center gap-3">
              <Label tone="fg">{project.index}</Label>
              <Label>— {project.category}</Label>
            </FadeIn>
            <LineReveal trigger="mount" delay={0.4} className="flex-1" />
          </div>

          <RevealText
            as="h1"
            id="project-title"
            trigger="mount"
            delay={0.4}
            lines={project.titleLines}
            className="mt-8 text-display-xl uppercase lg:mt-12"
          />

          <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-16">
            <FadeIn
              as="p"
              trigger="mount"
              delay={0.85}
              className="col-span-12 max-w-2xl text-lede text-muted lg:col-span-6"
            >
              {project.summary}
            </FadeIn>
            <FadeIn trigger="mount" delay={0.95} className="col-span-12 lg:col-span-5 lg:col-start-8">
              <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm sm:grid-cols-3">
                <div>
                  <dt className="label text-muted-2">Role</dt>
                  <dd className="mt-2 text-fg">{project.role}</dd>
                </div>
                <div>
                  <dt className="label text-muted-2">Period</dt>
                  <dd className="mt-2 text-fg">{project.year}</dd>
                </div>
                <div>
                  <dt className="label text-muted-2">Type</dt>
                  <dd className="mt-2 text-fg">{project.type}</dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </Container>

        <Container className="mt-16 lg:mt-24">
          <FadeIn trigger="mount" delay={1.05} y={40}>
            <ProjectVisual kind={project.visual} ratio="wide" />
          </FadeIn>
        </Container>

        <Container className="py-24 lg:py-32">
          <div className="flex items-center gap-6">
            <Label>Case study</Label>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <Label className="hidden sm:block">Problem → System → Engineering → Result</Label>
          </div>
          <CaseStudyGrid project={project} className="mt-8" />
        </Container>
      </section>

      {project.pipeline ? (
        <section data-theme="dark" className="surface-elevated border-y border-line" aria-label="System flow">
          <Container className="pt-24 lg:pt-32">
            <div className="flex items-center gap-5 sm:gap-8">
              <FadeIn y={8} className="flex shrink-0 items-center gap-3">
                <Label tone="fg">Flow</Label>
                <Label>— How the system runs</Label>
              </FadeIn>
              <LineReveal className="flex-1" />
            </div>
            <RevealText
              as="h2"
              lines={["Seven stages,", "one workflow."]}
              className="mt-8 text-display-lg uppercase lg:mt-12"
            />
          </Container>
          <CaseStudyPipeline stages={project.pipeline} />
          <div className="h-24 lg:h-0" />
        </section>
      ) : null}

      {/* Next */}
      <section data-theme="dark" className="surface-dark border-t border-line">
        <Link
          href={nextHref}
          onClick={go(nextHref, { label: next.title, index: next.index })}
          data-cursor="label"
          data-cursor-label="Next"
          className="group block"
          aria-label={`Next case study: ${next.title}`}
        >
          <Container className="py-24 lg:py-32">
            <FadeIn className="flex items-center gap-4">
              <Label>Next case study</Label>
              <Label tone="fg">{next.index}</Label>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-8 flex items-end justify-between gap-6">
              <h2 className="text-display-xl uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
                {next.title}
              </h2>
              <ArrowRight className="mb-[0.15em] hidden text-display-md text-muted transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-fg sm:block" />
            </FadeIn>
            <FadeIn as="p" delay={0.15} className="mt-6 text-lede text-muted">
              {next.category}
            </FadeIn>
          </Container>
        </Link>
      </section>
    </>
  );
}
