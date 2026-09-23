"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import { pad } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectRow } from "@/components/projects/ProjectRow";

export function SelectedWorks() {
  const [current, setCurrent] = useState(0);
  const onEnter = useCallback((i: number) => setCurrent(i), []);

  return (
    <section id="work" data-theme="dark" className="surface-dark" aria-labelledby="work-title">
      <Container className="py-28 lg:py-40">
        <SectionTitle
          index="02"
          label="Selected work"
          id="work-title"
          lines={["Selected", "work."]}
          meta={<Label>{projects.length} case studies · 2024 — 2026</Label>}
          as="h2"
        />

        <div className="relative mt-20 lg:mt-28">
          {/* Sticky index in the left gutter (decorative) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 hidden xl:block"
            style={{ left: "calc(var(--gutter) * -1 + var(--gutter) / 2)" }}
          >
            <div className="sticky top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-3 bg-bg px-2 py-3 label text-muted [writing-mode:vertical-rl]">
                <span className="relative block h-[1.1em] w-[2ch] overflow-hidden text-fg">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={current}
                      className="absolute inset-0"
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      {pad(current + 1)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span>/ {pad(projects.length)}</span>
              </div>
            </div>
          </div>

          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              flip={i % 2 === 1}
              position={i}
              onEnter={onEnter}
            />
          ))}
          <div className="border-t border-line" />
        </div>
      </Container>
    </section>
  );
}
