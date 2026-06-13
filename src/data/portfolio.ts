/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site — every section reads from here.
 *
 * Anything marked `TODO:` is a placeholder you should replace with real info.
 */

import type { ComponentType } from "react";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/brand-icons";

/** Any icon component that accepts a `className` (lucide or our brand SVGs). */
type IconType = ComponentType<{ className?: string }>;

export const profile = {
  name: "Tushar Prajapati",
  // Short role shown under the name in the hero.
  role: "Full-Stack Developer",
  // One-liner that animates in the hero. Keep it punchy.
  tagline:
    "I build the web end to end — the quiet machinery underneath, and the pixels you actually touch.",
  // 2–3 sentence intro used in the About section.
  about: [
    "I'm a full-stack developer with a soft spot for both ends of the wire — " +
      "the resilient Node.js and Express services humming away in the dark, and " +
      "the React and Next.js interfaces people actually meet.",
    "Right now I'm building " +
      "backend systems, AI-assisted tooling, and the occasional security review. " +
      "I care about clean APIs, pages that load before you blink, and software " +
      "that quietly refuses to fall over.",
  ],
  location: "India", // TODO: confirm / refine
  email: "tusharprt5@gmail.com", // TODO: use a public-facing email if you prefer
  // Highlight stats shown as small badges in the hero / about.
  stats: [
    { label: "Years coding", value: "3+" }, // TODO: adjust
    { label: "Projects shipped", value: "10+" }, // TODO: adjust
    { label: "Open to", value: "Work" },
  ],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/USERNAME", icon: GithubIcon }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/in/USERNAME", icon: LinkedinIcon }, // TODO
  { label: "X / Twitter", href: "https://x.com/USERNAME", icon: XIcon }, // TODO
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

// Primary CTA in the hero — point this at your résumé PDF (drop it in /public).
export const resume = {
  label: "Résumé",
  href: "/resume.pdf", // TODO: add public/resume.pdf
  icon: FileText,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// Grouped tech — shown in the Skills section.
export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "WebSockets"],
  },
  {
    title: "Data & Messaging",
    items: ["MongoDB", "Redis", "RabbitMQ"],
  },
  {
    title: "Cloud & Tooling",
    items: ["AWS (S3 · EC2 · Lambda)", "Docker", "Git", "Vite"],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Go"],
  },
  {
    title: "Security",
    items: ["VAPT", "OWASP Top 10", "Burp Suite"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string; // live demo / site
  repo?: string; // source
  // Optional image path (drop screenshots in /public). Falls back to a gradient.
  image?: string;
  featured?: boolean;
  year?: string;
  highlights?: string[]; // delivered features / achievements
  metrics?: { label: string; value: string }[]; // headline numbers
};

// TODO: replace these with your real projects (title, blurb, links, screenshots).
export const projects: Project[] = [
  {
    title: "Project One",
    blurb:
      "TODO: one or two sentences on what it does and what you built. Lead " +
      "with the impact (users, speed, scale) not the to-do list.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    href: "#",
    repo: "#",
    image: "/projects/project-one.png", // TODO: add screenshot
    featured: true,
  },
  {
    title: "Project Two",
    blurb: "TODO: short description of the second project.",
    tags: ["React", "Express", "Redis"],
    href: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    blurb: "TODO: short description of the third project.",
    tags: ["Go", "AWS", "RabbitMQ"],
    href: "#",
    repo: "#",
  },
];

export type TimelineNode = {
  id: number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  // 0–100, drives the orbital "energy" ring.
  energy: number;
  content: string;
  // "work" | "education" | "project" | "milestone" — picks an icon.
  kind: "work" | "education" | "project" | "milestone";
  relatedIds: number[];
};

// Shown in the radial orbital timeline (Journey section).
// TODO: refine dates and details.
export const journey: TimelineNode[] = [
  {
    id: 1,
    title: "Started Coding",
    date: "2023",
    status: "completed",
    energy: 100,
    kind: "milestone",
    content:
      "TODO: where it began — first language, first project, the spark.",
    relatedIds: [2],
  },
  {
    id: 2,
    title: "Full-Stack Web",
    date: "2024",
    status: "completed",
    energy: 90,
    kind: "education",
    content:
      "TODO: dove into the MERN stack, Next.js, and cloud — built and shipped.",
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Imarticus Internship",
    date: "2025",
    status: "in-progress",
    energy: 70,
    kind: "work",
    content:
      "Interning (with a PPO) — backend systems, AI-assisted tooling, and " +
      "security reviews on production services.",
    relatedIds: [2, 4],
  },
  {
    id: 4,
    title: "What's Next",
    date: "2026",
    status: "pending",
    energy: 30,
    kind: "milestone",
    content: "TODO: the next chapter — role, focus, or goal you're chasing.",
    relatedIds: [3],
  },
];

// ── Live projects (embedded as iframes in the Projects section) ──────────
export type LiveProject = {
  title: string;
  url: string; // must allow framing (no X-Frame-Options / frame-ancestors)
  description: string;
  tags: string[];
  repo?: string;
};

export const liveProjects: LiveProject[] = [
  {
    title: "Ossam Hospital",
    url: "https://ossamhospital.com/",
    description:
      "A clean, responsive web presence for Ossam Hospital — services, " +
      "departments and patient-facing information, built to load fast.",
    tags: ["Frontend", "Responsive", "UI"], // TODO: confirm real stack
  },
  {
    title: "Fresh Fit Fuel",
    url: "https://fresh-fit-fuel-eight.vercel.app/",
    description:
      "An interactive, mobile-first menu for WON Diet Cafe — browse dishes, " +
      "build a cart, and check out through a pre-filled WhatsApp message. " +
      "Headlined by a draggable low-poly 3D food hero.",
    tags: ["React", "Vite", "Three.js", "Tailwind", "Framer Motion"],
    repo: "https://github.com/rootnlogs/fresh-fit-fuel",
  },
];

// ── Plan tree (drives the agent-plan component for ongoing work) ─────────
export type PlanStatus =
  | "completed"
  | "in-progress"
  | "pending"
  | "need-help"
  | "failed";

export type PlanSubtask = {
  id: string;
  title: string;
  description: string;
  status: PlanStatus;
  tools?: string[]; // repurposed as "stack" badges
};

export type PlanTask = {
  id: string;
  title: string;
  description: string;
  status: PlanStatus;
  dependencies: string[];
  subtasks: PlanSubtask[];
};

export const qspace = {
  name: "QSpace",
  tagline:
    "A premium real-time collaborative platform — shared rooms, watch " +
    "parties, A/V conferencing and Three.js-powered 3D spaces, engineered " +
    "for 2,000+ concurrent users and horizontal scale.",
  repo: "", // TODO: add QSpace repo when public
  // Phased build plan — expand a phase to see its work.
  phases: [
    {
      id: "1",
      title: "Architecture & Foundations",
      description:
        "Turborepo + pnpm monorepo and the shared groundwork every later " +
        "phase builds on.",
      status: "completed",
      dependencies: [],
      subtasks: [
        {
          id: "1.1",
          title: "Turborepo + pnpm monorepo",
          description:
            "Workspace layout, task pipeline and caching across apps and packages.",
          status: "completed",
          tools: ["Turborepo", "pnpm"],
        },
        {
          id: "1.2",
          title: "Shared packages & config",
          description:
            "Centralised tsconfig, ESLint/Prettier and a shared UI package.",
          status: "completed",
          tools: ["TypeScript", "ESLint"],
        },
        {
          id: "1.3",
          title: "Dockerised infrastructure",
          description:
            "Local stack for Postgres and Redis, ready to mirror in prod.",
          status: "completed",
          tools: ["Docker", "Postgres", "Redis"],
        },
      ],
    },
    {
      id: "2",
      title: "Real-Time Core",
      description:
        "The live backbone — connections, presence and rooms built to scale " +
        "horizontally.",
      status: "in-progress",
      dependencies: [],
      subtasks: [
        {
          id: "2.1",
          title: "WebSocket gateway",
          description: "Authenticated socket layer with reconnection and heartbeats.",
          status: "in-progress",
          tools: ["WebSockets", "Node.js"],
        },
        {
          id: "2.2",
          title: "Presence & rooms",
          description: "Shared spaces, membership and live presence indicators.",
          status: "pending",
          tools: ["Redis"],
        },
        {
          id: "2.3",
          title: "Horizontal fan-out",
          description:
            "Redis pub/sub so events span instances toward 2,000+ concurrent users.",
          status: "pending",
          tools: ["Redis", "Pub/Sub"],
        },
      ],
    },
    {
      id: "3",
      title: "Media & Conferencing",
      description: "Audio, video and shared media experiences.",
      status: "pending",
      dependencies: [],
      subtasks: [
        {
          id: "3.1",
          title: "A/V conferencing",
          description: "WebRTC with an SFU for multi-party audio and video.",
          status: "pending",
          tools: ["WebRTC", "SFU"],
        },
        {
          id: "3.2",
          title: "Watch parties",
          description: "Synced playback so a room watches together in lockstep.",
          status: "pending",
          tools: ["WebSockets"],
        },
      ],
    },
    {
      id: "4",
      title: "Shared 3D Spaces",
      description: "Three.js-powered rooms you can inhabit together.",
      status: "pending",
      dependencies: [],
      subtasks: [
        {
          id: "4.1",
          title: "Three.js shared scenes",
          description: "Real-time synced 3D environments with presence and avatars.",
          status: "pending",
          tools: ["Three.js", "WebGL"],
        },
      ],
    },
  ] as PlanTask[],
};
