import Gallery from "@/app/(home)/components/gallery/gallery";
import GDPRBanner from "@/app/(home)/components/gdpr/gdpr-banner";
import Hero from "@/app/(home)/components/hero/hero";
import Services from "@/app/(home)/components/servicesView/services";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <Services />
      <GDPRBanner />
    </main>
  );
}
