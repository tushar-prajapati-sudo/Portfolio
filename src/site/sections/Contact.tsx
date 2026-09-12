import { profile, availability, BUILD_KB } from "@/site/data";

export function Contact() {
  return (
    <section className="contact-field" id="contact" aria-labelledby="contact-label">
      <div className="wrap">
        <div className="contact-rail">
          <h2 className="label contact-rail-label" id="contact-label">
            Contact
          </h2>
          <span className="label contact-rail-label">
            <span className="contact-live" aria-hidden="true" />
            {availability.label} — {availability.detail}
          </span>
        </div>

        <div className="contact-body">
          <div className="contact-lead">
            <p className="headline contact-head">
              If you&rsquo;re hiring for AI engineering or full-stack work, I&rsquo;d
              like to hear what you&rsquo;re building.
            </p>
            <p className="contact-sub">
              The fastest route is email. I read everything and reply to anything
              specific.
            </p>
            <div className="contact-actions">
              <a className="btn contact-btn" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a
                className="btn btn-secondary contact-btn"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé
                <span className="btn-suffix">PDF</span>
              </a>
            </div>
          </div>

          <dl className="contact-index">
            <div className="contact-row">
              <dt className="label">GitHub</dt>
              <dd>
                <a className="contact-link mono" href={profile.github} target="_blank" rel="noopener noreferrer">
                  {profile.githubHandle}
                </a>
              </dd>
            </div>
            <div className="contact-row">
              <dt className="label">LinkedIn</dt>
              <dd>
                <a className="contact-link mono" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  {profile.linkedinHandle}
                </a>
              </dd>
            </div>
            <div className="contact-row">
              <dt className="label">Based in</dt>
              <dd className="mono contact-value">{profile.location}</dd>
            </div>
            <div className="contact-row">
              <dt className="label">Sandbox</dt>
              <dd>
                <a className="contact-link mono" href="/v1/">
                  3D build · /v1
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <footer className="contact-foot">
          <span className="label">© {new Date().getFullYear()} {profile.name}</span>
          <span className="label">React · Vite · {BUILD_KB} KB gzipped · no trackers</span>
        </footer>
      </div>
    </section>
  );
}
