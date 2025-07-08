import Gallery from "./components/gallery/gallery";
import GDPRBanner from "./components/gdpr/gdpr-banner";
import Hero from "./components/hero/hero";
import Services from "./components/servicesView/services";


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
