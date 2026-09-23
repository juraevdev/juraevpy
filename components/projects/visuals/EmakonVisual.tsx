"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { VisualFrame, type VisualRatio } from "./VisualFrame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Job = { crew: number; start: number; span: number; label: string; filled?: boolean };

const JOBS: Job[] = [
  { crew: 0, start: 0, span: 2, label: "Lawn · Site 12", filled: true },
  { crew: 0, start: 3, span: 2, label: "Hedges · Oak Rd" },
  { crew: 1, start: 1, span: 3, label: "Irrigation · Phase 2", filled: true },
  { crew: 1, start: 5, span: 1, label: "Quote visit" },
  { crew: 2, start: 0, span: 1, label: "Planting" },
  { crew: 2, start: 2, span: 2, label: "Terrace · Villa 4", filled: true },
  { crew: 3, start: 1, span: 1, label: "Maintenance" },
  { crew: 3, start: 3, span: 3, label: "New garden · Plot 7", filled: true },
];

const KPIS = [
  { label: "Jobs · week", value: "28" },
  { label: "Crews", value: "04" },
  { label: "Open quotes", value: "11" },
];

const item = {
  hidden: { opacity: 0, scaleX: 0.9 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const } },
};

/** Service management: crew schedule grid with job blocks and weekly KPIs. */
export function EmakonVisual({ ratio }: { ratio?: VisualRatio }) {
  return (
    <VisualFrame title="e-makon / schedule" meta="week 38" ratio={ratio}>
      <motion.div
        className="flex h-full flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
      >
        <div className="flex min-h-0 flex-1 flex-col p-3 lg:p-4">
          {/* Day header */}
          <div className="grid grid-cols-[3.5rem_repeat(7,1fr)] gap-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#666] lg:grid-cols-[4.5rem_repeat(7,1fr)]">
            <span>Crew</span>
            {DAYS.map((d, i) => (
              <span key={d} className={cn("text-center", i === 2 && "text-[#f5f5f5]")}>
                {d}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="relative mt-2 flex min-h-0 flex-1 flex-col">
            {/* today marker */}
            <div
              className="pointer-events-none absolute inset-y-0 border-l border-dashed border-white/25"
              style={{ left: "calc(3.5rem + 0.25rem + (100% - 3.5rem - 0.25rem) * 2.5 / 7)" }}
            />
            {[0, 1, 2, 3].map((crew) => (
              <div
                key={crew}
                className="grid min-h-0 flex-1 grid-cols-[3.5rem_repeat(7,1fr)] items-center gap-1 border-t border-white/10 lg:grid-cols-[4.5rem_repeat(7,1fr)]"
              >
                <span className="font-mono text-[9px] tracking-wide text-[#a0a0a0]">
                  Crew {String.fromCharCode(65 + crew)}
                </span>
                {DAYS.map((_, day) => {
                  const job = JOBS.find((j) => j.crew === crew && j.start === day);
                  const covered = JOBS.some(
                    (j) => j.crew === crew && day > j.start && day < j.start + j.span,
                  );
                  if (covered) return null;
                  if (!job) return <span key={day} />;
                  return (
                    <motion.div
                      key={day}
                      variants={item}
                      style={{ gridColumn: `span ${job.span}`, originX: 0 }}
                      className={cn(
                        "h-[70%] min-h-[1.25rem] truncate rounded-[2px] px-1.5 font-mono text-[8px] leading-[1.25rem] tracking-wide lg:text-[9px]",
                        job.filled
                          ? "bg-[#f5f5f5] text-[#0a0a0a]"
                          : "border border-white/25 text-[#d4d4d4]",
                      )}
                    >
                      <span className="hidden @sm:inline">{job.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid h-12 shrink-0 grid-cols-3 border-t border-white/10">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              variants={item}
              className={cn(
                "flex items-center justify-between px-3 lg:px-4",
                i > 0 && "border-l border-white/10",
              )}
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#666]">{k.label}</span>
              <span className="font-mono text-sm tabular-nums text-[#f5f5f5]">{k.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </VisualFrame>
  );
}
