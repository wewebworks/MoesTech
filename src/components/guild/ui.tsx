"use client";
import type { ReactNode } from "react";
import type { Status3 } from "./content";

export type SlideProps = { go: (i: number) => void; launchDemo: () => void; active: boolean };

const tagStyle: Record<Status3, string> = {
  Implemented: "bg-emerald-400/15 text-emerald-300 ring-emerald-300/30",
  Simulated: "bg-signal/15 text-signal ring-signal/30",
  Planned: "bg-amber-400/15 text-amber-300 ring-amber-300/30",
};
export function Tag({ kind }: { kind: Status3 }) {
  return <span className={`eyebrow inline-block rounded-md px-2.5 py-1 ring-1 ${tagStyle[kind]}`}>{kind}</span>;
}

export function Frame({ eyebrow, title, children, wide, compact }: { eyebrow: string; title: ReactNode; children: ReactNode; wide?: boolean; compact?: boolean }) {
  return (
    <div className={`mx-auto flex min-h-full w-full flex-col justify-center px-6 py-8 md:px-14 ${wide ? "max-w-[96rem]" : "max-w-[88rem]"}`}>
      <p className="eyebrow mb-3 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />{eyebrow}</p>
      <h2 className={`max-w-5xl font-semibold leading-[1.05] text-white ${compact ? "text-2xl md:text-4xl xl:text-5xl" : "text-3xl md:text-5xl xl:text-6xl"}`}>{title}</h2>
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  );
}

export const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-md bg-signal px-7 py-4 text-base font-semibold text-navy-950 transition-colors hover:bg-white md:text-lg";
export const btnGhost = "inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 md:text-lg";
