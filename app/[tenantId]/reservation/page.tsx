import {
  getAdminSettingsByTenantId,
  getTenantProfileById,
  getTenantServices,
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReservationForm from "./components/Form/ReservationForm";
import { ServiceOption } from "@/constants/services";



export async function generateMetadata({
  params,
}: {
  params: { tenantId: string };
}): Promise<Metadata> {
  const { tenantId } = await params;
  const { data: tenantProfile } = await getTenantProfileById(tenantId);

  if (!tenantProfile) {
    return {
      title: "Reserva no disponible",
      description: "Página de reserva no encontrada.",
    };
  }

  return {
    title: `Reserva en ${tenantProfile.salon_name}`,
    description: `Sistema de reservas online para ${tenantProfile.salon_name}.`,
  };
}

interface PageProps {
  params: { tenantId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ReservationPage({ params, searchParams }: PageProps) {
  const { tenantId } = await params; 
  const searchParamsAwait = await searchParams
  const selectedServiceValuesString = searchParamsAwait.services as string || "";

  // console.log(`[PAGE] Parámetros recibidos:`, { params, searchParams });

  const { data: allServices, error: servicesError } =
    await getTenantServices(tenantId);

  if (servicesError || !allServices) {
    console.error(`Error al cargar servicios para tenant ${tenantId}:`, servicesError);
    notFound();
  }

  let preselectedServices: ServiceOption[] = [];
  if (selectedServiceValuesString) {
    const selectedValuesArray = selectedServiceValuesString.split(",");
    preselectedServices = selectedValuesArray
      .map((value) => allServices.find((service) => service.value === value))
      .filter((service): service is ServiceOption => service !== undefined);
  }

  return (
    <div className="h-[calc(100dvh-5rem)] w-full py-0 lg:py-14 lg:flex lg:items-center lg:justify-center">
      <ReservationForm
        allServices={allServices}
        preselectedServices={preselectedServices}
      />
    </div>
  );
}
