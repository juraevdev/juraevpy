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
 * Signature "SYSTEM ONLINE" indicator: pulsing dot + local time in the owner's time zone.
 * Time renders after mount to avoid hydration drift.
 */
export function StatusIndicator({
  className,
  showTime = true,
  text = "System online",
}: StatusIndicatorProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (!showTime) return;
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: site.timezone,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [showTime]);

  return (
    <div className={cn("label flex items-center gap-3 text-muted", className)}>
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-fg animate-ring" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-fg animate-pulse-dot" />
      </span>
      <span className="text-fg">{text}</span>
      {showTime ? (
        <span className="mono-num tabular-nums" suppressHydrationWarning>
          {time ?? "--:--:--"} {site.timezoneLabel}
        </span>
      ) : null}
    </div>
  );
}
