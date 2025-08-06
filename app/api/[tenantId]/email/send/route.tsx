import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ReactElement } from "react";
import { ReminderEmailTemplate } from "@/components/emails/ReminderEmailTemplate";
import { EmailTemplate } from "@/components/emails/EmailTemplate";
import { CancellationConfirmationEmailTemplate } from "@/components/emails/CancellationConfirmationEmailTemplateProps";

export interface SendEmailRequest {
  to: string;
  subject?: string;
  message?: string;

  fullName: string;
  service: string;
  date: string;
  time: string;
  totalPrice: number;
  isReminder?: boolean;
  cancellationToken?: string;
  isCancellationConfirmation?: boolean;
  bookingId?: string;
  tenantId?: string;
  appointmentDateTime: string;
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const {
    to,
    fullName,
    service,
    date,
    time,
    subject,
    totalPrice,
    isReminder,
    cancellationToken,
    isCancellationConfirmation,
    bookingId,
    tenantId,
    appointmentDateTime,
  }: SendEmailRequest = await req.json();

  try {
    if (!to || !fullName) {
      return NextResponse.json(
        { message: "Missing required email data (to, fullName)" },
        { status: 400 }
      );
    }

    if (
      !isCancellationConfirmation &&
      (!service || !date || !time || totalPrice === undefined)
    ) {
      return NextResponse.json(
        { message: "Missing required email data for confirmation/reminder" },
        { status: 400 }
      );
    }

    let emailSubject: string;
    let emailReactComponent: ReactElement;

    if (isCancellationConfirmation) {
      emailSubject = `Confirmación de Cancelación de tu Cita en Chiky Peluquería`;
      emailReactComponent = (
        <CancellationConfirmationEmailTemplate
          fullName={fullName}
          service={service}
          date={date}
          time={time}
        />
      );
    } else if (isReminder) {
      emailSubject = `Recordatorio: Tu cita en Chiky - ${date} a las ${time}`;
      emailReactComponent = (
        <ReminderEmailTemplate
          fullName={fullName}
          service={service}
          date={date}
          time={time}
          totalPrice={totalPrice}
          tenantId={tenantId}
        />
      );
    } else {
      emailSubject = subject || "¡Reserva confirmada en Chiky!";

      if (!tenantId) {
        console.error(
          "Error: tenantId no proporcionado a la API de envío de email para la plantilla."
        );
        return NextResponse.json(
          { message: "Error interno: falta ID de salón." },
          { status: 500 }
        );
      }

      emailReactComponent = (
        <EmailTemplate
          bookingId={bookingId}
          fullName={fullName}
          date={date}
          service={service}
          time={time}
          totalPrice={totalPrice}
          cancellationToken={cancellationToken}
          tenantId={tenantId}
          appointmentDateTime={appointmentDateTime}
        />
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Chiky Peluqueria <noreply@lichu.org>",
      to,
      subject: emailSubject,
      react: emailReactComponent,
    });

    if (error) {
      console.error(error);

      return NextResponse.json({ error }, { status: 500 });
    }
    console.log("Email enviado correctamente");
    return NextResponse.json(
      { data, message: "Email enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error enviando el email" },
      { status: 500 }
    );
  }
}
