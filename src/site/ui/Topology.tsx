import { topology, type TopoNode } from "@/site/data";

/* Geometry, in a 0–100 percentage space.
 *
 * Nodes and connectors share this one coordinate system: the SVG overlay uses
 * preserveAspectRatio="none" so its space stretches with the container, and the
 * node cards are positioned with the same percentages. (They used to be grid
 * items with percentage margins, which resolve against the cell rather than the
 * grid — so the wires never quite met the cards.)
 *
 * Every connector is axis-aligned, and an axis-aligned line stays axis-aligned
 * under non-uniform scaling, so the elbows stay square at every width with no
 * measurement and no JS. Strokes hold 1px via vector-effect. */
const COLS = 4;
const ROWS = 3;
const CW = 100 / COLS;
const RH = 100 / ROWS;
const PAD_X = 2.6;
const PAD_Y = 3.5;

const cy = (r: number) => (r + 0.5) * RH;
const cx = (c: number) => (c + 0.5) * CW;
const left = (c: number) => c * CW + PAD_X;
const right = (c: number) => (c + 1) * CW - PAD_X;
const top = (r: number) => r * RH + PAD_Y;
const bottom = (r: number) => (r + 1) * RH - PAD_Y;

/** The fan-out bus sits in the gap off the worker's right edge. */
const BUS = (right(2) + left(3)) / 2;

const PATHS: { d: string; state?: string; label?: string; at?: [number, number] }[] = [
  { d: `M${right(0)},${cy(1)} H${left(1)}` },
  { d: `M${right(1)},${cy(1)} H${left(2)}` },
  {
    d: `M${cx(2)},${bottom(1)} V${top(2)}`,
    state: "fault",
    label: "retry",
    at: [cx(2) + 7, (bottom(1) + top(2)) / 2],
  },
  { d: `M${right(2)},${cy(1)} H${BUS} V${cy(0)} H${left(3)}` },
  { d: `M${right(2)},${cy(1)} H${left(3)}` },
  { d: `M${right(2)},${cy(1)} H${BUS} V${cy(2)} H${left(3)}` },
];

/** Packets travel the three straight runs. This is the page's one moment. */
const PACKETS = [
  { x1: right(0), x2: left(1), y: cy(1), delay: 0 },
  { x1: right(1), x2: left(2), y: cy(1), delay: 0.5 },
  { x1: right(2), x2: left(3), y: cy(1), delay: 1.1 },
];

function Node({ n }: { n: TopoNode }) {
  return (
    <div
      className="topo-node"
      data-kind={n.kind}
      style={
        {
          "--l": `${left(n.col)}%`,
          "--t": `${top(n.row)}%`,
          "--w": `${right(n.col) - left(n.col)}%`,
          "--h": `${bottom(n.row) - top(n.row)}%`,
        } as React.CSSProperties
      }
    >
      <div className="topo-node-rail">
        <span className="label topo-kind">{n.kind}</span>
        {n.state ? <span className="topo-dot" data-state={n.state} aria-hidden="true" /> : null}
      </div>
      <p className="topo-name">{n.label}</p>
      <p className="topo-sub mono">{n.sub}</p>
    </div>
  );
}

export function Topology() {
  const order = ["req", "mq", "worker", "dlq", "sum", "tutor", "grill"];
  const nodes = order
    .map((id) => topology.nodes.find((n) => n.id === id))
    .filter((n): n is TopoNode => Boolean(n));

  return (
    <figure className="topo" role="group" aria-labelledby="topo-cap">
      <div className="topo-grid">
        <svg
          className="topo-wires"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {PATHS.map((p, i) => (
            <path
              key={i}
              d={p.d}
              className="topo-wire"
              data-state={p.state}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Edge labels stay in HTML so they keep their size at every width. */}
        {PATHS.filter((p) => p.label && p.at).map((p, i) => (
          <span
            key={`l${i}`}
            className="topo-edge-label label"
            data-state={p.state}
            style={{ left: `${p.at![0]}%`, top: `${p.at![1]}%` }}
            aria-hidden="true"
          >
            {p.label}
          </span>
        ))}

        {PACKETS.map((p, i) => (
          <span
            key={`p${i}`}
            className="topo-packet"
            style={
              {
                top: `${p.y}%`,
                left: `${p.x1}%`,
                "--travel": `${p.x2 - p.x1}%`,
                animationDelay: `${p.delay}s`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
        ))}

        <div className="topo-legend">
          <span className="label topo-legend-title">State</span>
          <ul>
            <li><span className="topo-dot" data-state="ready" aria-hidden="true" /><span className="mono">shipped</span></li>
            <li><span className="topo-dot" data-state="active" aria-hidden="true" /><span className="mono">in flight</span></li>
            <li><span className="topo-dot" data-state="fault" aria-hidden="true" /><span className="mono">fault path</span></li>
          </ul>
        </div>

        {nodes.map((n) => (
          <Node key={n.id} n={n} />
        ))}
      </div>

      <figcaption className="topo-cap" id="topo-cap">
        <span className="label">Live system</span>
        <span className="body-sm topo-cap-text">
          The AI pipeline behind Imarticus&rsquo; summarization, tutor and mock-interview
          features. Priority queues, a Gemini 2.5 batch worker, and a retry path that keeps a
          failed job from taking the run down with it.
        </span>
      </figcaption>
    </figure>
  );
}
