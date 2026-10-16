import Link from "next/link";
import { Building2, FileText, MessageSquareWarning, RefreshCcw, Timer, Users2, Check, Compass, PencilRuler, HardHat, LifeBuoy, MapPin, Layers, Handshake, Wrench, Landmark, Eye } from "lucide-react";
import { SectionHeading, Pill } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function TrustStrip() {
  const items = [
    { icon: Landmark, title: "Product-led", text: "Designed around real workflows, from request to completion" },
    { icon: MapPin, title: "Role-based", text: "Separate views for property managers, dispatch, and technicians" },
    { icon: Layers, title: "Multiple disciplines", text: "Security, networking, IT, voice, AV, and low-voltage" },
    { icon: Wrench, title: "Install + support", text: "The team that builds it is the team that keeps it working" },
  ];
  return (
    <section aria-label="Company strengths" className="border-b border-line bg-white">
      <ul className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 py-8 sm:px-4 lg:border-r lg:border-line lg:last:border-r-0">
            <Icon className="mt-1 size-6 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-semibold text-navy-900">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-ink">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const confirmed = [
  { t: "Managed IT (MSP)", d: "IT infrastructure support, PC management, and repair." },
  { t: "VoIP & telecommunications", d: "Business phone systems, cabling, installation, and repair." },
  { t: "Network support", d: "Networking, structured cabling, and rack builds." },
  { t: "System maintenance", d: "Servicing the security, access, and low-voltage systems MoeTech installs." },
];
const proposed = [
  { t: "Service coordination", d: "One point of contact for every technology request across a property." },
  { t: "Maintenance programs", d: "Scheduled inspections and upkeep plans, scoped per property." },
  { t: "Multi-property management", d: "Consistent standards, documentation, and support across locations." },
  { t: "Proactive monitoring", d: "Device and network health checks. Requires scoping and client approval." },
];

export function ManagedSection() {
  return (
    <section className="bg-mist py-24 md:py-32" id="managed">
      <div className="container-x">
        <SectionHeading eyebrow="Managed services" title={<>From one-time installs to <span className="font-normal text-slate-ink">ongoing responsibility.</span></>}>
          Most technology problems don&rsquo;t happen on install day. They happen six months later, when nobody owns the system. MoeTech is shifting its focus from individual projects to long-term support and management.
        </SectionHeading>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[{ kind: "confirmed" as const, label: "What MoeTech does today", list: confirmed, tone: "bg-white" }, { kind: "proposed" as const, label: "What we propose to add", list: proposed, tone: "bg-white" }].map((col, ci) => (
            <Reveal key={col.kind} delay={ci * 0.1}>
              <div className={`h-full rounded-md border border-line p-7 sm:p-9 ${col.tone}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-navy-900">{col.label}</h3>
                  <Pill kind={col.kind} />
                </div>
                <ul className="mt-6 space-y-5">
                  {col.list.map((i) => (
                    <li key={i.t} className="flex gap-4">
                      <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md ${col.kind === "confirmed" ? "bg-emerald-500/10 text-emerald-700" : "border border-dashed border-amber-600/50 text-amber-700"}`}>
                        {col.kind === "confirmed" ? <Check className="size-3.5" aria-hidden="true" /> : <span className="text-xs font-bold">+</span>}
                      </span>
                      <div><p className="font-semibold text-navy-900">{i.t}</p><p className="text-sm leading-relaxed text-slate-ink">{i.d}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-ink">Proposed offerings are concepts for discussion. Scope, coverage, and response commitments are defined with each client.</p>
        <div className="mt-8"><Button href="/managed-services">Explore Managed Services</Button></div>
      </div>
    </section>
  );
}

export function PropertySection() {
  const problems = [
    { icon: Users2, t: "Too many vendors", d: "A different company for cameras, doors, Wi-Fi, and phones." },
    { icon: RefreshCcw, t: "Repeat failures", d: "The same equipment fails again because no one owns the root cause." },
    { icon: Timer, t: "Slow coordination", d: "Chasing vendors for schedules instead of running the property." },
    { icon: MessageSquareWarning, t: "Poor communication", d: "Updates arrive late, or only when you call and ask." },
    { icon: Eye, t: "No visibility", d: "No clear view of what’s open, scheduled, or waiting on parts." },
    { icon: FileText, t: "Missing documentation", d: "Panels, passwords, and layouts live in someone’s head." },
  ];
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32" id="property-managers">
      <div className="container-x relative">
        <SectionHeading dark eyebrow="For property managers" title="One partner for every property, system, and service request.">
          Running a building is hard enough. Technology shouldn&rsquo;t add six more phone numbers to your day.
        </SectionHeading>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, t, d }) => (
            <li key={t} className="bg-navy-950 p-7 transition-colors duration-300 hover:bg-navy-900">
              <Icon className="size-6 text-signal" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-6 rounded-md bg-brand p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="font-display text-2xl font-semibold leading-snug">A single technology partner simplifies building operations.</p>
            <p className="mt-2 text-white/80">Installation, service, and support from one team, with a single accountable point of contact.</p>
          </div>
          <Button href="/property-management" variant="primary" className="shrink-0">See how it works</Button>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    { icon: Compass, t: "Discovery", d: "We walk the property, document what exists, and learn how your team actually uses it." },
    { icon: PencilRuler, t: "Design", d: "A practical plan across security, network, and IT, with clear scope and no surprises." },
    { icon: HardHat, t: "Installation", d: "Clean, labeled, documented installation by technicians across telecom, data, and electrical." },
    { icon: LifeBuoy, t: "Ongoing support", d: "Service, maintenance, and changes handled by the team that built the system." },
  ];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="How we work" title="Four steps. One accountable team." />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" aria-hidden="true" />
          {steps.map(({ icon: Icon, t, d }, i) => (
            <li key={t} className="relative">
              <Reveal delay={i * 0.1}>
                <span className="relative grid size-14 place-items-center rounded-full bg-navy-950 text-signal"><Icon className="size-6" strokeWidth={1.6} aria-hidden="true" /></span>
                <p className="eyebrow mt-6 text-brand">Step 0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-navy-900">{t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink">{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const projectSlots = [
  { sector: "Multifamily community", systems: ["Access control", "Intercom", "CCTV"] },
  { sector: "Commercial office park", systems: ["Structured cabling", "Network", "VoIP"] },
  { sector: "Multi-location business", systems: ["Managed IT", "POS", "Security"] },
];

export function ProjectsPreview() {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our work" title="Projects, documented properly." />
          <Button href="/projects" variant="outline">View project framework</Button>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {projectSlots.map((p, i) => (
            <li key={p.sector}>
              <Reveal delay={i * 0.08}>
                <article className="overflow-hidden rounded-md border border-line bg-white">
                  <div className="relative grid aspect-[4/3] place-items-center bg-navy-900">
                    <Building2 className="size-16 text-signal/60" strokeWidth={1.2} aria-hidden="true" />
                    <span className="eyebrow absolute left-4 top-4 rounded bg-white/10 px-2 py-1 text-white/80">Demonstration content</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-navy-900">{p.sector}</h3>
                    <p className="mt-1 text-sm text-slate-ink">Placeholder for a real MoeTech project and photography.</p>
                    <ul className="mt-4 flex flex-wrap gap-2">{p.systems.map((s) => <li key={s} className="rounded-md bg-mist px-3 py-1 text-xs font-semibold text-slate-ink">{s}</li>)}</ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhySection() {
  const items = [
    { t: "Technical expertise", d: "Technicians with backgrounds in telecom, data systems, electrical infrastructure, wireless, and security." },
    { t: "Multiple disciplines", d: "Cameras, doors, network, phones, and AV from one team means fewer hand-offs and less finger-pointing." },
    { t: "Long-term relationships", d: "We’re built for the years after installation, when systems need service, changes, and answers." },
    { t: "Practical problem solving", d: "Fix the root cause, document it, and make the next call shorter." },
    { t: "Commercial-property support", d: "Experience with the way commercial and multifamily properties operate." },
    { t: "Clear ownership", d: "One accountable record for every request, from submission to completion." },
  ];
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Why MoeTech" title="Technology is only valuable when it keeps working.">
            MoeTech is a fictional company used to demonstrate end-to-end service workflows with sample data.
          </SectionHeading>
          <div className="mt-8"><Button href="/about" variant="outline">About MoeTech</Button></div>
        </div>
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {items.map((i) => (
            <li key={i.t} className="border-t-2 border-navy-900 pt-5">
              <Handshake className="mb-3 size-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="text-lg font-semibold text-navy-900">{i.t}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink">{i.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PortalTeaser() {
  return (
    <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <SectionHeading eyebrow="Concept · Customer service portal preview" title="See every request, from submission to completion.">
        An interactive concept of a future MoeTech service portal. It is a design demonstration with sample data, not a live system, and it isn&rsquo;t yet available to customers.
      </SectionHeading>
      <Link href="/portal-preview" className="text-sm font-semibold text-brand underline-offset-4 hover:underline">Open full-page preview →</Link>
    </div>
  );
}
