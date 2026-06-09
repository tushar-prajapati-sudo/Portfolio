import { useEffect, useRef, useState, type ComponentType } from "react";
import { Home, User, Wrench, FolderGit2, Route, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/brand-icons";
import { profile } from "@/data/portfolio";

type Icon = ComponentType<{ className?: string }>;
type NavNode = { label: string; href: string; icon: Icon; external?: boolean };

const NODES: NavNode[] = [
  { label: "Top", href: "#top", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Work", href: "#projects", icon: FolderGit2 },
  { label: "Journey", href: "#journey", icon: Route },
  { label: "Contact", href: "#contact", icon: Mail },
  { label: "GitHub", href: "https://github.com/USERNAME", icon: GithubIcon, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/USERNAME", icon: LinkedinIcon, external: true },
  { label: "X", href: "https://x.com/USERNAME", icon: XIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: true },
];

const R = 158; // node orbit radius from the corner
const SIZE = 280; // visible quarter square in the corner
const FAST = 0.5; // deg/tick default
const SLOW = 0.08; // deg/tick on hover

/**
 * Navigation as a rotating QUARTER-DISK pinned into the top-right corner: the
 * disk's centre sits at the corner, so only its bottom-left quarter shows.
 * Items continuously orbit through that quarter — fast by default, slowing on
 * hover so they can be clicked. Section nodes smooth-scroll (Lenis); socials
 * open externally. Replaces the old header.
 */
export function OrbitalNav() {
  const [rotation, setRotation] = useState(0);
  const speed = useRef(FAST);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setRotation((r) => (r + speed.current) % 360),
      24
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <nav
      aria-label="Primary"
      onMouseEnter={() => (speed.current = SLOW)}
      onMouseLeave={() => (speed.current = FAST)}
      className="fixed right-0 top-0 z-50 origin-top-right scale-[0.82] sm:scale-100"
      style={{ width: SIZE, height: SIZE, overflow: "hidden" }}
    >
      {/* Quarter-disk rings + corner glow (centred on the corner, clipped). */}
      <div
        className="absolute right-0 top-0 rounded-full bg-primary/15 blur-2xl"
        style={{ width: 230, height: 230, transform: "translate(38%,-38%)" }}
      />
      <div
        className="absolute right-0 top-0 rounded-full border-2 border-primary/35"
        style={{ width: R * 2, height: R * 2, transform: "translate(50%,-50%)" }}
      />
      <div
        className="absolute right-0 top-0 rounded-full border border-primary/15"
        style={{ width: R * 2 + 40, height: R * 2 + 40, transform: "translate(50%,-50%)" }}
      />

      {NODES.map((node, i) => {
        const angle = (i * 360) / NODES.length + rotation;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * R;
        const y = Math.sin(rad) * R;
        const visible = x < -6 && y > 6; // bottom-left quarter only
        const edge = Math.min(Math.abs(x), Math.abs(y));
        const opacity = visible ? Math.min(1, edge / 42) : 0;
        const Icon = node.icon;
        return (
          <a
            key={node.label}
            href={node.href}
            title={node.label}
            aria-label={node.label}
            data-cursor
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            {...(node.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/50 bg-card text-foreground shadow-[0_0_20px_hsl(var(--primary)/0.45)] transition-[background-color,border-color,color] hover:border-primary hover:bg-primary hover:text-primary-foreground"
            style={{
              transform: `translate(calc(50% + ${x}px), calc(-50% + ${y}px))`,
              opacity,
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            <Icon className="h-6 w-6" />
          </a>
        );
      })}
    </nav>
  );
}
