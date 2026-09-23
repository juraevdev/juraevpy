"use client";

import Link from "next/link";
import { featuredProject } from "@/data/projects";
import { useTransitionLink } from "@/components/PageTransition";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { CaseStudyPipeline } from "@/components/projects/CaseStudyPipeline";
import { CaseStudyGrid } from "@/components/projects/CaseStudyGrid";

export function FeaturedCaseStudy() {
  const project = featuredProject;
  const go = useTransitionLink();
  const href = `/work/${project.slug}`;

  return (
    <section
      id="case-study"
      data-theme="dark"
      className="surface-elevated border-y border-line"
      aria-labelledby="case-study-title"
    >
      <Container className="pt-28 lg:pt-40">
        <SectionTitle
          index="03"
          label="Featured case study"
          id="case-study-title"
          lines={["TGAI", "Profile."]}
          meta={<Label>{project.category}</Label>}
          as="h2"
        />
        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-14">
          <FadeIn as="p" className="col-span-12 max-w-2xl text-lede text-muted lg:col-span-7">
            {project.summary} Below is the system as it runs: seven stages, each one removing a
            piece of manual work.
          </FadeIn>
          <FadeIn delay={0.1} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
              <div>
                <dt className="label text-muted-2">Role</dt>
                <dd className="mt-2 text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="label text-muted-2">Period</dt>
                <dd className="mt-2 text-fg">{project.year}</dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </Container>

      {project.pipeline ? <CaseStudyPipeline stages={project.pipeline} /> : null}

      <Container className="pb-28 lg:pb-40">
        <div className="mt-24 flex items-center gap-6 lg:mt-12">
          <Label>Case study structure</Label>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <CaseStudyGrid project={project} className="mt-8" />
        <FadeIn className="mt-12 flex justify-end">
          <Link
            href={href}
            onClick={go(href, { label: project.title, index: project.index })}
            data-cursor="label"
            data-cursor-label="Open"
            className="group inline-flex items-center gap-3 label text-fg"
          >
            <span className="link-underline">Read the full case study</span>
            <ArrowRight className="arrow-shift text-[0.9em]" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
