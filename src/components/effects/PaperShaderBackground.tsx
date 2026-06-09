import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Background option built on Paper Shaders (@paper-design/shaders-react),
 * adapted from reuno-ui's "background-paper-shaders". The stock version is
 * black/white; this is recolored to our amber-on-dark palette — a slow,
 * molten mesh gradient.
 */
export function PaperShaderBackground() {
  return (
    <MeshGradient
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
      colors={["#040404", "#0c0803", "#1a1006", "#2a1a08"]}
      speed={0.25}
    />
  );
}
