# Portfolio — Tushar Prajapati

Two sites in one repo.

| Route | What it is | Payload |
|---|---|---|
| `/` | The current portfolio — an operations console for the systems in the résumé | ~63 KB |
| `/v1/` | The original 3D build: Spline robot, WebGL shaders, CRT overlays. Kept verbatim. | ~2 MB |

They are separate Vite entries, so `/` never loads a byte of the Spline or
shader bundle.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173        (/ and /v1/)
npm run build    # type-check + production build
npm run preview  # serve dist/ on :4173
```

Requires Node 18+.

## Editing content

**Everything on `/` lives in [`src/site/data.ts`](src/site/data.ts)** — profile,
metrics, the pipeline topology, the system write-ups, roles, skills and
credentials. You should not need to touch a component to change copy.

Two rules that file enforces, and they matter:

1. **It has to agree with the résumé.** The two get read side by side, and a
   contradiction reads as inflation.
2. **`repo` and `demo` are optional.** A link that 404s or hits a login wall
   costs more credibility than no link at all, so a system with neither renders
   a "private repository" chip instead. Fill one in the moment a repo goes
   public — nothing else needs to change.

To regenerate the social share card after changing the headline numbers:

```bash
node scripts/og.mjs      # writes public/og.png
```

The sandbox block shows a real captured frame of `/v1`. To refresh it after
changing that build (needs `npm run preview` running):

```bash
node scripts/v1-shot.mjs
sips -Z 1400 -s format jpeg -s formatOptions 72 public/sandbox.png --out public/sandbox.jpg
rm public/sandbox.png
```

`BUILD_KB` in `data.ts` is quoted in the footer and the sandbox panel. If the
bundle size moves meaningfully, update it — check `npm run build` output and add
the main CSS, main JS and client chunk gzip figures.

## Structure

```
index.html                 # entry for /
v1/index.html              # entry for /v1  (loads the original app)
src/
├── site/                  # the current portfolio
│   ├── data.ts            # ← single source of truth for all content
│   ├── Site.tsx
│   ├── useShell.ts        # scroll-dock progress, breakpoint, scroll-spy
│   ├── ui/
│   │   ├── Topology.tsx   # the pipeline diagram (signature component)
│   │   ├── SystemDetail.tsx # a build record — renders in the frame or inline
│   │   ├── CursorField.tsx  # the CAD crosshair
│   │   ├── icons.tsx      # rail symbols, drawn in the diagram vocabulary
│   │   └── parts.tsx      # Panel, Chip, Readout
│   └── sections/          # StatusBar, Rail, HomePanel, StreamHead, About,
│                          #   Systems, Record, Stack, Sandbox, Contact
├── site.css               # tokens + every component style for /
├── v1.tsx                 # entry module for the archived build
├── App.tsx, components/   # the archived build, untouched
└── index.css              # Tailwind + tokens, used only by /v1
```

`/` is plain CSS with no Tailwind, which is most of why it fits in 63 KB.
`/v1` still uses Tailwind via `index.css`; the two never share tokens.

## The shell

Above 1040px the page is a two-column shell: identity panel left, content
stream right. The panel is `position: sticky`, so "left fixed, right scrolls"
needs no JavaScript. Scroll progress over the first 280px is written to `--p`
on the shell and drives the separation — the top bar retracts, the rail slides
in, the panel ground and divider resolve, the boundary widens, and the section
index appears. Every `--p`-driven property is a transform, an opacity, or a
`max-height` inside the panel; stream sections use `content-visibility: auto`
so narrowing the column never reflows what is offscreen.

Opening a build record moves it into that left panel. Below 1040px none of this
runs — one column, top bar, no rail, and records open inline.

## Design system

`PRODUCT.md` holds the product truth, `DESIGN.md` the visual system — palette,
type scale, component contracts, and the rules the build is held to. Read
`DESIGN.md` before changing anything visual on `/`.

Short version: a light gridded engineering canvas, graphite ink, four
functional state colors (ready / active / queued / fault) that are only ever
used to report state, hard 1px rules, nothing rounder than 4px, no shadows and
no glow. Archivo for structure, JetBrains Mono for every number and label.

## A note on the build

`vite.config.ts` pins `NODE_ENV=production` for builds on purpose. This machine
exports `NODE_ENV=local` from the shell profile, and both Vite and
`@vitejs/plugin-react` read it — without the pin, a production build silently
ships the development React (the dev JSX transform plus both copies of
react-dom, roughly double the JS). Do not remove it.

## Checks

```bash
node scripts/shoot.mjs     # desktop + mobile screenshots to /tmp/shots
node scripts/widths.mjs    # overflow + text-clipping across 11 breakpoints
node scripts/check.mjs     # /v1 boots, a11y structure, tab order
node scripts/final.mjs     # reduced motion, load timing, link inventory
```

Run `npm run preview` first — they all point at `:4173`.
