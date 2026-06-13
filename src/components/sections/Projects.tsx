import { Container } from "@/components/ui/container";
import { LivePreview } from "@/components/ui/live-preview";
import { AgentPlan } from "@/components/ui/agent-plan";
import { liveProjects, qspace } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="pointer-events-auto relative py-24">
      <Container>
        {/* Heading */}
        <div className="text-legible mb-12 flex flex-col items-center gap-3 text-center">
          <span className="retro-label text-[9px] text-primary">selected work</span>
          <h2 className="font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
            Things I've <em className="not-italic text-primary">shipped</em>.
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Real, live builds — click any preview to open the site.
          </p>
        </div>

        {/* Live builds — embedded, click to open. */}
        <div className="grid gap-6 lg:grid-cols-2">
          {liveProjects.map((p) => (
            <LivePreview key={p.title} {...p} />
          ))}
        </div>

        {/* Currently building — QSpace as a phased plan tree. */}
        <div className="mt-24">
          <div className="text-legible mb-8 flex flex-col items-center gap-3 text-center">
            <span className="retro-label text-[9px] text-primary">
              currently building
            </span>
            <h3 className="font-pixel text-xl uppercase leading-[1.3] text-foreground sm:text-2xl">
              {qspace.name}
            </h3>
            <p className="max-w-2xl text-sm text-muted-foreground">
              {qspace.tagline}
            </p>
          </div>
          <div className="glass mx-auto max-w-3xl overflow-hidden p-3 sm:p-5">
            <AgentPlan tasks={qspace.phases} />
          </div>
        </div>
      </Container>
    </section>
  );
}
