import type { System } from "@/site/data";
import { Chip } from "@/site/ui/parts";

/** The system's path, in the same connector grammar as the pipeline. */
export function Flow({ steps }: { steps: string[] }) {
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

/**
 * The full record. It opens in the left frame on wide screens and inline on
 * narrow ones, so the list stays scannable either way.
 */
export function SystemDetail({ s, onClose }: { s: System; onClose?: () => void }) {
  return (
    <article className="detail" aria-labelledby={`detail-${s.id}`}>
      <div className="detail-top">
        {onClose ? (
          <button type="button" className="detail-back" onClick={onClose}>
            <span aria-hidden="true">←</span> Back
          </button>
        ) : null}
        <Chip state={s.state}>{s.stateLabel}</Chip>
      </div>

      <h3 className="detail-name" id={`detail-${s.id}`} tabIndex={-1}>
        {s.name}
      </h3>
      <p className="detail-kind">{s.kind}</p>
      <p className="detail-summary">{s.summary}</p>

      <Flow steps={s.flow} />

      <h4 className="label detail-label">The problem</h4>
      <p className="body-sm">{s.problem}</p>

      <h4 className="label detail-label">What I built</h4>
      <dl className="detail-approach">
        {s.approach.map((a) => (
          <div key={a.head}>
            <dt className="title detail-approach-head">{a.head}</dt>
            <dd className="body-sm detail-approach-body">{a.body}</dd>
          </div>
        ))}
      </dl>

      <h4 className="label detail-label">Evidence</h4>
      <ul className="detail-evidence">
        {s.evidence.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <h4 className="label detail-label">Stack</h4>
      <ul className="detail-stack">
        {s.stack.map((t) => (
          <li key={t}>
            <Chip dot={false}>{t}</Chip>
          </li>
        ))}
      </ul>

      <h4 className="label detail-label">Source</h4>
      {s.repo || s.demo ? (
        <div className="detail-links">
          {s.repo ? (
            <a className="btn btn-secondary" href={s.repo} target="_blank" rel="noopener noreferrer">
              Repository
            </a>
          ) : null}
          {s.demo ? (
            <a className="btn" href={s.demo} target="_blank" rel="noopener noreferrer">
              Live demo
            </a>
          ) : null}
        </div>
      ) : (
        /* No link is better than a dead one — and it gives a reason to write. */
        <div className="detail-private">
          <Chip state="queued">Private repository</Chip>
          <p className="body-sm detail-private-text">
            Happy to walk you through the code and the architecture on a call — just say hi.
          </p>
        </div>
      )}
    </article>
  );
}
