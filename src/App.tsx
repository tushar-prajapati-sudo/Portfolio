import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { CursorSpotlight } from "@/components/effects/CursorSpotlight";
import { RobotStage } from "@/components/effects/RobotStage";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { NavBar } from "@/components/ui/nav-bar";
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
    return saved && BG_OPTIONS.some((o) => o.key === saved) ? saved : "woven";
  });
  useEffect(() => {
    localStorage.setItem("bg", bg);
  }, [bg]);

  // Boot loader: shown until the robot reports loaded (with a minimum display
  // and a hard cap so it never hangs).
  const [robotReady, setRobotReady] = useState(false);
  const [minDone, setMinDone] = useState(false);
  const [capDone, setCapDone] = useState(false);
  useEffect(() => {
    const t1 = window.setTimeout(() => setMinDone(true), 800);
    const t2 = window.setTimeout(() => setCapDone(true), 9000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  const loading = !((robotReady && minDone) || capDone);

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
      <RobotStage onReady={() => setRobotReady(true)} />

      {/* CRT overlays — scanlines + vignette for the cybercafé/terminal feel. */}
      <div className="crt-scanlines pointer-events-none fixed inset-0 z-40" />
      <div className="crt-vignette pointer-events-none fixed inset-0 z-40" />

      <CursorSpotlight light={light} />

      {/* Primary navigation — floating pill, fixed top-center. */}
      <NavBar />
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

      {/* Boot loader on top of everything until ready. */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
    </div>
  );
}
