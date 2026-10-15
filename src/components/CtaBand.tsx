import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function CtaBand({
  title = "Let’s Make Your Technology Easier to Manage.",
  text = "Tell us about your properties and the systems you rely on. Consulting is free.",
  label = "Schedule a Consultation",
}: { title?: string; text?: string; label?: string }) {
  return (
    <section className="border-t-4 border-signal bg-navy-950 py-20 text-white md:py-28">
      <Reveal className="container-x grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-white/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button href="/contact">{label}</Button>
          <Button href="/portal-preview" variant="ghost">Preview the Service Portal</Button>
        </div>
      </Reveal>
    </section>
  );
}
