"use client";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Repeat } from "lucide-react";
import { API_STEPS, CONCERNS, LANES, OWNERSHIP_ROWS, type Lane } from "./content";
import { Frame, Tag } from "./ui";

// ---------------------------------------------------------------- Who owns the data?
export function OwnershipSlide() {
  const [single, setSingle] = useState(false);
  const [c, setC] = useState(5);
  const copies = [["Property Manager view", "New Request"], ["Dispatch view", "Scheduled"], ["Technician view", "In Progress"]];
  return (
    <Frame compact wide eyebrow="Section 7 · The central decision" title="The Most Important Architecture Decision: Who Owns the Data?">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex gap-2" role="group" aria-label="Choose model">
            {([[false, "Competing copies"], [true, "One source of truth"]] as const).map(([v, l]) => (
              <button key={l} onClick={() => setSingle(v)} aria-pressed={single === v}
                className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors md:text-base ${single === v ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{l}</button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {copies.map(([who, st]) => (
              <div key={who} className={`rounded-md border p-3 ${single ? "border-white/20 bg-white/5" : "border-rose-300/50 bg-rose-400/10"}`}>
                <p className="eyebrow text-white/60">{who}</p>
                <p className="mt-1 text-xs text-white/50">Ticket T-1045</p>
                <p className="mt-1 text-sm font-semibold text-white md:text-base">{single ? "Scheduled" : st}</p>
                {!single && <p className="mt-1 flex items-center gap-1 text-xs text-rose-200"><AlertTriangle className="size-3" aria-hidden="true" />own copy</p>}
              </div>
            ))}
          </div>
          <div className="my-2 flex justify-around text-signal" aria-hidden="true">{single ? [0, 1, 2].map((i) => <span key={i}>↓</span>) : <span className="text-xs text-rose-200">which one is right?</span>}</div>
          <div className={`rounded-md border p-4 text-center ${single ? "border-signal bg-signal/15" : "border-dashed border-white/20 bg-white/[0.03]"}`}>
            <p className="font-display text-lg font-semibold text-white">{single ? "Monday.com: one operational record" : "No single owner"}</p>
            <p className="mt-1 text-sm text-white/70">{single ? "The integration layer validates and synchronizes. Interfaces read and request. (Beta design; the demo simulates it.)" : "Every interface can change its own version. Disagreements are found by people, late."}</p>
          </div>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <p className="eyebrow mb-2 text-white/60">Who owns what</p>
          <table className="w-full text-left text-sm md:text-base">
            <tbody>
              {OWNERSHIP_ROWS.map((r) => (
                <tr key={r.record} className="border-t border-white/10">
                  <td className="py-2 pr-3 text-white/85">{r.record}</td>
                  <td className={`py-2 pr-3 font-semibold ${r.owner === "Monday.com" ? "text-signal" : r.owner === "QuickBooks" ? "text-emerald-300" : "text-white"}`}>{r.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-white/50">Monday.com for operations (source of truth), integrated with QuickBooks for finance. The demo simulates both.</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Integration concerns">
        {CONCERNS.map((k, i) => (
          <button key={k.name} onClick={() => setC(i)} aria-pressed={c === i}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${c === i ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{k.name}</button>
        ))}
      </div>
      <p className="mt-3 rounded-md border border-white/15 bg-white/5 px-4 py-3 text-base leading-relaxed text-white/85 md:text-lg" aria-live="polite"><strong className="text-white">{CONCERNS[c].name}. </strong>{CONCERNS[c].text}</p>
    </Frame>
  );
}

// ---------------------------------------------------------------- API walkthrough
const col = (l: Lane) => LANES.findIndex((x) => x.id === l);

function Arrow({ from, to, label, row }: { from: Lane; to: Lane; label: string; row: number }) {
  const a = col(from), b = col(to);
  const top = 10 + row * 44;
  if (a === b) {
    return (
      <div className="absolute flex -translate-x-1/2 items-center gap-2 rounded-full border border-signal/60 bg-signal/10 px-3 py-1 text-xs font-semibold text-signal md:text-sm"
        style={{ left: `${a * 25 + 12.5}%`, top }}><Repeat className="size-3.5" aria-hidden="true" />{label}</div>
    );
  }
  const left = Math.min(a, b) * 25 + 12.5;
  const rightward = b > a;
  return (
    <div className="absolute" style={{ left: `${left}%`, width: `${Math.abs(b - a) * 25}%`, top }}>
      <p className="mb-1 text-center text-xs font-semibold text-signal md:text-sm">{label}</p>
      <div className="relative">
        <div className={rightward ? "flowx-r" : "flowx-l"} />
        {rightward ? <ChevronRight className="absolute -right-2 -top-[11px] size-6 text-signal" aria-hidden="true" /> : <ChevronLeft className="absolute -left-2 -top-[11px] size-6 text-signal" aria-hidden="true" />}
      </div>
    </div>
  );
}

export function ApiSlide() {
  const [i, setI] = useState(0);
  const s = API_STEPS[i];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ".") setI((n) => Math.min(API_STEPS.length - 1, n + 1));
      else if (e.key === ",") setI((n) => Math.max(0, n - 1));
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const rows = s.arrows.length;
  return (
    <Frame compact wide eyebrow="Section 8 · API walkthrough" title="One ticket, end to end.">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <Tag kind="Simulated" />
        <p className="text-sm font-semibold text-orange-200 md:text-base">Proposed API Flow, illustrative. The live demo does not call Monday.com or QuickBooks. All data is fictional.</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {LANES.map((l, n) => {
          const active = s.arrows.some(([a, b]) => a === l.id || b === l.id);
          return (
            <div key={l.id} className={`rounded-md border px-3 py-2 text-center transition-colors ${active ? "border-signal bg-signal/10" : "border-white/15 bg-white/5"} ${l.id === "monday" ? "ring-1 ring-signal/40" : ""}`}>
              <p className="text-sm font-semibold text-white md:text-base">{l.label}</p>
              <p className="text-[11px] text-white/55 md:text-xs">{l.sub}</p>
              <span className="sr-only">Lane {n + 1}</span>
            </div>
          );
        })}
      </div>
      <div className="relative mb-3" style={{ height: rows * 44 + 24 }} aria-hidden="true">
        {[0, 1, 2, 3].map((n) => <div key={n} className="absolute inset-y-0 w-px bg-white/10" style={{ left: `${n * 25 + 12.5}%` }} />)}
        {s.arrows.map(([a, b], n) => <Arrow key={`${i}-${n}`} from={a} to={b} label={n === 0 ? s.label : ""} row={n} />)}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold text-white md:text-2xl"><span className="text-signal">{i + 1}/{API_STEPS.length}</span> · {s.title}</h3>
      </div>
      <p className="mt-1 text-sm text-white/65 md:text-base">{s.note}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {([["Request", s.request], ["Response", s.response]] as const).map(([h, body]) => (
          <div key={h} className="min-w-0 rounded-md border border-white/15 bg-navy-900/70 p-3">
            <p className="eyebrow mb-1 text-white/50">{h}</p>
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-words font-mono text-[12px] leading-snug text-signal md:text-[13px]" tabIndex={0}>{body}</pre>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-30"><ArrowLeft className="size-4" aria-hidden="true" /> Back</button>
        <button onClick={() => setI(Math.min(API_STEPS.length - 1, i + 1))} disabled={i === API_STEPS.length - 1} className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-white disabled:opacity-40">Next step <ArrowRight className="size-4" aria-hidden="true" /></button>
        <ol className="flex flex-1 gap-1" aria-label="Steps">
          {API_STEPS.map((x, n) => (
            <li key={x.title} className="flex-1"><button onClick={() => setI(n)} aria-label={`Step ${n + 1}: ${x.title}`} aria-current={n === i ? "step" : undefined} className={`h-2 w-full rounded-full ${n === i ? "bg-signal" : n < i ? "bg-signal/40" : "bg-white/15"}`} /></li>
          ))}
        </ol>
        <span className="hidden text-xs text-white/40 md:inline"><Check className="mr-1 inline size-3" aria-hidden="true" />keys: . next · , back</span>
      </div>
    </Frame>
  );
}
