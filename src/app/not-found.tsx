import { PageHero } from "@/components/PageHero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero eyebrow="404" title="That page isn’t here." cta={{ href: "/", label: "Back to home" }}>
          The page you were looking for doesn&rsquo;t exist or has moved.
        </PageHero>
      </main>
      <Footer />
    </>
  );
}
