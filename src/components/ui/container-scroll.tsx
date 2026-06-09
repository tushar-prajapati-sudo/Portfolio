import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll-driven 3D container (adapted from the Aceternity "container scroll"
 * idea). As the section scrolls into view the card tilts back on X, then
 * settles flat and scales up. Reskinned as a dark browser frame.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.8, 0.95] : [1.04, 1]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div
      ref={ref}
      className="relative flex h-[58rem] items-center justify-center p-2 md:h-[72rem] md:p-10"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full py-10 md:py-24">
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl">
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a",
      }}
      className="mx-auto -mt-8 h-[30rem] w-full max-w-5xl rounded-[28px] border border-border bg-card p-2 shadow-2xl md:h-[40rem] md:p-4"
    >
      {/* Faux browser chrome. */}
      <div className="flex items-center gap-2 px-3 pb-3 pt-1">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-primary/70" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
      </div>
      <div className="h-full w-full overflow-hidden rounded-2xl border border-border bg-background">
        {children}
      </div>
    </motion.div>
  );
}
