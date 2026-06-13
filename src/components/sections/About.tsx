import { MapPin } from "lucide-react";
import { ZoomSection } from "@/components/ui/zoom-section";
import { profile } from "@/data/portfolio";

export function About() {
  return (
    <ZoomSection id="about" align="left" width="lg">
      <span className="inline-flex items-center gap-2 retro-label text-[9px] text-primary">
        <span className="h-px w-6 bg-primary/60" />
        the long version
      </span>

      <h2 className="mt-5 font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
        I live at <em className="not-italic text-primary">both ends</em>
        <br />
        of the stack.
      </h2>

      <div className="mt-7 space-y-5">
        {profile.about.map((para, i) => (
          <p key={i} className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-5">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="font-serif text-4xl text-primary">
              {stat.value}
            </span>
            <span className="mt-2 retro-label text-[8px] text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
        <div className="ml-auto inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {profile.location}
        </div>
      </div>
    </ZoomSection>
  );
}
