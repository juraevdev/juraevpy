import { cn } from "@/lib/utils";

type LabelProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "md";
  tone?: "muted" | "fg";
};

/** Uppercase mono micro-label used for metadata everywhere. */
export function Label({ className, size = "md", tone = "muted", ...rest }: LabelProps) {
  return (
    <span
      className={cn(
        size === "sm" ? "label-sm" : "label",
        tone === "muted" ? "text-muted" : "text-fg",
        className,
      )}
      {...rest}
    />
  );
}
