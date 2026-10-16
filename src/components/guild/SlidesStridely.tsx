"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { STRIDELY } from "./content";
import { Lightbox } from "./Lightbox";
import { Frame } from "./ui";

export function StridelySlide() {
  const [view, setView] = useState<"features" | "build">("features");
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Frame compact wide eyebrow="One more build" title={<>What we built with {STRIDELY.name}, in about a day.</>}>
      <p className="max-w-4xl text-base text-white/75 md:text-lg">{STRIDELY.tagline}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-start justify-center gap-3" aria-label="Stridely app screenshots">
            {STRIDELY.screenshots.map((shot, i) => (
              <figure key={shot.src} className="min-w-0">
                <button onClick={() => setOpen(i)} aria-label={`Enlarge screenshot: ${shot.caption}`} className="block cursor-zoom-in rounded-2xl transition-transform hover:scale-[1.02]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.alt} className="h-[38vh] w-auto max-w-full rounded-2xl border border-white/20 object-cover object-top shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]" />
                </button>
                <figcaption className="mt-1.5 text-center text-xs text-white/65">{shot.caption} · click to enlarge</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {STRIDELY.stats.map((x) => (
              <div key={x.label} className="rounded-md border border-white/15 bg-white/5 p-3 text-center">
                <p className="font-display text-2xl font-semibold text-signal md:text-3xl">{x.n}</p>
                <p className="text-xs text-white/65 md:text-sm">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2" role="group" aria-label="Choose view">
            {([["features", "Cool features"], ["build", "How it was built"]] as const).map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} aria-pressed={view === v}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors md:text-base ${view === v ? "bg-signal text-navy-950" : "border border-white/25 text-white hover:bg-white/10"}`}>{l}</button>
            ))}
          </div>
          {view === "features" ? (
            <div className="space-y-2.5" aria-live="polite">
              {STRIDELY.features.map((f) => (
                <section key={f.name} className="rounded-lg border border-white/15 bg-white/5 p-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-white md:text-xl">{f.name}</h3>
                    <span className="eyebrow text-signal">{f.tag}</span>
                  </div>
                  <p className="text-sm font-semibold text-white/90 md:text-base">{f.headline}</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-white/75 md:text-sm">
                    {f.points.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-signal" aria-hidden="true" />{p}</li>)}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
          <ol className="space-y-2" aria-label="Build timeline">
            {STRIDELY.timeline.map((t) => (
              <li key={t.when} className="flex gap-3 rounded-md border border-white/12 bg-white/[0.04] px-3 py-2">
                <span className="eyebrow w-28 shrink-0 pt-0.5 text-signal">{t.when}</span>
                <span className="text-sm text-white/85 md:text-base">{t.what}</span>
              </li>
            ))}
          </ol>
          <ul className="space-y-1.5 text-sm text-white md:text-base">
            {STRIDELY.method.map((m) => <li key={m} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />{m}</li>)}
          </ul>
          <p className="text-xs text-white/45">{STRIDELY.stack}. Counts and times are from the project&rsquo;s git history.</p>
            </div>
          )}
        </div>
      </div>
      {open !== null && <Lightbox shots={STRIDELY.screenshots} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </Frame>
  );
}
