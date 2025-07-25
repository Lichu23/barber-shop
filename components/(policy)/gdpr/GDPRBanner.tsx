'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Shield, ExternalLink } from "lucide-react";
import { gdprTexts } from "@/constants/gdpr";
import CookiePreferencesComponent from "./cookie-preferences";
import type { CookiePreferences } from "@/constants/gdpr";

const GDPR_STORAGE_KEY = "gdpr-consent";

export default function GDPRBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(GDPR_STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => { // Este botón ahora significará "Aceptar solo necesarias"
    const necessaryAccepted: CookiePreferences = {
      necessary: true,
      // Analíticas y marketing no se incluyen si se eliminaron de las constantes
    };
    saveConsent(necessaryAccepted);
  };

  const handleRejectAll = () => { // Este botón también significará "Aceptar solo necesarias"
    handleAcceptNecessary(); // Reutiliza la lógica
  };

  const handleAcceptNecessary = () => { // Función explícita para aceptar solo necesarias
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      // Analíticas y marketing en false o no incluidas si se eliminaron
    };
    saveConsent(onlyNecessary);
  };

  const handleCustomize = () => {
    setShowPreferences(true);
  };

  const handleSavePreferences = (preferences: CookiePreferences) => {
    saveConsent(preferences);
  };

  const saveConsent = (preferences: CookiePreferences) => {
    localStorage.setItem(
      GDPR_STORAGE_KEY,
      JSON.stringify({
        preferences,
        timestamp: new Date().toISOString(),
      }),
    );
    setIsVisible(false);
    setShowPreferences(false);

    // Dispara el evento 'storage' para notificar al CookieConsentManager
    const storageEvent = new StorageEvent('storage', {
      key: GDPR_STORAGE_KEY,
      newValue: JSON.stringify({ preferences, timestamp: new Date().toISOString() }),
      oldValue: localStorage.getItem(GDPR_STORAGE_KEY),
      url: window.location.href,
      storageArea: localStorage,
    });
    window.dispatchEvent(storageEvent);

    console.log("GDPR Consent saved:", preferences);
  };

  const handleClose = () => {
    // Trata el cierre como "Aceptar solo necesarias"
    handleAcceptNecessary();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-pink-200 animate-in slide-in-from-bottom-4 duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{gdprTexts.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 -mt-1 -mr-1"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {!showPreferences ? (
            <>
              <p className="text-gray-600 mb-6 leading-relaxed">{gdprTexts.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button onClick={handleAcceptNecessary} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                  {gdprTexts.acceptAll} {/* Ahora significa 'Aceptar necesarias' */}
                </Button>
                <Button
                  onClick={handleCustomize}
                  variant="outline"
                  className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                >
                  {gdprTexts.customize}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <a href="/privacy-policy" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                  {gdprTexts.privacyPolicy}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a href="/terms-of-service" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                  {gdprTexts.termsOfService}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </>
          ) : (
            <CookiePreferencesComponent onSave={handleSavePreferences} onBack={() => setShowPreferences(false)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}