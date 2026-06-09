import { useEffect, useRef } from "react";

/**
 * "Woven light" background (adapted from dhiluxui's woven-light-hero, which
 * uses three.js). Rebuilt with raw canvas — no three.js — for weight: a field
 * of light particles that drift and weave together with threads, reacting to
 * the cursor, on a completely black base. Amber to match the theme.
 */
export function WovenLightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let running = true;

    function frame() {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, w, h);

      for (const p of pts) {
        // Cursor attraction.
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) {
          const f = (1 - Math.sqrt(d2) / 200) * 0.04;
          p.vx += dx * f * 0.01;
          p.vy += dy * f * 0.01;
        }
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Woven threads between near particles.
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const a = (1 - dist / 130) * 0.5;
            ctx!.strokeStyle = `hsl(36 100% 60% / ${a})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(pts[i].x, pts[i].y);
            ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.stroke();
          }
        }
      }

      // Light nodes.
      for (const p of pts) {
        ctx!.fillStyle = "hsl(36 100% 65% / 0.9)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (reduce) return;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="block h-full w-full bg-black" />;
}
