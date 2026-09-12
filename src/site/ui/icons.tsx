/**
 * Rail symbols, drawn in the same vocabulary as the topology: orthogonal
 * strokes, square corners, 1.5px weight, no diagonals and no curves except
 * the port dots. A borrowed icon set would read as a different system.
 */
type P = { className?: string };

const box = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** Source → queue → sink: the pipeline itself. */
export function PipelineIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <rect x="1.5" y="7.5" width="5" height="5" />
      <path d="M6.5 10h7" />
      <rect x="13.5" y="7.5" width="5" height="5" />
      <rect x="8.75" y="8.75" width="2.5" height="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A person, built from squares. */
export function AboutIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <rect x="7" y="2.5" width="6" height="6" />
      <path d="M3 17.5v-2.5h14v2.5" />
      <path d="M3 15h14" />
    </svg>
  );
}

/** Stacked units — the systems list. */
export function SystemsIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <rect x="2.5" y="2.5" width="15" height="4.5" />
      <rect x="2.5" y="8.5" width="15" height="4.5" />
      <path d="M2.5 16.5h9" />
    </svg>
  );
}

/** A log: entries of varying length, newest at the top. */
export function RecordIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <path d="M2.5 4h15M2.5 8h11M2.5 12h13M2.5 16h7" />
    </svg>
  );
}

/** Layers. */
export function StackIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <path d="M2.5 6.5h15M2.5 10h15M2.5 13.5h15" />
      <path d="M2.5 6.5v7M17.5 6.5v7" />
    </svg>
  );
}

/** A card with an address line. */
export function ContactIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <rect x="2.5" y="4.5" width="15" height="11" />
      <path d="M2.5 8.5h15" />
      <path d="M5.5 12h5" />
    </svg>
  );
}

/** An outbound document. */
export function ResumeIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <path d="M4.5 2.5h7l4 4v11h-11z" />
      <path d="M11.5 2.5v4h4" />
      <path d="M7 10.5h6M7 13.5h4" />
    </svg>
  );
}

/** The sandbox: a bounded play area with something loose inside. */
export function SandboxIcon(p: P) {
  return (
    <svg {...box} {...p}>
      <rect x="2.5" y="2.5" width="15" height="15" strokeDasharray="3 2.5" />
      <rect x="7" y="7" width="6" height="6" />
    </svg>
  );
}

/** Envelope, built from the same rectangles. */
export function MailIcon(p: P) {
  return (
    <svg {...box} width={16} height={16} {...p}>
      <rect x="2" y="4.5" width="16" height="11" />
      <path d="M2 7.5h16" />
    </svg>
  );
}

/** A speech bubble with its tail, kept orthogonal. */
export function WhatsappIcon(p: P) {
  return (
    <svg {...box} width={16} height={16} {...p}>
      <path d="M2.5 3.5h15v10h-9l-4 3.5v-3.5h-2z" />
      <path d="M6 7h8M6 10h5" />
    </svg>
  );
}

export const STAGE_ICONS: Record<string, (p: P) => JSX.Element> = {
  pipeline: PipelineIcon,
  about: AboutIcon,
  systems: SystemsIcon,
  record: RecordIcon,
  stack: StackIcon,
  contact: ContactIcon,
};
