import type { ReactNode } from "react";
import { Button } from "./ui/Button";

export function PageHero({
  eyebrow, title, children, cta = { href: "/contact", label: "Request a Consultation" }, secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <div className="hex-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="slash pointer-events-none absolute bottom-0 right-0 h-8 w-[45%] bg-white" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow mb-6 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-7xl [&_.text-signal]:font-normal [&_.text-signal]:text-white/50">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">{children}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={cta.href}>{cta.label}</Button>
          {secondary && <Button href={secondary.href} variant="ghost">{secondary.label}</Button>}
        </div>
      </div>
    </section>
  );
}
