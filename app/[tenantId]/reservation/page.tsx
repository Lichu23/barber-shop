import {
  getAdminSettingsByTenantId,
  getTenantProfileById,
  getTenantServices,
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReservationForm from "./components/Form/ReservationForm";

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

export default async function ReservationPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = await params;

  const { data: allServices, error: servicesError } =
    await getTenantServices(tenantId);
  const { data: tenantProfile, error: profileError } =
    await getAdminSettingsByTenantId(tenantId);

  if (servicesError || !allServices || profileError || !tenantProfile) {
    console.error(
      `Error al cargar servicios o perfil para tenant ${tenantId}:`,
      servicesError || profileError
    );
    notFound();
  }


 
  return (
    <div className="h-[calc(100dvh-5rem)] w-full py-0 lg:py-14 lg:flex lg:items-center lg:justify-center">
      <ReservationForm tenantId={tenantId} allServices={allServices}/>
    </div>
  );
}
