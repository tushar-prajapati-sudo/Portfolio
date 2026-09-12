import { profile, stages } from "@/site/data";
import { STAGE_ICONS, ResumeIcon, SandboxIcon } from "@/site/ui/icons";

/**
 * The status bar's docked form: a fixed icon rail. It carries the same
 * destinations as the bar, so nothing becomes unreachable when the bar
 * retracts.
 */
export function Rail({ current }: { current: string }) {
  return (
    <nav className="rail" aria-label="Sections">
      <a className="rail-mark" href="#top" aria-label="Back to top">
        TP
      </a>

      <ul className="rail-list">
        {stages.map((s) => {
          const Icon = STAGE_ICONS[s.id];
          return (
            <li key={s.id}>
              <a
                className="rail-btn"
                href={`#${s.id}`}
                aria-current={current === s.id ? "true" : undefined}
              >
                {Icon ? <Icon /> : null}
                <span className="rail-tip">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="rail-list rail-end">
        <li>
          <a className="rail-btn" href="/v1/" data-accent="queued">
            <SandboxIcon />
            <span className="rail-tip">Sandbox — the 3D build</span>
          </a>
        </li>
        <li>
          <a
            className="rail-btn"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ResumeIcon />
            <span className="rail-tip">Résumé (PDF)</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
