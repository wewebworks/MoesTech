import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allServices, company } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About MoeTech | Technology Partner" },
  description: "MoeTech is a fictional commercial technology company used to demonstrate security, networking, IT, AV, and low-voltage workflows.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About MoeTech" title={<>Committed to quality. <span className="text-signal">Built for the long term.</span></>}>
        A fictional commercial technology company, used here to show how one service request can move cleanly from property manager to dispatch to technician.
      </PageHero>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Technology that earns its place." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-ink">
              <p>MoeTech is an example company. It exists to demonstrate how product thinking, clear ownership of data, and a connected workflow make field service easier to run.</p>
              <p>The team&rsquo;s technicians come from telecom, data systems, electrical infrastructure, wireless environments, and security. That range lets MoeTech handle the connected systems in a building as one job, not five.</p>
              <p>Today the company is focused on the part that matters most after installation: keeping those systems working through managed, long-term support.</p>
            </div>
          </div>
          <div className="rounded-md bg-navy-950 p-8 text-white sm:p-10">
            <p className="eyebrow text-signal">Contact</p>
            <div className="mt-6 space-y-6">
              <p className="text-white/70">Placeholder contact for this demonstration.<br />{company.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title="One team, many disciplines." />
          <ul className="mt-10 flex flex-wrap gap-3">
            {allServices.map((s) => <li key={s} className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 ring-1 ring-line">{s}</li>)}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
