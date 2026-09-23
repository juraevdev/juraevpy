"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { PipelineStage } from "@/data/projects";
import { cn, pad } from "@/lib/utils";
import { EASE_OUT_EXPO, EASE_OUT_QUART } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";

type CaseStudyPipelineProps = {
  stages: PipelineStage[];
};

const VH_PER_STAGE = 34;

/**
 * Desktop: a sticky pipeline whose connecting line draws and whose nodes activate as the
 * user scrolls through a tall track. The current stage is explained beneath.
 * Mobile: the same pipeline laid out vertically with in-view activation.
 */
export function CaseStudyPipeline({ stages }: CaseStudyPipelineProps) {
  return (
    <>
      <StickyPipeline stages={stages} />
      <VerticalPipeline stages={stages} />
    </>
  );
}

function StickyPipeline({ stages }: CaseStudyPipelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);
  const smooth = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.4 });

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    setActive(idx);
  });

  const stage = stages[active];

  return (
    <div
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `${stages.length * VH_PER_STAGE + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <Container>
          <div className="flex items-center justify-between">
            <Label>System flow · scroll to advance</Label>
            <Label className="mono-num">
              <span className="text-fg">{pad(active + 1)}</span> / {pad(stages.length)}
            </Label>
          </div>

          {/* Nodes + line */}
          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-line" />
            <motion.div
              className="absolute left-0 right-0 top-[7px] h-px origin-left bg-fg"
              style={{ scaleX: smooth }}
            />
            <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
              {stages.map((s, i) => {
                const reached = i <= active;
                const isActive = i === active;
                return (
                  <li key={s.id} className={cn("flex flex-col gap-5", i === stages.length - 1 && "items-end text-right")}>
                    <span
                      className={cn(
                        "relative block h-[15px] w-[15px] rounded-full border bg-bg transition-colors duration-500",
                        reached ? "border-fg" : "border-line-strong",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute inset-[3px] rounded-full bg-fg transition-transform duration-500 ease-out-expo",
                          reached ? "scale-100" : "scale-0",
                        )}
                      />
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-fg animate-ring" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "label transition-colors duration-500",
                        isActive ? "text-fg" : reached ? "text-muted" : "text-muted-2",
                      )}
                    >
                      {s.name}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Current stage */}
          <div className="mt-20 grid grid-cols-12 gap-x-6">
            <div className="col-span-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  className="block mono-num text-display-xl text-fg"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="col-span-5 col-start-4 min-h-[9rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
                >
                  <h3 className="text-display-md uppercase">{stage.name}</h3>
                  <p className="mt-6 max-w-xl text-lede text-muted">{stage.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stage spec */}
            <div className="col-span-3 col-start-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.dl
                  key={`${stage.id}-spec`}
                  className="border-t border-line font-mono text-[0.75rem] tracking-wide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT_QUART }}
                >
                  {(
                    [
                      ["Input", stage.io.input],
                      ["Process", stage.io.process],
                      ["Output", stage.io.output],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-3">
                      <dt className="label-sm text-muted-2">{k}</dt>
                      <dd className="text-fg">{v}</dd>
                    </div>
                  ))}
                </motion.dl>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function VerticalPipeline({ stages }: CaseStudyPipelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });

  return (
    <Container className="mt-16 lg:hidden">
      <Label>System flow</Label>
      <ol ref={listRef} className="relative mt-8">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
        <motion.div
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-fg"
          style={{ scaleY: scrollYProgress }}
        />
        {stages.map((s, i) => (
          <motion.li
            key={s.id}
            className="relative grid grid-cols-[15px_1fr] gap-x-6 pb-12 last:pb-0"
            initial={{ opacity: 0.35 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-35% 0px -35% 0px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative mt-1 block h-[15px] w-[15px] rounded-full border border-fg bg-bg">
              <span className="absolute inset-[3px] rounded-full bg-fg" />
            </span>
            <div>
              <div className="flex items-center gap-3">
                <Label size="sm">{pad(i + 1)}</Label>
                <h3 className="text-display-sm uppercase">{s.name}</h3>
              </div>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.7rem] tracking-wide text-muted-2">
                <div className="flex gap-2">
                  <dt>in →</dt>
                  <dd className="text-muted">{s.io.input}</dd>
                </div>
                <div className="flex gap-2">
                  <dt>out →</dt>
                  <dd className="text-muted">{s.io.output}</dd>
                </div>
              </dl>
            </div>
          </motion.li>
        ))}
      </ol>
    </Container>
  );
}
