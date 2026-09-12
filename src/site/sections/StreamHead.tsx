import { readouts } from "@/site/data";
import { Topology } from "@/site/ui/Topology";
import { Readout } from "@/site/ui/parts";

/** The top of the scrolling column: the live pipeline and its readouts. */
export function StreamHead() {
  return (
    <div className="stream-head" id="pipeline">
      <div className="stream-pad">
        <Topology />
      </div>
      <div className="readout-field">
        <div className="stream-pad">
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
