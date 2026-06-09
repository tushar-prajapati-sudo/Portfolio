# Portfolio — Tushar Prajapati

A single-page developer portfolio built with **Vite + React + TypeScript +
Tailwind**. Dark, amber-accented, with an interactive Spline 3D robot in the
hero, a hand-written WebGL shader background, a custom cursor spotlight, and
scroll/orbital animations.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview
```

> Requires Node 18+. Fonts load from Google Fonts and the robot loads from
> `prod.spline.design`, so the site needs network access at runtime.

## Editing content

**All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts)** — name,
role, about, socials, skills, projects, and the journey timeline. Anything
marked `TODO:` is a placeholder to replace. You shouldn't need to touch the
section components to update text or links.

To add a résumé: drop `resume.pdf` in `public/`.
To add project screenshots: drop images in `public/projects/` and point the
project's `image` field at them.

## Structure

```
src/
├── data/portfolio.ts                 # ← single source of truth for all content
├── components/
│   ├── effects/
│   │   ├── ShaderBackground.tsx       # raw-WebGL amber field (no three.js)
│   │   └── CursorSpotlight.tsx        # custom cursor + screen-blend spotlight
│   ├── ui/
│   │   ├── splite.tsx                 # lazy-loaded Spline wrapper
│   │   ├── spotlight.tsx              # hero SVG spotlight
│   │   ├── container.tsx              # layout column
│   │   ├── section-heading.tsx        # shared section header
│   │   ├── brand-icons.tsx            # GitHub / LinkedIn / X SVGs
│   │   ├── container-scroll.tsx       # scroll-driven 3D showcase (Projects)
│   │   └── radial-orbital-timeline.tsx# orbiting timeline (Journey)
│   └── sections/                      # Navbar, Hero, About, Skills,
│                                      #   Projects, Journey, Contact
├── App.tsx                            # composition + global background/cursor
├── main.tsx
└── index.css                          # theme tokens, cursor + scrollbar styles
```

## Design system

- **Theme:** dark-first, amber primary (`36 100% 60%`) — tokens in `index.css`.
- **Fonts:** Instrument Serif (display), Sora (body), JetBrains Mono (labels).
- **Performance:** exactly one WebGL Spline scene (hero, lazy-loaded); the
  shader background renders at a capped pixel ratio and pauses when the tab is
  hidden or `prefers-reduced-motion` is set. The custom cursor only engages on
  fine pointers (desktop).

## Credits

Effects adapted (not copied) from [21st.dev](https://21st.dev) community
components — shader fields, the Aceternity container-scroll, and a radial
orbital timeline — recolored and rebuilt to fit this theme.
