"use client";

import { cn } from "@/lib/utils";

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
};

/** Two lines that become a cross. Visible below md. */
export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative -mr-2 flex h-11 w-11 items-center justify-center text-fg md:hidden"
    >
      <span
        className={cn(
          "absolute h-px w-5 bg-current transition-transform duration-500 ease-in-out-quart",
          open ? "translate-y-0 rotate-45" : "-translate-y-[3px]",
        )}
      />
      <span
        className={cn(
          "absolute h-px w-5 bg-current transition-transform duration-500 ease-in-out-quart",
          open ? "translate-y-0 -rotate-45" : "translate-y-[3px]",
        )}
      />
    </button>
  );
}
