"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { VisualFrame, type VisualRatio } from "./VisualFrame";

const ROUTES = [
  { id: "r1", d: "M 40 120 L 140 60 L 260 70 L 360 30", label: "R-104", active: true },
  { id: "r2", d: "M 60 150 L 180 130 L 300 110 L 400 140", label: "R-117", active: false },
  { id: "r3", d: "M 30 40 L 120 90 L 220 160 L 380 170", label: "R-121", active: false },
];

const ROWS = [
  { order: "#2481", route: "Hub A → Depot 3", driver: "D-07", status: "In transit", live: true },
  { order: "#2482", route: "Hub A → Site 12", driver: "D-02", status: "Assigned", live: false },
  { order: "#2479", route: "Depot 3 → Hub B", driver: "D-11", status: "Loading", live: false },
  { order: "#2476", route: "Hub B → Site 08", driver: "D-04", status: "Delivered", live: false },
];

const item = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const } },
};

/** Logistics dispatcher: route map above, live dispatch board below. */
export function CaravanVisual({ ratio }: { ratio?: VisualRatio }) {
  const reduced = useReducedMotion();

  return (
    <VisualFrame title="caravan / dispatch" meta="3 routes · 4 orders" ratio={ratio}>
      <motion.div
        className="flex h-full flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
      >
        {/* Map */}
        <div className="relative min-h-0 flex-[1.15] border-b border-white/10">
          <svg viewBox="0 0 440 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              {ROUTES.map((r) => (
                <path key={r.id} id={`caravan-${r.id}`} d={r.d} />
              ))}
            </defs>
            {ROUTES.map((r, i) => (
              <motion.g
                key={r.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              >
                <motion.path
                  d={r.d}
                  fill="none"
                  stroke={r.active ? "#f5f5f5" : "rgba(255,255,255,0.25)"}
                  strokeWidth={r.active ? 1.25 : 1}
                  strokeDasharray={r.active ? undefined : "3 5"}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                />
                {/* endpoints */}
                {(() => {
                  const nums = r.d.match(/[\d.]+/g)!.map(Number);
                  const [x0, y0] = [nums[0], nums[1]];
                  const [x1, y1] = [nums[nums.length - 2], nums[nums.length - 1]];
                  return (
                    <>
                      <rect x={x0 - 3} y={y0 - 3} width="6" height="6" fill="#0a0a0a" stroke="#a0a0a0" vectorEffect="non-scaling-stroke" />
                      <circle cx={x1} cy={y1} r="3" fill="#0a0a0a" stroke={r.active ? "#f5f5f5" : "#a0a0a0"} vectorEffect="non-scaling-stroke" />
                      <text x={x1 + 8} y={y1 + 3} fontSize="8" fill="#666" fontFamily="var(--font-mono)" letterSpacing="0.1em">
                        {r.label}
                      </text>
                    </>
                  );
                })()}
              </motion.g>
            ))}
            {!reduced && (
              <circle r="3" fill="#f5f5f5">
                <animateMotion dur="6s" repeatCount="indefinite" begin="1.5s" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1">
                  <mpath href="#caravan-r1" />
                </animateMotion>
              </circle>
            )}
          </svg>
          <div className="absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#666] lg:left-4">
            Live map · region 02
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#a0a0a0] lg:right-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5f5f5] animate-pulse-dot" />
            D-07 · moving
          </div>
        </div>

        {/* Dispatch board */}
        <div className="flex-1 p-3 lg:p-4">
          <div className="grid grid-cols-[20%_1fr_16%_24%] gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#666]">
            <span>Order</span>
            <span>Route</span>
            <span>Driver</span>
            <span>Status</span>
          </div>
          <ul className="mt-2 flex flex-col">
            {ROWS.map((row) => (
              <motion.li
                key={row.order}
                variants={item}
                className="grid grid-cols-[20%_1fr_16%_24%] items-center gap-2 border-t border-white/10 py-1.5 font-mono text-[9px] tracking-wide text-[#d4d4d4]"
              >
                <span className="text-[#a0a0a0]">{row.order}</span>
                <span className="truncate">{row.route}</span>
                <span className="text-[#a0a0a0]">{row.driver}</span>
                <span className="flex items-center gap-1.5 truncate">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      row.live ? "bg-[#f5f5f5] animate-pulse-dot" : "border border-[#666]",
                      row.status === "Delivered" && "border-0 bg-[#666]",
                    )}
                  />
                  <span className={cn("truncate", !row.live && "text-[#a0a0a0]")}>{row.status}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </VisualFrame>
  );
}
