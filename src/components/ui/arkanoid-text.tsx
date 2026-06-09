import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Headline rendered as a self-playing Arkanoid board (adapted from
 * uniquesonu's animated-hero-section). The text is sampled into pixel blocks.
 *
 * The ball bounces ONLY off the four outer walls (paddles track it there) and
 * roams freely across the whole board; as it passes over letter blocks it
 * "lights" them (a glow that decays), so the name is always visible in a dim
 * amber and flares bright where the ball travels. It deliberately does NOT
 * reflect off the letters — doing so trapped it inside the dense glyphs.
 */
export function ArkanoidText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const DIM = [120, 80, 28]; // base letter color (always visible)
    const HOT = [255, 184, 70]; // lit color

    type Block = { x: number; y: number; s: number; heat: number };
    let blocks: Block[] = [];
    let w = 0;
    let h = 0;
    const ball = { x: 0, y: 0, vx: 0, vy: 0, r: 6 };

    function build() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      if (w === 0 || h === 0) return;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return;

      let fontSize = Math.min((w * 0.82) / (text.length * 0.95), h * 0.5);
      fontSize = Math.max(22, fontSize);
      const font = `700 ${fontSize}px "Press Start 2P", monospace`;
      octx.font = font;
      const tw = Math.max(1, Math.ceil(octx.measureText(text).width));
      const th = Math.ceil(fontSize * 1.3);
      off.width = tw;
      off.height = th;
      octx.font = font;
      octx.fillStyle = "#fff";
      octx.textBaseline = "top";
      octx.fillText(text, 0, fontSize * 0.12);

      const data = octx.getImageData(0, 0, tw, th).data;
      const stepPx = Math.max(6, Math.round(fontSize / 13));
      const ox = (w - tw) / 2;
      const oy = (h - th) / 2;
      const prev = blocks;
      blocks = [];
      for (let y = 0; y < th; y += stepPx) {
        for (let x = 0; x < tw; x += stepPx) {
          if (data[(y * tw + x) * 4 + 3] > 128) {
            blocks.push({ x: ox + x, y: oy + y, s: stepPx - 1, heat: 0 });
          }
        }
      }
      ball.r = Math.max(4, stepPx * 0.5);
      // Keep the ball where it was if we already had one, else start it.
      if (prev.length === 0) {
        ball.x = w * 0.25;
        ball.y = h * 0.35;
        const sp = 2.8;
        ball.vx = sp;
        ball.vy = sp * 0.78;
      } else {
        ball.x = Math.min(Math.max(ball.x, ball.r), w - ball.r);
        ball.y = Math.min(Math.max(ball.y, ball.r), h - ball.r);
      }
    }

    build();
    if (document.fonts?.ready) document.fonts.ready.then(() => build());
    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    let raf = 0;
    let running = true;

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const b of blocks) {
        const t = b.heat;
        const r = Math.round(DIM[0] + (HOT[0] - DIM[0]) * t);
        const g = Math.round(DIM[1] + (HOT[1] - DIM[1]) * t);
        const bl = Math.round(DIM[2] + (HOT[2] - DIM[2]) * t);
        ctx!.fillStyle = `rgb(${r},${g},${bl})`;
        ctx!.fillRect(b.x, b.y, b.s, b.s);
      }
      if (reduce) return;
      // Paddles track the ball at each wall.
      ctx!.fillStyle = "hsl(36 100% 60%)";
      const pl = 52;
      const pt = 5;
      ctx!.fillRect(ball.x - pl / 2, 0, pl, pt);
      ctx!.fillRect(ball.x - pl / 2, h - pt, pl, pt);
      ctx!.fillRect(0, ball.y - pl / 2, pt, pl);
      ctx!.fillRect(w - pt, ball.y - pl / 2, pt, pl);
      // Ball with a soft glow.
      ctx!.save();
      ctx!.shadowColor = "hsl(36 100% 60%)";
      ctx!.shadowBlur = 16;
      ctx!.fillStyle = "#fff";
      ctx!.beginPath();
      ctx!.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function frame() {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!reduce) {
        // Decay every block's heat.
        for (const b of blocks) if (b.heat > 0) b.heat *= 0.95;

        ball.x += ball.vx;
        ball.y += ball.vy;
        // Bounce off the four walls only.
        if (ball.x < ball.r) {
          ball.x = ball.r;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x > w - ball.r) {
          ball.x = w - ball.r;
          ball.vx = -Math.abs(ball.vx);
        }
        if (ball.y < ball.r) {
          ball.y = ball.r;
          ball.vy = Math.abs(ball.vy);
        } else if (ball.y > h - ball.r) {
          ball.y = h - ball.r;
          ball.vy = -Math.abs(ball.vy);
        }
        // Light any blocks the ball overlaps (no reflection -> never trapped).
        const r = ball.r + 2;
        for (const b of blocks) {
          if (
            ball.x + r > b.x &&
            ball.x - r < b.x + b.s &&
            ball.y + r > b.y &&
            ball.y - r < b.y + b.s
          ) {
            b.heat = 1;
          }
        }
      }
      draw();
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
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [text]);

  return (
    <canvas ref={ref} aria-label={text} className={cn("block h-full w-full", className)} />
  );
}
