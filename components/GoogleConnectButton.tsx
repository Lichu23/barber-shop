"use client";

import { Button } from "@/components/ui/button"; // Ejemplo con shadcn/ui
import { useState } from "react";
interface GoogleConnectButtonProps {
  ownerSecretKey: string;
}

export default function GoogleConnectButton({
  ownerSecretKey,
}: GoogleConnectButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!ownerSecretKey) {
      // Validación adicional en el cliente
      setError(
        "Falta la clave de propietario para iniciar la conexión. Por favor, asegúrate de usar la URL completa."
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/google-auth-url?key=${encodeURIComponent(ownerSecretKey)}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la URL de autenticación.");
      }
      const data = await response.json();
      window.location.href = data.authUrl; // Redirige al usuario a Google
    } catch (err: any) {
      console.error("Error al iniciar la conexión con Google:", err);
      setError(err.message || "Error desconocido al iniciar la conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleConnect} disabled={loading}>
        {loading ? "Conectando..." : "Conectar Google Calendar"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
