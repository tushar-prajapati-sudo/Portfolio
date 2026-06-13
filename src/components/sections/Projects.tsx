import { Container } from "@/components/ui/container";
import { LivePreview } from "@/components/ui/live-preview";
import { ProjectPulseTracker } from "@/components/ui/project-pulse-tracker";
import { AgentPlan } from "@/components/ui/agent-plan";
import { liveProjects, projects, qspace } from "@/data/portfolio";

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="pointer-events-auto relative py-24">
      <Container>
        {/* Heading */}
        <div className="text-legible mb-12 flex flex-col items-center gap-3 text-center">
          <span className="retro-label text-[9px] text-primary">selected work</span>
          <h2 className="font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
            Things I've <em className="not-italic text-primary">shipped</em>.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Real, live builds — click any preview to open the site.
          </p>
        </div>

        {/* Live builds — embedded, click to open. */}
        <div className="grid gap-6 lg:grid-cols-2">
          {liveProjects.map((p) => (
            <LivePreview key={p.title} {...p} />
          ))}
        </div>

        {/* Case studies — deeper work as pulse-tracker cards. */}
        <div className="mt-24">
          <div className="text-legible mb-10 flex flex-col items-center gap-3 text-center">
            <span className="retro-label text-[10px] text-primary">more work</span>
            <h3 className="font-pixel text-2xl uppercase leading-[1.3] text-foreground sm:text-3xl">
              Built to <em className="not-italic text-primary">scale</em>.
            </h3>
          </div>
          <div className="space-y-6">
            <ProjectPulseTracker project={featured} />
            <div className="grid gap-6 lg:grid-cols-2">
              {rest.map((p) => (
                <ProjectPulseTracker key={p.title} project={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Currently building — QSpace as a phased plan tree. */}
        <div className="mt-28">
          <div className="text-legible mb-10 flex flex-col items-center gap-3 text-center">
            <span className="retro-label text-[10px] text-primary">
              currently building
            </span>
            <h3 className="font-pixel text-2xl uppercase leading-[1.3] text-foreground sm:text-3xl md:text-4xl">
              {qspace.name}
            </h3>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              {qspace.tagline}
            </p>
          </div>
          <div className="glass mx-auto max-w-5xl overflow-hidden p-4 sm:p-7">
            <AgentPlan tasks={qspace.phases} />
          </div>
        </div>
      </Container>
    </section>
  );
}
