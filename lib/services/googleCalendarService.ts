interface CreateGoogleCalendarEventRequest {
  ownerSecretKey: string;
  summary: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
}

interface CreateGoogleCalendarEventResponse {
  message: string;
  eventId?: string | undefined;
  error?: string; // Para errores de la API
  details?: string; // Detalles del error
}

export async function createGoogleCalendarEvent(
  eventData: CreateGoogleCalendarEventRequest
): Promise<{ eventId?: string; error?: string }> {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!NEXT_PUBLIC_BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL no está configurada.");
    return { error: "URL base de la aplicación no configurada correctamente." };
  }
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/google-calendar/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    const result: CreateGoogleCalendarEventResponse = await response.json();

    if (!response.ok || result.error) {
      console.error(
        "Error al crear evento de Google Calendar:",
        result.details || result.error || "Error desconocido"
      );
      return {
        error:
          result.details ||
          result.error ||
          "Fallo al crear evento en Google Calendar.",
      };
    }
    return { eventId: result.eventId || undefined };
  } catch (err: any) {
    console.error(
      "Excepción al llamar a la API de Google Calendar (creación):",
      err.message
    );
    return {
      error: "Error inesperado al intentar crear evento en Google Calendar.",
    };
  }
}

interface DeleteGoogleCalendarEventRequest {
  ownerSecretKey: string;
  eventId: string;
}

export async function deleteGoogleCalendarEvent(
  deleteData: DeleteGoogleCalendarEventRequest
): Promise<{ success: boolean; error?: string }> {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!NEXT_PUBLIC_BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL no está configurada.");
    return { error: "URL base de la aplicación no configurada correctamente.", success:false };
  }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/google-calendar/events`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteData),
      }
    );

    const result: { message?: string; error?: string; details?: string } = await response.json();

    if (!response.ok || result.error) {
      console.error(
        "Error al eliminar evento de Google Calendar:",
        result.details || result.error || "Error desconocido"
      );
      return {
        success: false,
        error:
          result.details ||
          result.error ||
          "Fallo al eliminar evento de Google Calendar.",
      };
    }
    return { success: true };
  } catch (err: any) {
    console.error(
      "Excepción al llamar a la API de Google Calendar (eliminación):",
      err.message
    );
    return {
      success: false,
      error: "Error inesperado al intentar eliminar evento de Google Calendar.",
    };
  }
}
