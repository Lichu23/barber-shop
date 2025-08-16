import ClientsSection from "@/components/(home-global)/client-section/ClientsSection";
import Hero from "@/components/(home-global)/hero-global/Hero";
import HowItWorks from "@/components/(home-global)/how-it-works/HowItWorks";
import Pricing from "@/components/(home-global)/pricing-card/Pricing";

export default function LichuOrgPage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ClientsSection />
      <Pricing/>
    </div>
  );
}
