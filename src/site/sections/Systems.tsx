import { systems } from "@/site/data";
import { Chip } from "@/site/ui/parts";
import { SystemDetail } from "@/site/ui/SystemDetail";

/**
 * A scannable index, not a wall of case studies. Each row opens its full
 * record — in the left frame on wide screens, inline below on narrow ones.
 */
export function Systems({
  openId,
  onOpen,
  wide,
}: {
  openId: string | null;
  onOpen: (id: string | null) => void;
  wide: boolean;
}) {
  return (
    <section className="section" id="systems" aria-labelledby="systems-label">
      <div className="wrap">
        <div className="section-rail">
          <h2 className="label" id="systems-label">
            Builds
          </h2>
          <span className="label">
            {systems.length} records · open one to read it
          </span>
        </div>

        <ul className="rows">
          {systems.map((s, i) => {
            const open = openId === s.id;
            return (
              <li key={s.id} className="row-item">
                <button
                  type="button"
                  className="row"
                  aria-expanded={open}
                  aria-controls={wide ? undefined : `row-panel-${s.id}`}
                  data-open={open}
                  onClick={() => onOpen(open ? null : s.id)}
                >
                  <span className="row-n mono">{String(i + 1).padStart(2, "0")}</span>

                  <span className="row-main">
                    <span className="row-name">{s.name}</span>
                    <span className="row-kind">{s.kind}</span>
                  </span>

                  <span className="row-meta">
                    <Chip state={s.state}>{s.stateLabel}</Chip>
                    <span className="label row-year">{s.year}</span>
                  </span>

                  <span className="row-open mono" aria-hidden="true">
                    {open ? "Close" : "Open"}
                  </span>
                </button>

                {!wide && open ? (
                  <div className="row-panel" id={`row-panel-${s.id}`}>
                    <SystemDetail s={s} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
