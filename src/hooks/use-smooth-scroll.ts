import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery scroll via Lenis. Smooths the wheel and drives all the
 * scroll-linked zoom animations, upgrades in-page anchor links (#section) to
 * smooth scrolls, and forces the page to load at the very top (no browser
 * scroll-restoration landing mid-hero). Disabled (native scroll) when the user
 * prefers reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Always start at the top of the hero on load/reload.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // Re-assert after late async content (Spline robot, fonts) settles.
    const onLoad = () => window.scrollTo(0, 0);
    window.addEventListener("load", onLoad);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("load", onLoad);
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.scrollTo(0, { immediate: true });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -40 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}
