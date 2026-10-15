import type { Metadata } from "next";
import { Deck } from "@/components/guild/Deck";

export const metadata: Metadata = {
  title: { absolute: "AI Guild · From Product Owner to Product Builder" },
  description: "An interactive presentation about using product experience and AI to build a working service-management prototype. Fictional data only.",
  robots: { index: false, follow: false },
};

export default function AiGuildPage() {
  return <Deck />;
}
