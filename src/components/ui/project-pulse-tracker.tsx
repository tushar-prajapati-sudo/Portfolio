import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Rocket, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import type { Project } from "@/data/portfolio";

/**
 * Case-study card (remixed from a 21st.dev "project-pulse-tracker" / RuixenCard).
 *
 * Adapted for this portfolio: Vite-friendly (no next/image), recolored to the
 * amber/dark theme, and the original demo's mismatched `Card03Props` type
 * dropped in favour of our `Project`. The original two columns — Timeline and
 * Team — become "Highlights" and "Stack", with a metrics strip on top.
 */
export function ProjectPulseTracker({ project }: { project: Project }) {
  const {
    title,
    blurb,
    tags,
    year,
    highlights = [],
    metrics = [],
    repo,
    href,
  } = project;

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
      className="glass group relative overflow-hidden p-6 sm:p-8"
    >
      {/* Cursor-following spotlight inside the card. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(440px circle at var(--mx) var(--my), hsl(36 100% 60% / 0.12), transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Rocket className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-pixel text-xs uppercase leading-[1.5] text-foreground sm:text-sm">
                {title}
              </h3>
              {year && (
                <span className="font-mono text-xs text-muted-foreground">
                  {year}
                </span>
              )}
            </div>
          </div>
          {(repo || href) && (
            <div className="flex items-center gap-2">
              {repo && (
                <a
                  href={repo}
                  data-cursor
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Source"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              {href && (
                <a
                  href={href}
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
          )}
        </div>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {blurb}
        </p>

        {/* Metrics strip */}
        {metrics.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex min-w-[120px] flex-1 flex-col items-center rounded-2xl border border-white/10 bg-background/40 px-3 py-3 text-center"
              >
                <span className="font-serif text-3xl leading-none text-primary">
                  {m.value}
                </span>
                <span className="mt-2 retro-label text-[8px] text-muted-foreground">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Highlights + Stack */}
        <div className="mt-7 grid gap-7 md:grid-cols-2">
          {highlights.length > 0 && (
            <div>
              <h4 className="retro-label text-[9px] text-primary">Highlights</h4>
              <ul className="mt-4 space-y-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="retro-label text-[9px] text-primary">Stack</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-none border border-white/10 bg-background/40 px-2.5 py-1 font-pixel text-[8px] uppercase text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectPulseTracker;
