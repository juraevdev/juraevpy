"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type StatusIndicatorProps = {
  className?: string;
  showTime?: boolean;
  text?: string;
};

/**
 * Availability line: a still accent dot + local time in the owner's time zone.
 * Time renders after mount to avoid hydration drift.
 */
export function StatusIndicator({
  className,
  showTime = true,
  text = "Available for work",
}: StatusIndicatorProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!showTime) return;
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [showTime]);

  return (
    <div className={cn("label flex items-center gap-3 text-muted", className)}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
      <span className="text-fg">{text}</span>
      {showTime ? (
        <span className="mono-num tabular-nums" suppressHydrationWarning>
          {time ?? "--:--"} {site.timezoneLabel}
        </span>
      ) : null}
    </div>
  );
}
