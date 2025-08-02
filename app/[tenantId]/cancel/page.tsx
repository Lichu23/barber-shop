"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CancelBookingPage() {
  const searchParams = useSearchParams();
  const params = useParams(); // Obtener tenantId de params
  const tenantId = params.tenantId as string;
  const token = searchParams.get("token");
  const bookingId = searchParams.get("id");

  const [statusMessage, setStatusMessage] = useState(
    "Procesando su solicitud de cancelación..."
  );
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const hasProcessedRef = useRef(false);
  useEffect(() => {
    if (token && bookingId && tenantId && !hasProcessedRef.current) {
      hasProcessedRef.current = true;
      handleCancel();
    } else if (!token || !bookingId || !tenantId) {
      setStatusMessage(
        "Enlace de cancelación inválido: faltan el token, el ID de la reserva o el ID de salón."
      );
      setIsError(true);
      setIsLoading(false);
    }
  }, [token, bookingId, tenantId]);

  const handleCancel = async () => {
    if (!token || !bookingId || !tenantId) {
      setStatusMessage("Datos de cancelación incompletos.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setShowConfirmButton(false);
    setStatusMessage('Procesando cancelación...'); 


    try {
      const response = await fetch(`/api/${tenantId}/bookings/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancellationToken: token, bookingId: bookingId }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message || '¡Reserva cancelada exitosamente!');
        setIsError(false);
      } else {
        // Manejar el caso de que el recurso ya esté eliminado (410)
        if (response.status === 410 || (data.error && data.error.includes("has been deleted"))) {
          setStatusMessage('La reserva ya ha sido cancelada o eliminada previamente.');
          setIsError(false); // No es un error de nuestra lógica, es un estado previo
        } else {
          setStatusMessage(data.error || 'Ocurrió un error al cancelar la reserva.');
          setIsError(true);
        }
      }
    } catch (error: any) {
      console.error('Error al llamar a la API de cancelación:', error);
      setStatusMessage('Ocurrió un error inesperado al cancelar la reserva.');
      setIsError(true);
    } finally {
      setIsLoading(false);
      // hasProcessed ya se marcó al inicio del useEffect con hasCanceledRef.current = true;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center ${isError ? 'border-red-500' : 'border-green-500'} border-2`}>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700">{statusMessage}</p>
          </div>
        ) : (
          <>
            {isError ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <h1 className="text-2xl font-bold mb-4">{isError ? 'Error en la Cancelación' : '¡Cita Cancelada!'}</h1>
            <p className="text-lg text-gray-700 mb-6">{statusMessage}</p>

            {/* Botón para regresar al inicio, o reintentar si es error */}
            {isError && (
              <Button onClick={handleCancel} className="bg-blue-500 hover:bg-blue-600 text-white">Reintentar</Button>
            )}
            {!isError && (
              <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white">
                <a href={`/${tenantId}`}>Ir a la página principal del salón</a>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}






