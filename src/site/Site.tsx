import { StatusBar } from "@/site/sections/StatusBar";
import { Hero } from "@/site/sections/Hero";
import { Systems } from "@/site/sections/Systems";
import { RecordSection } from "@/site/sections/RecordSection";
import { Stack } from "@/site/sections/Stack";
import { Sandbox } from "@/site/sections/Sandbox";
import { Contact } from "@/site/sections/Contact";

export default function Site() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <StatusBar />
      <main id="main">
        <Hero />
        <Systems />
        <RecordSection />
        <Stack />
        <Sandbox />
        <Contact />
      </main>
    </>
  );
}
