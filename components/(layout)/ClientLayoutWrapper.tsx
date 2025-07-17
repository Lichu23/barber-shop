'use client'; 

import { useState, useEffect, Suspense } from 'react';
import { Toaster } from 'sonner'; 
import LoadingFemenino from '../ui/LoadingFemenino';
import GDPRBanner from '../(policy)/gdpr/GDPRBanner';
import CookieConsentManager from '../(policy)/CookieConsentManager';

const GDPR_STORAGE_KEY = "gdpr-consent";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  isFemaleSalon: boolean; // Pasa esta prop desde RootLayout si la usas
}

export default function ClientLayoutWrapper({ children, isFemaleSalon }: ClientLayoutWrapperProps) {
  const [hasConsentBeenSet, setHasConsentBeenSet] = useState(false);

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
      {/* Implementación del "Cookie Wall" */}
      {hasConsentBeenSet ? (
        <Suspense // Suspense ahora envuelve el children aquí
          fallback={
            isFemaleSalon ? <LoadingFemenino /> : <div>Cargando...</div>
          }
        >
          {children}
          <Toaster richColors /> {/* Toaster va aquí */}
        </Suspense>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-700">
            Cargando preferencias de privacidad...
          </p>
        </div>
      )}

      {/* Estos componentes se renderizan siempre, fuera del cookie wall, para asegurar su funcionamiento */}
      <GDPRBanner />
      <CookieConsentManager />
    </>
  );
}