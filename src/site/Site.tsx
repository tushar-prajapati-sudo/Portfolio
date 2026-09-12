import { useRef } from "react";
import { useDockProgress, useCurrentStage } from "@/site/useShell";
import { StatusBar } from "@/site/sections/StatusBar";
import { Rail } from "@/site/sections/Rail";
import { HomePanel } from "@/site/sections/HomePanel";
import { StreamHead } from "@/site/sections/StreamHead";
import { Systems } from "@/site/sections/Systems";
import { RecordSection } from "@/site/sections/RecordSection";
import { Stack } from "@/site/sections/Stack";
import { Sandbox } from "@/site/sections/Sandbox";
import { Contact } from "@/site/sections/Contact";

export default function Site() {
  const shell = useRef<HTMLDivElement>(null);
  useDockProgress(shell);
  const current = useCurrentStage();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="shell" ref={shell} data-docked="false">
        <StatusBar current={current} />
        <Rail current={current} />

        <main className="split" id="main">
          <HomePanel />
          <div className="stream">
            <StreamHead />
            <Systems />
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
