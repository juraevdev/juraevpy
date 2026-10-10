"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { VisualFrame, Bar, type VisualRatio } from "./VisualFrame";

const CHANNELS = [
  { name: "saas_founders_uk", score: 0.94, admin: true },
  { name: "startup_ops_eu", score: 0.89, admin: true },
  { name: "devtools_growth", score: 0.83, admin: false },
  { name: "b2b_marketing", score: 0.77, admin: true },
  { name: "fintech_builders", score: 0.71, admin: false },
  { name: "product_people", score: 0.64, admin: true },
];

const COLUMNS: { name: string; cards: { admin?: boolean; tag?: string }[] }[] = [
  { name: "Discovered", cards: [{ admin: true }, { admin: true }, {}, { admin: true }] },
  { name: "Qualified", cards: [{ admin: true, tag: "draft" }, { admin: true }, { admin: true }] },
  { name: "Contacted", cards: [{ admin: true, tag: "sent" }, { admin: true, tag: "sent" }] },
  { name: "Replied", cards: [{ admin: true, tag: "reply" }] },
];

const item = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const } },
};

/** Outreach CRM: ranked channels on the left, pipeline on the right, AI draft strip below. */
export function TgaiVisual({ ratio }: { ratio?: VisualRatio }) {
  return (
    <VisualFrame title="tgai.profile / pipeline" meta="campaign 04 · live" ratio={ratio}>
      <motion.div
        className="flex h-full flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
      >
        <div className="flex min-h-0 flex-1">
          {/* Ranked channels */}
          <div className="flex w-full flex-col p-3 @md:w-[42%] @md:border-r @md:border-white/10 lg:p-4">
            <div className="mb-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[#666]">
              <span>Channels · ranked</span>
              <span>score</span>
            </div>
            <ul className="flex flex-1 flex-col gap-3 lg:gap-3.5">
              {CHANNELS.map((c, i) => (
                <motion.li key={c.name} variants={item} className="group/row">
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-wide">
                    <span className="flex items-center gap-2 truncate text-[#d4d4d4]">
                      <span className="text-[#666]">0{i + 1}</span>
                      <span className="truncate">@{c.name}</span>
                    </span>
                    <span className="tabular-nums text-[#a0a0a0]">{c.score.toFixed(2)}</span>
                  </div>
                  <div className="mt-1.5 h-px w-full bg-white/10">
                    <div
                      className="h-px bg-[#f5f5f5]/70"
                      style={{ width: `${c.score * 100}%` }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Pipeline */}
          <div className="hidden min-w-0 flex-1 gap-2 p-3 @md:flex lg:gap-3 lg:p-4">
            {COLUMNS.map((col) => (
              <div key={col.name} className="flex min-w-0 flex-1 flex-col">
                <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-[#666]">
                  <span className="truncate">{col.name}</span>
                  <span>{col.cards.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {col.cards.map((card, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className={cn(
                        "rounded-[2px] border border-white/10 bg-white/[0.03] p-2",
                        card.tag === "reply" && "border-white/40 bg-white/[0.06]",
                      )}
                    >
                      <Bar w="70%" />
                      <Bar w="45%" className="mt-1.5 bg-white/10" />
                      <div className="mt-2 flex items-center justify-between">
                        {card.admin ? (
                          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#a0a0a0]">
                            admin
                          </span>
                        ) : (
                          <span />
                        )}
                        {card.tag ? (
                          <span
                            className={cn(
                              "rounded-[1px] px-1 font-mono text-[7px] uppercase tracking-[0.12em]",
                              card.tag === "reply"
                                ? "bg-[#f5f5f5] text-[#0a0a0a]"
                                : "border border-white/20 text-[#a0a0a0]",
                            )}
                          >
                            {card.tag}
                          </span>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI draft strip */}
        <motion.div
          variants={item}
          className="flex h-8 shrink-0 items-center gap-3 border-t border-white/10 px-3 font-mono text-[9px] text-[#a0a0a0] lg:px-4"
        >
          <span className="text-[#666]">›</span>
          <span className="truncate">
            drafting outreach for <span className="text-[#f5f5f5]">@saas_founders_uk</span> · tool:
            create_draft → awaiting approval
          </span>
          <span className="ml-auto h-3 w-px bg-[#f5f5f5] animate-pulse-dot" />
        </motion.div>
      </motion.div>
    </VisualFrame>
  );
}
