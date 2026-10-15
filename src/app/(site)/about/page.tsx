import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allServices, company } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About RNA Tek | Technology Partner in Glen Rock, NJ" },
  description: "RNA Tek LLC is a commercial technology solutions company in Glen Rock, NJ with a branch in Doral, FL, covering security, networking, IT, AV, and low-voltage systems.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About RNA Tek" title={<>Committed to quality. <span className="text-signal">Built for the long term.</span></>}>
        A commercial technology solutions company with more than two decades of industry expertise, headquartered in Glen Rock, New Jersey, with a branch in Doral, Florida.
      </PageHero>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Technology that earns its place." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-ink">
              <p>RNA Tek LLC was formed by {company.founder}, who brings more than 20 years of experience in telecommunications, networking, and IT.</p>
              <p>The team&rsquo;s technicians come from telecom, data systems, electrical infrastructure, wireless environments, and security. That range lets RNA Tek handle the connected systems in a building as one job, not five.</p>
              <p>Today the company is focused on the part that matters most after installation: keeping those systems working through managed, long-term support.</p>
            </div>
          </div>
          <div className="rounded-md bg-navy-950 p-8 text-white sm:p-10">
            <p className="eyebrow text-signal">Locations</p>
            <div className="mt-6 space-y-6">
              <p><span className="block font-display text-lg">{company.nj.label}</span><span className="text-white/70">{company.nj.street}, {company.nj.city}, {company.nj.region} {company.nj.zip}</span></p>
              <p><span className="block font-display text-lg">{company.fl.label}</span><span className="text-white/70">{company.fl.city}, {company.fl.region}</span></p>
              <p className="text-white/70">{company.hours}<br />{company.phone} · {company.email}</p>
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
