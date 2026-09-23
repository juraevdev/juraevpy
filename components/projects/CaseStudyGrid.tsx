import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { FadeIn } from "@/components/motion/FadeIn";

type CaseStudyGridProps = {
  project: Project;
  className?: string;
};

/** PROBLEM / SYSTEM / ENGINEERING / RESULT — the structure every case study follows. */
export function CaseStudyGrid({ project, className }: CaseStudyGridProps) {
  const blocks = [
    { label: "Problem", index: "01", body: <p>{project.problem}</p> },
    { label: "System", index: "02", body: <p>{project.system}</p> },
    {
      label: "Engineering",
      index: "03",
      body: (
        <ul className="flex flex-col gap-2 font-mono text-[0.8rem] tracking-wide">
          {project.engineering.map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-3 bg-line-strong" />
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Result", index: "04", body: <p>{project.result}</p> },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 border-t border-line md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {blocks.map((b, i) => (
        <FadeIn
          key={b.label}
          delay={i * 0.08}
          className={cn(
            "flex flex-col gap-6 border-b border-line py-8 md:pr-8 lg:border-b-0 lg:py-10",
            i > 0 && "lg:border-l lg:border-line lg:pl-8",
            i % 2 === 1 && "md:border-l md:border-line md:pl-8 lg:pl-8",
          )}
        >
          <div className="flex items-center justify-between">
            <Label tone="fg">{b.label}</Label>
            <Label size="sm">{b.index}</Label>
          </div>
          <div className="text-[0.95rem] leading-relaxed text-muted [&_p]:max-w-prose">{b.body}</div>
        </FadeIn>
      ))}
    </div>
  );
}
