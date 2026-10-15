import type { Metadata, Viewport } from "next";
import { Manrope, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const sora = Bricolage_Grotesque({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RNA Tek | Managed Technology Services for Commercial Properties in NJ & FL",
    template: "%s | RNA Tek",
  },
  description:
    "RNA Tek installs, services, and supports security, access control, networking, and managed IT for commercial properties, multifamily communities, and multi-location businesses in New Jersey and Florida.",
  openGraph: {
    type: "website",
    siteName: "RNA Tek",
    locale: "en_US",
    title: "RNA Tek — Your Technology. Our Responsibility.",
    description:
      "One partner for security, networking, and managed technology services across your properties.",
  },
  twitter: { card: "summary_large_image" },
  // Demo build: keep out of search indexes until the client approves a launch.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
