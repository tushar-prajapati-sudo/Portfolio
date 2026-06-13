import { motion } from "framer-motion";
import { ArrowDownRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArkanoidText } from "@/components/ui/arkanoid-text";
import { GooeyText } from "@/components/ui/gooey-text";
import { profile, resume } from "@/data/portfolio";

const QUOTES = [
  "RESTORING CONSCIOUSNESS",
  "FULL-STACK DEVELOPER",
  "NODE · REACT · GO",
  "BUILDER OF THINGS",
  "SHIPPING THINGS THAT LAST",
];

export function Hero() {
  return (
    <section
      id="top"
      className="pointer-events-none relative flex min-h-screen items-center px-4 pt-24 sm:px-6 lg:pl-28 lg:pr-10 xl:pl-40"
    >
      {/* Content lives on the LEFT; the robot (global RobotStage) owns the right. */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-5 text-center sm:gap-6 lg:max-w-xl lg:-translate-y-8 xl:max-w-2xl">
        {/* Terminal status chip */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pixel-box pointer-events-auto inline-flex w-fit items-center gap-2 bg-card/80 px-4 py-2 font-mono text-sm font-medium text-foreground backdrop-blur sm:text-base"
        >
          <span className="text-primary">&gt;</span>
          {profile.role}
          <span className="blink text-primary">█</span>
        </motion.span>

        {/* Name as a self-playing Arkanoid board. */}
        <div className="relative h-[26vh] w-full sm:h-[32vh]">
          <ArkanoidText text="TUSHAR" />
        </div>

        {/* Gooey morphing quotation — replaces the description. */}
        <GooeyText
          texts={QUOTES}
          morphTime={1}
          cooldownTime={1.6}
          className="h-12 w-full sm:h-16"
          textClassName="font-pixel text-sm uppercase sm:text-lg md:text-2xl"
        />

        {/* CTAs — two clearly distinct buttons. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="pointer-events-auto mt-2 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="#projects">
            See the work <ArrowDownRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={resume.href}
            download="Tushar-Prajapati-Resume.pdf"
          >
            {resume.label} <Download className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-28 lg:translate-x-0 xl:left-40">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-legible retro-label text-[10px] text-muted-foreground"
        >
          scroll to zoom in
        </motion.div>
      </div>
    </section>
  );
}
