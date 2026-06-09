import { useState } from "react";
import { Layers, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { BG_OPTIONS, type BgMode } from "@/components/effects/backgrounds";

/**
 * Background picker — a compact button that expands into a grid of all the
 * selectable shader backgrounds + the Samurai theme. Bottom-left, visible on
 * every breakpoint.
 */
export function BackgroundSwitcher({
  value,
  onChange,
}: {
  value: BgMode;
  onChange: (mode: BgMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = BG_OPTIONS.find((o) => o.key === value);

  return (
    <div className="fixed bottom-5 left-5 z-50 w-56">
      {open && (
        <div className="pixel-box mb-2 grid max-h-[58vh] grid-cols-2 gap-1.5 overflow-auto bg-card/95 p-2 backdrop-blur">
          {BG_OPTIONS.map((o) => (
            <button
              key={o.key}
              data-cursor
              onClick={() => {
                onChange(o.key);
                setOpen(false);
              }}
              className={cn(
                "retro-label border-2 px-2 py-2.5 text-left text-[11px] transition-colors",
                value === o.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary/60 hover:text-primary"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      <button
        data-cursor
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="pixel-box flex w-full items-center gap-2 bg-card/90 px-3 py-3 text-foreground backdrop-blur"
      >
        <Layers className="h-4 w-4 text-primary" />
        <span className="retro-label text-xs">BG:</span>
        <span className="retro-label text-xs text-primary">{current?.label}</span>
        <ChevronUp
          className={cn(
            "ml-auto h-4 w-4 text-primary transition-transform",
            open ? "rotate-0" : "rotate-180"
          )}
        />
      </button>
    </div>
  );
}
