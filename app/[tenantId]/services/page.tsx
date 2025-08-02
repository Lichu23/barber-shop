
import Services from "@/components/Services/Services";
import {
  getTenantProfileById,
  getTenantServices,
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import { notFound } from "next/navigation";



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


export default async function TenantServicesPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = await params;

  const { data: allServices, error: servicesError } =
    await getTenantServices(tenantId);
  const { data: tenantProfile, error: profileError } =
    await getTenantProfileById(tenantId);



  if (servicesError || !allServices || profileError || !tenantProfile) {
    console.error(
      `Error al cargar servicios o perfil para tenant ${tenantId}:`,
      servicesError || profileError
    );
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Nuestros Servicios
          </h1>
          {tenantProfile.hero_description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {tenantProfile.hero_description}
            </p>
          )}
        </div>

        <Services tenantId={tenantId} services={allServices} />
      </div>
    </div>
  );
}
