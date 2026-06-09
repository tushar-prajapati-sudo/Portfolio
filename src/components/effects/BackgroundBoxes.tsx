/**
 * Skewed grid background (adapted from the "background-boxes" component). The
 * original renders 150×100 motion divs with hover highlight; behind page
 * content there's no hover and 15k nodes is far too heavy, so this is a
 * lighter static grid in theme colors with a slow sweeping glow for life.
 */
const ROWS = 34;
const COLS = 18;

export function BackgroundBoxes() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div
        className="absolute left-1/4 top-0 flex h-full w-full -translate-x-1/2 -translate-y-1/4 p-4"
        style={{
          transform:
            "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.7) rotate(0deg)",
        }}
      >
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} className="relative h-8 w-16 border-l border-primary/15">
            {Array.from({ length: ROWS }).map((_, j) => (
              <div
                key={j}
                className="relative h-8 w-16 border-r border-t border-primary/15"
              >
                {i % 2 === 0 && j % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-[1px] text-primary/15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Sweeping glow so the grid feels alive without per-cell hover. */}
      <div className="pointer-events-none absolute -inset-1/4 animate-[boxsweep_14s_linear_infinite] bg-[radial-gradient(40%_40%_at_50%_50%,hsl(var(--primary)/0.18),transparent_70%)]" />
    </div>
  );
}
