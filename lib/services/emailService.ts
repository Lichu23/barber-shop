import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";
import { getTenantProfileById } from "./tenantServices";

interface SendEmailData {
  to: string;
  subject?: string | null;
  fullName: string;
  service: string;
  date: string;
  totalPrice: number;
  isReminder?: boolean;
  cancellationToken?: string | null;
  bookingId?: string | null;
  isCancellationConfirmation?: boolean;
  tenantId: string;
  appointmentDateTime?: string;
  startTime?: string;
  endTime?: string;
}

export async function sendConfirmationEmail(
  emailData: SendEmailData
): Promise<{ success: boolean; error?: string }> {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!NEXT_PUBLIC_BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL no está configurada.");
    return {
      success: false,
      error: "URL base de la aplicación no configurada correctamente.",
    };
  }
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/${emailData.tenantId}/email/send`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        ` Respuesta de error de /api/${emailData.tenantId}/email/send:`,
        errorText
      );
      return {
        success: false,
        error: "Fallo al enviar email de confirmación.",
      };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Excepción en sendConfirmationEmail (fetch):", err.message);
    return {
      success: false,
      error: "Error inesperado al enviar email de confirmación.",
    };
  }
}

export async function sendReminderEmail(
  emailData: SendEmailData
): Promise<{ success: boolean; error?: string }> {
  // Reutilizamos sendConfirmationEmail, solo ajustamos el isReminder
  return sendConfirmationEmail({ ...emailData, isReminder: true });
}

export async function sendCancellationEmail(
  emailData: SendEmailData
): Promise<{ success: boolean; error?: string }> {
//   console.log( emailData);

  const { data: tenantProfile, error: tenantError } =
    await getTenantProfileById(emailData.tenantId);

  if (tenantError || !tenantProfile) {
    console.log(
      `Ocurrio un error al obtener el tennant profile ${tenantError}, ${tenantProfile}`
    );
  }

  let startTime = emailData.startTime;

  if (!startTime && emailData.appointmentDateTime) {
    const start = new Date(emailData.appointmentDateTime);
    startTime = formatInTimeZone(start, tenantProfile?.timezone!, "HH:mm", {
      locale: es,
    });
  }

  return sendConfirmationEmail({
    ...emailData,
    startTime,
    isCancellationConfirmation: true,
  });
}
