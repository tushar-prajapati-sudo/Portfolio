import { ShaderBackground } from "@/components/effects/ShaderBackground";
import { WovenLightBackground } from "@/components/effects/WovenLightBackground";
import { PaperShaderBackground } from "@/components/effects/PaperShaderBackground";
import { ShaderCanvas } from "@/components/effects/ShaderCanvas";
import {
  RIPPLE,
  STARS,
  WAVE,
  NEBULA,
  LINES,
  COMETS,
  PRISM,
  SAMURAI_BG,
} from "@/components/effects/fragments";

export type BgMode =
  | "off"
  | "aurora"
  | "ripple"
  | "wave"
  | "nebula"
  | "stars"
  | "comets"
  | "prism"
  | "lines"
  | "paper"
  | "woven"
  | "samurai";

export const BG_OPTIONS: { key: BgMode; label: string }[] = [
  { key: "off", label: "Off" },
  { key: "aurora", label: "Aurora" },
  { key: "ripple", label: "Ripple" },
  { key: "wave", label: "Wave" },
  { key: "nebula", label: "Nebula" },
  { key: "stars", label: "Stars" },
  { key: "comets", label: "Comets" },
  { key: "prism", label: "Prism" },
  { key: "lines", label: "Lines" },
  { key: "paper", label: "Mesh" },
  { key: "woven", label: "Loom" },
  { key: "samurai", label: "Samurai" },
];

const FRAGS: Partial<Record<BgMode, string>> = {
  ripple: RIPPLE,
  stars: STARS,
  wave: WAVE,
  nebula: NEBULA,
  lines: LINES,
  comets: COMETS,
  prism: PRISM,
  samurai: SAMURAI_BG,
};

/** Light backgrounds — the spotlight must go dark to stay visible. */
export const isLightBg = (m: BgMode) => m === "lines";

/** Per-mode scrim opacity (darkening veil over the field). */
export function scrimClass(m: BgMode): string {
  if (isLightBg(m)) return "bg-transparent";
  if (m === "off") return "bg-background/20";
  if (m === "paper") return "bg-background/45";
  if (m === "woven") return "bg-background/10";
  if (m === "samurai") return "bg-background/35";
  return "bg-background/40";
}

/** Renders ONLY the active background; switching unmounts the previous one. */
export function ActiveBackground({ mode }: { mode: BgMode }) {
  if (mode === "off") return null;
  if (mode === "aurora") return <ShaderBackground intensity={0.55} />;
  if (mode === "woven") return <WovenLightBackground />;
  if (mode === "paper") return <PaperShaderBackground />;
  const frag = FRAGS[mode];
  return frag ? <ShaderCanvas frag={frag} /> : null;
}
