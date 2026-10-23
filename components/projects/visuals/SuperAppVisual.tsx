"use client";

import { cn } from "@/lib/utils";
import type { SiteCopy } from "@/data/locale";
import { useLocale } from "@/hooks/useLocale";
import { VisualFrame, type VisualRatio } from "./VisualFrame";

type SuperAppCopy = SiteCopy["superapp"];

type SuperAppVisualProps = {
  ratio?: VisualRatio;
  copy?: SuperAppCopy;
};

export function SuperAppVisual({ ratio = "auto", copy }: SuperAppVisualProps) {
  const { t } = useLocale();
  const c = copy ?? t.superapp;
  const currentIdx = 2;

  return (
    <VisualFrame title={c.frameTitle} meta={c.meta} ratio={ratio} decorative>
      <div className="flex flex-col gap-4 p-4 sm:p-5 md:gap-5 md:p-6">
        <div className="rounded-2xl rounded-tl-sm border border-line bg-bg px-3.5 py-2.5">
          <p className="text-micro text-muted">{c.youLabel}</p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-fg sm:text-sm">{c.youMsg}</p>
        </div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="text-sm text-fg">{c.working}</p>
            <p className="text-micro font-medium text-accent">{c.status}</p>
          </div>
          <p className="mt-1 text-[0.8125rem] text-muted sm:text-sm">{c.modules}</p>
        </div>

        <ol className="flex flex-col border-t border-line">
          {c.steps.map((step, i) => {
            const done = i <= currentIdx;
            const current = i === currentIdx;
            return (
              <li
                key={step.label}
                className={cn(
                  "grid grid-cols-[1rem_1fr] gap-x-3 border-b border-line py-2.5",
                  i === 0 && "pt-3",
                )}
              >
                <span className="flex justify-center pt-1" aria-hidden>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      current && "bg-accent",
                      done && !current && "bg-fg",
                      !done && "border border-line-strong bg-transparent",
                    )}
                  />
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-[0.8125rem] leading-snug sm:text-sm",
                      current ? "font-medium text-accent" : done ? "text-fg" : "text-muted",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-micro text-muted">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="text-micro text-muted">{c.caption}</p>
      </div>
    </VisualFrame>
  );
}
