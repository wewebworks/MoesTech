import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact RNA Tek | Request a Quote or Consultation" },
  description: "Request a free consultation or quote from RNA Tek in Glen Rock, NJ. Security, networking, managed IT, AV, and low-voltage systems for NJ and FL properties.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const rows = [
    { icon: Phone, label: "Phone", node: <a href={company.phoneHref} className="hover:text-brand">{company.phone}</a> },
    { icon: Mail, label: "Email", node: <a href={`mailto:${company.email}`} className="hover:text-brand">{company.email}</a> },
    { icon: MapPin, label: company.nj.label, node: <>{company.nj.street}<br />{company.nj.city}, {company.nj.region} {company.nj.zip}</> },
    { icon: MapPin, label: company.fl.label, node: <>{company.fl.city}, {company.fl.region}</> },
    { icon: Clock, label: "Hours", node: company.hours },
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
