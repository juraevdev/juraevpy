"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  magnetic?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
};

const base =
  "group relative inline-flex items-center gap-4 rounded-[2px] label whitespace-nowrap transition-[background-color,color,border-color] duration-500 ease-out-expo select-none";

const variants = {
  primary: "bg-fg text-bg hover:bg-fg-strong",
  secondary: "border border-line-strong text-fg hover:border-fg",
  ghost: "text-fg hover:text-muted",
};

const sizes = {
  md: "h-12 px-6",
  lg: "h-14 px-8 lg:h-16 lg:px-10",
};

/**
 * Editorial button: mono uppercase label, arrow that shifts on hover,
 * magnetic pull on desktop, cursor expands over it.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  magnetic = true,
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
          "text-[0.85em]",
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

  const anchor = isExternal ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={classes}
      data-cursor="button"
      onClick={onClick}
      {...rest}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} data-cursor="button" onClick={onClick} {...rest}>
      {content}
    </Link>
  );

  if (!magnetic) return anchor;
  return <MagneticElement strength={0.25}>{anchor}</MagneticElement>;
}
