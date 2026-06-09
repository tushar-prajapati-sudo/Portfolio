import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Terminal, Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CameraView } from "@/components/effects/CameraView";
import { profile, skillGroups, projects, journey, socials } from "@/data/portfolio";

type AppKey = "terminal" | "camera";

export function Desktop() {
  const [open, setOpen] = useState<Record<AppKey, boolean>>({
    terminal: false,
    camera: false,
  });
  const set = (k: AppKey, v: boolean) => setOpen((o) => ({ ...o, [k]: v }));

  return (
    <>
      <FloatingIcon
        label="terminal"
        icon={Terminal}
        delay={0}
        className="bottom-4 right-4 sm:bottom-auto sm:left-5 sm:right-auto sm:top-[36%]"
        onClick={() => set("terminal", true)}
      />
      <FloatingIcon
        label="camera"
        icon={Camera}
        delay={1.3}
        className="bottom-4 right-[5rem] sm:bottom-auto sm:left-5 sm:right-auto sm:top-[54%]"
        onClick={() => set("camera", true)}
      />

      <AnimatePresence>
        {open.terminal && (
          <Window
            key="terminal"
            title="tushar@cybercafe: ~"
            className="left-[4vw] top-[9vh] h-[80vh] w-[92vw] max-w-[1100px]"
            onClose={() => set("terminal", false)}
          >
            <TerminalBody />
          </Window>
        )}
        {open.camera && (
          <Window
            key="camera"
            title="cam_01.feed"
            className="right-[4vw] top-[9vh] h-[80vh] w-[92vw] max-w-[1100px]"
            onClose={() => set("camera", false)}
          >
            <CameraView />
          </Window>
        )}
      </AnimatePresence>
    </>
  );
}

function FloatingIcon({
  label,
  icon: Icon,
  onClick,
  className,
  delay,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
  className?: string;
  delay: number;
}) {
  return (
    <motion.button
      data-cursor
      aria-label={`Open ${label}`}
      onClick={onClick}
      animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn(
        "pixel-box fixed z-40 flex h-16 w-16 flex-col items-center justify-center gap-1 bg-card/85 text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground sm:h-20 sm:w-20 sm:gap-1.5",
        className
      )}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
      <span className="font-mono text-[8px] uppercase tracking-widest">
        {label}
      </span>
    </motion.button>
  );
}

function Window({
  title,
  onClose,
  className,
  children,
}: {
  title: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  const controls = useDragControls();
  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "pixel-box fixed z-[60] flex flex-col overflow-hidden bg-card/95 backdrop-blur-xl",
        className
      )}
    >
      <div
        onPointerDown={(e: ReactPointerEvent) => controls.start(e)}
        className="flex shrink-0 cursor-grab items-center justify-between gap-3 border-b-2 border-primary/40 bg-primary/10 px-3 py-2 active:cursor-grabbing"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
          {title}
        </span>
        <button
          data-cursor
          onClick={onClose}
          aria-label="Close window"
          className="flex h-6 w-6 items-center justify-center border border-primary/50 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.div>
  );
}

/* ── Interactive terminal ──────────────────────────────────── */

const SECTIONS = ["about", "skills", "projects", "journey", "contact"] as const;
type Section = (typeof SECTIONS)[number];
type Line = { text: string; tone?: "in" | "out" | "err" | "head" };

const INTRO: Line[] = [
  { text: "tushar.os // cybercafe terminal", tone: "head" },
  { text: "type 'help' to list commands.", tone: "out" },
];

function sectionContent(section: Section): string[] {
  switch (section) {
    case "about":
      return [...profile.about, `location: ${profile.location}`];
    case "skills":
      return skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`);
    case "projects":
      return projects.map(
        (p) => `${p.title} — ${p.blurb}  [${p.tags.join(", ")}]`
      );
    case "journey":
      return journey.map(
        (n) => `${n.date}  ${n.title} (${n.status}) — ${n.content}`
      );
    case "contact":
      return [
        `email: ${profile.email}`,
        ...socials
          .filter((s) => s.label !== "Email")
          .map((s) => `${s.label}: ${s.href}`),
      ];
    default:
      return [];
  }
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = "/resume.pdf";
  a.download = "Tushar-Prajapati-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function TerminalBody() {
  const [lines, setLines] = useState<Line[]>(INTRO);
  const [cwd, setCwd] = useState<Section | null>(null);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const prompt = `tushar@cybercafe:~${cwd ? "/" + cwd : ""}$`;

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [{ text: `${prompt} ${cmd}`, tone: "in" }];
    const finish = (extra: Line[] = []) => setLines((p) => [...p, ...out, ...extra]);

    if (!cmd) return finish();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").replace(/\/$/, "").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        return finish([
          { text: "commands:", tone: "head" },
          { text: "  ls                list the current directory" },
          { text: "  cd <section>      enter about | skills | projects | journey | contact" },
          { text: "  cd ..             back to root" },
          { text: "  resume.pdf        download my resume" },
          { text: "  whoami            who am i" },
          { text: "  clear             clear the screen" },
        ]);
      case "ls":
        if (!cwd)
          return finish([
            { text: "sections/", tone: "head" },
            ...SECTIONS.map((s) => ({ text: `  ${s}/` })),
            { text: "files/", tone: "head" },
            { text: "  resume.pdf" },
          ]);
        return finish([
          { text: `${cwd}/`, tone: "head" },
          ...sectionContent(cwd).map((t) => ({ text: "  " + t })),
        ]);
      case "cd":
        if (!arg || arg === "~" || arg === "..") {
          setCwd(null);
          return finish();
        }
        if ((SECTIONS as readonly string[]).includes(arg)) {
          setCwd(arg as Section);
          document
            .getElementById(arg)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          return finish([{ text: `entering ${arg}/ …`, tone: "out" }]);
        }
        return finish([{ text: `cd: no such section: ${args[0] ?? ""}`, tone: "err" }]);
      case "resume.pdf":
      case "./resume.pdf":
        downloadResume();
        return finish([{ text: "downloading resume.pdf …", tone: "out" }]);
      case "open":
      case "cat":
        if (arg.includes("resume")) {
          downloadResume();
          return finish([{ text: "downloading resume.pdf …", tone: "out" }]);
        }
        return finish([{ text: `${name}: ${args[0] ?? "missing operand"}: not found`, tone: "err" }]);
      case "whoami":
        return finish([
          { text: `${profile.name} — ${profile.role}`, tone: "out" },
        ]);
      case "clear":
        return setLines([]);
      default:
        return finish([
          { text: `command not found: ${name} — try 'help'`, tone: "err" },
        ]);
    }
  };

  const toneClass: Record<NonNullable<Line["tone"]>, string> = {
    in: "text-muted-foreground",
    out: "text-primary/90",
    err: "text-red-400",
    head: "text-primary font-semibold",
  };

  return (
    <div
      className="relative h-full overflow-y-auto bg-black/85 p-4 font-mono text-xs leading-relaxed sm:text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap break-words",
              l.tone ? toneClass[l.tone] : "text-foreground/90"
            )}
          >
            {l.text}
          </div>
        ))}
        <div className="flex gap-2">
          <span className="shrink-0 text-primary">{prompt}</span>
          <input
            ref={inputRef}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent text-foreground caret-primary outline-none"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
