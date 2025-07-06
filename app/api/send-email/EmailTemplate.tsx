import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  service: string;
  date: string;
  time: string;
}

export function EmailTemplate({ fullName, service, date, time }: EmailTemplateProps) {
  return (
    <div>
      <h2>¡Hola, {fullName}!</h2>
      <p>Tu reserva para el servicio <b>{service}</b> fue recibida.</p>
      <p>
        Fecha: <b>{date}</b><br />
        Hora: <b>{time}</b>
      </p>
      <p>¡Te esperamos!</p>
    </div>
  );
}
