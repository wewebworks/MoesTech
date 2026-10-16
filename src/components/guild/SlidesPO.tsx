"use client";
import { useState } from "react";
import { ArrowRight, Check, Cpu, ShieldCheck, User } from "lucide-react";
import { BRAND, CLAUDE, JOURNEY, MINE, REQ_EXAMPLE, SKILLS } from "./content";
import { Frame } from "./ui";

// ---------------------------------------------------------------- Product Owner lessons
export function ExperienceSlide() {
  const [sel, setSel] = useState(6);
  const s = SKILLS[sel];
  return (
    <Frame compact wide eyebrow="Section 3 · Product ownership" title="What Being a Lead Product Owner Taught Me About Building Software">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Nine product ownership principles">
          {SKILLS.map((k, i) => (
            <li key={k.id}>
              <button onClick={() => setSel(i)} aria-pressed={sel === i}
                className={`flex h-full w-full items-start gap-3 rounded-md border px-3 py-3 text-left transition-colors ${sel === i ? "border-signal bg-signal/10" : "border-white/15 bg-white/5 hover:bg-white/10"}`}>
                <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${sel === i ? "bg-signal text-navy-950" : "bg-white/10 text-white/70"}`}>{i + 1}</span>
                <span className="text-sm font-semibold leading-snug text-white md:text-base">{k.skill}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-white/15 bg-white/5 p-6" aria-live="polite">
          <p className="eyebrow text-signal">Principle</p>
          <p className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">{s.skill}</p>
          <p className="eyebrow mt-5 text-signal">Became this {BRAND} decision</p>
          <p className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">{s.decision}</p>
          <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">{s.detail}</p>
          <p className="mt-4 text-sm text-white/55"><span className="eyebrow text-white/70">See it: </span>{s.where}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/45">Transferable skills only. No Sun Life systems, APIs, or projects are described, and {BRAND} is not affiliated with or endorsed by Sun Life.</p>
    </Frame>
  );
}

// ---------------------------------------------------------------- Claude Code
export function JourneySlide() {
  const [view, setView] = useState<"split" | "stages">("split");
  const [sel, setSel] = useState(4);
  const j = JOURNEY[sel];
  return (
    <Frame compact wide eyebrow="Section 4 · AI-assisted development" title="Claude Code accelerated the build. Judgment stayed with me.">
      <div className="mb-4 flex gap-2" role="group" aria-label="Choose view">
        {([["split", "My contribution vs. Claude Code"], ["stages", "Stage by stage"]] as const).map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} aria-pressed={view === v}
            className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors md:text-base ${view === v ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{l}</button>
        ))}
      </div>

      {view === "split" ? (
        <>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <div className="rounded-lg border border-signal/50 bg-signal/10 p-5">
              <p className="eyebrow flex items-center gap-2 text-signal"><User className="size-4" aria-hidden="true" /> My contribution</p>
              <ul className="mt-3 space-y-1.5 text-base text-white md:text-lg">{MINE.map((m) => <li key={m} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-signal" aria-hidden="true" />{m}</li>)}</ul>
            </div>
            <div className="hidden items-center lg:flex" aria-hidden="true"><ArrowRight className="size-6 text-white/40" /></div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-5">
              <p className="eyebrow flex items-center gap-2 text-amber-300"><Cpu className="size-4" aria-hidden="true" /> Claude Code contribution</p>
              <ul className="mt-3 space-y-1.5 text-base text-white md:text-lg">{CLAUDE.map((m) => <li key={m} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />{m}</li>)}</ul>
            </div>
          </div>
          <ol className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Example: requirement to implementation">
            {[["1 · Requirement (mine)", REQ_EXAMPLE.requirement], ["2 · Implementation (Claude Code)", REQ_EXAMPLE.produced], ["3 · Review and test (mine)", REQ_EXAMPLE.review]].map(([h, t]) => (
              <li key={h} className="rounded-md border border-white/15 bg-white/5 p-4"><p className="eyebrow text-signal">{h}</p><p className="mt-1 text-sm leading-relaxed text-white/85 md:text-base">{t}</p></li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <ol className="grid gap-2 md:grid-cols-7" aria-label="Development journey">
            {JOURNEY.map((x, i) => (
              <li key={x.stage}>
                <button onClick={() => setSel(i)} aria-pressed={sel === i}
                  className={`flex h-full w-full flex-row items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors md:min-h-24 md:flex-col md:items-start md:justify-between ${sel === i ? "border-signal bg-signal text-navy-950" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}>
                  <span className="eyebrow opacity-70">{i + 1}</span>
                  <span className="font-display text-base font-semibold leading-tight">{x.stage}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 md:grid-cols-2" aria-live="polite">
            <div className="rounded-lg border border-white/15 bg-white/5 p-5"><p className="eyebrow text-signal">Human · {j.stage}</p>
              <ul className="mt-3 space-y-1.5 text-base text-white md:text-lg">{j.human.map((h) => <li key={h} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-signal" aria-hidden="true" />{h}</li>)}</ul></div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-5"><p className="eyebrow text-amber-300">Claude Code · {j.stage}</p>
              <ul className="mt-3 space-y-1.5 text-base text-white md:text-lg">{j.ai.map((h) => <li key={h} className="flex gap-3"><Check className="mt-1.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />{h}</li>)}</ul></div>
          </div>
        </>
      )}
      <p className="mt-4 flex items-start gap-3 rounded-md border border-amber-300/30 bg-amber-300/10 px-5 py-3 text-base text-amber-100 md:text-lg">
        <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        AI accelerates development but does not replace engineering judgment. Generated code is a draft until a person has read, run, and tested it.
      </p>
    </Frame>
  );
}
