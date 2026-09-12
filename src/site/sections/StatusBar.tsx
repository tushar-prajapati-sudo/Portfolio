import { profile, availability, stages } from "@/site/data";
import { Chip } from "@/site/ui/parts";

/**
 * The top bar. It retracts as the page docks and the rail takes over — the
 * two never carry a destination the other lacks.
 */
export function StatusBar({ current }: { current: string }) {
  return (
    <header className="bar">
      <div className="bar-inner">
        <div className="bar-id">
          <a href="#top" className="bar-name">
            {profile.name}
          </a>
          <span className="bar-role">AI &amp; Full-Stack</span>
        </div>

        <nav className="bar-nav" aria-label="Sections">
          {stages.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="bar-link"
              aria-current={current === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="bar-end">
          <Chip state={availability.state} className="chip-field bar-avail">
            {availability.label}
          </Chip>

          {/* Environment switch. This build is production; /v1 is the
              experimental one. */}
          <div className="env" role="group" aria-label="Build">
            <span className="env-seg" aria-current="true">
              Prod
            </span>
            <a className="env-seg env-link" href="/v1/">
              Sandbox
            </a>
          </div>

          <a className="bar-cta" href={profile.resume} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
