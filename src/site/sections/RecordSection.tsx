import { roles, education, patents, achievements, certifications } from "@/site/data";
import { Chip } from "@/site/ui/parts";

export function RecordSection() {
  return (
    <section className="section" id="record" aria-labelledby="record-label">
      <div className="wrap">
        <div className="section-rail">
          <h2 className="label" id="record-label">
            Record
          </h2>
          <span className="label">Deployment history</span>
        </div>

        {roles.map((r) => (
          <article key={r.org} className="role" aria-labelledby={`role-${r.org.replace(/\s+/g, "")}`}>
            <div className="role-head">
              <div>
                <h3 className="headline" id={`role-${r.org.replace(/\s+/g, "")}`}>
                  {r.org}
                </h3>
                <p className="role-title">{r.title}</p>
              </div>
              <div className="role-meta">
                <Chip state={r.state}>Current</Chip>
                <span className="label">
                  {r.period} · {r.location}
                </span>
              </div>
            </div>

            <ul className="role-entries">
              {r.entries.map((e) => (
                <li key={e.head} className="role-entry">
                  <h4 className="title role-entry-head">{e.head}</h4>
                  <p className="body-sm">{e.body}</p>
                  {e.metrics ? (
                    <ul className="role-metrics">
                      {e.metrics.map((m) => (
                        <li key={m.label} className="role-metric">
                          <span className="mono role-metric-value">
                            {m.value}
                            {m.unit ? <span className="role-metric-unit">{m.unit}</span> : null}
                          </span>
                          <span className="label role-metric-label">{m.label}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <div className="cred-grid">
          <div className="cred">
            <h3 className="label cred-label">Education</h3>
            <ul>
              {education.map((e) => (
                <li key={e.school} className="cred-item">
                  <p className="title">{e.award}</p>
                  <p className="body-sm cred-sub">{e.school}</p>
                  <p className="label">
                    {e.period} · {e.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="cred">
            <h3 className="label cred-label">Patents</h3>
            <ul>
              {patents.map((p) => (
                <li key={p.title} className="cred-item">
                  <p className="title">{p.title}</p>
                  <p className="label">{p.date}</p>
                </li>
              ))}
            </ul>
            <h3 className="label cred-label cred-label-gap">Certifications</h3>
            <ul>
              {certifications.map((c) => (
                <li key={c.title} className="cred-item">
                  <p className="title">{c.title}</p>
                  <p className="label">
                    {c.issuer}
                    {c.date ? ` · ${c.date}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="cred">
            <h3 className="label cred-label">Also</h3>
            <ul>
              {achievements.map((a) => (
                <li key={a.title} className="cred-item">
                  <p className="title">{a.title}</p>
                  <p className="body-sm cred-sub">{a.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
