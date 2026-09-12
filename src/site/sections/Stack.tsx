import { capabilities } from "@/site/data";
import { Chip } from "@/site/ui/parts";

export function Stack() {
  const total = capabilities.reduce((n, g) => n + g.items.length, 0);
  return (
    <section className="section" id="stack" aria-labelledby="stack-label">
      <div className="wrap">
        <div className="section-rail">
          <h2 className="label" id="stack-label">
            Stack
          </h2>
          <span className="label">{total} entries</span>
        </div>
        <div className="cap-grid">
          {capabilities.map((g) => (
            <div key={g.group} className="cap">
              <h3 className="label cap-label">{g.group}</h3>
              <ul className="cap-items">
                {g.items.map((i) => (
                  <li key={i}>
                    <Chip dot={false}>{i}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
