import { profile, availability, readouts, stages } from "@/site/data";
import { Chip } from "@/site/ui/parts";
import { SystemDetail } from "@/site/ui/SystemDetail";
import { systems } from "@/site/data";
import { MailIcon, WhatsappIcon } from "@/site/ui/icons";

/**
 * The identity panel. It is the hero at the top of the page and the fixed
 * left panel once you scroll — the same element throughout, so nothing
 * re-mounts and the motion has something real to move.
 */
export function HomePanel({
  current,
  openId,
  onClose,
}: {
  current: string;
  openId: string | null;
  onClose: () => void;
}) {
  const open = openId ? systems.find((s) => s.id === openId) : undefined;

  return (
    <aside className="home" id="top">
      {/* The panel ground resolves in as the surface separates; at rest the
          two halves share one canvas. */}
      <span className="home-ground" aria-hidden="true" />

      {open ? (
        <div className="home-detail">
          <SystemDetail s={open} onClose={onClose} />
        </div>
      ) : null}

      <div className="home-inner" hidden={Boolean(open)}>
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

        {/* Both of these arrive once the panel has separated. The index says
            which section of the right-hand column you are in. */}
        <nav className="home-index" aria-label="Section index">
          <ol>
            {stages.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={current === s.id ? "true" : undefined}>
                  <span className="home-index-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="home-index-l">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

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
