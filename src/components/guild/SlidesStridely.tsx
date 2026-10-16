"use client";
import { Check, Smartphone } from "lucide-react";
import { STRIDELY } from "./content";
import { Frame } from "./ui";

export function StridelySlide() {
  const shots = STRIDELY.screenshots;
  const slots = Array.from({ length: Math.max(3, shots.length) }, (_, i) => shots[i]);
  return (
    <Frame compact wide eyebrow="One more build" title={<>What we built with {STRIDELY.name}, in about a day.</>}>
      <p className="max-w-4xl text-base text-white/75 md:text-lg">{STRIDELY.tagline}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="grid grid-cols-3 gap-3" aria-label="Stridely screenshots">
            {slots.map((shot, i) => (
              <figure key={i} className="flex h-[36vh] min-h-40 flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/5">
                {shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shot.src} alt={shot.caption} className="min-h-0 w-full flex-1 object-cover object-top" />
                ) : (
                  <div className="grid min-h-0 flex-1 place-items-center p-3 text-center text-xs text-white/45">
                    <span><Smartphone className="mx-auto mb-2 size-6" aria-hidden="true" />Screenshot {i + 1}</span>
                  </div>
                )}
                {shot && <figcaption className="px-2 py-1.5 text-center text-xs text-white/70">{shot.caption}</figcaption>}
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
