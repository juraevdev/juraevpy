"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { useTransitionLink } from "@/components/PageTransition";
import { Label } from "@/components/ui/Label";
import { ArrowRight } from "@/components/ui/Icons";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectVisual } from "./ProjectVisual";

type ProjectRowProps = {
  project: Project;
  flip?: boolean;
  onEnter?: (index: number) => void;
  position: number;
};

/**
 * Editorial project block: one project, a lot of space.
 * The whole row is the link; hover shifts the title, scales the visual, and the cursor says VIEW CASE.
 */
export function ProjectRow({ project, flip = false, onEnter, position }: ProjectRowProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const go = useTransitionLink();
  const href = `/work/${project.slug}`;

  useEffect(() => {
    if (inView) onEnter?.(position);
  }, [inView, onEnter, position]);

  return (
    <article ref={ref} className="border-t border-line">
      <Link
        href={href}
        onClick={go(href, { label: project.title, index: project.index })}
        data-cursor="label"
        data-cursor-label="View case"
        aria-label={`${project.title} — ${project.category}. Open case study`}
        className="group grid grid-cols-12 items-center gap-x-6 gap-y-10 py-14 outline-none lg:py-24 focus-visible:[&_h3]:underline"
      >
        {/* Copy */}
        <div className={cn("col-span-12 @container lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
          <FadeIn className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Label tone="fg">{project.index}</Label>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <Label>{project.category}</Label>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="mt-8 text-display-lg uppercase transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
              {project.title}
            </h3>
          </FadeIn>

          <FadeIn as="p" delay={0.1} className="mt-6 max-w-md text-lede text-muted">
            {project.summary}
          </FadeIn>

          <FadeIn delay={0.15}>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="label text-muted-2">Problem</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg">{project.problemShort}</dd>
              </div>
              <div>
                <dt className="label text-muted-2">Outcome</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg">{project.outcomeShort}</dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2 label text-muted" aria-label="Technology">
              {project.stack.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  {s}
                  {i < project.stack.length - 1 && (
                    <span aria-hidden className="text-muted-2">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <span className="mt-10 inline-flex items-center gap-3 label text-fg">
              <span className="link-underline">View case study</span>
              <ArrowRight className="arrow-shift text-[0.9em]" />
            </span>
          </FadeIn>
        </div>

        {/* Visual */}
        <FadeIn
          delay={0.1}
          y={32}
          className={cn("col-span-12 lg:col-span-7", flip && "lg:order-1 lg:col-start-1")}
        >
          <div className="overflow-hidden rounded-[2px]">
            <div className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.025]">
              <ProjectVisual kind={project.visual} />
            </div>
          </div>
        </FadeIn>
      </Link>
    </article>
  );
}
