import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Text link with drawing underline and a nudging arrow. */
export function ArrowLink({ href, children, className, external, onClick }: ArrowLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const Arrow = isExternal ? ArrowUpRight : ArrowRight;
  const classes = cn("group inline-flex items-center gap-2 label text-fg", className);

  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <Arrow className={cn("text-[0.9em]", isExternal ? "arrow-shift-diag" : "arrow-shift")} />
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
