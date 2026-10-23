"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TgaiLocale } from "@/data/tgai";
import { tgaiCopy } from "@/data/tgai";
import { VisualFrame, type VisualRatio } from "./VisualFrame";

type DemoPhase = "waiting" | "sent" | "rejected";

type TgaiVisualProps = {
  locale: TgaiLocale;
  ratio?: VisualRatio;
  className?: string;
};

/**
 * Interactive illustration of the approval gate.
 * Approve → Sent animation; Reject → reset. No network calls.
 */
export function TgaiVisual({ locale, ratio = "auto", className }: TgaiVisualProps) {
  const t = tgaiCopy[locale];
  const [phase, setPhase] = useState<DemoPhase>("waiting");

  useEffect(() => {
    if (phase !== "rejected") return;
    const id = window.setTimeout(() => setPhase("waiting"), 900);
    return () => window.clearTimeout(id);
  }, [phase]);

  const steps = [
    { id: "found", label: t.steps.found, active: true, dominant: false },
    { id: "drafted", label: t.steps.drafted, active: phase !== "rejected", dominant: false },
    {
      id: "needsOk",
      label: t.steps.needsOk,
      active: phase === "waiting",
      dominant: phase === "waiting",
    },
    {
      id: "sent",
      label: t.steps.sent,
      active: phase === "sent",
      dominant: phase === "sent",
    },
  ] as const;

  return (
    <VisualFrame
      title={t.frameTitle}
      meta={phase === "sent" ? t.sentMeta : t.waitingMeta}
      ratio={ratio}
      className={className}
      decorative={false}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-5 md:gap-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-bg px-3.5 py-2.5 text-[0.8125rem] leading-snug text-fg sm:text-sm">
            {t.operator}
          </p>
          <span className="shrink-0 pt-1 text-micro font-medium uppercase tracking-[0.14em] text-muted">
            {t.demoLabel}
          </span>
        </div>

        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {steps.map((step, i) => (
            <li key={step.id} className="inline-flex items-center gap-2">
              {i > 0 ? (
                <span className="text-muted" aria-hidden>
                  →
                </span>
              ) : null}
              <span
                className={cn(
                  "text-micro transition-colors duration-300",
                  step.dominant &&
                    "text-[0.8125rem] font-semibold text-accent animate-soft-pulse",
                  !step.dominant && step.active && "font-medium text-fg",
                  !step.active && "text-muted",
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>

        <div>
          <p className="text-micro text-muted">
            {t.draftTo}:{" "}
            <span className="text-fg">
              {t.recipientName},{" "}
              <span className="font-mono">{t.recipientHandle}</span>
            </span>
          </p>
          <div
            className={cn(
              "mt-2.5 rounded-lg border border-line bg-bg px-4 py-3.5 transition-opacity duration-300 md:px-5 md:py-4",
              phase === "sent" && "opacity-70",
            )}
          >
            <p className="text-[0.8125rem] leading-relaxed text-fg sm:text-sm">{t.draft}</p>
          </div>
          <p className="mt-2.5 text-micro text-muted" aria-live="polite">
            {phase === "sent"
              ? t.sentConfirm
              : phase === "rejected"
                ? t.rejectedCaption
                : t.caption}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {phase === "sent" ? (
            <button
              type="button"
              onClick={() => setPhase("waiting")}
              className="inline-flex h-11 items-center justify-center rounded-[2px] border border-line-strong px-4 text-micro font-medium text-fg transition-colors duration-200 hover:border-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
            >
              {t.tryAgain}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setPhase("sent")}
                disabled={phase === "rejected"}
                className="inline-flex h-11 min-w-[7rem] items-center justify-center rounded-[2px] bg-fg px-4 text-micro font-medium text-bg transition-colors duration-200 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:opacity-50"
              >
                {t.approve}
              </button>
              <button
                type="button"
                onClick={() => setPhase("rejected")}
                disabled={phase === "rejected"}
                className="inline-flex h-11 min-w-[5.5rem] items-center justify-center rounded-[2px] border border-line-strong px-4 text-micro font-medium text-fg transition-colors duration-200 hover:border-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:opacity-50"
              >
                {t.reject}
              </button>
            </>
          )}
        </div>
      </div>
    </VisualFrame>
  );
}
