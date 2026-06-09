import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

export type ShaderSpec = {
  /** Full fragment shader source (WebGL1 / GLSL ES 1.00). */
  fragment: string;
  /** Name of the vec2 resolution uniform in the fragment. */
  res?: string;
  /** Name of the float time uniform in the fragment. */
  time?: string;
  /** Multiplier to match each shader's original time progression. */
  timeScale?: number;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[ShaderCanvas]", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/**
 * Lightweight raw-WebGL runner for the real 21st.dev shader fragments. Each
 * source component (mostly three.js) just renders a full-screen quad with a
 * `resolution` + `time` uniform — exactly this. Running the fragments directly
 * keeps them faithful while avoiding a stack of three.js instances. Only one
 * is ever mounted at a time (the active background).
 */
export function ShaderCanvas({
  spec,
  className,
}: {
  spec: ShaderSpec;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false }) as
        | WebGLRenderingContext
        | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, spec.fragment);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[ShaderCanvas] link", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const resLoc = spec.res ? gl.getUniformLocation(program, spec.res) : null;
    const timeLoc = spec.time ? gl.getUniformLocation(program, spec.time) : null;
    const ts = spec.timeScale ?? 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    function resize() {
      const w = Math.floor(canvas!.clientWidth * dpr);
      const h = Math.floor(canvas!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
      if (resLoc) gl!.uniform2f(resLoc, w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const start = performance.now();

    function frame(now: number) {
      if (!running) return;
      if (timeLoc) gl!.uniform1f(timeLoc, reduce ? 0 : ((now - start) / 1000) * ts);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
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
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [spec]);

  return (
    <canvas ref={ref} aria-hidden className={cn("block h-full w-full", className)} />
  );
}
