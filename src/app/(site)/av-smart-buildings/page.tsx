import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Audio / Video, Smart Building & Low-Voltage Systems",
  description:
    "Commercial audio/video integration, smart-building and smart-home systems, energy management, and low-voltage work from RNA Tek in New Jersey and Florida.",
  alternates: { canonical: "/av-smart-buildings" },
};

export default function Page() {
  return (
    <ServicePage
      path="/av-smart-buildings"
      schemaName="Audio/video integration and smart building systems"
      eyebrow="Audio / video & smart buildings"
      title={<>Spaces that are easier to <span className="text-signal">use and manage.</span></>}
      intro="Audio/video integration, smart systems, and low-voltage work coordinated with the network and security systems around them."
      blocks={[
        { id: "audio-video", title: "Audio / video integration", lead: "AV for conference rooms, common areas, and commercial spaces.", points: ["AV integration", "Home theater", "Installation and repair"] },
        { id: "smart-systems", title: "Smart-home & smart-building systems", lead: "Connected systems installed on a proper network foundation.", points: ["Smart-home systems", "Energy management", "EMS upgrades"] },
        { id: "low-voltage", title: "Low-voltage & electrical systems", lead: "Low-voltage work for the systems that run a building.", points: ["Low-voltage systems", "Electrical support for technology systems", "Coordination with cabling and security"] },
      ]}
      whyTitle="Fewer trades to coordinate."
      why={[
        "AV and smart systems are only as reliable as the network and power behind them. We handle both.",
        "One team across disciplines means fewer schedules to manage on your end.",
      ]}
      related={[
        { href: "/network-infrastructure", label: "Network infrastructure" },
        { href: "/security-access-control", label: "Security & access control" },
        { href: "/contact", label: "Request a quote" },
      ]}
    />
  );
}
