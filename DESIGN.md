---
name: Tushar Prajapati — Control Surface
description: An engineer's portfolio built as the operations console for the systems he actually runs.
colors:
  ground: "#EDEFF2"
  grid: "#DDE1E7"
  panel: "#FFFFFF"
  ink: "#12161C"
  ink-2: "#464F5C"
  ink-3: "#636C78"
  line: "#D3D8DF"
  field: "#12161C"
  ready: "#1F7A4D"
  active: "#1B5FC1"
  queued: "#A8630C"
  fault: "#B42318"
  ink-pressed: "#000000"
  panel-pressed: "#E6E9EE"
  queued-pressed: "#8F5409"
  field-ready: "#5FCF96"
  field-ready-line: "#2F6B4C"
  field-ready-bg: "#16281F"
  field-queued: "#E8A33D"
  field-queued-bg: "#2A2013"
  field-queued-pressed: "#F2B459"
  field-queued-ink: "#1A1206"
typography:
  display: Archivo
  body: Archivo
  mono: JetBrains Mono
---

# Design System: Tushar Prajapati — Control Surface

## Direction contract

**THESIS.** This portfolio is the operations console for the systems Tushar
actually runs — pipelines, queues, workers, gates — and it states his claims in
the one grammar his readers cannot be bluffed in. It refuses the arrangement
this category always ships: the near-black portfolio with one glowing accent, a
"Hi, I'm —" hero, and a grid of tech-stack pill cards. It equally refuses that
default's predictable opposite, the white Swiss type-only résumé page.

**OWN-WORLD.** A light gridded engineering canvas — cool bone-gray ground with a
16px schematic grid, white panels with hard 1px rules and 2–4px radii, no soft
shadows and no glow. Orthogonal elbow connectors with real port dots. Four
functional state colors used only as state, never decoration: ready green,
active blue, queued amber, fault red. One deep graphite field owns whole regions
— the status bar and the closing block — and carries inverted readouts. Archivo
for everything structural, JetBrains Mono for every number, identifier, and
label. Tabular figures everywhere a number can change.

**STORY.** The visitor understands in one viewport that this is an AI engineer
who runs production systems, believes it because the first thing they see is a
real pipeline with real numbers rather than an adjective, and acts by mailing
him or opening the résumé.

**FIRST VIEWPORT.** Status bar pinned top, dark, carrying identity, an
availability chip, and stage nav. Beneath it the canvas splits: the identity
panel on the left — name stacked at display scale, one-sentence thesis, Email
and WhatsApp actions — and on the right the live topology of the Imarticus AI
pipeline (ingest, priority queues, the Gemini worker, retry and dead-letter
paths, three consumer features) with packets moving along the edges. A readout
strip of five real instrument values closes the fold. On scroll the surface
docks: the bar retracts, an icon rail arrives from the left, the identity panel
travels left and holds while the right column scrolls beneath it.

**FORM.** Pipeline/queue topology console (RabbitMQ management, Airflow DAG,
Temporal), candidate 5 of the ordered grounded list, seed key `5178425e`.
Staging: the world's own native staging — canvas plus inspector — with the
"parallel making" staging folded in at project level, where each system shows
its claim and its evidence of construction side by side.

## Overview

**Creative North Star: "The console, not the brochure."**

Every visitor this site is built for spends their working life inside
operational interfaces — queue dashboards, DAG views, trace waterfalls, status
pages. That is their native reading environment, and it is an environment with
no tolerance for decoration: a number is either measured or it is not, a service
is either healthy or it is not. Building the portfolio in that grammar does two
things at once. It makes the content legible at a glance to exactly the people
who matter, and it is itself the argument — a person who thinks in topologies,
states, and gates built this.

The surface is therefore dense, flat, and instrument-like. Density is high but
never crowded; the grid does the organising so borders can stay thin and quiet.
Nothing glows. Nothing is rounded enough to feel friendly. The energy comes from
precision and from color that means something, not from contrast tricks.

This is a Persuade surface, not an Operate one — it must make a stranger decide
and act — so it commits harder than a real console would: display type runs
large, the topology animates, and the close is a full saturated field. But the
vocabulary never breaks. When it needs a button, it builds a console button.

**Key Characteristics:**
- Light gridded canvas; the grid is visible structure, not texture.
- Hard 1px rules, 2–4px radii, zero soft shadows, zero glow, zero gradients.
- Color is state. Four roles, each with a fixed meaning, used nowhere else.
- Every number is mono, tabular, and carries its unit.
- One deep graphite field per page region that needs weight.

## Colors

A cool daylight instrument palette: near-neutral grays carrying graphite ink,
with four saturated status colors that appear only where they report a state.

### Primary
- **Graphite Ink** (`#12161C`): all primary text, the status bar field, the
  closing block, and inverted panel readouts. The page's structural weight.

### Secondary
- **Ready Green** (`#1F7A4D`): shipped, passing, healthy, available. The
  availability chip and every "in production" state.
- **Active Blue** (`#1B5FC1`): in flight, running, current role, links.
- **Queued Amber** (`#A8630C`): queued, in progress, private-repo notices.
- **Fault Red** (`#B42318`): closed vulnerabilities, dead-letter paths, retries.

### Neutral
- **Bone Ground** (`#EDEFF2`): page ground beneath the canvas grid.
- **Grid Line** (`#DDE1E7`): the 16px schematic grid.
- **Panel White** (`#FFFFFF`): every panel, card, and node face.
- **Rule** (`#D3D8DF`): all 1px borders, dividers, and connectors.
- **Ink 2** (`#464F5C`): body copy and secondary values.
- **Ink 3** (`#636C78`): labels, units, captions, port names.

### On the graphite field
The four status colors are tuned for a light panel and fail on the dark field,
so each one that appears there has a documented field variant — brighter mark,
darker ground, mid-strength border. Only two states ever appear on the field:

- **Field Ready** (`#5FCF96` on `#16281F`, border `#2F6B4C`): the availability
  chip in the status bar. 7.1:1 against the field.
- **Field Queued** (`#E8A33D` on `#2A2013`): the sandbox segment of the
  environment switch, and the whole sandbox block — its kicker, its call to
  action, and the frame border on hover. `#1A1206` is the ink that sits on a
  full-strength amber fill; `#F2B459` is its hover. Amber on the graphite field
  is the one place the surface is allowed to be loud, and it is reserved
  entirely for the sandbox.

### Pressed and hover values
Interaction darkens or lightens the resting fill by one fixed step; these are
the only permitted derivatives, and none of them introduce a new hue.

- **Ink Pressed** (`#000000`): primary button hover.
- **Panel Pressed** (`#E6E9EE`): inverted button hover on the field.
- **Queued Pressed** (`#8F5409`): sandbox button hover.

### Named Rules
**The State-Only Rule.** The four status colors never appear as decoration,
never as a heading color, never as a background wash for emphasis. If a colored
element cannot answer "what state is this reporting?", it is recolored to ink.

**The No-Glow Rule.** No `box-shadow` with a color, no blur-radius over 12px, no
gradient that spans more than a 6% lightness range. Depth comes from rules and
from the graphite field, never from light.

## Typography

**Display Font:** Archivo (variable width + weight; fallback `system-ui`)
**Body Font:** Archivo
**Label/Mono Font:** JetBrains Mono (fallback `ui-monospace`)

**Voice:** Tushar's own, taken from how he actually writes — warm, direct,
first person, curious rather than boastful. "Hihi People," opens the
introduction and "Build. Break. Understand. Ship. Repeat." closes the page.
Copy may be friendly; it may never be vague. A sentence that could appear on
any engineer's site gets cut.

**Character:** Archivo is an industrial grotesk with a real width axis — it can
be pulled tight and heavy for display without becoming a neutral UI sans, and
its tabular figures are exact. JetBrains Mono is the native face of the world
being built: it is what the audience's terminals and editors are set in.

### Hierarchy
- **Display** (Archivo 700, `clamp(2.75rem, 7vw, 5.25rem)`, 0.92, tracking
  `-0.03em`): the name in the first viewport, and nothing else.
- **Headline** (Archivo 600, `clamp(1.75rem, 3.2vw, 2.5rem)`, 1.08): section
  titles inside panel headers.
- **Title** (Archivo 600, 1.0625rem, 1.3): node names and case-study headings.
- **Body** (Archivo 400, 0.9375–1.0625rem, 1.6, max 68ch): all prose.
- **Readout** (JetBrains Mono 500, `clamp(1.5rem, 3vw, 2.25rem)`, 1, tabular):
  metric values.
- **Label** (JetBrains Mono 500, 0.6875rem, tracking `0.14em`, uppercase):
  panel labels, port names, units, stage names.

### Named Rules
**The Tabular Rule.** Any digit that represents a measurement is set in
JetBrains Mono with `font-variant-numeric: tabular-nums`, and its unit is a
separate Ink-3 span at 0.55em. Numbers never sit in Archivo.

**The Label Case Rule.** Uppercase is reserved for mono labels at or below
0.75rem. Archivo is never uppercased — no shouting headings.

## Layout

A 16px schematic grid is the page's spatial unit and is drawn, not implied.
The layout is full-bleed — there is no centred max-width container, because a
console occupies its screen. Gutters are 20px on mobile and 40px from `md` up;
prose is held to a 68ch measure by type rather than by a page column. Panels snap to the grid: every panel edge, gap, and internal pad is a
multiple of 8, and the common values are 8 / 16 / 24 / 40 / 72.

Sections are panels with a header rail (mono label left, state or count right)
and a body. Panels butt against each other with shared 1px rules rather than
floating with gaps — the console reads as one assembled instrument, not a card
feed.

Rhythm: `72px` between major sections on desktop, `48px` on mobile, and always
more space above a heading than below it. Sections own their separation through
their own padding — never padding *and* a margin, which is what put 144px of
dead ground before the sandbox. The two graphite blocks that close the page
(sandbox, then contact) butt directly together and are divided by a single
`--field-line` rule: a strip of light ground between two dark fields reads as a
mistake, not a gap. Density alternates deliberately — the
dense readout strip and skills matrix are each followed by a quiet region.

Responsive: the topology switches from a horizontal flow to a vertical stack
under `900px` and keeps every label; the skills matrix goes from four columns to
one; the status bar drops its stage nav to a sheet. Nothing depends on hover.

## Elevation & Depth

There is effectively one elevation. Panels are flat white on the gridded ground,
separated by 1px rules. The only depth cues are:
- the graphite field, which reads as "below" the panels by being darker;
- a 2px inset left border on an active or focused node;
- a hard 1px offset rule under the status bar.

### Shadow Vocabulary
- **None** for panels, cards, and buttons.
- `0 1px 0 rgba(18,22,28,0.06)` only beneath the fixed status bar, to seat it.

### The one elevation
The rail is the single exception to flatness, and it earns it by being a real
layer: it is fixed above content that scrolls underneath it, which a 1px rule
cannot express. It casts `1px 0 0 var(--field-line), 6px 0 22px rgba(18,22,28,
0.16)` — a true offset with a soft blur, never a zero-offset halo. Nothing else
on the surface may take a shadow.

### Named Rules
**The Flat Rule.** If a surface needs separating, it gets a rule or a ground
change — never a shadow. The rail is the one documented exception.

## Shapes

Radii: `2px` for chips, labels, and inputs; `4px` for panels and buttons.
Nothing above 4px, and **no circles anywhere** — status marks are 7px squares at
1px radius, matching the 4px square packet that travels the topology. A round
status dot is the generic web's shorthand; a square reads as an instrument.
Connectors are orthogonal polylines with square corners — no bezier curves
anywhere in the diagram language.

## Components

### Buttons
- **Primary:** graphite fill, white label, 4px radius, 1px graphite border,
  44px min height, Archivo 600 0.9375rem. Hover shifts fill to `#000`; focus
  shows a 2px Active Blue outline at 2px offset.
- **Secondary:** white fill, 1px Rule border, Ink label. Same metrics.
- **Ghost/link:** Active Blue, 1px underline at 0.15em offset.
- Every button carries an optional mono suffix label (e.g. `⌘` or a count) in
  Ink 3 at 0.6875rem.

### Chips
Mono 0.6875rem uppercase, 2px radius, 1px border, `4px 8px` pad. Status chips
take the state color at 10% tint ground with the full-strength color for border,
dot, and text. Stack chips are neutral: white ground, Rule border, Ink 2 text.

### Cards / Containers
Panels: white, 1px Rule border, 4px radius, header rail 40px tall with a bottom
1px rule, body pad 24px (16px on mobile). A panel always declares a mono label
in its header; an unlabeled panel is not part of this system.

### Inputs / Fields
White ground, 1px Rule border, 2px radius, 44px height, mono placeholder in
Ink 3, 2px Active Blue focus outline. Labels sit above in mono uppercase.

### Navigation
The status bar is a fixed 48px graphite field: identity block left, stage links
center as mono uppercase with a 1px underline on the current stage, availability
chip and résumé action right. Stage links scroll-spy and reflect position with
the underline, never with color alone.

### Signature Component: the topology
Nodes are small white panels (label rail + value) placed on the grid, joined by
1px orthogonal connectors with 6px port dots at each end. Edges may carry a
mono edge-label. A packet is a 4px square that travels a connector on a 2.4s
linear loop; packets are suppressed entirely under `prefers-reduced-motion`, and
the diagram remains complete and legible without them. Every node is a real
component of a real system Tushar built — the topology is never illustrative.

### Signature behaviour: the dock
Above 1040px the page is a two-column shell — identity panel left, content
stream right — and the panel is `position: sticky`, so "left fixed, right
scrolls" costs no JavaScript. Scroll progress over the first 280px is written
to `--p` (0→1) on the shell and drives the transition:

| `--p` | what moves |
|---|---|
| 0 | top bar full, no rail, identity block inset 48px into its column, thesis and location open |
| 0→1 | bar translates up and fades, rail translates in from `-100%`, identity block travels its 48px left, thesis and location collapse, headline metrics reveal |
| 1 | rail seated with its shadow, panel compact and held, stream scrolling |

Every `--p`-driven property is a transform, an opacity, or a `max-height` on a
small subtree inside the panel — measured at a 16.7ms median frame interval
with no frame over 20ms through the full range, with no `content-visibility`
needed to get there (it was tried, changed nothing, and left sections
unpainted on a fast scroll). `--p` is never used to drive a
page-level layout property, and the rail's gutter is reserved at every scroll
position so its arrival shifts nothing.

Below 1040px none of this runs: one column, top bar, no rail, nothing
collapsed. Under `prefers-reduced-motion` the shell snaps between the two end
states instead of travelling between them.

### Rail
60px, graphite field, fixed full height. An identity mark at the top, the five
stage symbols in the middle, sandbox and résumé pinned to the bottom. Symbols
are drawn in the topology's own vocabulary — orthogonal 1.5px strokes, square
caps, no diagonals or curves — never borrowed from an icon set. The current
stage is marked by a 2px bar at the rail edge as well as by ground, never by
colour alone. Each button carries a real text label that appears on hover and
focus, so the rail is never a set of unlabelled glyphs to a screen reader.

### Signature interaction: the index and the frame
Nothing arrives as a wall of text. **Builds** is a scannable index — number,
name, one line of kind, state, year — and opening a row moves its full record
into the left frame, which is what a fixed inspector panel is for. A back
control returns the panel to identity; Escape does the same; focus moves to the
record heading on open. Below 1040px there is no frame, so the record opens
inline beneath its row as an ordinary disclosure, and the row carries
`aria-expanded` either way.

This is the density rule generally: the surface shows the shortest thing that
lets someone decide whether to read more, and the reading happens in the frame.

### Scroll ownership
The panel is a scroll container only so a long record can be read inside it,
and its `overscroll-behavior` must stay `auto`. With `contain`, a panel holding
nothing scrollable swallowed the wheel instead of chaining it to the page, and
the entire left half of the screen became a dead zone. A sticky sidebar is not
a modal; it never traps the wheel.

### The cursor
A CAD crosshair tracks the pointer: two 1px rules spanning the viewport at
`rgba(134,145,158,0.3)` — faint enough to read as a guide rather than a
graphic, and mid-toned so it survives both the light canvas and the graphite
fields. The surface is a measurement canvas, so a crosshair is its native
cursor rather than an ornament. No light or glow sits under it. Position is written as two custom properties feeding transforms only,
so it composites. It is off entirely for coarse pointers and for reduced
motion, and it never intercepts a click.

### The sandbox block
One block on the page is allowed to be loud, and it is the one pointing at
`/v1`: full-bleed graphite field, amber kicker and call to action, and a real
captured frame of the 3D build in a frame that sits at `rotateY(-7deg)` and
comes level on hover, with a scanline wash that lifts as it does. Everything
else on the surface stays quiet so this one lands. The image is lazy-loaded and
carries a real description, and the tilt is dropped under reduced motion.

## Do's and Don'ts

### Do:
- Draw the grid. It is the ground the whole system sits on.
- Give every panel a mono label and, where it has one, a state.
- Set every measurement in mono with a separate unit span.
- Let color mean exactly one thing, and keep it rare.
- Keep the diagram truthful — if a node is not in the real system, cut it.
- Preserve full comprehension with motion and JavaScript animation disabled.

### Don't:
- Add a shadow, a glow, a glass blur, or a multi-stop gradient.
- Round anything past 4px, or curve a connector.
- Give anything but the rail and the sandbox frame a shadow, or drive a layout property from `--p`.
- Animate `padding`, `width`, `height` or `margin` on hover — use a transform.
- Put a circle on the surface, or open a record as a modal.
- Uppercase Archivo, or set a number in it.
- Use a status color for a heading, an icon, or emphasis.
- Introduce a second accent "for variety" — the palette is closed.
- Ship a link to a repository or demo that is private, dead, or login-walled.
