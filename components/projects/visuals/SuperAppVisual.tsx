"use client";

import { motion, useReducedMotion } from "motion/react";
import { VisualFrame, type VisualRatio } from "./VisualFrame";

const CX = 220;
const CY = 110;
const R = 78;

const MODULES = ["Chat", "Tasks", "Notes", "Voice", "Calendar", "Search"].map((name, i, arr) => {
  const angle = (-90 + (360 / arr.length) * i) * (Math.PI / 180);
  return { name, x: CX + Math.cos(angle) * R * 1.55, y: CY + Math.sin(angle) * R * 0.95 };
});

const TRACE = [
  { call: "plan_week(goals=3)", result: "ok · 12ms" },
  { call: "tasks.create(×3)", result: "ok" },
  { call: "calendar.block(focus)", result: "ok" },
  { call: "notes.link(project)", result: "ok" },
];

const item = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } },
};

/** AI ecosystem: a core connected to modules, with a live tool-call trace. */
export function SuperAppVisual({ ratio }: { ratio?: VisualRatio }) {
  const reduced = useReducedMotion();

  return (
    <VisualFrame title="super.app / ai-core" meta="6 modules · tools enabled" ratio={ratio}>
      <motion.div
        className="flex h-full flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
      >
        {/* Graph */}
        <div className="relative min-h-0 flex-[1.3]">
          <svg viewBox="0 0 440 220" className="absolute inset-0 h-full w-full">
            <defs>
              {MODULES.map((m) => (
                <path key={m.name} id={`sa-${m.name}`} d={`M ${CX} ${CY} L ${m.x} ${m.y}`} />
              ))}
            </defs>

            {MODULES.map((m, i) => (
              <motion.g
                key={m.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              >
                <motion.line
                  x1={CX}
                  y1={CY}
                  x2={m.x}
                  y2={m.y}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                />
                <rect
                  x={m.x - 26}
                  y={m.y - 9}
                  width="52"
                  height="18"
                  rx="1"
                  fill="#0a0a0a"
                  stroke="rgba(255,255,255,0.3)"
                />
                <text
                  x={m.x}
                  y={m.y + 3}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#d4d4d4"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.14em"
                  style={{ textTransform: "uppercase" }}
                >
                  {m.name}
                </text>
                {!reduced && (
                  <circle r="1.75" fill="#f5f5f5">
                    <animateMotion
                      dur={`${3 + i * 0.4}s`}
                      begin={`${1.5 + i * 0.5}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1;1"
                      keyTimes="0;0.6;1"
                      calcMode="linear"
                    >
                      <mpath href={`#sa-${m.name}`} />
                    </animateMotion>
                  </circle>
                )}
              </motion.g>
            ))}

            {/* Core */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            >
              <circle cx={CX} cy={CY} r="30" fill="#0a0a0a" stroke="#f5f5f5" strokeWidth="1" />
              <circle
                cx={CX}
                cy={CY}
                r="38"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="2 6"
                className={reduced ? undefined : "animate-dash-flow"}
              />
              <text
                x={CX}
                y={CY - 2}
                textAnchor="middle"
                fontSize="8"
                fill="#f5f5f5"
                fontFamily="var(--font-mono)"
                letterSpacing="0.16em"
              >
                AI CORE
              </text>
              <text
                x={CX}
                y={CY + 9}
                textAnchor="middle"
                fontSize="6.5"
                fill="#666"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
              >
                plan · call · report
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Tool-call trace */}
        <div className="flex-1 border-t border-white/10 p-3 lg:p-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[#666]">
            <span>Tool calls · session 8f2c</span>
            <span>ws · connected</span>
          </div>
          <ul className="flex flex-col gap-1 font-mono text-[9px] tracking-wide">
            {TRACE.map((t) => (
              <motion.li key={t.call} variants={item} className="flex items-center justify-between gap-3">
                <span className="truncate text-[#d4d4d4]">
                  <span className="text-[#666]">› </span>
                  {t.call}
                </span>
                <span className="shrink-0 text-[#a0a0a0]">{t.result}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </VisualFrame>
  );
}
