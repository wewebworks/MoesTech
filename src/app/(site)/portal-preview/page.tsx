import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PortalDemo } from "@/components/portal/PortalDemo";
import { PortalSimulator } from "@/components/portal/PortalSimulator";
import { CtaBand } from "@/components/CtaBand";
import { Pill, SectionHeading } from "@/components/ui/SectionHeading";
import { ReturnBar } from "@/components/guild/ReturnBar";

export const metadata: Metadata = {
  title: "Service Portal Preview (Concept)",
  description: "An interactive sample-data demonstration of the MoeTech service portal: property manager, dispatch, and technician views.",
  alternates: { canonical: "/portal-preview" },
};

export default function PortalPreviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Client login · Request service · Concept"
        title={<>The MoeTech service portal, <span className="text-signal">previewed.</span></>}
        cta={{ href: "#request", label: "Try a service request" }}
        secondary={{ href: "#simulation", label: "Run the full simulation" }}
      >
        The website and the customer portal are separate products that sit side by side. This page is a sample-data demonstration of the workflow. The product is about 90% complete and in beta with clients; nothing on this page is saved or sent, and there is no real sign-in.
      </PageHero>

      <section className="bg-mist py-20 md:py-28">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-center gap-3"><Pill kind="sample" /><p className="text-sm text-slate-ink">Properties, people, tickets, and statuses are fictional and for illustration only.</p></div>
          <PortalDemo showDeeperLink={false} />
        </div>
      </section>

      <section id="simulation" className="scroll-mt-20 bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Full simulation" title="One request. Three people. Zero phone tag.">
            Switch roles to see how a single service request moves between the property manager, MoeTech dispatch, and the technician on site. Each role can only take its own actions, and every step lands in a shared activity log.
          </SectionHeading>
          <div className="mt-12"><PortalSimulator /></div>

          <div className="mt-16 rounded-md border border-line bg-mist p-7 sm:p-9">
            <h2 className="text-xl font-semibold text-navy-900">Built to connect later</h2>
            <p className="mt-3 max-w-3xl text-slate-ink">
              In the beta, Monday.com is the source of truth for tickets, and QuickBooks reads from and writes to it for billing. This demonstration simulates that behavior with in-browser sample data and does not call either system.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
      <ReturnBar />
    </>
  );
}
