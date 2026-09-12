import { useCallback, useEffect, useRef, useState } from "react";
import { useDockProgress, useCurrentStage, useIsWide } from "@/site/useShell";
import { CursorField } from "@/site/ui/CursorField";
import { StatusBar } from "@/site/sections/StatusBar";
import { Rail } from "@/site/sections/Rail";
import { HomePanel } from "@/site/sections/HomePanel";
import { StreamHead } from "@/site/sections/StreamHead";
import { About } from "@/site/sections/About";
import { Systems } from "@/site/sections/Systems";
import { RecordSection } from "@/site/sections/RecordSection";
import { Stack } from "@/site/sections/Stack";
import { Sandbox } from "@/site/sections/Sandbox";
import { Contact } from "@/site/sections/Contact";

export default function Site() {
  const shell = useRef<HTMLDivElement>(null);
  useDockProgress(shell);
  const current = useCurrentStage();
  const wide = useIsWide();

  /** Which build record is open in the left frame (or inline when narrow). */
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, close]);

  // Moving the record into the panel moves the reading position with it.
  useEffect(() => {
    if (!openId || !wide) return;
    document.getElementById(`detail-${openId}`)?.focus({ preventScroll: true });
  }, [openId, wide]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <CursorField />

      <div className="shell" ref={shell} data-docked="false">
        <StatusBar current={current} />
        <Rail current={current} />

        <main className="split" id="main">
          <HomePanel current={current} openId={wide ? openId : null} onClose={close} />
          <div className="stream">
            <StreamHead />
            <About />
            <Systems openId={openId} onOpen={setOpenId} wide={wide} />
            <RecordSection />
            <Stack />
            <Sandbox />
            <Contact />
          </div>
        </main>
      </div>
    </>
  );
}
