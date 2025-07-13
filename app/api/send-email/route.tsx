import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ReactElement } from "react";
import { ReminderEmailTemplate } from "@/components/emails/ReminderEmailTemplate";
import { EmailTemplate } from "@/components/emails/EmailTemplate";

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
  }: SendEmailRequest = await req.json();

  try {
    let emailSubject: string;
    let emailReactComponent: ReactElement;

    if (isReminder) {
      // Si es un recordatorio, usa la plantilla específica de recordatorio
      emailSubject = `Recordatorio: Tu cita en Chiky - ${date} a las ${time}`;
      emailReactComponent = (
        <ReminderEmailTemplate
          fullName={fullName}
          service={service}
          date={date}
          time={time}
          totalPrice={totalPrice}
        />
      );
    } else {
      emailSubject = subject || "¡Reserva confirmada en Chiky!";
      emailReactComponent = (
        <EmailTemplate
          fullName={fullName}
          date={date}
          service={service}
          time={time}
          totalPrice={totalPrice}
        />
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Chiky Peluqueria <onboarding@resend.dev>",
      to,
      subject: emailSubject,
      react: emailReactComponent,
    });

    if (error) {
      console.log(error);

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
