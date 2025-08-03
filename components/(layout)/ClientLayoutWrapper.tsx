"use client";

import { TenantProfile } from "@/lib/services/tenantServices";
import { Suspense, useEffect, useState } from "react";
import { Toaster } from "sonner";
import CookieConsentManager from "../(policy)/CookieConsentManager";
import GDPRBanner from "../(policy)/gdpr/GDPRBanner";
import Loading from "../ui/Loading";

const GDPR_STORAGE_KEY = "gdpr-consent";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  isFemaleSalon?: boolean;
  tenantProfile: TenantProfile;
}

export default function ClientLayoutWrapper({
  children,
  isFemaleSalon,
  tenantProfile,
}: ClientLayoutWrapperProps) {
  const [hasConsentBeenSet, setHasConsentBeenSet] = useState(false);

  useEffect(() => {
    if (tenantProfile) {
      const root = document.documentElement;

      if (tenantProfile.color_primary)
        root.style.setProperty("--primary", tenantProfile.color_primary);
      if (tenantProfile.color_secondary)
        root.style.setProperty("--secondary", tenantProfile.color_secondary);
      if (tenantProfile.color_accent)
        root.style.setProperty("--accent", tenantProfile.color_accent);
      if (tenantProfile.color_text_dark)
        root.style.setProperty("--foreground", tenantProfile.color_text_dark); // Mapea a --foreground si usas text-foreground
      if (tenantProfile.color_text_light)
        root.style.setProperty("--background", tenantProfile.color_text_light); // Mapea a --background si usas text-background o similar
    }
  }, [tenantProfile]);

  useEffect(() => {
    const consent = localStorage.getItem(GDPR_STORAGE_KEY);
    if (consent) {
      setHasConsentBeenSet(true);
    } else {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === GDPR_STORAGE_KEY && event.newValue) {
          setHasConsentBeenSet(true);
          window.removeEventListener("storage", handleStorageChange);
        }
      };
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  return (
    <>
      {hasConsentBeenSet ? (
        <Suspense fallback={<Loading />}>
          {children}
          <Toaster richColors />
        </Suspense>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-700 font-bold">
            Cargando preferencias de privacidad...
          </p>
        </div>
      )}

      <GDPRBanner />
      <CookieConsentManager />
    </>
  );
}
