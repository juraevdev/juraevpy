"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-[2px] eyebrow whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-out-quart select-none";

const variants = {
  primary: "bg-fg text-bg hover:bg-accent",
  secondary: "border border-line-strong text-fg hover:border-fg",
  ghost: "text-fg hover:text-muted",
};

const sizes = {
  md: "h-11 px-6",
  lg: "h-13 px-8",
};

/** Quiet button: small capitals, arrow that shifts slightly on hover. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  onClick,
  ...rest
}: ButtonProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const Arrow = isExternal ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span>{children}</span>
      <Arrow
        className={cn(
          "text-[1.1em]",
          isExternal ? "arrow-shift-diag" : "arrow-shift",
        )}
      />
    </>
  );

  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" ? "h-auto px-0" : sizes[size],
    className,
  );

  return isExternal ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} onClick={onClick} {...rest}>
      {content}
    </Link>
  );
}
