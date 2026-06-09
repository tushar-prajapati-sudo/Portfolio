import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * A retro "loading" beat that plays *while you scroll through it* — the bar
 * and counter fill with scroll progress, the band stays pinned in view, then
 * releases into the next section. Adapted from a GSAP preloader concept,
 * rebuilt with framer-motion and tied to scroll (used once, as a transition).
 */
export function ScrollPreloader({ label = "LOADING" }: { label?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "100%"]);
  const pct = useTransform(scrollYProgress, [0.08, 0.92], [0, 100]);
  const [count, setCount] = useState(0);
  useMotionValueEvent(pct, "change", (v) =>
    setCount(Math.max(0, Math.min(100, Math.round(v))))
  );

  return (
    <section
      ref={ref}
      aria-hidden
      className="pointer-events-none relative h-[180vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center text-legible">
        <span className="retro-label text-[10px] text-primary">{label}</span>

        <div className="mt-6 font-pixel text-5xl text-foreground sm:text-7xl">
          {String(count).padStart(3, "0")}
          <span className="text-primary">%</span>
        </div>

        <div className="mt-8 h-5 w-64 border-2 border-primary p-1 sm:w-80">
          <motion.div
            style={{ width }}
            className="h-full bg-primary"
          />
        </div>

        <span className="retro-label mt-5 text-[8px] text-muted-foreground">
          keep scrolling
        </span>
      </div>
    </section>
  );
}
