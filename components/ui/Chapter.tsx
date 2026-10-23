import { cn } from "@/lib/utils";

type ChapterProps = {
  name: string;
  children: React.ReactNode;
  className?: string;
  as?: "h3" | "h4";
};

/** A book-like spread: the chapter name in the margin, the text beside it. */
export function Chapter({ name, children, className, as: Heading = "h3" }: ChapterProps) {
  return (
    <div
      className={cn(
        "grid gap-x-12 gap-y-6 border-t border-line pt-8 md:grid-cols-[10rem_1fr] lg:pt-10",
        className,
      )}
    >
      <Heading className="eyebrow text-muted md:pt-1.5">{name}</Heading>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
