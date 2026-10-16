import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Commercial Network Cabling & Infrastructure",
  description:
    "Structured cabling, network infrastructure, rack builds, and VoIP for commercial properties and businesses.",
  alternates: { canonical: "/network-infrastructure" },
};

export default function Page() {
  return (
    <ServicePage
      path="/network-infrastructure"
      schemaName="Commercial network cabling and infrastructure"
      eyebrow="Network infrastructure"
      title={<>The foundation every other system <span className="text-signal">depends on.</span></>}
      intro="Structured cabling, rack builds, and network infrastructure for commercial properties, built clean, labeled, and ready to support."
      blocks={[
        { id: "cabling", title: "Structured cabling", lead: "Organized, documented cabling plants for offices, retail, and multifamily properties.", points: ["Commercial network cabling installation", "Installation, repair, and re-work", "Labeling and documentation"] },
        { id: "racks", title: "Rack builds & infrastructure", lead: "Equipment rooms and racks assembled for serviceability, not just for day one.", points: ["Rack build and cleanup", "Network infrastructure installation", "Power and connectivity planning"] },
        { id: "voip-pos", title: "VoIP & POS technology", lead: "Voice and point-of-sale systems that ride on a network built for them.", points: ["VoIP phone systems", "POS technology", "Telecommunications repair"] },
      ]}
      whyTitle="A tidy network is a serviceable network."
      why={[
        "Cameras, access control, phones, and Wi-Fi all share one backbone. Building it well once saves repeated service calls.",
        "Documented cabling and racks mean any technician can pick up where the last one stopped.",
      ]}
      related={[
        { href: "/managed-services", label: "Managed services" },
        { href: "/security-access-control", label: "Security & access control" },
        { href: "/av-smart-buildings", label: "AV & smart buildings" },
      ]}
    />
  );
}
