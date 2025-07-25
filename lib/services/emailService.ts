interface SendEmailData {
    to: string;
    subject?: string;
    fullName: string;
    service: string; 
    date: string;
    time: string;
    totalPrice: number;
    isReminder?: boolean;
    cancellationToken?: string;
    bookingId?: string;
    isCancellationConfirmation?: boolean;
}

export async function sendConfirmationEmail(emailData: SendEmailData): Promise<{ success: boolean; error?: string }> {
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    if (!NEXT_PUBLIC_BASE_URL) {
        console.error("NEXT_PUBLIC_BASE_URL no está configurada.");
        return { success: false, error: "URL base de la aplicación no configurada correctamente." };
    }
    try {
        const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Respuesta de error de /api/email/send:", errorText); 
            return { success: false, error: "Fallo al enviar email de confirmación." };
        }
        return { success: true };
    } catch (err: any) {
        console.error("Excepción en sendConfirmationEmail (fetch):", err.message);
        return { success: false, error: "Error inesperado al enviar email de confirmación." };
    }
}

export async function sendReminderEmail(emailData: SendEmailData): Promise<{ success: boolean; error?: string }> {
    // Reutilizamos sendConfirmationEmail, solo ajustamos el isReminder
    return sendConfirmationEmail({ ...emailData, isReminder: true });
}

export async function sendCancellationEmail(emailData: SendEmailData): Promise<{ success: boolean; error?: string }> {
    // Reutilizamos sendConfirmationEmail, solo ajustamos el isCancellationConfirmation
    return sendConfirmationEmail({ ...emailData, isCancellationConfirmation: true });
}
