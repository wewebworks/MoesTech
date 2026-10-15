"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Check, Cpu, ExternalLink, Play, ShieldCheck, User } from "lucide-react";
import { STATUSES } from "@/components/portal/portalData";
import {
  ARCH, BRAND, BROUGHT, CONCERNS, CONNECTED, DEMO_STEPS, DISCLAIMER, FRAGMENTED, GUARDRAIL, JOURNEY, LEARNED,
  POSSIBILITIES, SKILLS, type Status3,
} from "./content";

export type SlideProps = { go: (i: number) => void; launchDemo: () => void; active: boolean };

const tagStyle: Record<Status3, string> = {
  Implemented: "bg-emerald-400/15 text-emerald-300 ring-emerald-300/30",
  Simulated: "bg-signal/15 text-signal ring-signal/30",
  Planned: "bg-amber-400/15 text-amber-300 ring-amber-300/30",
};
export function Tag({ kind }: { kind: Status3 }) {
  return <span className={`eyebrow inline-block rounded-md px-2.5 py-1 ring-1 ${tagStyle[kind]}`}>{kind}</span>;
}

function Frame({ eyebrow, title, children, wide }: { eyebrow: string; title: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto flex min-h-full w-full flex-col justify-center px-6 py-10 md:px-14 ${wide ? "max-w-[96rem]" : "max-w-[88rem]"}`}>
      <p className="eyebrow mb-4 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />{eyebrow}</p>
      <h2 className="max-w-5xl text-3xl font-semibold leading-[1.05] text-white md:text-5xl xl:text-6xl">{title}</h2>
      <div className="mt-8 md:mt-10">{children}</div>
    </div>
  );
}

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-md bg-signal px-7 py-4 text-base font-semibold text-navy-950 transition-colors hover:bg-white md:text-lg";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 md:text-lg";

// ---------------------------------------------------------------- 1 Intro
function ProductPreview({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(2);
  useEffect(() => {
    if (!active || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % STATUSES.length), 2200);
    return () => clearInterval(t);
  }, [active, reduce]);
  const rows = [
    { id: "T-1044", t: "Wi-Fi dead zone in suite 204", s: 1 },
    { id: "T-1042", t: "Lobby camera offline", s: i },
    { id: "T-1041", t: "Intercom panel not ringing units", s: 2 },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]" aria-label="Animated preview of the MoeTech service portal (sample data)" role="img">
      <div className="flex items-center justify-between border-b border-line bg-mist px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true"><i className="size-2.5 rounded-full bg-rose-300" /><i className="size-2.5 rounded-full bg-amber-300" /><i className="size-2.5 rounded-full bg-emerald-300" /></span>
        <span className="eyebrow text-slate-ink">Property manager view · sample data</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          {[["Open", "4"], ["Scheduled", "1"], ["Completed", i === 5 ? "2" : "1"]].map(([l, v]) => (
            <div key={l} className="rounded-md border border-line p-3"><p className="font-display text-2xl font-semibold text-navy-900">{v}</p><p className="text-xs text-slate-ink">{l}</p></div>
          ))}
        </div>
        <ul className="mt-4 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
              <span><span className="eyebrow block text-slate-ink">{r.id}</span><span className="text-sm font-semibold text-navy-900">{r.t}</span></span>
              <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors duration-500 ${r.s === 5 ? "bg-emerald-100 text-emerald-700" : r.s === 4 ? "bg-brand/10 text-brand" : "bg-slate-100 text-slate-600"}`}>{STATUSES[r.s]}</span>
            </li>
          ))}
        </ul>
        <ol className="mt-4 flex gap-1.5" aria-hidden="true">
          {STATUSES.map((s, n) => <li key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${n <= i ? "bg-signal" : "bg-line"}`} />)}
        </ol>
      </div>
    </div>
  );
}

export function IntroSlide({ go, launchDemo, active }: SlideProps) {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-[96rem] items-center gap-10 px-6 py-10 md:px-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="eyebrow mb-6 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />AI Guild · {BRAND}</p>
        <h1 className="text-5xl font-semibold leading-[0.98] text-white md:text-7xl xl:text-[5.5rem]">From Product Owner to <span className="text-signal">Product Builder</span></h1>
        <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white/75 md:text-2xl">How I used enterprise product experience and AI to turn business problems into working software.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button onClick={launchDemo} className={btnPrimary}><Play className="size-5" aria-hidden="true" /> Launch Live Demo</button>
          <button onClick={() => go(1)} className={btnGhost}>Start the story <ArrowRight className="size-5" aria-hidden="true" /></button>
        </div>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-white/50">{DISCLAIMER}</p>
      </div>
      <ProductPreview active={active} />
    </div>
  );
}

// ---------------------------------------------------------------- 2 Problem
export function ProblemSlide() {
  const [connected, setConnected] = useState(false);
  const steps = connected ? CONNECTED : FRAGMENTED;
  return (
    <Frame eyebrow="Section 2 · The business problem" title={<>A fictional field service company, and information that doesn&rsquo;t travel.</>}>
      <p className="max-w-4xl text-lg leading-relaxed text-white/70 md:text-xl">Property managers send requests. Dispatch assigns technicians. Technicians do the work and document it. Billing follows. Each step lives somewhere different.</p>
      <div className="mt-8 flex gap-2" role="group" aria-label="Choose view">
        {([[false, "Today: fragmented"], [true, "Goal: connected end to end"]] as const).map(([v, l]) => (
          <button key={l} onClick={() => setConnected(v)} aria-pressed={connected === v}
            className={`rounded-md px-5 py-3 text-sm font-semibold transition-colors md:text-base ${connected === v ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{l}</button>
        ))}
      </div>
      <ol className={`mt-6 grid gap-3 ${connected ? "md:grid-cols-4" : "md:grid-cols-3 xl:grid-cols-6"}`}>
        {steps.map((s, i) => (
          <li key={s.label} className={`relative rounded-md border p-5 ${connected ? "border-signal/60 bg-signal/10" : "border-dashed border-white/25 bg-white/5"}`}>
            <p className="eyebrow text-white/50">Step {i + 1}</p>
            <p className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">{s.label}</p>
            <p className="mt-1 text-sm text-white/65 md:text-base">{s.note}</p>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={`absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 place-items-center rounded-full text-[11px] font-bold md:grid ${connected ? "bg-signal text-navy-950" : "bg-rose-400 text-navy-950"}`}>{connected ? "→" : "?"}</span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-4xl text-lg text-white/80 md:text-xl">
        {connected ? "One record moves through the whole process. Each person acts on the same facts." : "Every ? is a handoff where information is re-typed, delayed, or lost."}
        {" "}<strong className="text-white">The goal is to connect the process, not to build another website.</strong>
      </p>
    </Frame>
  );
}

// ---------------------------------------------------------------- 3 Experience
export function ExperienceSlide() {
  const [sel, setSel] = useState(0);
  const s = SKILLS[sel];
  return (
    <Frame eyebrow="Section 3 · Product Owner experience" title="What My Experience at Sun Life Taught Me" wide>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1" aria-label="Six transferable skills">
          {SKILLS.map((k, i) => (
            <li key={k.id}>
              <button onClick={() => setSel(i)} aria-pressed={sel === i}
                className={`flex w-full items-center gap-4 rounded-md border px-4 py-3.5 text-left transition-colors ${sel === i ? "border-signal bg-signal/10" : "border-white/15 bg-white/5 hover:bg-white/10"}`}>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${sel === i ? "bg-signal text-navy-950" : "bg-white/10 text-white/70"}`}>{i + 1}</span>
                <span className="text-base font-semibold text-white md:text-lg">{k.skill}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-white/15 bg-white/5 p-6 md:p-9" aria-live="polite">
          <p className="eyebrow text-signal">Skill</p>
          <p className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">{s.skill}</p>
          <p className="eyebrow mt-7 text-signal">Became this MoeTech design decision</p>
          <p className="mt-1 font-display text-2xl font-semibold text-white md:text-3xl">{s.decision}</p>
          <p className="mt-5 text-lg leading-relaxed text-white/75 md:text-xl">{s.detail}</p>
          <p className="mt-6 text-sm text-white/55 md:text-base"><span className="eyebrow text-white/70">See it: </span>{s.where}</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-white/45">These are transferable skills. {BRAND} is not affiliated with or endorsed by Sun Life.</p>
    </Frame>
  );
}

// ---------------------------------------------------------------- 4 Journey
export function JourneySlide() {
  const [sel, setSel] = useState(4);
  const j = JOURNEY[sel];
  return (
    <Frame eyebrow="Section 4 · From idea to application" title="Humans decide. AI accelerates." wide>
      <ol className="grid gap-2 md:grid-cols-7" aria-label="Development journey">
        {JOURNEY.map((x, i) => (
          <li key={x.stage}>
            <button onClick={() => setSel(i)} aria-pressed={sel === i} aria-label={`${i + 1}. ${x.stage}`}
              className={`flex h-full w-full flex-row items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors md:min-h-28 md:flex-col md:items-start md:justify-between ${sel === i ? "border-signal bg-signal text-navy-950" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}>
              <span className="eyebrow opacity-70">{i + 1}</span>
              <span className="font-display text-base font-semibold leading-tight md:text-lg">{x.stage}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 md:grid-cols-2" aria-live="polite">
        <div className="rounded-lg border border-white/15 bg-white/5 p-6">
          <p className="eyebrow flex items-center gap-2 text-signal"><User className="size-4" aria-hidden="true" /> Human role · {j.stage}</p>
          <ul className="mt-4 space-y-2 text-lg text-white md:text-xl">{j.human.map((h) => <li key={h} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-signal" aria-hidden="true" />{h}</li>)}</ul>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 p-6">
          <p className="eyebrow flex items-center gap-2 text-amber-300"><Cpu className="size-4" aria-hidden="true" /> AI role · {j.stage}</p>
          <ul className="mt-4 space-y-2 text-lg text-white md:text-xl">{j.ai.map((h) => <li key={h} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />{h}</li>)}</ul>
        </div>
      </div>
      <p className="mt-5 flex items-start gap-3 rounded-md border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-base text-amber-100 md:text-lg">
        <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        AI-generated code is a draft, not an answer. Every change was read, run, and tested by a person before it counted.
      </p>
    </Frame>
  );
}

// ---------------------------------------------------------------- 5 Architecture
export function ArchitectureSlide() {
  const [sel, setSel] = useState("state");
  const [concern, setConcern] = useState<number | null>(null);
  const node = ARCH.find((n) => n.id === sel)!;
  const core = ARCH.filter((n) => n.group === "core");
  const ext = ARCH.filter((n) => n.group === "external");
  const btn = (n: (typeof ARCH)[number]) => (
    <button key={n.id} onClick={() => { setSel(n.id); setConcern(null); }} aria-pressed={sel === n.id}
      className={`flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${sel === n.id ? "border-signal bg-signal/15" : n.status === "Planned" ? "border-dashed border-white/25 bg-white/5 hover:bg-white/10" : "border-white/20 bg-white/5 hover:bg-white/10"}`}>
      <span className="text-base font-semibold text-white md:text-lg">{n.name}</span><Tag kind={n.status} />
    </button>
  );
  return (
    <Frame eyebrow="Section 5 · Architecture and APIs" title="Decide who owns what before you write code." wide>
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-3 text-white/60">Workflow</p>
          <div className="flex flex-col items-stretch">
            {core.map((n, i) => (<div key={n.id}>{btn(n)}{i < core.length - 1 && <div aria-hidden="true" className="mx-auto h-5 w-px bg-signal/60" />}</div>))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-3 text-white/60">Proposed integrations · not built</p>
          <div className="flex flex-col gap-3">{ext.map(btn)}</div>
          <p className="mt-3 text-xs text-white/45">Dashed = planned. Solid = exists in the prototype.</p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 p-6" aria-live="polite">
          {concern === null ? (
            <>
              <div className="flex flex-wrap items-center gap-3"><p className="font-display text-2xl font-semibold text-white">{node.name}</p><Tag kind={node.status} /></div>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{node.responsibility}</p>
              <dl className="mt-5 grid gap-3 text-base">
                <div><dt className="eyebrow text-signal">Owns</dt><dd className="text-white/85">{node.owns}</dd></div>
                <div><dt className="eyebrow text-signal">Connects to</dt><dd className="text-white/85">{node.talksTo}</dd></div>
              </dl>
            </>
          ) : (
            <>
              <p className="eyebrow text-signal">Why it matters</p>
              <p className="mt-1 font-display text-2xl font-semibold text-white">{CONCERNS[concern].name}</p>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{CONCERNS[concern].text}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Integration concerns">
        {CONCERNS.map((c, i) => (
          <button key={c.name} onClick={() => setConcern(concern === i ? null : i)} aria-pressed={concern === i}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors md:text-base ${concern === i ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{c.name}</button>
        ))}
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------- 6 Demo
export function DemoSlide({ launchDemo }: SlideProps) {
  return (
    <Frame eyebrow="Section 6 · Live demo" title={<>Now let&rsquo;s see it work.</>}>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ol className="space-y-3">
          {DEMO_STEPS.map((s, i) => (
            <li key={i} className="flex items-center gap-5 rounded-md border border-white/15 bg-white/5 px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-signal font-display text-lg font-bold text-navy-950">{i + 1}</span>
              <span><span className="eyebrow block text-signal">{s.who}</span><span className="text-lg text-white md:text-xl">{s.what}</span></span>
            </li>
          ))}
        </ol>
        <div>
          <button onClick={launchDemo} className={`${btnPrimary} w-full py-6 text-xl md:text-2xl`}><Play className="size-6" aria-hidden="true" /> Launch Live Demo</button>
          <ul className="mt-5 space-y-2 text-base text-white/70 md:text-lg">
            <li>Opens the existing, working portal simulation.</li>
            <li>Use the guided walkthrough and role switcher inside it.</li>
            <li>A <strong className="text-white">Return to Presentation</strong> bar brings you back to this slide.</li>
            <li>Fictional properties, people, and tickets only.</li>
          </ul>
          <div className="mt-5 flex gap-2"><Tag kind="Implemented" /><Tag kind="Simulated" /></div>
          <p className="mt-2 text-sm text-white/50">Roles and workflow run in the browser; no data is saved or sent.</p>
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------- 7 Lessons
export function LessonsSlide() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[96rem] flex-col justify-center px-6 py-10 md:px-14">
      <p className="eyebrow mb-4 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />Section 7 · What building taught me</p>
      <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] text-white md:text-5xl xl:text-6xl">Skills got me started. <span className="text-signal">Building taught me the rest.</span></h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-white/15 bg-white/5 p-7 md:p-9">
          <p className="eyebrow text-white/60">What I brought from Sun Life</p>
          <ul className="mt-5 space-y-3 text-xl text-white md:text-2xl">{BROUGHT.map((b) => <li key={b} className="flex gap-3"><Check className="mt-2 size-5 shrink-0 text-white/50" aria-hidden="true" />{b}</li>)}</ul>
        </div>
        <div className="rounded-lg border border-signal/60 bg-signal/10 p-7 md:p-9">
          <p className="eyebrow text-signal">What I learned by building</p>
          <ul className="mt-5 space-y-3 text-xl text-white md:text-2xl">{LEARNED.map((b) => <li key={b} className="flex gap-3"><ArrowRight className="mt-2 size-5 shrink-0 text-signal" aria-hidden="true" />{b}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- 8 Work
export function WorkSlide() {
  return (
    <Frame eyebrow="Section 8 · Bringing it back to work" title="What Could This Change About Product Delivery?">
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {POSSIBILITIES.map((p, i) => (
          <li key={p} className="flex gap-4 rounded-md border border-white/15 bg-white/5 p-5">
            <span className="font-display text-3xl font-semibold text-signal">{i + 1}</span>
            <span className="text-lg leading-snug text-white md:text-xl">{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-start gap-3 rounded-md border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-base text-amber-100 md:text-lg">
        <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />{GUARDRAIL}
      </p>
    </Frame>
  );
}

// ---------------------------------------------------------------- 9 Closing
export function ClosingSlide({ go, launchDemo }: SlideProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-[88rem] flex-col justify-center px-6 py-10 md:px-14">
      <h2 className="max-w-5xl text-4xl font-semibold leading-[1.05] text-white md:text-6xl xl:text-7xl">AI didn&rsquo;t replace my Product Owner skills. <span className="text-signal">It made those skills more actionable.</span></h2>
      <p className="mt-8 max-w-4xl text-xl leading-relaxed text-white/75 md:text-2xl">The biggest opportunity isn&rsquo;t simply generating code faster. It&rsquo;s shortening the distance between understanding a problem and validating a possible solution.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={launchDemo} className={btnPrimary}>Explore {BRAND} <ExternalLink className="size-5" aria-hidden="true" /></button>
        <button onClick={() => go(4)} className={btnGhost}>View Architecture <ArrowRight className="size-5" aria-hidden="true" /></button>
      </div>
      <p className="mt-10 max-w-xl text-sm leading-relaxed text-white/45">{DISCLAIMER}</p>
    </div>
  );
}
