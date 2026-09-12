import type { ReactNode } from "react";
import type { State } from "@/site/data";

/** A panel always declares a label, and where it has one, a state. */
export function Panel({
  label,
  meta,
  children,
  id,
  className = "",
}: {
  label: string;
  meta?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`} id={id} aria-labelledby={id ? `${id}-label` : undefined}>
      <div className="panel-rail">
        <span className="label" id={id ? `${id}-label` : undefined}>
          {label}
        </span>
        {meta}
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

export function Chip({
  state,
  children,
  dot = true,
  className = "",
}: {
  state?: State;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={`chip ${className}`} data-state={state}>
      {dot && state ? <span className="chip-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/** A measurement, with its unit split off and its window stated underneath. */
export function Readout({
  value,
  unit,
  label,
  window: win,
}: {
  value: string;
  unit?: string;
  label: string;
  window: string;
}) {
  return (
    <div className="readout">
      <p className="readout-value">
        {value}
        {unit ? <span className="readout-unit">{unit}</span> : null}
      </p>
      <p className="readout-label">{label}</p>
      <p className="readout-window mono">{win}</p>
    </div>
  );
}
