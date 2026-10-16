"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { ARCH, STACK, type Tech } from "./content";
import { Frame, Tag, btnPrimary, type SlideProps } from "./ui";

// Simple original glyphs for technologies that are actually used. Others show a neutral dot.
function Mark({ kind }: { kind?: string }) {
  const c = "size-5 shrink-0";
  switch (kind) {
    case "react":
      return (
        <svg viewBox="-12 -11 24 22" className={c} aria-hidden="true">
          <g fill="none" stroke="#61dafb" strokeWidth="1.1">
            <ellipse rx="10.5" ry="4.2" /><ellipse rx="10.5" ry="4.2" transform="rotate(60)" /><ellipse rx="10.5" ry="4.2" transform="rotate(120)" />
          </g>
          <circle r="1.9" fill="#61dafb" />
        </svg>
      );
    case "next":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#fff" /><text x="12" y="16.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#061a31" fontFamily="sans-serif">N</text>
        </svg>
      );
    case "ts":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden="true">
          <rect width="24" height="24" rx="3" fill="#3178c6" /><text x="12" y="18" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="sans-serif">TS</text>
        </svg>
      );
    case "tw":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden="true">
          <path fill="#38bdf8" d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.200 0 5.2-1.6 6-4.800-1.200 1.600-2.600 2.200-4.200 1.800-.900-.200-1.600-.900-2.300-1.600C10.300 13.400 9 12 6 12z" />
        </svg>
      );
    case "vercel":
      return (<svg viewBox="0 0 24 24" className={c} aria-hidden="true"><path fill="#fff" d="M12 3 23 21H1z" /></svg>);
    default:
      return <span className="size-2.5 shrink-0 rounded-full bg-white/30" aria-hidden="true" />;
  }
}

const dot = { Implemented: "bg-emerald-400", Simulated: "bg-signal", Planned: "bg-amber-300" } as const;

// ---------------------------------------------------------------- Tech stack
export function StackSlide() {
  const all = STACK.flatMap((g) => g.items);
  const [sel, setSel] = useState<Tech>(all[0]);
  return (
    <Frame compact wide eyebrow="Section 5 · Tech stack" title="What is actually built, and what is still planned.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {STACK.map((g) => (
          <section key={g.id} aria-label={g.label} className="rounded-lg border border-white/12 bg-white/[0.04] p-3">
            <p className="eyebrow mb-2 text-white/55">{g.label}</p>
            <ul className="space-y-1.5">
              {g.items.map((t) => (
                <li key={t.id}>
                  <button onClick={() => setSel(t)} aria-pressed={sel.id === t.id}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors ${sel.id === t.id ? "border-signal bg-signal/10" : t.status === "Planned" ? "border-dashed border-white/25 hover:bg-white/10" : "border-white/15 hover:bg-white/10"}`}>
                    <Mark kind={t.mark} />
                    <span className="flex-1 text-sm font-semibold text-white md:text-base">{t.name}</span>
                    <span className={`size-2.5 shrink-0 rounded-full ${dot[t.status]}`} title={t.status} aria-label={t.status} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-lg border border-white/15 bg-white/5 p-5 md:grid-cols-[1fr_1.4fr]" aria-live="polite">
        <div>
          <div className="flex flex-wrap items-center gap-3"><p className="font-display text-xl font-semibold text-white md:text-2xl">{sel.name}</p><Tag kind={sel.status} /></div>
          <p className="mt-1 text-sm text-white/60">{sel.role}</p>
          <p className="mt-3 break-words font-mono text-xs text-signal md:text-sm">{sel.evidence}</p>
        </div>
        <p className="text-base leading-relaxed text-white/80 md:text-lg">{sel.detail}</p>
      </div>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/50">
        <span><i className="mr-1.5 inline-block size-2 rounded-full bg-emerald-400" />Implemented</span>
        <span><i className="mr-1.5 inline-block size-2 rounded-full bg-signal" />Simulated</span>
        <span><i className="mr-1.5 inline-block size-2 rounded-full bg-amber-300" />Planned (dashed)</span>
        <span>Read from package.json and the repository, not from the plan.</span>
      </p>
    </Frame>
  );
}

// ---------------------------------------------------------------- Architecture diagram
type Pt = { id: string; x: number; y: number; w: number; h: number };
const BOX: Record<string, Pt> = {
  pm: { id: "pm", x: 30, y: 66, w: 230, h: 90 },
  dispatch: { id: "dispatch", x: 30, y: 176, w: 230, h: 90 },
  tech: { id: "tech", x: 30, y: 286, w: 230, h: 90 },
  layer: { id: "layer", x: 370, y: 150, w: 200, h: 150 },
  monday: { id: "monday", x: 700, y: 44, w: 230, h: 150 },
  qb: { id: "qb", x: 700, y: 290, w: 230, h: 130 },
};

const FLOWS = [
  { d: "M260,111 C320,111 320,190 370,190", c: "#3fb4ff" },
  { d: "M260,221 C320,221 330,225 370,225", c: "#3fb4ff" },
  { d: "M260,331 C320,331 320,260 370,260", c: "#3fb4ff" },
  { d: "M570,185 C640,185 640,92 700,92", c: "#3fb4ff", label: "write", lx: 596, ly: 120 },
  { d: "M700,150 C640,150 640,215 570,215", c: "#fcd34d", label: "webhook", lx: 592, ly: 240 },
  { d: "M570,262 C640,262 640,345 700,345", c: "#3fb4ff", label: "billable facts", lx: 570, ly: 328 },
];

export function ArchitectureSlide({ launchDemo }: SlideProps) {
  const [sel, setSel] = useState("monday");
  const n = ARCH.find((a) => a.id === sel)!;
  const g = (id: string, label: string, sub: string, opts: { dashed?: boolean; hl?: boolean }) => {
    const b = BOX[id];
    const on = sel === id;
    return (
      <g key={id} role="button" tabIndex={0} aria-label={`${label}: ${sub}`} aria-pressed={on} className="cursor-pointer outline-none"
        onClick={() => setSel(id)} onKeyDown={(e) => { if (e.key === "Enter") setSel(id); }}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="10"
          fill={opts.hl ? "rgba(63,180,255,0.16)" : "rgba(255,255,255,0.05)"}
          stroke={on ? "#ffffff" : opts.hl ? "#3fb4ff" : opts.dashed ? "#fcd34d" : "rgba(255,255,255,0.35)"}
          strokeWidth={on || opts.hl ? 2.5 : 1.5} strokeDasharray={opts.dashed ? "6 5" : undefined} />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 - (opts.hl ? 8 : 2)} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">{label}</text>
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + (opts.hl ? 14 : 18)} textAnchor="middle" fill={opts.hl ? "#3fb4ff" : "rgba(255,255,255,0.65)"} fontSize="12" fontWeight="700" letterSpacing="0.2">{sub}</text>
      </g>
    );
  };
  return (
    <Frame compact wide eyebrow="Section 6 · Architecture" title="Three interfaces. One integration layer. Two systems of record.">
      <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-lg border border-white/15 bg-white/[0.04] p-3">
          <svg viewBox="0 0 940 440" className="w-full" role="group" aria-label="Architecture diagram. Animated lines show proposed data flow.">
            <defs>
              <marker id="ah-sig" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9z" fill="#3fb4ff" /></marker>
              <marker id="ah-amber" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9z" fill="#fcd34d" /></marker>
            </defs>
            <rect x="10" y="20" width="270" height="400" rx="14" fill="none" stroke="rgba(63,180,255,0.4)" strokeDasharray="2 6" />
            <text x="24" y="46" fill="#3fb4ff" fontSize="14" fontWeight="800" letterSpacing="1.5">MOETECH WEB APPLICATION</text>
            {FLOWS.map((f, i) => (
              <g key={i}>
                <path d={f.d} fill="none" stroke={f.c} strokeWidth="2.2" className="flow" opacity="0.9" markerEnd={f.c === "#fcd34d" ? "url(#ah-amber)" : "url(#ah-sig)"} />
                {f.label && <text x={f.lx} y={f.ly} fill={f.c} fontSize="14" fontWeight="700">{f.label}</text>}
              </g>
            ))}
            {g("pm", "Property Manager", "IMPLEMENTED", {})}
            {g("dispatch", "Dispatch", "IMPLEMENTED", {})}
            {g("tech", "Technician", "IMPLEMENTED", {})}
            {g("layer", "Backend / API layer", "PLANNED · NOT BUILT", { dashed: true })}
            {g("monday", "Monday.com", "OPERATIONAL SOURCE OF TRUTH", { hl: true, dashed: true })}
            {g("qb", "QuickBooks", "FINANCIAL SYSTEM OF RECORD", { dashed: true })}
            <g aria-hidden="true">
              <rect x="700" y="14" width="230" height="22" rx="4" fill="rgba(252,211,77,0.15)" stroke="rgba(252,211,77,0.5)" />
              <text x="815" y="29" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="800" letterSpacing="1">SIMULATED INTEGRATION</text>
              <rect x="700" y="258" width="230" height="22" rx="4" fill="rgba(252,211,77,0.15)" stroke="rgba(252,211,77,0.5)" />
              <text x="815" y="273" textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="800" letterSpacing="1">SIMULATED INTEGRATION</text>
            </g>
          </svg>
          <p className="px-2 pb-1 text-xs text-white/55">Animated lines show the proposed data flow. Solid boxes work in the prototype; dashed boxes are not connected. Click any box.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex-1 rounded-lg border border-white/15 bg-white/5 p-5" aria-live="polite">
            <div className="flex flex-wrap items-center gap-3"><p className="font-display text-xl font-semibold text-white md:text-2xl">{n.name}</p><Tag kind={n.status} /></div>
            <p className="mt-3 text-base leading-relaxed text-white/80">{n.responsibility}</p>
            <dl className="mt-4 space-y-3 text-sm md:text-base">
              <div><dt className="eyebrow text-signal">Owns</dt><dd className="text-white/85">{n.owns}</dd></div>
              <div><dt className="eyebrow text-signal">In the prototype today</dt><dd className="text-white/85">{n.today}</dd></div>
            </dl>
          </div>
          <button onClick={launchDemo} className={btnPrimary}><Play className="size-5" aria-hidden="true" /> Launch the working ticket lifecycle</button>
        </div>
      </div>
    </Frame>
  );
}
