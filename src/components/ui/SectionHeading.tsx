import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow, title, children, dark = false, center = false,
}: { eyebrow: string; title: ReactNode; children?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow mb-4 ${dark ? "text-signal" : "text-brand"}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.8rem] ${dark ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {children && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-slate-ink"}`}>{children}</p>}
    </div>
  );
}

export function Pill({ kind }: { kind: "confirmed" | "proposed" | "sample" }) {
  const map = {
    confirmed: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20",
    proposed: "bg-amber-500/10 text-amber-700 ring-amber-600/25",
    sample: "bg-brand/10 text-brand ring-brand/25",
  };
  const label = { confirmed: "Current service", proposed: "Proposed offering", sample: "Sample data" }[kind];
  return <span className={`eyebrow inline-block rounded-md px-2.5 py-1 ring-1 ${map[kind]}`}>{label}</span>;
}
