"use client";

import Services from "@/components/Services/Services";
import { ServiceOption } from "@/constants/services";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  tenantId: string;
}

interface ServicesApiResponse {
  services: ServiceOption[];
}

const ServicesComponent = ({ tenantId }: Props) => {
  const [allServices, setAllServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServicesData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/${tenantId}/tenant-data/services`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al cargar los datos.");
        }
        
        // Obtener los datos y asegurarnos de que coincida con el tipo de la API
        const data: ServicesApiResponse = await response.json();
        setAllServices(data.services || []);
      } catch (err: any) {
        console.error("Error fetching services data:", err);
        setError(err.message || "No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    }

    if (tenantId) {
      fetchServicesData();
    }
  }, [tenantId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-gray-700">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          </p>
        </div>
        <Services services={allServices} />
      </div>
    </div>
  );
};

export default ServicesComponent;