import type { Metadata } from "next";
import { Presenter } from "@/components/guild/Presenter";

export const metadata: Metadata = { title: { absolute: "AI Guild · Presenter view" }, robots: { index: false, follow: false } };

export default function PresenterPage() {
  return <Presenter />;
}
