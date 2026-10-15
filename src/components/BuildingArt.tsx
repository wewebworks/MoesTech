// Original illustration: a commercial building elevation with technology overlays.
// Used in place of stock photography until RNA Tek supplies real project photos.

const cols = 9;
const rows = 12;

function lit(r: number, c: number) {
  // deterministic pseudo-random so server and client markup match
  return ((r * 7 + c * 13 + r * c) % 5) < 2;
}

export function BuildingArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 640" className={className} role="img" aria-label="Illustration of a commercial building with cameras, access control, and network connections">
      <defs>
        <linearGradient id="facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14213d" />
          <stop offset="1" stopColor="#0a1224" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3fb4ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3fb4ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bclip"><rect x="120" y="70" width="330" height="500" /></clipPath>
      </defs>

      {/* ground line */}
      <line x1="20" y1="570" x2="540" y2="570" stroke="#3fb4ff" strokeOpacity="0.35" />

      {/* side tower */}
      <rect x="450" y="200" width="90" height="370" fill="url(#facade)" stroke="#3fb4ff" strokeOpacity="0.25" />
      <rect x="20" y="320" width="100" height="250" fill="url(#facade)" stroke="#3fb4ff" strokeOpacity="0.25" />

      {/* main tower */}
      <rect x="120" y="70" width="330" height="500" fill="url(#facade)" stroke="#3fb4ff" strokeOpacity="0.45" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const on = lit(r, c);
          return (
            <rect
              key={`${r}-${c}`}
              x={140 + c * 33}
              y={90 + r * 36}
              width="22"
              height="22"
              rx="2"
              fill={on ? "#e3f4ff" : "#1d2f52"}
              opacity={on ? 0.85 : 0.9}
              className={on && (r + c) % 4 === 0 ? "twinkle" : undefined}
              style={on && (r + c) % 4 === 0 ? { animationDelay: `${(r * 3 + c) % 7}s` } : undefined}
            />
          );
        }),
      )}

      {/* scan line over facade */}
      <g clipPath="url(#bclip)">
        <rect x="120" y="70" width="330" height="60" fill="url(#beam)" opacity="0.35" className="scan" style={{ transformBox: "fill-box" }} />
      </g>

      {/* entrance */}
      <rect x="250" y="510" width="70" height="60" fill="#050914" stroke="#3fb4ff" strokeOpacity="0.6" />
      <line x1="285" y1="510" x2="285" y2="570" stroke="#3fb4ff" strokeOpacity="0.4" />

      {/* network links */}
      <g fill="none" stroke="#3fb4ff" strokeWidth="1.2" strokeDasharray="5 7" className="dash">
        <path d="M120 180 H70 V110 H30" />
        <path d="M450 300 H500 V120 H535" />
        <path d="M285 510 V470 H120" />
      </g>

      {/* camera node */}
      <g transform="translate(60 100)">
        <circle r="22" fill="#050914" stroke="#3fb4ff" />
        <path d="M-9 -4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM5 1l7-4v10l-7-4z" fill="none" stroke="#3fb4ff" strokeWidth="1.4" strokeLinejoin="round" transform="translate(-1 -1) scale(0.9)" />
      </g>
      {/* access node */}
      <g transform="translate(500 110)">
        <circle r="22" fill="#050914" stroke="#3fb4ff" />
        <rect x="-8" y="-3" width="16" height="12" rx="2" fill="none" stroke="#3fb4ff" strokeWidth="1.4" />
        <path d="M-5 -3v-4a5 5 0 0 1 10 0v4" fill="none" stroke="#3fb4ff" strokeWidth="1.4" />
      </g>
      {/* network node */}
      <g transform="translate(120 470)">
        <circle r="22" fill="#050914" stroke="#3fb4ff" />
        <rect x="-9" y="-9" width="18" height="7" rx="1.5" fill="none" stroke="#3fb4ff" strokeWidth="1.4" />
        <rect x="-9" y="2" width="18" height="7" rx="1.5" fill="none" stroke="#3fb4ff" strokeWidth="1.4" />
      </g>

      {/* labels */}
      <g fontFamily="var(--font-geist-mono), monospace" fontSize="9" letterSpacing="1.5" fill="#3fb4ff">
        <text x="30" y="148">VIDEO</text>
        <text x="478" y="154">ACCESS</text>
        <text x="86" y="512">NETWORK</text>
      </g>
    </svg>
  );
}
