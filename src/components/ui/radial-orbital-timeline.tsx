import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Code,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineNode } from "@/data/portfolio";

const KIND_ICON: Record<TimelineNode["kind"], LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  project: Code,
  milestone: Sparkles,
};

const STATUS_STYLES: Record<TimelineNode["status"], string> = {
  completed: "border-primary/60 bg-primary/15 text-primary",
  "in-progress": "border-foreground/40 bg-foreground/10 text-foreground",
  pending: "border-muted-foreground/40 bg-muted/40 text-muted-foreground",
};

/**
 * Radial orbital timeline (adapted from jatin-yadav05's component).
 * Items orbit a central core; the orbit auto-rotates until you click a node,
 * which expands its details and highlights related nodes.
 */
export function RadialOrbitalTimeline({ nodes }: { nodes: TimelineNode[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [pulse, setPulse] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate the orbit while nothing is expanded (respects reduced motion).
  useEffect(() => {
    if (expanded !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRotation((r) => (r + 0.25) % 360);
    }, 40);
    return () => window.clearInterval(id);
  }, [expanded]);

  const radius = 215;

  const positionFor = (index: number) => {
    const angle = (index / nodes.length) * 360 + rotation;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      // Front-facing nodes sit higher and brighter.
      z: Math.sin(rad),
    };
  };

  const toggle = (id: number) => {
    if (expanded === id) {
      setExpanded(null);
      setPulse({});
      return;
    }
    setExpanded(id);
    const node = nodes.find((n) => n.id === id);
    const next: Record<number, boolean> = {};
    node?.relatedIds.forEach((rid) => (next[rid] = true));
    setPulse(next);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[40rem] w-full items-center justify-center overflow-hidden"
      onClick={(e) => {
        if (e.target === containerRef.current) {
          setExpanded(null);
          setPulse({});
        }
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Central core. */}
        <div className="absolute z-10 flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-primary/20 [animation-duration:3s]" />
          <div className="absolute h-20 w-20 rounded-full border border-primary/20" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>

        {/* Orbit rings. */}
        <div
          className="absolute rounded-full border border-dashed border-primary/25"
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {nodes.map((node, i) => {
          const pos = positionFor(i);
          const Icon = KIND_ICON[node.kind];
          const isExpanded = expanded === node.id;
          const isPulsing = pulse[node.id];
          const depth = 0.82 + (pos.z + 1) * 0.09; // 0.82 → 1.0
          const openUp = pos.y >= 0; // lower-half nodes open their card upward

          return (
            <div
              key={node.id}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                zIndex: isExpanded ? 40 : Math.round(pos.z * 10) + 20,
                opacity: isExpanded ? 1 : depth,
              }}
            >
              {/* Node button. */}
              <button
                data-cursor
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(node.id);
                }}
                className={cn(
                  "group relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
                  isExpanded
                    ? "scale-125 border-primary bg-primary text-primary-foreground"
                    : "border-primary/45 bg-card text-primary shadow-[0_0_18px_hsl(var(--primary)/0.20)] hover:border-primary hover:bg-primary/10",
                  isPulsing && "border-primary/80"
                )}
              >
                {isPulsing && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                )}
                <Icon className="h-5 w-5" />
                {!isExpanded && (
                  <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                    {node.date}
                  </span>
                )}
              </button>

              {/* Expanded detail card. */}
              {isExpanded && (
                <div
                  className={cn(
                    "absolute left-1/2 w-72 -translate-x-1/2 rounded-2xl border border-primary/30 bg-card/95 p-4 text-left shadow-2xl backdrop-blur",
                    openUp ? "bottom-16" : "top-16"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        STATUS_STYLES[node.status]
                      )}
                    >
                      {node.status}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {node.date}
                    </span>
                  </div>
                  <h4 className="font-pixel text-[10px] uppercase leading-[1.5] text-foreground">
                    {node.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {node.content}
                  </p>
                  {/* Energy bar. */}
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span>Momentum</span>
                      <span>{node.energy}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                        style={{ width: `${node.energy}%` }}
                      />
                    </div>
                  </div>
                  {node.relatedIds.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                      {node.relatedIds.map((rid) => {
                        const r = nodes.find((n) => n.id === rid);
                        if (!r) return null;
                        return (
                          <button
                            key={rid}
                            data-cursor
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(rid);
                            }}
                            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            {r.title}
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
