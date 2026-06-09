import { ArrowUpRight } from "lucide-react";
import { ZoomSection } from "@/components/ui/zoom-section";
import { profile, socials } from "@/data/portfolio";

export function Contact() {
  return (
    <ZoomSection id="contact" align="center" width="md" className="flex-col">
      <div className="flex flex-col items-center text-center">
        <span className="retro-label text-[9px] text-primary">say hello</span>

        <h2 className="mt-5 font-pixel text-2xl uppercase leading-[1.3] text-foreground sm:text-3xl md:text-5xl">
          Let's make something
          <br />
          <em className="not-italic text-primary">worth shipping.</em>
        </h2>

        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          A role, a project, or just a good argument about software — my inbox
          is open.
        </p>

        <a
          href={`mailto:${profile.email}`}
          data-cursor
          className="pixel-btn group mt-9 inline-flex items-center gap-3 bg-primary px-6 py-4 text-[10px] text-primary-foreground"
        >
          {profile.email}
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <div className="mt-10 flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor
              target="_blank"
              rel="noreferrer"
              className="retro-label text-[10px] text-muted-foreground transition-colors hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-14 retro-label text-[8px] leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {profile.name.split(" ")[0]} — built with
          React, Tailwind &amp; WebGL.
        </p>
      </div>
    </ZoomSection>
  );
}
