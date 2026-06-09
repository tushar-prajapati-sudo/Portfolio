/**
 * Samurai theme overlay — masks the pinned robot into a samurai: a crimson
 * battle atmosphere, a golden kabuto crest (kuwagata horns + dome) over the
 * head, and a steel menpo mask with a grille over the face. Decorative, sits
 * above the robot but below the content/nav.
 */
export function SamuraiOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[6]">
      {/* Crimson atmosphere, concentrated on the robot (right) side. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_68%_42%,hsl(0_75%_28%/0.5),transparent_72%)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(38%_46%_at_66%_30%,hsl(0_88%_46%/0.28),transparent_70%)]" />

      {/* Kabuto + menpo over the robot's head. */}
      <div className="absolute right-[6%] top-[6%] w-[52vw] max-w-[560px] sm:right-[12%] md:right-[16%]">
        <svg viewBox="0 0 400 420" className="w-full drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d27a" />
              <stop offset="0.5" stopColor="#caa033" />
              <stop offset="1" stopColor="#8a6516" />
            </linearGradient>
            <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2d33" />
              <stop offset="1" stopColor="#0d0e11" />
            </linearGradient>
            <linearGradient id="crimson" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9b1c1c" />
              <stop offset="1" stopColor="#5b0e0e" />
            </linearGradient>
          </defs>

          {/* Kuwagata crest — two golden horns + central sun disc. */}
          <path
            d="M200 150 C150 150 120 90 96 36 C150 70 176 96 200 120 C224 96 250 70 304 36 C280 90 250 150 200 150 Z"
            fill="url(#gold)"
            stroke="#3a2a08"
            strokeWidth="2"
          />
          <circle cx="200" cy="120" r="20" fill="url(#crimson)" stroke="url(#gold)" strokeWidth="4" />

          {/* Helmet dome (hachi). */}
          <path
            d="M118 200 C118 150 150 124 200 124 C250 124 282 150 282 200 L282 214 C282 220 276 224 270 224 L130 224 C124 224 118 220 118 214 Z"
            fill="url(#steel)"
            stroke="#3a3d44"
            strokeWidth="2"
          />
          <path d="M196 124 L204 124 L204 224 L196 224 Z" fill="url(#gold)" opacity="0.85" />

          {/* Neck guard (fukigaeshi) flares. */}
          <path d="M112 214 C92 220 84 244 92 262 L130 226 Z" fill="url(#crimson)" stroke="url(#gold)" strokeWidth="2" />
          <path d="M288 214 C308 220 316 244 308 262 L270 226 Z" fill="url(#crimson)" stroke="url(#gold)" strokeWidth="2" />

          {/* Menpo mask. */}
          <path
            d="M140 232 C140 232 160 248 200 248 C240 248 260 232 260 232 C266 252 264 292 248 322 C232 352 216 366 200 366 C184 366 168 352 152 322 C136 292 134 252 140 232 Z"
            fill="url(#steel)"
            stroke="#42454c"
            strokeWidth="2"
          />
          {/* Grille slats. */}
          <g stroke="#7a7d86" strokeWidth="3" opacity="0.85">
            <line x1="168" y1="300" x2="232" y2="300" />
            <line x1="166" y1="312" x2="234" y2="312" />
            <line x1="168" y1="324" x2="232" y2="324" />
            <line x1="174" y1="336" x2="226" y2="336" />
          </g>
          {/* Fierce eye slots. */}
          <path d="M156 262 L186 270 L182 282 L154 274 Z" fill="#d33" opacity="0.9" />
          <path d="M244 262 L214 270 L218 282 L246 274 Z" fill="#d33" opacity="0.9" />
          {/* Mustache. */}
          <path d="M150 288 C170 296 186 296 200 292 C214 296 230 296 250 288" fill="none" stroke="#0b0b0d" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
