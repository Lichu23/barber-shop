"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Gallery from "./components/gallery/gallery";
import Hero from "./components/hero/hero";
import Services from "./components/servicesView/services";
import { toast } from "sonner";

function SearchParamsHandler() {
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

      // Usar setTimeout con 0ms para asegurar que la navegación ocurre después
      // de que React termine el render y el toast se muestre.
      setTimeout(() => {
        router.replace(`/?${newSearchParams.toString()}`);
      }, 0);
    }
  }, [searchParams, router]); // Dependencias del useEffect

  return null; // Este componente no renderiza nada visible en la UI
}

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
    <main className="w-full flex flex-col gap-12 lg:gap-28">
      <Hero />
      <Gallery />
      <Services />
      <Suspense fallback={null}> 
        <SearchParamsHandler />
      </Suspense>
    </main>
  );
}
