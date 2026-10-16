"use client";
import { Check } from "lucide-react";
import { STRIDELY } from "./content";
import { Frame } from "./ui";

export function StridelySlide() {
  return (
    <Frame compact wide eyebrow="One more build" title={<>What we built with {STRIDELY.name}, in about a day.</>}>
      <p className="max-w-4xl text-base text-white/75 md:text-lg">{STRIDELY.tagline}</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.4fr]">
        <div className="space-y-3">
          {STRIDELY.stats.map((x) => (
            <div key={x.label} className="rounded-lg border border-white/15 bg-white/5 px-5 py-4">
              <p className="font-display text-4xl font-semibold text-signal md:text-5xl">{x.n}</p>
              <p className="text-sm text-white/70 md:text-base">{x.label}</p>
            </div>
          ))}
          <p className="text-xs leading-relaxed text-white/50">{STRIDELY.stack}. Counts and times are from the project&rsquo;s git history.</p>
        </div>
        <div className="space-y-4">
          <ol className="space-y-2" aria-label="Build timeline">
            {STRIDELY.timeline.map((t) => (
              <li key={t.when} className="flex gap-4 rounded-md border border-white/12 bg-white/[0.04] px-4 py-2.5">
                <span className="eyebrow w-32 shrink-0 pt-0.5 text-signal">{t.when}</span>
                <span className="text-sm text-white/90 md:text-base">{t.what}</span>
              </li>
            ))}
          </ol>
          <ul className="space-y-1.5 text-sm text-white md:text-base">
            {STRIDELY.method.map((m) => <li key={m} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />{m}</li>)}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
