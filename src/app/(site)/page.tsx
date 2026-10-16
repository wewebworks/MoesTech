import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BuildingArt } from "@/components/BuildingArt";
import { ServiceCards } from "@/components/ServiceCards";
import { PortalDemo } from "@/components/portal/PortalDemo";
import { CtaBand } from "@/components/CtaBand";
import { ManagedSection, PortalTeaser, ProcessSection, ProjectsPreview, PropertySection, TrustStrip, WhySection } from "@/components/home/Sections";

export const metadata: Metadata = {
  title: { absolute: "Managed IT & Security Systems for Commercial Properties | MoeTech" },
  description:
    "Managed IT, CCTV, access control, intercom, and network cabling for commercial properties and multifamily communities. One partner to install, service, and support.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hex-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="slash pointer-events-none absolute bottom-0 right-0 h-28 w-[70%] bg-white/[0.07] md:h-40" aria-hidden="true" />
        <div className="slash pointer-events-none absolute bottom-0 right-0 h-10 w-[55%] bg-white md:h-14" aria-hidden="true" />
        <div className="container-x grid items-center gap-8 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-7 flex items-center gap-3 text-signal"><span className="h-0.5 w-8 bg-signal" aria-hidden="true" />Built to be understood.</p>
            <h1 className="text-[2.8rem] font-semibold leading-[0.96] sm:text-6xl xl:text-[5.2rem]">
              Technology That Works.{" "}
              <span className="font-normal text-white/50">Service You Can Count On.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Integrated security, networking, and managed technology services for commercial properties, multifamily communities, and growing businesses.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/managed-services">Explore Managed Services</Button>
              <Button href="/contact" variant="ghost">Request a Consultation</Button>
            </div>
            <p className="eyebrow mt-12 text-white/45">Concept demonstration · Sample data</p>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <BuildingArt className="h-auto w-full" />
          </div>
        </div>
      </section>

      <TrustStrip />
      <ManagedSection />
      <PropertySection />

      <section className="bg-white py-24 md:py-32" id="services">
        <div className="container-x">
          <SectionHeading eyebrow="Core services" title="Every system on the property, under one roof.">
            Each discipline stands on its own, and works better because the same team handles the rest.
          </SectionHeading>
          <div className="mt-14"><ServiceCards /></div>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-32" id="portal">
        <div className="container-x">
          <PortalTeaser />
          <PortalDemo />
        </div>
      </section>

      <ProcessSection />
      <ProjectsPreview />
      <WhySection />
      <CtaBand />
    </>
  );
}
