import ClientsSection from "@/components/(home-global)/client-section/ClientsSection";
import Hero from "@/components/(home-global)/hero-global/Hero";
import HowItWorks from "@/components/(home-global)/how-it-works/HowItWorks";
import React from "react";

export default function LichuOrgPage() {
  return (
    <div>
      <Hero />
      <ClientsSection />
      <HowItWorks />
    </div>
  );
}
