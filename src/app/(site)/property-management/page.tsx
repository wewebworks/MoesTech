import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Property Management Technology Services & Multifamily Security",
  description:
    "One technology partner for property managers: multifamily security systems, access control, intercom, network, and managed IT with coordinated service in NJ and FL.",
  alternates: { canonical: "/property-management" },
};

export default function Page() {
  return (
    <ServicePage
      path="/property-management"
      schemaName="Property management technology services"
      eyebrow="Property management solutions"
      title={<>One partner for every property, system, <span className="text-signal">and service request.</span></>}
      intro="Built for property managers and owners who are tired of juggling vendors for cameras, doors, intercoms, Wi-Fi, and phones."
      blocks={[
        { id: "vendors", title: "Consolidate your vendors", lead: "Replace a list of specialists with one team that can handle the whole stack.", points: ["Security, access, intercom, network, IT, and voice", "One relationship and one point of contact", "Consistent standards across properties"] },
        { id: "service", title: "Faster, clearer service", status: "proposed", lead: "A proposed service model for requests, scheduling, and follow-up.", points: ["Requests tracked from submission to completion", "Clear status: assigned, scheduled, waiting on materials", "Customer portal concept available to preview"] },
        { id: "documentation", title: "Documentation that stays with the property", status: "proposed", lead: "Records of what is installed and what has been serviced.", points: ["Equipment and system records", "Service history to spot repeat failures", "Hand-off-ready information for new managers"] },
      ]}
      note="Proposed items are concepts. The service portal shown on this site is a design demonstration with sample data."
      whyTitle="Building operations, simplified."
      why={[
        "Multifamily and commercial properties depend on connected systems. When one fails, residents and tenants notice immediately.",
        "Having a technology partner that installs and supports your systems shortens the path from problem to fix.",
      ]}
      related={[
        { href: "/security-access-control", label: "Security & access control" },
        { href: "/managed-services", label: "Managed services" },
        { href: "/portal-preview", label: "Service portal preview" },
      ]}
    />
  );
}
