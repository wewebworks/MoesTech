import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Managed IT & Technology Services",
  description:
    "Managed IT services: IT support, VoIP, network support, and ongoing maintenance for commercial properties and multi-location businesses.",
  alternates: { canonical: "/managed-services" },
};

export default function Page() {
  return (
    <ServicePage
      path="/managed-services"
      schemaName="Managed technology services for commercial properties"
      eyebrow="Managed services"
      title={<>We don&rsquo;t just install technology. <span className="text-signal">We keep it working.</span></>}
      intro="Managed technology services for commercial properties, multifamily communities, and businesses with multiple locations: IT support, voice, network, and system maintenance from one accountable team."
      blocks={[
        {
          id: "managed-it", title: "Managed IT & PC support", status: "confirmed",
          lead: "MoeTech offers managed service provider (MSP) support for business IT environments.",
          points: ["IT infrastructure support", "PC management and repair", "Networking support", "Consulting is free"],
        },
        {
          id: "voip", title: "VoIP & telecommunications", status: "confirmed",
          lead: "Internet-based business phone systems backed by the same team that handles the cabling and network underneath.",
          points: ["VoIP phone systems", "Structured cabling and installation", "Telecom repair and support"],
        },
        {
          id: "maintenance", title: "System maintenance & service coordination", status: "proposed",
          lead: "A proposed program to service the security, access, network, and low-voltage systems on a property under one agreement.",
          points: ["Single point of contact for service requests", "Scheduled maintenance visits scoped per property", "Equipment and system documentation", "Service history across repeat issues"],
        },
        {
          id: "multi-property", title: "Multi-property technology management", status: "proposed",
          lead: "Consistent standards and support for owners and managers running more than one building.",
          points: ["Shared standards across properties", "Portfolio-level visibility into open service work", "Customer service portal (concept preview available)", "Proactive monitoring, only where scoped and approved"],
        },
      ]}
      note="Proposed offerings are concepts for discussion. MoeTech has not committed to 24/7 monitoring or guaranteed response times; any such terms would be defined in a client agreement."
      whyTitle="Fewer vendors. Fewer surprises. Faster answers."
      why={[
        "When one team installs and supports the system, there is no hand-off to argue about when something fails.",
        "Documentation and service history stay with the property, not with an individual technician.",
        "A single relationship across IT, voice, security, and low-voltage reduces coordination work for managers.",
      ]}
      related={[
        { href: "/property-management", label: "Property management solutions" },
        { href: "/network-infrastructure", label: "Network infrastructure" },
        { href: "/portal-preview", label: "Service portal preview" },
      ]}
    />
  );
}
