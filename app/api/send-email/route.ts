"use server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "./EmailTemplate";

export interface SendEmailRequest {
  to: string;
  subject?: string;
  message?: string;

  fullName: string;
  service: string;
  date: string;
  time: string;
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, fullName, service, date, time, subject }:SendEmailRequest = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Chiky Peluqueria <onboarding@resend.dev>",
      to,
      subject: subject || "Hola desde chiky",
      react: EmailTemplate({ fullName, service, date, time }), 
    });

    if (error) {
      console.log(error);

      return NextResponse.json({ error }, { status: 500 });
    };
    console.log("Email enviado correctamente")
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
