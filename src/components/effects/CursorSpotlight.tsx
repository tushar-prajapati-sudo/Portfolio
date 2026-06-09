import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Global custom cursor + spotlight.
 *
 * - A crisp dot tracks the pointer 1:1.
 * - A ring follows on a spring and swells over interactive elements.
 * - A large, screen-blended amber glow trails behind. By default it's wide,
 *   soft and blurry; over a clickable element it narrows, sharpens and
 *   intensifies to signal interactivity.
 *
 * Position is driven by framer motion values (smooth follow); the focus/press
 * states are driven by plain inline styles + CSS transitions on inner divs, so
 * position transforms and state transforms never fight.
 *
 * Only engages on fine pointers (mouse/trackpad); touch devices render nothing.
 */
export function CursorSpotlight({ light = false }: { light?: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const spotX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const spotY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  const dotX = useTransform(x, (v) => v - 4);
  const dotY = useTransform(y, (v) => v - 4);
  const ringTX = useTransform(ringX, (v) => v - 18);
  const ringTY = useTransform(ringY, (v) => v - 18);
  const spotTX = useTransform(spotX, (v) => v - 260);
  const spotTY = useTransform(spotY, (v) => v - 260);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], [data-cursor], input, textarea, select"
      );
      setHovering(!!el);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient spotlight — position (outer) + focus state (inner). */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[520px] w-[520px]"
        style={{ x: spotTX, y: spotTY }}
      >
        <div
          className="h-full w-full rounded-full transition-all duration-300 ease-out"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--spot-color) / 0.2), transparent 66%)",
            transform: `scale(${hovering ? 0.46 : 1})`,
            filter: hovering ? "blur(2px)" : "blur(28px)",
            opacity: hovering ? 1 : 0.82,
            mixBlendMode: light ? "multiply" : "screen",
          }}
        />
      </motion.div>

      {/* Ring. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringTX, y: ringTY }}
      >
        <div
          className="h-9 w-9 rounded-full border border-primary/70 transition-all duration-200 ease-out"
          style={{
            transform: `scale(${down ? 0.7 : hovering ? 1.9 : 1})`,
            opacity: hovering ? 0.95 : 0.55,
          }}
        />
      </motion.div>

      {/* Core dot. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className="h-2 w-2 rounded-full bg-primary transition-transform duration-200 ease-out"
          style={{ transform: `scale(${hovering ? 0 : down ? 0.6 : 1})` }}
        />
      </motion.div>
    </>
  );
}
