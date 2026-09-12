/**
 * Single source of truth for the portfolio.
 *
 * Rules this file keeps:
 *  - Every claim here matches the résumé (Tushar_Prajapati_Resume_DTAG.pdf).
 *    The two documents get read side by side; a contradiction reads as
 *    inflation and costs more than it gains.
 *  - `repo` / `demo` are optional on purpose. A link that 404s or hits a login
 *    wall is worse than no link, so absent links render nothing at all.
 *    Fill one in the moment a repository actually goes public.
 */

/** Gzipped weight of this page's own CSS + JS. Checked against the build
 *  output — it appears in the footer and in the sandbox comparison. */
export const BUILD_KB = 58;

export type Visibility = "public" | "private";

export const profile = {
  name: "Tushar Prajapati",
  title: "AI Engineer & Full Stack Developer",
  /** The one sentence that has to land in the first viewport. */
  thesis:
    "I build AI systems with production instincts — eval gates, memory architecture, queue topology and token economics — on platforms that carry real load.",
  location: "Noida, India",
  email: "tusharprt5@gmail.com",
  github: "https://github.com/tushar-prajapati-sudo",
  githubHandle: "tushar-prajapati-sudo",
  linkedin: "https://linkedin.com/in/tushar-prajapati-32065a266",
  linkedinHandle: "tushar-prajapati",
  resume: "/resume.pdf",
  /**
   * Deliberately not rendered on the page. It is on the résumé, which goes to
   * named people; this site is indexed by search engines and scraped for
   * phone numbers. Ask Tushar before surfacing it.
   */
  phone: "+91 9354868063",
} as const;

export const availability = {
  state: "ready" as const,
  label: "Open to work",
  detail: "AI Engineer & Full-Stack roles",
};

/** Instrument readouts. Every one of these is on the résumé. */
export const readouts: {
  value: string;
  unit?: string;
  label: string;
  /** Where the number comes from — a measurement without a window is a boast. */
  window: string;
  state?: State;
}[] = [
  { value: "200", unit: "K+", label: "Users served", window: "SPIPA LMS, Govt. of Gujarat" },
  { value: "130", unit: "ms", label: "Avg. API response", window: "SPIPA LMS, production" },
  { value: "99.97", unit: "%", label: "Uptime", window: "30-day window", state: "ready" },
  { value: "93", unit: "%", label: "Redis cache hit", window: "SPIPA LMS, production" },
  { value: "29", label: "Findings closed", window: "PMRC VAPT, Govt. of India", state: "fault" },
];

export type State = "ready" | "active" | "queued" | "fault" | "idle";

/* ------------------------------------------------------------------ *
 * The topology in the first viewport.
 * This is the real Imarticus AI pipeline, not an illustration. Every
 * node is a component that exists; if one ever stops being real, cut it.
 * ------------------------------------------------------------------ */

export type TopoNode = {
  id: string;
  label: string;
  sub: string;
  kind: "source" | "queue" | "worker" | "sink" | "fault";
  /** Column, row on the topology grid. */
  col: number;
  row: number;
  state?: State;
};

export const topology: { nodes: TopoNode[]; edges: [string, string, string?][] } = {
  nodes: [
    { id: "req", label: "Learner event", sub: "LMS · interview", kind: "source", col: 0, row: 1 },
    { id: "mq", label: "RabbitMQ", sub: "priority queues", kind: "queue", col: 1, row: 1, state: "active" },
    { id: "worker", label: "Batch worker", sub: "Gemini 2.5", kind: "worker", col: 2, row: 1, state: "active" },
    { id: "dlq", label: "Retry / DLQ", sub: "fault-tolerant", kind: "fault", col: 2, row: 2, state: "fault" },
    { id: "sum", label: "AI Summarization", sub: "shipped", kind: "sink", col: 3, row: 0, state: "ready" },
    { id: "tutor", label: "AI Tutor", sub: "shipped", kind: "sink", col: 3, row: 1, state: "ready" },
    { id: "grill", label: "Grill Master", sub: "mock interview", kind: "sink", col: 3, row: 2, state: "ready" },
  ],
  edges: [
    ["req", "mq", "publish"],
    ["mq", "worker", "consume"],
    ["worker", "dlq", "retry"],
    ["worker", "sum"],
    ["worker", "tutor"],
    ["worker", "grill"],
  ],
};

/* ------------------------------------------------------------------ *
 * Systems
 * ------------------------------------------------------------------ */

export type System = {
  id: string;
  name: string;
  kind: string;
  year: string;
  state: State;
  stateLabel: string;
  visibility: Visibility;
  /** Only set these when the link genuinely resolves for a stranger. */
  repo?: string;
  demo?: string;
  summary: string;
  problem: string;
  approach: { head: string; body: string }[];
  /** Things a reader can check, not adjectives. */
  evidence: string[];
  stack: string[];
  /** The system's real path, drawn in the same grammar as the pipeline. */
  flow: string[];
};

export const systems: System[] = [
  {
    id: "saia",
    name: "Saia",
    kind: "Adaptive AI agent — RAG, memory, evals",
    year: "2026",
    state: "active",
    stateLabel: "In development",
    visibility: "private",
    summary:
      "An autonomous conversational agent with a persistent memory engine, retrieval over its own history, and an eval harness that gates every release.",
    problem:
      "Chat agents forget. Each session starts cold, so the agent can never hold a position, notice a change, or follow up — and there is no way to tell whether a prompt change quietly broke its identity, because nobody measures it.",
    approach: [
      {
        head: "Memory engine",
        body: "Imprint, recall and salience as separate stages. Memories are written with a salience score, decayed over time, and recalled by cosine similarity over Voyage embeddings rather than by stuffing a transcript into the context window.",
      },
      {
        head: "Eval harness as a release gate",
        body: "Identity, memory and continuity probes run against real LLMs — not fixtures — before every release, scored by a judge model behind a ≥2-of-3 pass gate. A release that fails the gate does not ship.",
      },
      {
        head: "Swappable model adapter",
        body: "One adapter interface behind the whole agent, so the underlying model is a configuration choice rather than a rewrite. Gemini today; Anthropic and OpenAI are drop-in.",
      },
      {
        head: "Proactivity",
        body: "A background engine opens threads on its own — tool use and multi-step planning driven off queued work rather than off a user turn.",
      },
    ],
    evidence: [
      "Memory engine: imprint / recall / salience each with its own test suite",
      "Eval harness: probe set, judge model, ≥2-of-3 release gate",
      "31 commits across a ticket-driven build loop",
      "Swappable adapter verified against more than one provider",
    ],
    stack: ["Node.js", "LLM APIs", "Voyage embeddings", "RAG", "BullMQ", "MongoDB", "Redis"],
    flow: ["Turn", "Imprint", "Salience", "Recall", "Plan", "Eval gate"],
  },
  {
    id: "skills",
    name: "Claude Skills Library",
    kind: "21-skill agent toolkit with a hashed registry",
    year: "2026",
    state: "ready",
    stateLabel: "In use daily",
    visibility: "private",
    summary:
      "Twenty-one reusable agent skills packaged behind a lock-file registry that hashes and versions each one — so an agent's capabilities are a reproducible dependency set rather than a folder of prompts.",
    problem:
      "Agent prompts rot. They get copied between projects, edited in place, and drift, and there is no way to answer the only question that matters in production: which exact version of which instruction produced this output?",
    approach: [
      {
        head: "Skills as versioned packages",
        body: "Each skill is a self-contained unit with its own metadata and assets, authored or curated for one job — design taste, animation vocabulary, image-to-code, visual design review.",
      },
      {
        head: "A real lock file",
        body: "skills-lock.json hashes and versions every skill in the set, in the same shape a package manager uses. The installed capability set is reproducible and diffable.",
      },
      {
        head: "MCP-style packaging",
        body: "Skills ship alongside a personal Claude Code / MCP setup, so the same registry drives the agent tooling in day-to-day work.",
      },
    ],
    evidence: [
      "21 skills in the registry, each hashed and versioned",
      "Lock file is the installed set — reproducible across machines",
      "Used as the working agent toolchain, not a demo",
    ],
    stack: ["Prompt engineering", "MCP", "Skill packaging", "Registry / lock file"],
    flow: ["Skill source", "Hash", "Version", "skills-lock.json", "Agent runtime"],
  },
  {
    id: "ravenedge",
    name: "CRUD & Sudouser",
    kind: "Two production platforms — RavenEdge",
    year: "2026",
    state: "ready",
    stateLabel: "Deployed",
    visibility: "private",
    summary:
      "A team platform (agile, CRM, campaigns) and a self-hosted single-user AI OS, built as TypeScript-strict pnpm monorepos and shipped behind Docker Compose and Nginx.",
    problem:
      "Two products with very different users — a team that needs shared workflow and one person who needs a private AI operating system — but one maintainer. Separate stacks would have doubled the surface area he has to keep alive.",
    approach: [
      {
        head: "One monorepo discipline, two products",
        body: "pnpm workspaces with TypeScript strict everywhere and a shared base config, so packages move between the two platforms instead of being rewritten.",
      },
      {
        head: "Auth built properly",
        body: "JWT sessions over argon2 password hashing — the current recommendation rather than the familiar one.",
      },
      {
        head: "Self-hostable by design",
        body: "Docker Compose plus Nginx, with the deploy config living in the repo. Sudouser in particular has to run on someone's own machine to be worth anything.",
      },
    ],
    evidence: [
      "90 commits on the team platform, 7 on the AI OS",
      "TypeScript strict across every package",
      "Deploy config (compose + nginx) versioned with the code",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Docker", "Nginx", "JWT", "argon2"],
    flow: ["pnpm monorepo", "TS strict build", "Docker Compose", "Nginx", "Host"],
  },
];

/* ------------------------------------------------------------------ *
 * Experience
 * ------------------------------------------------------------------ */

export type Role = {
  org: string;
  title: string;
  period: string;
  location: string;
  state: State;
  entries: { head: string; body: string; metrics?: { value: string; unit?: string; label: string }[] }[];
};

export const roles: Role[] = [
  {
    org: "Imarticus Learning",
    title: "Full Stack Developer — AI, Node.js, React",
    period: "Aug 2025 — Present",
    location: "Noida",
    state: "active",
    entries: [
      {
        head: "AI pipeline",
        body: "Designed the RabbitMQ batch worker behind AI Summarization, AI Tutor and Grill Master — priority queues, fault-tolerant retries, function calling and token-budget optimisation against Gemini 2.5.",
      },
      {
        head: "SPIPA LMS — Govt. of Gujarat",
        body: "Shipped an offline-first, LAN-deployed learning platform for a state government. It runs where the internet does not.",
        metrics: [
          { value: "200", unit: "K+", label: "users" },
          { value: "130", unit: "ms", label: "avg. API" },
          { value: "93", unit: "%", label: "cache hit" },
          { value: "99.97", unit: "%", label: "uptime / 30d" },
        ],
      },
      {
        head: "Security — PMRC VAPT, Govt. of India",
        body: "Led the audit resolution to closure: 29 findings across access control, authentication, session handling and clickjacking, plus CSP hardening.",
      },
      {
        head: "Infrastructure",
        body: "Cut LLM token spend, automated HDFC bank reconciliation on AWS Lambda, and built Hachiko — the health-check and alerting service that watches production.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Capabilities — grouped as on the résumé.
 * ------------------------------------------------------------------ */

export const capabilities: { group: string; items: string[] }[] = [
  {
    group: "LLM & agents",
    items: ["OpenAI", "Anthropic", "Gemini", "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "AutoGen", "MCP", "RAG", "Tool use", "Multi-step planning", "Evals"],
  },
  { group: "Vector stores", items: ["pgvector", "Chroma", "Pinecone", "Weaviate", "Voyage"] },
  { group: "Languages & Python web", items: ["Python", "TypeScript", "JavaScript", "C++", "FastAPI", "Flask", "Django"] },
  { group: "Frontend", items: ["React", "Hooks", "Redux", "Next.js", "Tailwind", "HTML5 / CSS3"] },
  { group: "Backend & APIs", items: ["Node.js", "Express", "REST", "GraphQL", "MongoDB", "PostgreSQL", "Redis"] },
  { group: "DevOps", items: ["Docker", "Kubernetes", "AWS (S3 · EC2 · Lambda)", "CI/CD", "Git"] },
  { group: "Security", items: ["VAPT", "OWASP", "Burp Suite", "CSP hardening", "Threat modelling"] },
];

/* ------------------------------------------------------------------ *
 * Record — education, patents, certifications, achievements.
 * ------------------------------------------------------------------ */

export const education = [
  { school: "Ajay Kumar Garg Engineering College (AKTU)", award: "B.Tech, Computer Science", period: "2022 — 2026", note: "CGPA 7.59 / 10" },
  { school: "G.R. Global Academy, Dadri", award: "Intermediate", period: "2021", note: "94%" },
  { school: "DSR Modern School, Dadri", award: "High School", period: "2019", note: "95%" },
];

export const patents = [
  { title: "IoT-Enabled Street Light Regulation System", date: "Jan 2024" },
  { title: "Smart Field Personnel Monitoring System", date: "Oct 2023" },
];

export const achievements = [
  { title: "Finalist — Smart India Hackathon 2024", note: "Backend lead" },
  { title: "Co-founder — Centre for Future Studies and Research, AKGEC", note: "Led the MARE'24 workshop and cybersecurity sessions" },
];

export const certifications = [
  { title: "Ethical Hacking & Countermeasures", issuer: "Craw Security", date: "2023" },
  { title: "Cybersecurity for Business", issuer: "EC-Council" },
];

export const stages = [
  { id: "pipeline", label: "Pipeline" },
  { id: "systems", label: "Systems" },
  { id: "record", label: "Record" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
