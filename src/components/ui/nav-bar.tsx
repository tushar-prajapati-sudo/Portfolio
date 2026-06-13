import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Route,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; id: string; icon: LucideIcon };

// Section links — the social links live in the Contact section, not the bar.
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#top", id: "top", icon: Home },
  { label: "About", href: "#about", id: "about", icon: User },
  { label: "Skills", href: "#skills", id: "skills", icon: Code2 },
  { label: "Work", href: "#projects", id: "projects", icon: FolderGit2 },
  { label: "Journey", href: "#journey", id: "journey", icon: Route },
  { label: "Contact", href: "#contact", id: "contact", icon: Mail },
];

// Width the active item's label expands into.
const LABEL_WIDTH = 78;

/**
 * Primary navigation as a floating pill, pinned fixed at top-center.
 *
 * Remixed from a 21st.dev "bottom-nav-bar": recolored to the site's amber
 * palette with a glow, labels in Chakra Petch, and re-anchored to the top.
 * Only the active item shows its label (others are icon-only); a scroll-spy
 * (IntersectionObserver) keeps "active" in sync with the section in view.
 * Links are plain anchors so the global Lenis handler smooth-scrolls them.
 */
export function NavBar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const idx = NAV_ITEMS.findIndex((n) => n.id === visible[0].target.id);
        if (idx !== -1) setActive(idx);
      },
      // Trigger around the vertical middle of the viewport.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex h-[52px] w-fit max-w-[95vw] items-center gap-0.5 rounded-full border border-primary/30 bg-card/80 p-2 backdrop-blur-xl sm:gap-1",
        "shadow-[0_0_24px_hsl(var(--primary)/0.22),0_18px_50px_-30px_hsl(0_0%_0%/0.9)]",
        className
      )}
    >
      {NAV_ITEMS.map((item, idx) => {
        const Icon = item.icon;
        const isActive = active === idx;

        return (
          <a
            key={item.label}
            href={item.href}
            data-cursor
            onClick={() => setActive(idx)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex h-10 min-w-[44px] items-center justify-center rounded-full px-2.5 transition-colors duration-200 sm:px-3",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <Icon size={20} strokeWidth={2} aria-hidden className="shrink-0" />

            <motion.span
              initial={false}
              animate={{
                width: isActive ? LABEL_WIDTH : 0,
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? 8 : 0,
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.18 },
                marginLeft: { duration: 0.18 },
              }}
              className="inline-flex items-center overflow-hidden whitespace-nowrap font-sans text-xs font-bold uppercase tracking-[0.12em]"
            >
              {item.label}
            </motion.span>
          </a>
        );
      })}
    </motion.nav>
  );
}

export default NavBar;
