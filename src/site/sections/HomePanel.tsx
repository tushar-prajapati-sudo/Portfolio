import { profile, availability, readouts } from "@/site/data";
import { Chip } from "@/site/ui/parts";
import { MailIcon, WhatsappIcon } from "@/site/ui/icons";

/**
 * The identity panel. It is the hero at the top of the page and the fixed
 * left panel once you scroll — the same element throughout, so nothing
 * re-mounts and the motion has something real to move.
 */
export function HomePanel() {
  return (
    <aside className="home" id="top">
      <div className="home-inner">
        <Chip state={availability.state} className="chip-block home-avail">
          {availability.label} — {availability.detail}
        </Chip>

        <h1 className="display home-name">
          {profile.name.split(" ").map((w) => (
            <span key={w}>{w}</span>
          ))}
        </h1>
        <p className="home-title mono">{profile.title}</p>

        {/* Collapses as the panel docks. --fh is the open height. */}
        <div className="home-fade" style={{ "--fh": "190px" } as React.CSSProperties}>
          <p className="body home-thesis">{profile.thesis}</p>
        </div>

        <div className="home-actions">
          <a className="btn home-btn" href={`mailto:${profile.email}`}>
            <MailIcon />
            Email
          </a>
          <a
            className="btn btn-secondary home-btn"
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon />
            WhatsApp
          </a>
        </div>

        <a className="home-resume" href={profile.resume} target="_blank" rel="noopener noreferrer">
          Résumé <span className="mono">PDF</span>
        </a>

        <div className="home-fade" style={{ "--fh": "48px" } as React.CSSProperties}>
          <p className="home-loc label">{profile.location} · Remote &amp; hybrid</p>
        </div>

        {/* Appears once docked, so the evidence stays on screen while they read. */}
        <dl className="home-stats" aria-label="Headline metrics">
          {readouts.slice(0, 3).map((r) => (
            <div key={r.label} className="home-stat">
              <dt className="mono home-stat-v">
                {r.value}
                {r.unit ? <span>{r.unit}</span> : null}
              </dt>
              <dd className="label home-stat-l">{r.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
