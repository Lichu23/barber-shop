"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SetupCalendarPageProps {
  params: {
    tenantId: string;
  };
}

export default function SetupCalendarPage({
  params,
}: SetupCalendarPageProps) {
  const { tenantId } =   params;
  const searchParams = useSearchParams();
  const ownerSecretKey: string | null = searchParams.get("key"); // Clave que viene en la URL inicial

  // Parámetros que vienen de la redirección del callback de Google
  const statusParam = searchParams.get("status");
  const detailsParam = searchParams.get("details");

  // Estados para controlar el mensaje y la interfaz
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (statusParam === "google_connected_success") {
      setMessage(
        "¡Google Calendar conectado exitosamente! Tu calendario principal ha sido vinculado."
      );
      setIsError(false);
    } else if (
      statusParam === "auth_failed" ||
      statusParam === "no_refresh_token" ||
      statusParam === "db_save_failed"
    ) {
      setMessage(
        `Fallo en la conexión de Google Calendar: ${decodeURIComponent(detailsParam || "Error desconocido.").replace("Error: ", "")}. Por favor, inténtalo de nuevo.`
      );
      setIsError(true);
      // Mostrar el botón para reintentar
    } else {
      // Estado inicial de la página
      if (!ownerSecretKey) {
        setMessage(
          "Error: Falta la clave de propietario (key) en la URL. Asegúrate de usar la URL completa proporcionada por el script de generación de claves."
        );
        setIsError(true);
      } else {
        setMessage(
          "Haz clic en el botón para iniciar la conexión con Google Calendar."
        );
        setIsError(false);
      }
    }
  }, [statusParam, detailsParam, ownerSecretKey]);

  let title = "Configurar Google Calendar";
  let textColorClass = "text-gray-700";
  let bgColorClass = "bg-white";
  let icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-blue-500 mx-auto mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  if (statusParam === "google_connected_success") {
    title = "¡Conexión Exitosa!";
    textColorClass = "text-green-700";
    bgColorClass = "bg-green-50";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-green-500 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  } else if (isError) {
    textColorClass = "text-red-700";
    bgColorClass = "bg-red-50";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-500 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  const handleConnectGoogle = async () => {
    if (!ownerSecretKey || !tenantId) {
      setErrorMessage(
        "Faltan datos esenciales (clave de propietario o ID de salón) para iniciar la conexión."
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/auth/google-auth-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tenantId, ownerSecretKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            "Error al obtener la URL de autenticación de Google."
        );
      }

      const { authUrl } = await response.json();
      window.location.href = authUrl; // Redirige al usuario a Google
    } catch (error: any) {
      console.error("Error al conectar Google Calendar:", error);
      setErrorMessage(
        error.message || "Error desconocido al conectar Google Calendar."
      );
      setIsLoading(false);
    }
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${bgColorClass}`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-lg shadow-lg text-center ${textColorClass} border border-gray-200`}
      >
        {icon}
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{message}</p>

        {(!statusParam ||
          (isError && statusParam !== "google_connected_success")) &&
        ownerSecretKey &&
        tenantId ? (
          <Button
            onClick={handleConnectGoogle}
            disabled={isLoading || !ownerSecretKey || !tenantId}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              "Conectar Google Calendar"
            )}
          </Button>
        ) : (
          statusParam === "google_connected_success" && (
            <p className="mt-6 text-gray-600">
              Conexión exitosa. Puedes cerrar esta ventana.
            </p>
          )
        )}

       
      </div>
    </div>
  );
}
