"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { process, principles, type ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT_QUART, viewport } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

/** HOW I BUILD — five steps that activate in sequence as they cross the viewport. */
export function EngineeringProcess() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      id="approach"
      data-theme="light"
      className="theme-light surface-light"
      aria-labelledby="approach-title"
    >
      <Container className="py-28 lg:py-44">
        <SectionTitle
          index="05"
          label="Engineering approach"
          id="approach-title"
          lines={["How I build."]}
          meta={<Label>{process.length} steps · every project</Label>}
          as="h2"
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 lg:mt-28">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeIn as="p" className="max-w-sm text-lede text-fg">
                Every project runs through the same five steps. The order matters more than the
                tools — most expensive mistakes happen before the first line of code.
              </FadeIn>
              <FadeIn delay={0.1}>
                <Label size="sm" className="mt-12 block">
                  What I keep in mind
                </Label>
                <ul className="mt-4 grid grid-cols-2 gap-y-3 border-t border-line pt-5">
                  {principles.map((p) => (
                    <li key={p} className="flex items-center gap-3 label text-muted">
                      <span aria-hidden className="h-px w-3 bg-line-strong" />
                      {p}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>

          <ol ref={listRef} className="relative col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block" aria-hidden />
            <motion.div
              className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-fg lg:block"
              style={{ scaleY: line }}
              aria-hidden
            />
            {process.map((step) => (
              <Step key={step.index} step={step} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Step({ step }: { step: ProcessStep }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: DURATION.base, ease: EASE_OUT_QUART }}
      className={cn(
        "group grid grid-cols-[3.5rem_1fr] gap-x-6 border-t border-line py-10 lg:grid-cols-[6rem_1fr] lg:py-14 lg:pl-10",
      )}
    >
      <span
        className={cn(
          "mono-num text-display-md transition-colors duration-700",
          active ? "text-fg" : "text-muted-2",
        )}
      >
        {step.index}
      </span>
      <div>
        <h3 className="text-display-sm uppercase">{step.title}</h3>
        <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Outputs">
          {step.outputs.map((o) => (
            <li
              key={o}
              className={cn(
                "label transition-colors duration-700",
                active ? "text-fg" : "text-muted-2",
              )}
            >
              → {o}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
