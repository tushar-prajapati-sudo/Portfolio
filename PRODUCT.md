# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: technical hiring managers, engineering leads, and recruiters screening
for **AI Engineer** and **Senior Full-Stack** roles. They arrive from a resume
link, a LinkedIn profile, or a referral, on desktop or phone, with 10–30 seconds
of attention on the first pass and — if convinced — 5–30 minutes on a second,
deeper pass where they read for depth and try to catch inflation.

Secondary: peer engineers arriving from a shared link, and potential
collaborators on AI-agent work.

## Product Purpose

A personal portfolio for Tushar Prajapati that converts a cold visitor into a
conversation. Success is a reply in the inbox or a recruiter screen booked.
It must survive two very different readings: a 10-second skim that answers
"what is he and is he any good", and a 30-minute technical read that holds up
under someone who knows the domain.

## Positioning

AI + Full-Stack, balanced and deliberately so. The differentiator is not "I
used an LLM API" — it is **production instincts applied to AI systems**:
eval harnesses, memory architecture, token-budget economics, queue design,
and security hardening, on systems that actually carry load. Most candidates
at this level show a tutorial RAG app; Tushar has a government-scale LMS at
99.97% uptime, a VAPT audit he led to closure, and an agent with a real
eval gate.

## Operating Context

- Reached primarily from a resume PDF (`Tushar_Prajapati_Resume_DTAG.pdf`) and
  LinkedIn. The site must agree with the resume; contradictions are fatal.
- Currently deployed at `tushar-here.vercel.app` from GitHub
  `tushar-prajapati-sudo/Portfolio`.
- Indian job market, remote-friendly; graduating B.Tech 2026 while already
  employed full-time with a PPO.

## Capabilities and Constraints

- Vite 5 + React 18 + TypeScript + Tailwind 3. No router installed; adding
  dependencies requires the owner's approval.
- The existing 3D/WebGL build (Spline robot, shaders, CRT overlays, Arkanoid
  text, howler audio) is being **preserved verbatim at `/v1`**, not deleted.
- The new primary site must load fast on mobile — the research bar is under
  2 seconds — which rules out carrying the Spline/WebGL payload onto `/`.
- **Every headline project repository is currently private** (Saia, crud,
  sudouser, raven-agents, raven-niro, QSpace, verified via GitHub API on
  2026-09-12). Links must therefore be data-driven and degrade to nothing
  when absent. No fabricated demo links.
- Public GitHub profile currently shows 19 learning-grade repositories.

## Brand Commitments

- Name: Tushar Prajapati. Title on the new resume: **AI Engineer & Full Stack
  Developer**.
- Canonical GitHub: `github.com/tushar-prajapati-sudo` (confirmed by owner over
  two other accounts that have zero public repos).
- LinkedIn: `linkedin.com/in/tushar-prajapati-32065a266`.
- Email `tusharprt5@gmail.com`, phone `+91 9354868063`, based in Noida, India.
- Client names (SPIPA / Govt. of Gujarat, PMRC / Govt. of India, Imarticus
  Learning, HDFC) are approved for public use by the owner.
- Security work is described by finding count and hardening categories rather
  than as a published vulnerability inventory against a named national system.

## Evidence on Hand

Verified in this session against the local working copies, not taken on trust:

- **Saia** — `~/workspace/saia`, 31 commits. Memory engine confirmed
  (`packages/shared/salience.js`, `apps/server/test/imprint.test.js`,
  `recall.test.js`), eval harness confirmed (`evals/run.js`, `evals/judge.js`,
  `evals/probes`), proactive engine confirmed (`src/engine/proactive.js`).
  The repo README's phase checkboxes are stale and understate what is built.
- **Claude Skills Library** — `~/workspace/skills-lock.json` confirmed:
  a versioned registry of exactly **21** skills.
- **crud** — `~/workspace/crud`, 90 commits, pnpm monorepo, docker-compose,
  nginx deploy config present.
- **sudouser** — `~/workspace/sudouser`, 7 commits, pnpm monorepo.
- Resume metrics (200K+ users, 130ms avg API, 93% Redis cache hit, 99.97%
  uptime over 30 days, 29 vulnerabilities closed) come from the owner's resume
  and are used as given. They are not independently verifiable here.
- Patents: IoT-Enabled Street Light Regulation System (Jan 2024); Smart Field
  Personnel Monitoring System (Oct 2023). Smart India Hackathon 2024 finalist,
  backend lead.
- **Absent and not to be invented:** testimonials, employer quotes, star counts,
  user reviews, live demo URLs, screenshots of client systems, benchmark charts
  for Saia, and any claim about repositories being public while they are not.

## Product Principles

1. **Agree with the resume, always.** The site and the PDF are read side by
   side; any contradiction reads as inflation and costs more than it gains.
2. **Evidence over adjectives.** A number, a commit, an architecture decision,
   or a named constraint beats any superlative. No "passionate", no "rockstar".
3. **Survive the 30-minute read.** Depth must exist beneath the skim for the
   person who goes looking, and must not crumble when they do.
4. **Never link to nothing.** A dead or login-walled link costs more credibility
   than an absent one; links are data and absence renders nothing.
5. **Speed is a credibility signal.** For an engineer, a slow portfolio is a
   work sample that argues against him.

## Accessibility & Inclusion

Standard target WCAG 2.2 AA: full keyboard operability, visible focus states,
respect for `prefers-reduced-motion`, AA contrast on all text, and complete
comprehension with JavaScript animation disabled. Mobile-first — a large share
of recruiter traffic opens links on a phone.
