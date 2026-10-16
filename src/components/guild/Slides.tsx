"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Check, ExternalLink, Play, ShieldCheck } from "lucide-react";
import { STATUSES } from "@/components/portal/portalData";
import {
  BRAND, BROUGHT, CONNECTED, DEMO_STEPS, DISCLAIMER, FRAGMENTED, GUARDRAIL, LEARNED, POSSIBILITIES, slideIndex,
} from "./content";
import { Frame, Tag, btnGhost, btnPrimary, type SlideProps } from "./ui";

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
      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-signal/40 bg-signal/10 p-4 md:p-5">
          <p className="eyebrow text-signal">Meet MoeTech (fictional)</p>
          <p className="mt-1 text-base leading-relaxed text-white md:text-lg">A company that installs and maintains the technology inside commercial and multifamily buildings: cameras, door access and intercoms, networking, and AV. Its customers are property managers.</p>
        </div>
        <p className="self-center text-base leading-relaxed text-white/70 md:text-lg">Property managers send requests. Dispatch assigns technicians. Technicians do the work and document it. Billing follows. Each step lives somewhere different.</p>
      </div>
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

// ---------------------------------------------------------------- 6 Demo
export function DemoSlide({ launchDemo }: SlideProps) {
  return (
    <Frame eyebrow="Section 9 · Live demo" title={<>Now let&rsquo;s see it work.</>}>
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
      <p className="eyebrow mb-4 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />Section 10 · What building taught me</p>
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
    <Frame eyebrow="Section 11 · Bringing it back to work" title="What Could This Change About Product Delivery?">
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
        <button onClick={() => go(slideIndex("architecture"))} className={btnGhost}>View Architecture <ArrowRight className="size-5" aria-hidden="true" /></button>
      </div>
      <p className="mt-10 max-w-xl text-sm leading-relaxed text-white/45">{DISCLAIMER}</p>
    </div>
  );
}
