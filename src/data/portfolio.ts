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
    "I'm a full-stack developer at Imarticus Learning (with a pre-placement " +
      "offer), building systems that run at government scale — an offline-first " +
      "LMS for 200K+ users, AI pipelines, and the security audits that keep them safe.",
    "I work both ends of the wire: resilient Node.js services humming away in " +
      "the dark, and the React and Next.js interfaces people actually meet. I care " +
      "about clean APIs, 130ms responses, and software that quietly refuses to fall over.",
  ],
  location: "Noida, India",
  email: "tusharprt5@gmail.com",
  // Highlight stats shown as small badges in the hero / about.
  stats: [
    { label: "Users served", value: "200K+" },
    { label: "Uptime", value: "99.97%" },
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
    title: "Languages",
    items: ["C++", "JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "AngularJS",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "REST APIs",
      "WebSockets",
      "WebRTC",
    ],
  },
  {
    title: "DevOps & Infra",
    items: [
      "AWS (S3 · EC2 · Lambda)",
      "Docker",
      "Redis",
      "RabbitMQ",
      "Turborepo",
      "Vite",
      "Linux",
    ],
  },
  {
    title: "Security & Tools",
    items: ["Git", "Burp Suite", "Metasploit", "VAPT", "OWASP"],
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

// Case-study projects — rendered as project-pulse-tracker cards (and listed
// in the terminal). The two live, embeddable builds live in `liveProjects`.
export const projects: Project[] = [
  {
    title: "SPIPA — Govt. LMS",
    year: "2025",
    blurb:
      "An offline-first learning platform for the Sardar Patel Institute of " +
      "Public Administration, deployed on a secure government LAN with zero " +
      "cloud dependency — built to serve 200K+ concurrent users.",
    tags: ["Node.js", "React", "MongoDB", "Redis", "RabbitMQ"],
    featured: true,
    highlights: [
      "Role-based access — Super Admin, Course Manager, Batch Operator",
      "Bilingual UI (English / Gujarati)",
      "Bulk CSV user import at 99.8% success",
      "Facial + GPS attendance",
      "Automated certificates at 250/min",
    ],
    metrics: [
      { label: "Concurrent users", value: "200K+" },
      { label: "Avg API", value: "130ms" },
      { label: "Cache hit", value: "93%" },
      { label: "Uptime", value: "99.97%" },
    ],
  },
  {
    title: "PMRC — PM Research Chair Portal",
    year: "2025",
    blurb:
      "A full-stack portal for a Government of India flagship initiative — " +
      "static pages, auth flows, dashboards for five roles, and dynamic " +
      "application forms (RJSF), hardened through two VAPT audits.",
    tags: ["Next.js", "Node.js", "MongoDB", "RJSF"],
    href: "https://pmrc.education.gov.in/",
    highlights: [
      "Dashboards for 5 distinct roles",
      "Dynamic application forms via RJSF",
      "Cleared Stage-1 & Stage-2 VAPT audits",
      "Resolved 29 vulns — IDOR, JWT bypass, brute-force OTP, clickjacking, priv-esc",
    ],
    metrics: [
      { label: "Vulns closed", value: "29" },
      { label: "Roles", value: "5" },
    ],
  },
  {
    title: "Full-Stack E-Commerce",
    year: "2024",
    blurb:
      "A responsive e-commerce platform with JWT auth, Cloudinary media, " +
      "PayPal checkout, and an admin dashboard with ApexCharts analytics.",
    tags: ["React", "Node.js", "MongoDB"],
    highlights: [
      "JWT authentication",
      "Cloudinary image uploads",
      "PayPal payment flow",
      "Admin analytics with ApexCharts",
    ],
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
export const journey: TimelineNode[] = [
  {
    id: 1,
    title: "Started B.Tech CS",
    date: "2022",
    status: "completed",
    energy: 100,
    kind: "education",
    content:
      "Began B.Tech in Computer Science at AKGEC (AKTU) — first lines of C++ " +
      "and the habit of building things that work.",
    relatedIds: [2],
  },
  {
    id: 2,
    title: "Security & Patents",
    date: "2023",
    status: "completed",
    energy: 85,
    kind: "milestone",
    content:
      "Trained in ethical hacking (Craw Security), filed 2 IoT patents, and " +
      "co-founded AKGEC's Centre for Future Studies & Research.",
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Builder & Finalist",
    date: "2024",
    status: "completed",
    energy: 80,
    kind: "project",
    content:
      "Shipped a full-stack e-commerce platform and reached the Smart India " +
      "Hackathon 2024 finals as backend developer + team lead.",
    relatedIds: [2, 4],
  },
  {
    id: 4,
    title: "Imarticus Internship",
    date: "2025",
    status: "in-progress",
    energy: 70,
    kind: "work",
    content:
      "Full-stack intern at Imarticus (PPO received) — a govt-scale LMS for " +
      "200K+ users, RabbitMQ-powered AI pipelines, and VAPT security work.",
    relatedIds: [3, 5],
  },
  {
    id: 5,
    title: "What's Next",
    date: "2026",
    status: "pending",
    energy: 35,
    kind: "milestone",
    content:
      "Graduating B.Tech — chasing high-impact backend / full-stack work and " +
      "shipping QSpace.",
    relatedIds: [4],
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
