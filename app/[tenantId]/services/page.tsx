import {
  getTenantProfileById
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import ServicesComponent from "./ServicesComponent";

export async function generateMetadata({
  params,
}: {
  params: { tenantId: string };
}): Promise<Metadata> {
  const { tenantId } = await params;
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

export default function ServicesPage({
  params,
}: {
  params: { tenantId: string };
}) {
  return <ServicesComponent tenantId={params.tenantId} />;
}
