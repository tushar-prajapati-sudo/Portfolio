import { PaperShaderBackground } from "@/components/effects/PaperShaderBackground";
import { WovenLightBackground } from "@/components/effects/WovenLightBackground";
import { ShaderCanvas } from "@/components/effects/ShaderCanvas";
import { BackgroundPaths } from "@/components/effects/BackgroundPaths";
import { BackgroundBoxes } from "@/components/effects/BackgroundBoxes";
import { SHADERS, type ShaderKey } from "@/components/effects/fragments";

export type BgMode =
  | "off"
  | "stars"
  | "rings"
  | "wave"
  | "plasma"
  | "comets"
  | "prism"
  | "lines"
  | "paper"
  | "paths"
  | "boxes"
  | "woven";

export const BG_OPTIONS: { key: BgMode; label: string }[] = [
  { key: "off", label: "Off" },
  { key: "stars", label: "Stars" },
  { key: "rings", label: "Rings" },
  { key: "wave", label: "Wave" },
  { key: "plasma", label: "Plasma" },
  { key: "comets", label: "Comets" },
  { key: "prism", label: "Prism" },
  { key: "lines", label: "Lines" },
  { key: "paper", label: "Mesh" },
  { key: "paths", label: "Paths" },
  { key: "boxes", label: "Boxes" },
  { key: "woven", label: "Loom" },
];

/** Light backgrounds — the spotlight must go dark to stay visible. */
export const isLightBg = (m: BgMode) => m === "lines";

/** Per-mode scrim opacity (darkening veil over the field). */
export function scrimClass(m: BgMode): string {
  if (isLightBg(m)) return "bg-transparent";
  if (m === "off") return "bg-background/20";
  if (m === "paper") return "bg-background/45";
  if (m === "boxes") return "bg-background/25";
  if (m === "woven") return "bg-background/10";
  return "bg-background/40";
}

/** Renders ONLY the active background; switching unmounts the previous one. */
export function ActiveBackground({ mode }: { mode: BgMode }) {
  switch (mode) {
    case "off":
      return null;
    case "paper":
      return <PaperShaderBackground />;
    case "paths":
      return <BackgroundPaths />;
    case "boxes":
      return <BackgroundBoxes />;
    case "woven":
      return <WovenLightBackground />;
    default: {
      const spec = SHADERS[mode as ShaderKey];
      return spec ? <ShaderCanvas spec={spec} /> : null;
    }
  }
}
