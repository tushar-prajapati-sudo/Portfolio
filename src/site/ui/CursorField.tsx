import { useEffect, useRef } from "react";

/**
 * A CAD crosshair that tracks the pointer, with a soft light under it.
 * The surface is a measurement canvas, so a crosshair is the native cursor
 * for it. Position is written as two custom properties that feed transforms
 * only, so the whole thing composites and never lays out.
 *
 * Off for coarse pointers and for anyone who asked for reduced motion.
 */
export function CursorField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const draw = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.on = "true";
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const leave = () => {
      el.dataset.on = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-field" ref={ref} data-on="false" aria-hidden="true">
      <span className="cursor-glow" />
      <span className="cursor-h" />
      <span className="cursor-v" />
    </div>
  );
}
