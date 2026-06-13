import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import type { LiveProject } from "@/data/portfolio";

/**
 * A live site embedded in a browser-chrome frame — click-to-load.
 *
 * The iframe is NOT mounted until the user clicks the poster. Live embeds
 * (one runs a Three.js scene) repaint every frame and would fight Lenis + the
 * Spline robot + the shader bg for the main thread on an 8GB M1, making the
 * page scroll janky. Loading on demand keeps scrolling smooth; once loaded, a
 * transparent link over the iframe opens the real site and stops it trapping
 * scroll, and `sandbox` (no allow-top-navigation) blocks frame-busting.
 */
export function LivePreview({ title, url, description, tags, repo }: LiveProject) {
  const [loaded, setLoaded] = useState(false);
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  return (
    <motion.div
      data-cursor
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass group flex flex-col overflow-hidden"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-card/60 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-primary/40" />
          <i className="h-2.5 w-2.5 rounded-full bg-primary/20" />
        </span>
        <span className="mx-auto flex max-w-[62%] items-center gap-1.5 truncate rounded-full border border-white/10 bg-background/50 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          {host}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor
          aria-label={`Open ${title} in a new tab`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {loaded ? (
          <>
            <iframe
              src={url}
              title={`${title} — live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
            />
            {/* Click-catcher: opens the real site, keeps scroll on the page. */}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              data-cursor
              aria-label={`Open ${title}`}
              className="absolute inset-0 z-10"
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            data-cursor
            aria-label={`Load live preview of ${title}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors"
          >
            {/* Faint grid + amber glow poster. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,hsl(36_100%_60%/0.12),transparent_60%)]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.04)_1px,transparent_1px)] bg-[size:40px_40px]"
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/60 bg-card/70 text-primary backdrop-blur transition-transform duration-200 group-hover:scale-105">
              <Play className="h-6 w-6 translate-x-0.5" />
            </span>
            <span className="relative retro-label text-[10px] text-foreground">
              Load live preview
            </span>
            <span className="relative font-mono text-[11px] text-muted-foreground">
              {host}
            </span>
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-pixel text-xs uppercase leading-[1.6] text-foreground md:text-sm">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noreferrer"
                data-cursor
                aria-label="Source"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            )}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              data-cursor
              aria-label="Live"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
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
