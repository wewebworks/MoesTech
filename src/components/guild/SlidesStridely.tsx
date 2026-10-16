"use client";
import { Check } from "lucide-react";
import { STRIDELY } from "./content";
import { Frame } from "./ui";

export function StridelySlide() {
  return (
    <Frame compact wide eyebrow="One more build" title={<>What we built with {STRIDELY.name}, in about a day.</>}>
      <p className="max-w-4xl text-base text-white/75 md:text-lg">{STRIDELY.tagline}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="flex items-start justify-center gap-3" aria-label="Stridely app screenshots">
            {STRIDELY.screenshots.map((shot) => (
              <figure key={shot.src} className="min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="h-[38vh] w-auto max-w-full rounded-2xl border border-white/20 object-cover object-top shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]" />
                <figcaption className="mt-1.5 text-center text-xs text-white/65">{shot.caption}</figcaption>
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
      </div>
    </Frame>
  );
}
