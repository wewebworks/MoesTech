import type { Metadata } from "next";
import { Building2, Camera, FileCheck2, ListChecks } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Our Work | Project Case Study Framework",
  description: "How RNA Tek projects will be presented: property type, systems installed, challenges, and ongoing support. Demonstration content pending real project data.",
  alternates: { canonical: "/projects" },
};

const slots = [
  { sector: "Multifamily community", systems: ["Access control", "Intercom", "CCTV"] },
  { sector: "Commercial office park", systems: ["Structured cabling", "Network", "VoIP"] },
  { sector: "Multi-location business", systems: ["Managed IT", "POS", "Security"] },
  { sector: "Mixed-use building", systems: ["Access control", "Network", "AV"] },
  { sector: "Retail location", systems: ["POS", "CCTV", "Cabling"] },
  { sector: "Residential smart-home", systems: ["Smart home", "AV", "Network"] },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Our work" title={<>Projects, <span className="text-signal">told properly.</span></>}>
        This page shows the format RNA Tek project case studies will follow. Every card below is demonstration content, not a completed project or client, and will be replaced with real work and photography.
      </PageHero>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {slots.map((p, i) => (
              <li key={p.sector}>
                <Reveal delay={(i % 3) * 0.08}>
                  <article className="overflow-hidden rounded-md border border-line">
                    <div className="relative grid aspect-[16/10] place-items-center bg-navy-900">
                      <Building2 className="size-14 text-signal/60" strokeWidth={1.2} aria-hidden="true" />
                      <span className="eyebrow absolute left-4 top-4 rounded bg-white/10 px-2 py-1 text-white/80">Demonstration content</span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-navy-900">{p.sector}</h2>
                      <p className="mt-1 text-sm text-slate-ink">Project name, location, and photos to come from RNA Tek.</p>
                      <ul className="mt-4 flex flex-wrap gap-2">{p.systems.map((s) => <li key={s} className="rounded-md bg-mist px-3 py-1 text-xs font-semibold text-slate-ink">{s}</li>)}</ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What each case study will include" title="Real work, clearly documented." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, t: "Real photography", d: "Installed work, racks, and equipment from actual RNA Tek jobs." },
              { icon: ListChecks, t: "Systems installed", d: "Which disciplines were delivered and how they integrate." },
              { icon: FileCheck2, t: "Challenge & approach", d: "What the property needed and how it was solved." },
              { icon: Building2, t: "Ongoing support", d: "What happens after install, where applicable." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-md bg-white p-6 ring-1 ring-line">
                <Icon className="size-6 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-navy-900">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-ink">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
