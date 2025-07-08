import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  service: string;
  date: string;
  time: string;
}

export function EmailTemplate({ fullName, service, date, time }: EmailTemplateProps) {
    const servicesArray = service.split(',').map(s => s.trim());

  return (
    <div>
      <h2>¡Hola, {fullName}!</h2>
      <p>Tu reserva para los siguientes servicios fue recibida:</p>
      <ul>
        {servicesArray.map((singleService, index) => (
          <li key={index}>
            <b>{singleService}</b>
          </li>
        ))}
      </ul>
      <p>
        Fecha: <b>{date}</b><br />
        Hora: <b>{time}</b>
      </p>
      <p>¡Te esperamos!</p>
    </div>
  );
}
