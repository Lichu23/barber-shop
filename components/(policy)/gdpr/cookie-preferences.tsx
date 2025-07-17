'use client';

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import { cookieCategories, CookiePreferences, gdprTexts } from "@/constants/gdpr"

interface CookiePreferencesProps {
  onSave: (preferences: CookiePreferences) => void
  onBack: () => void
}

export default function CookiePreferencesComponent({ onSave, onBack }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const initial: CookiePreferences = {
      necessary: true, 
    };
    cookieCategories.forEach((category) => {
      initial[category.id] = category.required; 
    });
    return initial;
  });

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Personalizar Cookies</h3>
        <Button variant="ghost" onClick={onBack} className="text-pink-600 hover:text-pink-700">
          ← Volver
        </Button>
      </div>

      {cookieCategories.map((category) => (
        <Card key={category.id} className="border-pink-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-gray-800">{category.name}</CardTitle>
              <Switch
                checked={preferences[category.id]}
                onCheckedChange={(checked) => {
                  if (!category.required) {
                    setPreferences((prev) => ({
                      ...prev,
                      [category.id]: checked,
                    }));
                  }
                }}
                disabled={category.required}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-600">{category.description}</p>
            {category.required && <p className="text-xs text-gray-500 mt-1 italic">* Siempre activas</p>}
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-3 pt-4">
        <Button onClick={handleSave} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
          {gdprTexts.save}
        </Button>
      </div>
    </div>
  );
}