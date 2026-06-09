import { useEffect, useState, type CSSProperties } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { RobotStage } from "@/components/effects/RobotStage";
import { OrbitalNav } from "@/components/effects/OrbitalNav";
import { Desktop } from "@/components/effects/Desktop";
import {
  ActiveBackground,
  scrimClass,
  isLightBg,
  BG_OPTIONS,
  type BgMode,
} from "@/components/effects/backgrounds";
import { BackgroundSwitcher } from "@/components/ui/background-switcher";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ScrollPreloader } from "@/components/sections/ScrollPreloader";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  useSmoothScroll();

  const [bg, setBg] = useState<BgMode>(() => {
    const saved = localStorage.getItem("bg") as BgMode | null;
    return saved && BG_OPTIONS.some((o) => o.key === saved) ? saved : "stars";
  });
  useEffect(() => {
    localStorage.setItem("bg", bg);
  }, [bg]);

  const light = isLightBg(bg);
  // Light backgrounds (e.g. shader lines) force a dark spotlight.
  const rootStyle: CSSProperties | undefined = light
    ? ({ "--spot-color": "0 0% 0%" } as CSSProperties)
    : undefined;

  return (
    <div className="relative min-h-screen text-foreground" style={rootStyle}>
      {/* Only the active background is mounted (others unmount → no stacked
          WebGL contexts). */}
      <div className="fixed inset-0 -z-20">
        <ActiveBackground mode={bg} />
      </div>
      {/* Per-background scrim so text stays readable. */}
      <div className={"fixed inset-0 -z-10 " + scrimClass(bg)} />

      {/* The robot: pinned, full-screen, zooms with scroll. */}
      <RobotStage />

      {/* CRT overlays — scanlines + vignette for the cybercafé/terminal feel. */}
      <div className="crt-scanlines pointer-events-none fixed inset-0 z-40" />
      <div className="crt-vignette pointer-events-none fixed inset-0 z-40" />

      <CursorSpotlight light={light} />

      {/* Quarter-disk navigation (top-right); floating apps open windows. */}
      <OrbitalNav />
      <Desktop />
      <BackgroundSwitcher value={bg} onChange={setBg} />

      {/* Content scrolls over and around the robot. */}
      <main className="pointer-events-none relative z-10">
        <Hero />
        <About />
        <Skills />
        <ScrollPreloader label="loading the work" />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </div>
  );
}
