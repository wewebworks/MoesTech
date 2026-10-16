// MoeTech is a fictional company used to demonstrate end-to-end workflow design.
// Everything here is placeholder content; no real people, addresses, or phone numbers.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moes-tech.vercel.app";

export const company = {
  name: "MoeTech",
  legalName: "MoeTech",
  tagline: "Built to be understood",
  // Placeholder address on a reserved domain. No mailbox exists.
  email: "hello@moetech.example",
} as const;

export const nav = {
  services: [
    { href: "/security-access-control", label: "Security & Access Control", blurb: "CCTV, access, intercom, alarms, gates" },
    { href: "/network-infrastructure", label: "Network Infrastructure", blurb: "Cabling, racks, wireless, VoIP" },
    { href: "/av-smart-buildings", label: "Audio / Video & Smart Buildings", blurb: "AV, smart systems, energy" },
  ],
  primary: [
    { href: "/managed-services", label: "Managed Services" },
    { href: "/property-management", label: "Property Management" },
  ],
  secondary: [
    { href: "/projects", label: "Our Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export const allServices = [
  "CCTV", "Access Control", "Intercom", "Alarm Systems", "Automated Gates", "Structured Cabling",
  "Network Infrastructure", "Rack Builds", "POS Technology", "Smart Homes", "AV Integration",
  "Managed IT (MSP)", "VoIP", "Energy Management", "Low-Voltage Systems",
];

export const coreServices = [
  { href: "/security-access-control#video-surveillance", icon: "cctv", title: "CCTV / Video Surveillance", text: "Camera systems designed around how your property actually operates — and serviced after the install." },
  { href: "/security-access-control#access-intercom", icon: "key", title: "Access Control & Intercom", text: "Doors, gates, entry panels and intercoms that work together instead of as separate vendor islands." },
  { href: "/managed-services#managed-it", icon: "server", title: "Managed IT & VoIP", text: "Day-to-day IT support and business phone systems from the same team that builds the infrastructure." },
  { href: "/network-infrastructure", icon: "network", title: "Network Infrastructure", text: "Structured cabling, rack builds and network foundations for every system on the property." },
  { href: "/av-smart-buildings#audio-video", icon: "speaker", title: "Audio / Video", text: "Conference rooms, common areas and commercial AV integrated with the rest of the building." },
  { href: "/av-smart-buildings#low-voltage", icon: "zap", title: "Low-Voltage Systems", text: "Low-voltage, smart-building and energy-management work, coordinated under one roof." },
] as const;
