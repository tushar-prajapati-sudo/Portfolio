import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { projects, type Project } from "@/data/portfolio";

/** Tasteful gradient panel used when a project has no screenshot yet. */
function Placeholder({ title }: { title: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,hsl(36_100%_60%/0.18),transparent_55%)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <span className="relative text-base uppercase text-foreground/40">
        {title}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass group relative overflow-hidden p-7"
    >
      {/* Cursor-following spotlight inside the card. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx) var(--my), hsl(36 100% 60% / 0.14), transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-pixel text-sm uppercase leading-[1.5] text-foreground md:text-base">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            {project.repo && (
              <a
                href={project.repo}
                data-cursor
                target="_blank"
                rel="noreferrer"
                aria-label="Source"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                data-cursor
                target="_blank"
                rel="noreferrer"
                aria-label="Live"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.blurb}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-none border border-white/10 px-2 py-0.5 font-pixel text-[8px] uppercase text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="pointer-events-auto relative py-10">
      {/* Featured project — scroll-driven 3D showcase. */}
      <ContainerScroll
        titleComponent={
          <div className="text-legible mb-4 flex flex-col items-center gap-3 text-center">
            <span className="retro-label text-[9px] text-primary">
              selected work
            </span>
            <h2 className="font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
              Things I've <em className="not-italic text-primary">shipped</em>.
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              {featured.blurb}
            </p>
          </div>
        }
      >
        {featured.image ? (
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full w-full object-cover object-top"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <Placeholder title={featured.title} />
        )}
      </ContainerScroll>

      {/* Remaining projects */}
      <Container className="-mt-24 md:-mt-40">
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
