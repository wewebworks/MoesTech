import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company, SITE_URL } from "@/lib/site";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  legalName: company.legalName,
  url: SITE_URL,
  telephone: company.phone,
  email: company.email,
  logo: `${SITE_URL}/brand/logo-color.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.nj.street,
    addressLocality: company.nj.city,
    addressRegion: company.nj.region,
    postalCode: company.nj.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "22:00",
  },
  areaServed: [{ "@type": "State", name: "New Jersey" }, { "@type": "State", name: "Florida" }],
  sameAs: Object.values(company.social),
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
