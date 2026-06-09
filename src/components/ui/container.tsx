import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Centered, padded content column shared by every section. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
