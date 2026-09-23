import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

export function ArrowRight({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
      className={cn("shrink-0", className)}
      {...rest}
    >
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
      className={cn("shrink-0", className)}
      {...rest}
    >
      <path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11" />
    </svg>
  );
}

export function ArrowDown({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden
      className={cn("shrink-0", className)}
      {...rest}
    >
      <path d="M8 1.5v12M3.5 9 8 13.5 12.5 9" />
    </svg>
  );
}
