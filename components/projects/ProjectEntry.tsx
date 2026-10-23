import Link from "next/link";
import type { Project } from "@/data/projects";
import { pad } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectVisual } from "./ProjectVisual";

type ProjectEntryProps = {
  project: Project;
  number: number;
};

/** A lookbook page: the plate, then a centred caption. The whole entry is the link. */
export function ProjectEntry({ project, number }: ProjectEntryProps) {
  const no = `N° ${pad(number)}`;

  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.title} — ${project.category}. Open case study`}
        className="group mx-auto block max-w-[60rem] outline-none focus-visible:[&_h3]:underline"
      >
        <FadeIn>
          <ProjectVisual kind={project.visual} ratio="lookbook" />
        </FadeIn>

        <FadeIn className="mt-10 grid items-baseline gap-y-3 text-center md:grid-cols-[1fr_auto_1fr] md:gap-x-8 lg:mt-12">
          <span className="eyebrow text-muted md:hidden">
            {no} · {project.year}
          </span>
          <span className="eyebrow hidden text-muted md:block md:text-left">{no}</span>
          <div>
            <h3 className="text-display-md">{project.title}</h3>
            <p className="mx-auto mt-3 max-w-[30rem] font-serif text-lg italic leading-snug text-muted">
              {project.category}
            </p>
          </div>
          <span className="eyebrow hidden text-muted md:block md:text-right">{project.year}</span>
        </FadeIn>

        <p className="mt-6 text-center">
          <span className="eyebrow link-underline text-fg">View case study</span>
        </p>
      </Link>
    </article>
  );
}
