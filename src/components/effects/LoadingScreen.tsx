import { motion } from "framer-motion";
import { LoaderOne } from "@/components/ui/unique-loader-components";

/**
 * Full-screen boot loader shown until the heavy bits (Spline robot, fonts) are
 * ready. Themed to the cybercafé and fades out via AnimatePresence in App.
 */
export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-background"
    >
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-40" />
      <div className="crt-vignette pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center gap-7">
        <span className="font-pixel text-3xl text-primary sm:text-5xl">
          DEVELOPING
          <span className="blink">_</span>
        </span>
        <LoaderOne />
        <span className="retro-label text-[11px] text-muted-foreground">
          booting cybercafe…
        </span>
      </div>
    </motion.div>
  );
}
