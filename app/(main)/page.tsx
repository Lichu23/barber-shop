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
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("cancelSuccess") === "true") {
      toast.success("¡Éxito!", {
        description: "La cita ha sido eliminada correctamente.",
        duration: 3000,
      });

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("cancelSuccess");

      setTimeout(() => {
        //evitar un conflicto
        router.replace(`/?${newSearchParams.toString()}`);
      }, 0);
    }
  }, [searchParams, router]);
  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery />
      <Services />
      <GDPRBanner />
    </main>
  );
}
