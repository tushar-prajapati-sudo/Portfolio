import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  CircleAlert,
  CircleDotDashed,
  CircleX,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup, type Variants } from "framer-motion";
import type { PlanStatus, PlanTask } from "@/data/portfolio";

/**
 * Expandable plan tree (remixed from a 21st.dev "agent-plan").
 *
 * Adapted for this portfolio: data-driven via `tasks`, recolored to the
 * amber/dark theme, and read-only — the demo randomised statuses on click, but
 * here a real project's progress is fixed; clicking only expands/collapses.
 */

const statusIcon = (status: PlanStatus, size: string) => {
  const c = `${size} `;
  switch (status) {
    case "completed":
      return <CheckCircle2 className={c + "text-emerald-400"} />;
    case "in-progress":
      return <CircleDotDashed className={c + "text-primary"} />;
    case "need-help":
      return <CircleAlert className={c + "text-yellow-400"} />;
    case "failed":
      return <CircleX className={c + "text-red-400"} />;
    default:
      return <Circle className={c + "text-muted-foreground"} />;
  }
};

const statusBadge: Record<PlanStatus, string> = {
  completed: "bg-emerald-500/15 text-emerald-400",
  "in-progress": "bg-primary/15 text-primary",
  "need-help": "bg-yellow-500/15 text-yellow-400",
  failed: "bg-red-500/15 text-red-400",
  pending: "bg-muted text-muted-foreground",
};

export function AgentPlan({ tasks }: { tasks: PlanTask[] }) {
  const [expandedTasks, setExpandedTasks] = useState<string[]>(() => {
    const firstActive =
      tasks.find((t) => t.status === "in-progress")?.id ?? tasks[0]?.id;
    return firstActive ? [firstActive] : [];
  });
  const [expandedSubtasks, setExpandedSubtasks] = useState<
    Record<string, boolean>
  >({});

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const toggleTask = (taskId: string) =>
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    const key = `${taskId}-${subtaskId}`;
    setExpandedSubtasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const taskVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 500,
        damping: 30,
        duration: prefersReducedMotion ? 0.2 : undefined,
      },
    },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -5, transition: { duration: 0.15 } },
  };

  const subtaskListVariants: Variants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
      height: "auto",
      opacity: 1,
      overflow: "visible",
      transition: {
        duration: 0.25,
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        when: "beforeChildren",
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      overflow: "hidden",
      transition: { duration: 0.2, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const subtaskVariants: Variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 500,
        damping: 25,
        duration: prefersReducedMotion ? 0.2 : undefined,
      },
    },
    exit: { opacity: 0, x: prefersReducedMotion ? 0 : -10, transition: { duration: 0.15 } },
  };

  const subtaskDetailsVariants: Variants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
      opacity: 1,
      height: "auto",
      overflow: "visible",
      transition: { duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <div className="text-foreground">
      <LayoutGroup>
        <div className="overflow-hidden p-2 sm:p-3">
          <ul className="space-y-1 overflow-hidden">
            {tasks.map((task, index) => {
              const isExpanded = expandedTasks.includes(task.id);
              const isCompleted = task.status === "completed";

              return (
                <motion.li
                  key={task.id}
                  className={index !== 0 ? "mt-1 pt-2" : ""}
                  initial="hidden"
                  animate="visible"
                  variants={taskVariants}
                >
                  {/* Phase row */}
                  <motion.div
                    className="group flex cursor-pointer items-center rounded-md px-3 py-2"
                    whileHover={{
                      backgroundColor: "hsl(var(--primary) / 0.06)",
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="mr-2.5 flex-shrink-0">
                      {statusIcon(task.status, "h-[18px] w-[18px]")}
                    </span>

                    <div className="flex min-w-0 flex-grow items-center justify-between">
                      <span
                        className={`truncate text-sm font-semibold ${
                          isCompleted ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {task.title}
                      </span>

                      <div className="ml-2 flex flex-shrink-0 items-center gap-2 text-xs">
                        {task.dependencies.length > 0 &&
                          task.dependencies.map((dep, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-secondary/50 px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
                            >
                              {dep}
                            </span>
                          ))}
                        <motion.span
                          key={task.status}
                          initial={{ scale: 1 }}
                          animate={{ scale: prefersReducedMotion ? 1 : [1, 1.06, 1] }}
                          transition={{ duration: 0.35 }}
                          className={`rounded px-1.5 py-0.5 font-mono uppercase tracking-wide ${statusBadge[task.status]}`}
                        >
                          {task.status}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Subtasks */}
                  <AnimatePresence mode="wait">
                    {isExpanded && task.subtasks.length > 0 && (
                      <motion.div
                        className="relative overflow-hidden"
                        variants={subtaskListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        layout
                      >
                        {/* Dashed connector aligned with the phase icon. */}
                        <div className="absolute bottom-0 left-[20px] top-0 border-l border-dashed border-primary/25" />
                        <ul className="mb-1.5 ml-3 mr-2 mt-1 space-y-0.5">
                          {task.subtasks.map((subtask) => {
                            const key = `${task.id}-${subtask.id}`;
                            const open = expandedSubtasks[key];

                            return (
                              <motion.li
                                key={subtask.id}
                                className="group flex flex-col py-0.5 pl-6"
                                onClick={() => toggleSubtask(task.id, subtask.id)}
                                variants={subtaskVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                              >
                                <motion.div
                                  className="flex flex-1 cursor-pointer items-center rounded-md p-1"
                                  whileHover={{
                                    backgroundColor: "hsl(var(--primary) / 0.06)",
                                    transition: { duration: 0.2 },
                                  }}
                                  layout
                                >
                                  <span className="mr-2 flex-shrink-0">
                                    {statusIcon(subtask.status, "h-3.5 w-3.5")}
                                  </span>
                                  <span
                                    className={`text-sm ${
                                      subtask.status === "completed"
                                        ? "text-muted-foreground"
                                        : "text-foreground/90"
                                    }`}
                                  >
                                    {subtask.title}
                                  </span>
                                </motion.div>

                                <AnimatePresence mode="wait">
                                  {open && (
                                    <motion.div
                                      className="ml-1.5 mt-1 overflow-hidden border-l border-dashed border-foreground/20 pl-5 text-xs text-muted-foreground"
                                      variants={subtaskDetailsVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="hidden"
                                      layout
                                    >
                                      <p className="py-1">{subtask.description}</p>
                                      {subtask.tools && subtask.tools.length > 0 && (
                                        <div className="mb-1 mt-0.5 flex flex-wrap items-center gap-1.5">
                                          <span className="font-medium text-foreground/70">
                                            Stack:
                                          </span>
                                          <div className="flex flex-wrap gap-1">
                                            {subtask.tools.map((tool, idx) => (
                                              <span
                                                key={idx}
                                                className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
                                              >
                                                {tool}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </LayoutGroup>
    </div>
  );
}

export default AgentPlan;
