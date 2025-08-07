import ClientLayoutWrapper from "@/components/(layout)/ClientLayoutWrapper";
import Footer from "@/components/footer/MainFooter";
import Navbar from "@/components/header-main/Header";
import { NavigationLink } from "@/constants/navigation";
import { TenantProvider } from "@/context/TenantProvider";
import { getTenantProfileById } from "@/lib/services/tenantServices";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

const PLATFORM_DOMAINS = new Set(['lichu.org', 'www.lichu.org', 'localhost']);

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantId: string };
}) {
    const requestHeaders = await headers();
  const host = requestHeaders.get('host');
  const normalizedHost = host?.split(':')[0] || '';
  const isCustomDomain = !PLATFORM_DOMAINS.has(normalizedHost);

  const { tenantId } = await params; 

  const { data: tenantProfile, error: profileError } =
    await getTenantProfileById(tenantId);

  if (profileError || !tenantProfile) {
    notFound();
  }


   const navLinks: NavigationLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/select-services', label: 'Reservar' },
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
    <TenantProvider value={{tenantId,isCustomDomain}}>
      <Navbar
        salonName={tenantProfile.salon_name}
        tenantId={tenantId}
        navLinks={navLinks}
      />{" "}
      <ClientLayoutWrapper tenantProfile={tenantProfile}>
        {children}
      </ClientLayoutWrapper>
      <Footer {...footerData} />
    </TenantProvider>
  );
}
