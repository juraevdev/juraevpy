"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { EASE_OUT_EXPO, EASE_OUT_QUART } from "@/lib/motion";

const SPINE_X = 120;
const BRANCH_X = 330;
const START = 0.9; // seconds — after the headline begins revealing

type Node = {
  id: string;
  label: string;
  sub: string;
  y: number;
  branch?: { label: string; sub: string };
};

const NODES: Node[] = [
  { id: "client", label: "Client", sub: "web · mobile · telegram", y: 40 },
  { id: "api", label: "API", sub: "REST · WebSockets", y: 150, branch: { label: "Auth", sub: "JWT · permissions" } },
  { id: "services", label: "Services", sub: "domain logic", y: 260, branch: { label: "Queue", sub: "Celery · Redis" } },
  { id: "db", label: "Database", sub: "PostgreSQL", y: 370, branch: { label: "Cache", sub: "Redis" } },
  { id: "ai", label: "AI", sub: "LLM · tool calling", y: 480, branch: { label: "Tools", sub: "functions · agents" } },
  { id: "automation", label: "Automation", sub: "workers · schedules", y: 590, branch: { label: "Integrations", sub: "Telegram · webhooks" } },
];

const REGIONS = [
  { label: "Edge", y: 95 },
  { label: "Application", y: 315 },
  { label: "Data · Intelligence", y: 630 },
];

const mono = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

/**
 * Abstract system architecture: a vertical spine (CLIENT → … → AUTOMATION) with
 * supporting branches. Draws itself on load; packets travel the spine afterwards.
 */
export function HeroSystemGraphic() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  // Pointer-driven tilt (desktop only)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 120, damping: 20 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || reduced || !wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const spinePath = `M ${SPINE_X} ${NODES[0].y} V ${NODES[NODES.length - 1].y}`;

  return (
    <div
      ref={wrapperRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[30rem]"
      style={{ perspective: 1400 }}
      aria-label="System architecture: client, API, services, database, AI, automation"
      role="img"
    >
      <motion.svg
        viewBox="0 0 480 630"
        className="h-auto w-full overflow-visible text-fg"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: START - 0.2 }}
      >
        <defs>
          <path id="hero-spine" d={spinePath} />
        </defs>

        {/* Region separators */}
        {REGIONS.map((r, i) => (
          <motion.g
            key={r.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: START + 0.4 + i * 0.2 }}
          >
            {i < REGIONS.length - 1 && (
              <line
                x1="0"
                x2="480"
                y1={r.y}
                y2={r.y}
                stroke="var(--line)"
                strokeDasharray="2 6"
              />
            )}
            <text
              x="478"
              y={(i === 0 ? 0 : REGIONS[i - 1].y) + 16}
              textAnchor="end"
              fontSize="8.5"
              fill="var(--muted-2)"
              style={mono}
            >
              {r.label}
            </text>
          </motion.g>
        ))}

        {/* Spine */}
        <motion.path
          d={spinePath}
          stroke="var(--line-strong)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.9, ease: EASE_OUT_QUART, delay: START }}
        />

        {/* Branches */}
        {NODES.map((n, i) =>
          n.branch ? (
            <motion.g
              key={`${n.id}-branch`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: START + 1.6 + i * 0.12 }}
            >
              <motion.line
                x1={SPINE_X + 6}
                x2={BRANCH_X - 4}
                y1={n.y}
                y2={n.y}
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="2 6"
                className={reduced ? undefined : "animate-dash-flow"}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <rect
                x={BRANCH_X - 4}
                y={n.y - 4}
                width="8"
                height="8"
                fill="var(--bg)"
                stroke="var(--muted-2)"
                strokeWidth="1"
              />
              <text x={BRANCH_X + 14} y={n.y + 3.5} fontSize="10" fill="var(--muted)" style={mono}>
                {n.branch.label}
              </text>
              <text
                x={BRANCH_X + 14}
                y={n.y + 16}
                fontSize="8.5"
                fill="var(--muted-2)"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
              >
                {n.branch.sub}
              </text>
            </motion.g>
          ) : null,
        )}

        {/* Main nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: START + 0.2 + i * 0.3 }}
          >
            <circle cx={SPINE_X} cy={n.y} r="5" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1" />
            <circle cx={SPINE_X} cy={n.y} r="1.75" fill="var(--fg)" />
            <text
              x={SPINE_X - 18}
              y={n.y + 3.5}
              textAnchor="end"
              fontSize="12.5"
              fill="var(--fg)"
              style={mono}
            >
              {n.label}
            </text>
            <text
              x={SPINE_X - 18}
              y={n.y + 17}
              textAnchor="end"
              fontSize="8.5"
              fill="var(--muted-2)"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
            >
              {n.sub}
            </text>
          </motion.g>
        ))}

        {/* Packets travelling the spine (SMIL — zero JS per frame) */}
        {!reduced && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: START + 2.4, duration: 0.6 }}>
            <circle r="2.5" fill="var(--fg)">
              <animateMotion dur="7s" repeatCount="indefinite" begin={`${START + 2.4}s`} calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
                <mpath href="#hero-spine" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--muted)">
              <animateMotion dur="7s" repeatCount="indefinite" begin={`${START + 5.9}s`} calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.55 1">
                <mpath href="#hero-spine" />
              </animateMotion>
            </circle>
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}

/** Compact flow for small screens: the same story as a single line. */
export function HeroSystemFlowCompact() {
  return (
    <motion.ol
      className="flex flex-wrap items-center gap-x-3 gap-y-2 label text-muted"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: START + 0.6 } } }}
      aria-label="System flow"
    >
      {NODES.map((n, i) => (
        <motion.li
          key={n.id}
          className="flex items-center gap-3"
          variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full border border-fg" />
            <span className="text-fg">{n.label}</span>
          </span>
          {i < NODES.length - 1 && <span aria-hidden>→</span>}
        </motion.li>
      ))}
    </motion.ol>
  );
}
