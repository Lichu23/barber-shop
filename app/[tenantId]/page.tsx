import {
  getTenantGalleryItems,
  getTenantProfileById,
  getTenantServices,
} from "@/lib/services/tenantServices";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "./components/gallery/gallery";
import Hero from "./components/hero/hero";
import Services from "@/components/Services/Services";
import SeeMoreButton from "@/components/Services/SeeMoreButton";
import { getPlaiceholder } from "plaiceholder";
export async function generateMetadata({
  params,
}: {
  params: { tenantId: string };
}): Promise<Metadata> {
  const { tenantId } = await params;
  const { data: tenantProfile } = await getTenantProfileById(tenantId);
  if (!tenantProfile) {
    return {
      title: "Salón no encontrado",
      description: "Página de salón no disponible",
    };
  }

  return {
    title: tenantProfile.salon_name || `Salón ${tenantId}`,
    description:
      tenantProfile.hero_description || `Página de ${tenantProfile.salon_name}`,
  };
}

async function processImageData(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64; // Esta es tu blurDataURL
  } catch (err) {
    console.error("Error procesando la imagen para el placeholder:", err);
    return undefined; // Retorna undefined si falla
  }
}

export default async function HomeTenantPage({
  params,
}: {
  params: { tenantId: string };
}) {
  const { tenantId } = await params;

  const { data: tenantProfile, error: profileError } =
    await getTenantProfileById(tenantId);
  const { data: galleryItems, error: galleryError } =
    await getTenantGalleryItems(tenantId);
  const { data: allServices, error: servicesError } =
    await getTenantServices(tenantId);
  console.log(servicesError)
  if (!tenantProfile) {
    notFound();
  }

  const imageUrl = tenantProfile.hero_image_url;

  const blurDataURL = await processImageData(imageUrl!);

  const featuredServices =
    allServices?.filter(
      (service) => service.category === "Servicios Destacados"
    ) || [];

  const heroData = {
    tenantId: tenantId,
    salonName: tenantProfile.salon_name || `Salón ${tenantId}`, // Este ya lo tenías bien
    slogan: tenantProfile.hero_slogan || "Tu belleza, nuestra pasión.", // <-- Añadir fallback
    description:
      tenantProfile.hero_description ||
      "Peluquería de confianza, creando looks únicos y cuidando tu belleza natural.", // <-- Añadir fallback
    imageUrl: tenantProfile.hero_image_url || "", // <-- Añadir fallback
    contactPhone: tenantProfile.contact_phone || "", // <-- Añadir fallback (cadena vacía o valor por defecto)
    contactAddress: tenantProfile.contact_address || "", // <-- Añadir fallback
    openingHoursSummary: tenantProfile.opening_hours_summary || "", // <-- Añadir fallback
    openingHoursDetail: tenantProfile.opening_hours_detail || "", // <-- Añadir fallback
    contactEmailForUsers: tenantProfile.contact_email_for_users || "", // <-- Añadir fallback
    blurDataURL: blurDataURL || ""
  };

  return (
    <main className="w-full flex flex-col gap-12 lg:gap-28">
      <Hero {...heroData} />
      {galleryItems && galleryItems.length > 0 && (
        <Gallery haircuts={galleryItems} />
      )}

      {featuredServices && featuredServices.length > 0 && (
        <div className="flex flex-col gap-2">
          <Services showSeeMoreButton={true} services={featuredServices} tenantId={tenantId} />
        </div>
      )}
    </main>
  );
}
