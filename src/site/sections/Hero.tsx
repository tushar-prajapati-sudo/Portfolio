import { profile, availability, readouts } from "@/site/data";
import { Topology } from "@/site/ui/Topology";
import { Readout, Chip } from "@/site/ui/parts";

export function Hero() {
  return (
    <div id="top">
      <div className="wrap hero">
        <div className="hero-head">
          <div className="hero-id">
            <Chip state={availability.state} className="chip-block">
              {availability.label} — {availability.detail}
            </Chip>
            <h1 className="display hero-name">{profile.name}</h1>
            <p className="hero-title mono">{profile.title}</p>
            <p className="body hero-thesis">{profile.thesis}</p>

            <div className="hero-actions">
              <a className="btn" href={`mailto:${profile.email}`}>
                Start a conversation
                <span className="btn-suffix">{profile.email}</span>
              </a>
              <a
                className="btn btn-secondary"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé
                <span className="btn-suffix">PDF</span>
              </a>
            </div>

            <p className="hero-loc label">
              {profile.location} · Available remote &amp; hybrid
            </p>
          </div>

          <div className="hero-topo" id="pipeline">
            <Topology />
          </div>
        </div>
      </div>

      {/* Readouts sit on the graphite field — the values carry the weight. */}
      <div className="readout-field">
        <div className="wrap">
          <div className="readout-strip">
            {readouts.map((r) => (
              <Readout key={r.label} {...r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
