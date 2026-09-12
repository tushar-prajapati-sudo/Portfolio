import { systems, type System } from "@/site/data";
import { Chip } from "@/site/ui/parts";

/** The system's path, in the same connector grammar as the pipeline. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow" aria-label="Pipeline stages">
      {steps.map((s, i) => (
        <li key={s} className="flow-step">
          <span className="flow-node mono">{s}</span>
          {i < steps.length - 1 ? <span className="flow-link" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}

function Record({ s }: { s: System }) {
  return (
    <article className="sys" aria-labelledby={`sys-${s.id}`}>
      <div className="sys-head">
        <div className="sys-head-main">
          <h3 className="headline sys-name" id={`sys-${s.id}`}>
            {s.name}
          </h3>
          <p className="sys-kind">{s.kind}</p>
        </div>
        <div className="sys-head-meta">
          <Chip state={s.state}>{s.stateLabel}</Chip>
          <span className="label sys-year">{s.year}</span>
        </div>
      </div>

      <p className="body sys-summary">{s.summary}</p>

      <Flow steps={s.flow} />

      <div className="sys-cols">
        <div className="sys-col">
          <h4 className="label sys-col-label">The problem</h4>
          <p className="body-sm">{s.problem}</p>

          <h4 className="label sys-col-label sys-col-label-gap">What I built</h4>
          <dl className="sys-approach">
            {s.approach.map((a) => (
              <div key={a.head} className="sys-approach-item">
                <dt className="title sys-approach-head">{a.head}</dt>
                <dd className="body-sm sys-approach-body">{a.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="sys-col sys-col-side">
          <h4 className="label sys-col-label">Evidence</h4>
          <ul className="sys-evidence">
            {s.evidence.map((e) => (
              <li key={e} className="sys-evidence-item">
                {e}
              </li>
            ))}
          </ul>

          <h4 className="label sys-col-label sys-col-label-gap">Stack</h4>
          <ul className="sys-stack">
            {s.stack.map((t) => (
              <li key={t}>
                <Chip dot={false}>{t}</Chip>
              </li>
            ))}
          </ul>

          <h4 className="label sys-col-label sys-col-label-gap">Source</h4>
          {s.repo || s.demo ? (
            <div className="sys-links">
              {s.repo ? (
                <a className="btn btn-secondary sys-link" href={s.repo} target="_blank" rel="noopener noreferrer">
                  Repository
                </a>
              ) : null}
              {s.demo ? (
                <a className="btn sys-link" href={s.demo} target="_blank" rel="noopener noreferrer">
                  Live demo
                </a>
              ) : null}
            </div>
          ) : (
            /* No link is better than a dead one. This states the reason and
               turns it into a reason to get in touch. */
            <p className="body-sm sys-private">
              <Chip state="queued">Private repository</Chip>
              <span className="sys-private-text">
                Happy to walk through the code and architecture on a call.
              </span>
            </p>
          )}
        </aside>
      </div>
    </article>
  );
}

export function Systems() {
  return (
    <section className="section" id="systems" aria-labelledby="systems-label">
      <div className="wrap">
        <div className="section-rail">
          <h2 className="label" id="systems-label">
            Systems
          </h2>
          <span className="label">{systems.length} records</span>
        </div>
        <div className="sys-list">
          {systems.map((s) => (
            <Record key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
