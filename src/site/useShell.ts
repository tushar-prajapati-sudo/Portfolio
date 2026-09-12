import { useEffect, useState } from "react";
import { stages } from "@/site/data";

/** Scroll distance over which the hero docks into the left panel. */
const DOCK_RANGE = 280;
/** Below this width the split layout is off entirely. */
const SPLIT_AT = 1040;

/**
 * Writes scroll progress (0→1) to `--p` on the shell element and mirrors it as
 * `data-docked`. Everything the progress drives is a transform or an opacity,
 * so the motion runs on the compositor rather than re-laying-out each frame.
 */
export function useDockProgress(ref: React.RefObject<HTMLElement>) {
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wide = window.matchMedia(`(min-width: ${SPLIT_AT}px)`);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = -1;

    const apply = () => {
      raf = 0;
      if (!wide.matches) {
        el.style.removeProperty("--p");
        el.dataset.docked = "false";
        if (last !== 0) setDocked(false);
        last = 0;
        return;
      }
      const raw = Math.min(1, Math.max(0, window.scrollY / DOCK_RANGE));
      // Reduced motion gets the end states without the travel between them.
      const p = still.matches ? (raw > 0.4 ? 1 : 0) : raw;
      if (p !== last) {
        el.style.setProperty("--p", String(p));
        const d = p > 0.5;
        el.dataset.docked = d ? "true" : "false";
        setDocked((prev) => (prev === d ? prev : d));
        last = p;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return docked;
}

/** True once the split layout is in play. */
export function useIsWide() {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(min-width: ${SPLIT_AT}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SPLIT_AT}px)`);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/** Which section is currently in view — shared by the top bar and the rail. */
export function useCurrentStage() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const targets = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return current;
}
