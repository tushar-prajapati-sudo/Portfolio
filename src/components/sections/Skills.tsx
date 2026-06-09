import { ZoomSection } from "@/components/ui/zoom-section";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <ZoomSection id="skills" align="right" width="lg">
      <span className="inline-flex items-center gap-2 retro-label text-[9px] text-primary">
        <span className="h-px w-6 bg-primary/60" />
        the toolkit
      </span>

      <h2 className="mt-5 font-pixel text-2xl uppercase leading-[1.25] text-foreground sm:text-3xl md:text-4xl">
        What I'm <em className="not-italic text-primary">made of</em>.
      </h2>

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="group">
            <h3 className="retro-label text-[9px] text-primary">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-none border border-white/10 bg-background/40 px-3 py-1 text-sm text-foreground/90 transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ZoomSection>
  );
}
