'use client';

import { CookiePreferences } from '@/constants/gdpr';
import { useEffect } from 'react';

const GDPR_STORAGE_KEY = "gdpr-consent";

// No necesitamos declaraciones globales para gtag, dataLayer, fbq, etc.,
// ya que no vamos a inyectar esos scripts ni usarlos.

export default function CookieConsentManager() {
  useEffect(() => {
    // Función para leer el consentimiento y aplicar la lógica
    const applyConsent = () => {
      const consentString = localStorage.getItem(GDPR_STORAGE_KEY);
      if (consentString) {
        const { preferences }: { preferences: CookiePreferences } = JSON.parse(consentString);

        // Dado que solo existen las cookies "necesarias" y siempre son true,
        // no hay scripts no esenciales que activar o desactivar aquí.
        // Si en el futuro añadieras otras categorías (ej., "funcionales"),
        // aquí controlarías su activación.
        console.log("Consentimiento aplicado. Preferencias:", preferences);

      } else {
        // Si no hay consentimiento guardado (usuario no ha interactuado con el banner):
        // Por defecto, ningún script no esencial debe inicializarse.
        // En este caso, ya no hay scripts de analíticas/marketing que controlar.
        console.log("No hay consentimiento guardado. Solo se asumen cookies necesarias.");
      }
    };

    // Llama a applyConsent cuando el componente se monta para aplicar el consentimiento inicial
    applyConsent();

    // Escucha cambios en localStorage (si el usuario cambia las preferencias desde el banner)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === GDPR_STORAGE_KEY) {
        applyConsent(); // Re-aplica el consentimiento si el usuario lo cambia
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null; // Este componente no renderiza nada visible
}