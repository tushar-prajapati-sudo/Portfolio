import { Container } from "@/components/ui/container";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";
import { journey } from "@/data/portfolio";

export function Journey() {
  return (
    <section
      id="journey"
      className="pointer-events-auto relative flex min-h-screen flex-col items-center justify-center py-20"
    >
      <Container className="text-legible text-center">
        <span className="retro-label text-[9px] text-primary">
          the road so far
        </span>
        <h2 className="mt-4 font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
          How I <em className="not-italic text-primary">got here</em>.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
          Tap a node to expand it — related moments light up across the orbit.
        </p>
      </Container>

      {/* Scrim so the orbit reads cleanly over the pinned robot. */}
      <div className="relative mt-4 w-full">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/60 blur-3xl" />
        <RadialOrbitalTimeline nodes={journey} />
      </div>
    </section>
  );
}
