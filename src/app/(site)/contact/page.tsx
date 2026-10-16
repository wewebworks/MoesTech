import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact MoeTech | Request a Quote or Consultation" },
  description: "A demonstration contact form for MoeTech: security, networking, managed IT, AV, and low-voltage systems.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const rows = [
    { icon: Mail, label: "Email", node: <a href={`mailto:${company.email}`} className="hover:text-brand">{company.email}</a> },
  ];
  return (
    <>
      <PageHero eyebrow="Contact / Request a quote" title={<>Let&rsquo;s make your technology <span className="text-signal">easier to manage.</span></>} cta={{ href: "#quote", label: "Request a consultation" }}>
        Tell us about your properties and the systems you rely on. Consulting is free.
      </PageHero>
      <section className="bg-mist py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div id="quote" className="scroll-mt-28"><ContactForm /></div>
          <aside aria-label="Contact details">
            <ul className="space-y-7 rounded-md bg-white p-7 ring-1 ring-line sm:p-9">
              {rows.map(({ icon: Icon, label, node }) => (
                <li key={label} className="flex gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
                  <div><p className="eyebrow text-slate-ink">{label}</p><p className="mt-1 text-navy-900">{node}</p></div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
