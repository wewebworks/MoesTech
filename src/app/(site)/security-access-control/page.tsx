import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Commercial Security Systems, CCTV & Access Control NJ",
  description:
    "CCTV installation, access control, intercom, alarm, and automated gate systems for commercial and multifamily properties in New Jersey and Florida.",
  alternates: { canonical: "/security-access-control" },
};

export default function Page() {
  return (
    <ServicePage
      path="/security-access-control"
      schemaName="Commercial security and access control installation"
      eyebrow="Security & access control"
      title={<>Security systems that work <span className="text-signal">together.</span></>}
      intro="Video surveillance, access control, intercom, alarms, and automated gates, designed as one system and supported after installation."
      blocks={[
        { id: "video-surveillance", title: "CCTV / video surveillance", lead: "Camera systems planned around coverage, lighting, retention needs, and the network they depend on.", points: ["Commercial and multifamily CCTV installation", "Camera and recorder upgrades", "Network and power built for the cameras", "Service and repair after install"] },
        { id: "access-intercom", title: "Access control & intercom", lead: "Control who enters and when, with entry panels and intercoms that tie into the rest of the building.", points: ["Door and gate access control", "Commercial and multifamily intercom installation", "Credential and user management support", "Integration with cabling and network"] },
        { id: "alarm-gates", title: "Alarm systems & automated gates", lead: "Intrusion and perimeter systems installed and serviced by the same team as your cameras and doors.", points: ["Alarm systems", "Automated gate installation and service", "Coordination with access control"] },
      ]}
      whyTitle="Security fails at the seams."
      why={[
        "Cameras need a stable network. Doors need power and cabling. Intercoms need all of it. Handling the disciplines together removes the gaps.",
        "A single service contact means a camera outage doesn’t become a three-vendor investigation.",
      ]}
      related={[
        { href: "/network-infrastructure", label: "Network infrastructure" },
        { href: "/managed-services", label: "Managed services" },
        { href: "/property-management", label: "Property management" },
      ]}
    />
  );
}
