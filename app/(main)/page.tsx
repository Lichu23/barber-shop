"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Gallery from "./components/gallery/gallery";
import GDPRBanner from "./components/gdpr/gdpr-banner";
import Hero from "./components/hero/hero";
import Services from "./components/servicesView/services";
import { toast } from "sonner";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Check if the 'cancelSuccess' query parameter is present
    if (searchParams.get("cancelSuccess") === "true") {
      toast.success("¡Éxito!", {
        description: "La cita ha sido eliminada correctamente.",
        duration: 3000,
      });

      // To prevent the toast from reappearing if the user refreshes the page,
      // remove the query parameter from the URL.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("cancelSuccess");
      router.replace(`/?${newSearchParams.toString()}`); // Use router.replace to update URL without adding to history
    }
  }, [searchParams, router]); // Depend on searchParams and router

  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <Services />
      <GDPRBanner />
    </main>
  );
}
