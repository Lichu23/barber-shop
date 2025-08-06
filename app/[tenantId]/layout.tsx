import ClientLayoutWrapper from "@/components/(layout)/ClientLayoutWrapper";
import Footer from "@/components/footer/MainFooter";
import Navbar from "@/components/header-main/Header";
import { NavigationLink } from "@/constants/navigation";
import { getTenantProfileById } from "@/lib/services/tenantServices";
import { notFound } from "next/navigation";

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantId: string };
}) {
  const { tenantId } = await params;

  const { data: tenantProfile, error: profileError } =
    await getTenantProfileById(tenantId);

  if (profileError || !tenantProfile) {
    notFound();
  }

  const navLinks: NavigationLink[] = [
    { href: `/${tenantId}`, label: "Inicio" },
    // { href: `/${tenantId}/gallery`, label: "Galería" },
    { href: `/${tenantId}/services`, label: "Servicios" }, // Enlace a la página de servicios
    { href: `/${tenantId}/select-services`, label: "Reservar" }, // Enlace a la página de reserva
  ];

  const footerData = {
    salonName: tenantProfile.salon_name,
    tenantId: tenantId,
    contactPhone: tenantProfile.contact_phone,
    contactAddress: tenantProfile.contact_address,
    openingHoursSummary: tenantProfile.opening_hours_summary,
    openingHoursDetail: tenantProfile.opening_hours_detail,
    contactEmailForUsers: tenantProfile.contact_email_for_users,
    socialInstagramUrl: tenantProfile.social_instagram_url,
    socialFacebookUrl: tenantProfile.social_facebook_url,
    socialTiktokUrl: tenantProfile.social_tiktok_url,
    socialTwitterUrl: tenantProfile.social_twitter_url,
  };

  return (
    <>
      <Navbar
        salonName={tenantProfile.salon_name}
        tenantId={tenantId}
        navLinks={navLinks}
      />{" "}
      <ClientLayoutWrapper tenantProfile={tenantProfile}>
        {children}
      </ClientLayoutWrapper>
      <Footer {...footerData} />
    </>
  );
}
