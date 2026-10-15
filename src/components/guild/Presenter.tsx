"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { SLIDES, TOTAL_SECONDS, fmt } from "./content";
import { useSlide } from "./deckState";

export function Presenter() {
  const { index, go } = useSlide();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const onButton = e.target instanceof Element && e.target.closest("button");
      if (e.key === "ArrowRight" || e.key === "PageDown") go(index + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(index - 1);
      else if (e.key === " " && !onButton) setRunning((r) => !r);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const slide = SLIDES[index];
  const next = SLIDES[index + 1];
  const startsAt = SLIDES.slice(0, index).reduce((n, s) => n + s.seconds, 0);
  const endsAt = startsAt + slide.seconds;
  const delta = elapsed - endsAt; // positive = behind plan at the end of this slide
  const idle = !running && elapsed === 0;
  const tone = idle ? "text-white/60" : elapsed > endsAt ? "text-rose-300" : elapsed < startsAt ? "text-signal" : "text-emerald-300";
  const btn = "inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10";

  return (
    <div className="min-h-screen bg-navy-950 p-4 text-white md:p-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section aria-label="Current slide notes">
          <p className="eyebrow text-signal">Presenter view · slide {index + 1} of {SLIDES.length}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">{slide.title}</h1>
          <p className="mt-2 text-sm text-white/60">Target time on this slide: {fmt(slide.seconds)} · should finish by {fmt(endsAt)}</p>
          <h2 className="eyebrow mt-8 text-white/60">Notes</h2>
          <ul className="mt-3 space-y-3 text-lg leading-relaxed md:text-xl">
            {slide.notes.map((n) => <li key={n} className="rounded-md border border-white/10 bg-white/5 px-4 py-3">{n}</li>)}
          </ul>
          <div className="mt-6 flex gap-3">
            <button onClick={() => go(index - 1)} disabled={index === 0} className={`${btn} disabled:opacity-30`}><ChevronLeft className="size-4" aria-hidden="true" /> Previous</button>
            <button onClick={() => go(index + 1)} disabled={!next} className={`${btn} disabled:opacity-30`}>Next <ChevronRight className="size-4" aria-hidden="true" /></button>
          </div>
        </section>

        <aside className="space-y-6" aria-label="Timer and agenda">
          <div className="rounded-lg border border-white/15 bg-white/5 p-5">
            <p className="eyebrow text-white/60">Elapsed / {fmt(TOTAL_SECONDS)}</p>
            <p className={`mt-1 font-display text-6xl font-semibold tabular-nums ${tone}`} role="timer" aria-live="off">{fmt(elapsed)}</p>
            <p className={`mt-1 text-sm ${tone}`}>{idle ? "Not started" : delta > 0 ? `${fmt(delta)} behind plan` : `${fmt(delta)} ahead of plan`}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setRunning(!running)} className={btn}>
                {running ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}{running ? "Pause" : "Start"}
              </button>
              <button onClick={() => { setRunning(false); setElapsed(0); }} className={btn}><RotateCcw className="size-4" aria-hidden="true" /> Reset</button>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/5 p-5">
            <p className="eyebrow text-white/60">Up next</p>
            <p className="mt-1 text-xl font-semibold">{next ? next.title : "End of presentation"}</p>
          </div>
          <ol className="space-y-1" aria-label="Agenda">
            {SLIDES.map((s, i) => (
              <li key={s.id}>
                <button onClick={() => go(i)} aria-current={i === index ? "step" : undefined}
                  className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm ${i === index ? "bg-signal text-navy-950" : "text-white/75 hover:bg-white/10"}`}>
                  <span>{i + 1}. {s.title}</span><span className="tabular-nums opacity-70">{fmt(s.seconds)}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
