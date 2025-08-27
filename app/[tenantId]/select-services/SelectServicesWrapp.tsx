"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceOption } from "@/constants/services";
import { useTenant } from "@/context/TenantProvider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  tenantId: string;
}

export default function SelectServicesWrapp({ tenantId }: Props) {
  const router = useRouter();
  const { isCustomDomain } = useTenant();

  const [allServices, setAllServices] = useState<ServiceOption[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // Solo los 'value' de los servicios
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/${tenantId}/tenant-data/services?tenantId=${tenantId}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al cargar los servicios.");
        }
        const data = await response.json();
        setAllServices(data.services || []);
      } catch (err: any) {
        console.error("Error fetching services for selection:", err);
        setError(err.message || "No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    }

    if (tenantId) {
      fetchServices();
    }
  }, [tenantId]);

  const handleServiceToggle = (serviceValue: string, isChecked: boolean) => {
    setSelectedServices((prev) =>
      isChecked
        ? [...prev, serviceValue]
        : prev.filter((val) => val !== serviceValue)
    );
  };

  const handleContinueToForm = () => {
    if (selectedServices.length === 0) {
      setError("Por favor, selecciona al menos un servicio para continuar.");
      return;
    }

    if (isRedirecting) return; // Evita clicks múltiples
    setIsRedirecting(true);

    const servicesQuery = selectedServices.join(",");
    const basePath = isCustomDomain ? "" : `/${tenantId}`;
    const reservationUrl = `${basePath}/reservation?services=${encodeURIComponent(
      servicesQuery
    )}`;

    router.push(reservationUrl);
  };

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

  const groupedServices = allServices.reduce(
    (acc, service) => {
      const categoryName = service.category || "Otros Servicios";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(service);
      return acc;
    },
    {} as { [key: string]: ServiceOption[] }
  );

  const categoryNames = Object.keys(groupedServices);

  return (
    <div className="container mx-auto lg:p-4 opacity-0 translate-y-4 animate-fade-in">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            Selecciona tus Servicios
          </CardTitle>
          <p className="text-gray-600">
            Elige los servicios que deseas reservar.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {categoryNames.map((categoryName) => (
            <div key={categoryName} className="mb-8">
              <h3 className="lg:text-2xl font-semibold text-xl mb-4">
                {categoryName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedServices[categoryName].map((service) => (
                  <div
                    key={service.value}
                    className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <Checkbox
                      id={service.value}
                      checked={selectedServices.includes(service.value)}
                      onCheckedChange={(checked: boolean) =>
                        handleServiceToggle(service.value, checked)
                      }
                      className="data-[state=checked]:bg-primary border-primary "
                    />
                    <label
                      htmlFor={service.value}
                      className="text-sm lg:text-base font-base "
                    >
                      {service.name} - {service.price}€
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          <Button
            onClick={handleContinueToForm}
            disabled={selectedServices.length === 0 || isRedirecting}
            className="w-full bg-primary hover:hover:opacity-70 font-bold py-3 text-sm lg:text-lg"
          >
              Continuar a la Reserva ({selectedServices.length} servicios)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
