import {
  getTenantProfileById,
  getTenantServices,
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import ServicesComponent from "./ServicesComponent";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { tenantId: string };
}): Promise<Metadata> {
  const { tenantId } = params;
  const { data: tenantProfile } = await getTenantProfileById(tenantId);

  if (!tenantProfile) {
    return {
      title: "Servicios no encontrados",
      description: "Página de servicios no disponible",
    };
  }

  return {
    title: `Servicios de ${tenantProfile.salon_name}`,
    description: `Descubre todos los servicios ofrecidos por ${tenantProfile.salon_name}.`,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = params;

  const [servicesRes, profileRes] = await Promise.all([
    getTenantServices(tenantId),
    getTenantProfileById(tenantId),
  ]);

  const { data: allServices, error: servicesError } = servicesRes;
  const { data: tenantProfile, error: profileError } = profileRes;

  if (servicesError || !allServices || profileError || !tenantProfile) {
    console.error(
      `Error al cargar servicios o perfil para tenant ${tenantId}:`,
      servicesError || profileError
    );
    notFound();
  }

  if (servicesError) {
    console.error(
      `Error cargando servicios para tenant ${tenantId}:`,
      servicesError
    );
  }

  return (
    <ServicesComponent
      allServices={allServices}
      tenantProfile={tenantProfile}
    />
  );
}
