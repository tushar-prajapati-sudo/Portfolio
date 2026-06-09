import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Align = "left" | "right" | "center";
type Width = "sm" | "md" | "lg" | "full";

const WIDTH: Record<Width, string> = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  full: "max-w-none",
};

/**
 * A full-height scene whose content *zooms* in as it arrives and *zooms*
 * back out as it leaves — so scrolling reads as moving through depth, not
 * sliding down. Progress is spring-smoothed for buttery motion. The panel is
 * offset left/right (asymmetry on purpose) and frosted, so the pinned robot
 * glows through and around it.
 *
 * The <section> ignores pointer events; only the panel captures them, which
 * keeps the robot interactive wherever content isn't.
 */
export function ZoomSection({
  id,
  align = "center",
  width = "md",
  panel = true,
  className,
  children,
}: {
  id?: string;
  align?: Align;
  width?: Width;
  panel?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });

  // Aggressive zoom: content rushes in from far, then recedes.
  const scale = useTransform(p, [0, 0.32, 0.7, 1], [0.55, 1, 1, 0.78]);
  const opacity = useTransform(p, [0, 0.24, 0.78, 1], [0, 1, 1, 0.1]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "pointer-events-none relative flex min-h-screen items-center px-6 py-24 md:px-12",
        className
      )}
    >
      <motion.div
        style={{ scale, opacity }}
        className={cn(
          "pointer-events-auto w-full will-change-transform",
          WIDTH[width],
          align === "left" && "mr-auto",
          align === "right" && "ml-auto",
          align === "center" && "mx-auto",
          panel && "glass p-7 sm:p-10 md:p-12"
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}
