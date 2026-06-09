import { useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { SplineScene } from "@/components/ui/splite";

const ROBOT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * The robot as a persistent, right-anchored centerpiece.
 *
 * It stays pinned to the right of the viewport while the page scrolls
 * *around* it. Scroll drives an aggressive zoom (in, then back out) so
 * descending the page reads as moving through depth. It also parallaxes
 * toward the cursor. Behind content (z-0); interactive wherever content
 * doesn't cover it.
 */
export function RobotStage({ onReady }: { onReady?: () => void }) {
  const { scrollYProgress } = useScroll();

  // Aggressive zoom — smoothed by a soft spring.
  const scaleRaw = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 2.0, 1.4]);
  const scale = useSpring(scaleRaw, { stiffness: 55, damping: 22, mass: 0.6 });

  const yScrollRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0, -70, 0]);
  const yScroll = useSpring(yScrollRaw, { stiffness: 55, damping: 22 });

  // Cursor parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 18 });
  const pyMouse = useSpring(my, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(((e.clientX - cx) / cx) * 26);
      my.set(((e.clientY - cy) / cy) * 26);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const y = useTransform([yScroll, pyMouse], ([a, b]: number[]) => a + b);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ scale, x: px, y }}
        className="absolute inset-y-0 left-0 right-0 will-change-transform md:left-[32%]"
      >
        <SplineScene scene={ROBOT_SCENE} className="h-full w-full" onLoad={onReady} />
      </motion.div>
    </div>
  );
}
