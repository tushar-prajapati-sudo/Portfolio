import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-none border-2 font-sans font-bold uppercase tracking-wider transition-all duration-150 select-none disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  // Solid amber with a hard pixel shadow that depresses on press.
  primary:
    "border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 hover:shadow-[4px_6px_0_0_hsl(var(--primary)/0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none",
  // Outline / glassy — clearly distinct from primary.
  secondary:
    "border-foreground/25 bg-foreground/[0.03] text-foreground backdrop-blur hover:border-primary hover:bg-primary/10 hover:text-primary",
  ghost:
    "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-6 py-3.5 text-xs",
  lg: "px-8 py-4 text-sm",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  download,
  target,
  rel,
  onClick,
  type = "button",
}: Props) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (href) {
    return (
      <a
        data-cursor
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <button data-cursor type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
