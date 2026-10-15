import Link from "next/link";
import { Logo } from "./Logo";
import { company, nav, allServices } from "@/lib/site";

export function Footer() {
  const socials = [
    ["LinkedIn", company.social.linkedin],
    ["Facebook", company.social.facebook],
    ["Instagram", company.social.instagram],
    ["X", company.social.x],
  ] as const;
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="h-12 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Integrated security, networking, and managed technology services for commercial properties, multifamily communities, and growing businesses.
          </p>
          <ul className="mt-6 flex gap-5 text-sm">
            {socials.map(([l, h]) => (
              <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">{l}</a></li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow mb-5 text-signal">Explore</h2>
          <ul className="space-y-3 text-sm">
            {[...nav.primary, ...nav.services, ...nav.secondary].map((n) => (
              <li key={n.href}><Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link href="/portal-preview" className="transition-colors hover:text-white">Service Portal Preview</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow mb-5 text-signal">Capabilities</h2>
          <ul className="space-y-3 text-sm">{allServices.slice(0, 10).map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div className="text-sm">
          <h2 className="eyebrow mb-5 text-signal">Contact</h2>
          <address className="space-y-5 not-italic">
            <p><span className="block font-semibold text-white">{company.nj.label}</span>{company.nj.street}<br />{company.nj.city}, {company.nj.region} {company.nj.zip}</p>
            <p><span className="block font-semibold text-white">{company.fl.label}</span>{company.fl.city}, {company.fl.region}</p>
            <p>
              <a href={company.phoneHref} className="block hover:text-white">{company.phone}</a>
              <a href={`mailto:${company.email}`} className="block hover:text-white">{company.email}</a>
            </p>
            <p>{company.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/45 md:flex-row md:justify-between">
          <p>© 2026 {company.legalName}. All rights reserved.</p>
          <p>Design demonstration by WeWebWorks — concept content and sample data are labeled throughout.</p>
        </div>
      </div>
    </footer>
  );
}
