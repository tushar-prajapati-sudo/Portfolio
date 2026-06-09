import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-written raw-WebGL fragment-shader background.
 *
 * A flowing amber field (domain-warped value noise) over near-black with
 * subtle concentric ripples and a soft glow that tracks the cursor.
 *
 * Deliberately framework-free (no three.js): one canvas, one program, a
 * single full-screen quad. It renders at a capped pixel ratio, pauses when
 * the tab is hidden, and respects `prefers-reduced-motion`.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;      // pixels
uniform float u_intensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 res = u_resolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / res.y; // aspect-correct, centered
  float t = u_time * 0.045;

  // Domain warp for the flowing field.
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 5.2));
  float n = fbm(p * 2.0 + q * 1.6 + t);

  vec3 col  = vec3(0.020, 0.021, 0.028);    // near-black base
  vec3 amber = vec3(1.0, 0.62, 0.16);        // primary
  vec3 deep  = vec3(0.30, 0.10, 0.02);       // ember

  vec3 glow = mix(deep, amber, smoothstep(0.30, 0.82, n));
  col += glow * (0.16 + 0.22 * n) * u_intensity;

  // Faint concentric ripple from center.
  float r = length(p);
  float ripple = 0.5 + 0.5 * sin(r * 16.0 - u_time * 0.7);
  col += amber * ripple * 0.012 * u_intensity;

  // Soft glow that follows the cursor.
  vec2 m = (u_mouse - 0.5 * res) / res.y;
  float md = length(p - m);
  col += amber * exp(-md * 3.5) * 0.085 * u_intensity;

  // Vignette.
  col *= smoothstep(1.25, 0.15, r);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[ShaderBackground]", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

interface ShaderBackgroundProps {
  className?: string;
  /** 0–1, overall brightness of the amber field. */
  intensity?: number;
}

export function ShaderBackground({
  className,
  intensity = 1,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false }) as
        | WebGLRenderingContext
        | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return; // graceful no-op when WebGL is unavailable

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // Full-screen quad (two triangles).
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    gl.uniform1f(uIntensity, intensity);

    // Render at a modest pixel ratio — backgrounds don't need to be crisp,
    // and this keeps the GPU light alongside the Spline robot.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const mouse = { x: 0, y: 0 };

    function resize() {
      const w = Math.floor(canvas!.clientWidth * dpr);
      const h = Math.floor(canvas!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
      gl!.uniform2f(uRes, w, h);
      mouse.x = w / 2;
      mouse.y = h / 2;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX * dpr;
      mouse.y = (window.innerHeight - e.clientY) * dpr; // flip to GL space
    }
    window.addEventListener("mousemove", onMove);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let running = true;
    const start = performance.now();

    function frame(now: number) {
      if (!running) return;
      const t = reduce ? 0 : (now - start) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      // Reduced motion: render one static frame, then idle.
      if (reduce) return;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full", className)}
    />
  );
}
