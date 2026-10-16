import type { ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";
import { Reveal } from "./ui/Reveal";
import { SectionHeading, Pill } from "./ui/SectionHeading";
import { SITE_URL } from "@/lib/site";

export type Block = {
  id: string;
  title: string;
  lead: string;
  points: string[];
  status?: "confirmed" | "proposed";
};

export type ServicePageProps = {
  path: string;
  schemaName: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  blocks: Block[];
  whyTitle: string;
  why: string[];
  related: { href: string; label: string }[];
  note?: string;
};

export function ServicePage(p: ServicePageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.schemaName,
    provider: { "@type": "ProfessionalService", name: "MoeTech", url: SITE_URL },
    url: `${SITE_URL}${p.path}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow={p.eyebrow} title={p.title} secondary={{ href: "/portal-preview", label: "Preview the service portal" }}>{p.intro}</PageHero>

      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <nav aria-label="On this page" className="mb-14 flex flex-wrap gap-2">
            {p.blocks.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-slate-ink transition-colors hover:border-brand hover:text-brand">{b.title}</a>
            ))}
          </nav>
          <div className="space-y-6">
            {p.blocks.map((b, i) => (
              <Reveal key={b.id}>
                <article id={b.id} className="grid gap-8 rounded-md border border-line p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
                  <div>
                    <p className="eyebrow mb-3 text-brand">0{i + 1}</p>
                    <h2 className="text-2xl font-semibold text-navy-900 sm:text-3xl">{b.title}</h2>
                    <p className="mt-4 leading-relaxed text-slate-ink">{b.lead}</p>
                    {b.status && <div className="mt-5"><Pill kind={b.status} /></div>}
                  </div>
                  <ul className="space-y-3">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.95rem] text-navy-900">
                        <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />{pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          {p.note && <p className="mt-6 text-sm text-slate-ink">{p.note}</p>}
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Why it matters" title={p.whyTitle} />
          <ul className="space-y-5">
            {p.why.map((w) => <li key={w} className="border-l-2 border-brand pl-5 leading-relaxed text-navy-900">{w}</li>)}
          </ul>
        </div>
        <div className="container-x mt-14 flex flex-wrap gap-3">
          <span className="eyebrow mr-2 self-center text-slate-ink">Related</span>
          {p.related.map((r) => <Link key={r.href} href={r.href} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-navy-900 ring-1 ring-line hover:text-brand hover:ring-brand">{r.label}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
