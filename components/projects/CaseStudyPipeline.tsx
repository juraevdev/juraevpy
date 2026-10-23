import type { PipelineStage } from "@/data/projects";
import { cn, roman } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";

type CaseStudyPipelineProps = {
  stages: PipelineStage[];
  className?: string;
};

/** The system's stages in order: name, what happens, and what goes in and comes out. */
export function CaseStudyPipeline({ stages, className }: CaseStudyPipelineProps) {
  return (
    <ol className={cn("border-t border-line", className)}>
      {stages.map((s, i) => (
        <FadeIn
          as="li"
          key={s.id}
          className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-3 border-b border-line py-8 md:grid-cols-[3rem_14rem_1fr] md:gap-x-8"
        >
          <span className="font-serif text-xl italic text-muted-2">{roman(i + 1)}</span>
          <h3 className="font-serif text-2xl leading-snug">{s.name}</h3>
          <div className="col-start-2 md:col-start-3">
            <p className="max-w-measure text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-2">In</dt>
                <dd className="text-fg">{s.io.input}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-2">Out</dt>
                <dd className="text-fg">{s.io.output}</dd>
              </div>
            </dl>
          </div>
        </FadeIn>
      ))}
    </ol>
  );
}
