import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";
import type { LiveProject } from "@/data/portfolio";

/**
 * A live site embedded in a browser-chrome frame.
 *
 * The iframe is only mounted once the card scrolls near the viewport (to spare
 * the M1's memory — the page already runs Spline + a shader bg). The site is
 * rendered at ~2x and scaled to 0.5 so it reads as a desktop layout. A
 * transparent link sits over the iframe so a click opens the real site and the
 * embedded page can't trap the scroll. `sandbox` (without allow-top-navigation)
 * blocks any frame-busting redirects.
 */
export function LivePreview({ title, url, description, tags, repo }: LiveProject) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
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

      {/* Live viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        {show ? (
          <iframe
            src={url}
            title={`${title} — live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="retro-label text-[9px] text-muted-foreground">
              loading preview…
            </span>
          </div>
        )}
        {/* Click-catcher: opens the real site, keeps scroll on the page. */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-10"
        />
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
              className={cn(
                "rounded-none border border-white/10 px-2 py-0.5 font-pixel text-[8px] uppercase text-muted-foreground"
              )}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
