import { formatDate } from "@/utils/formatDate";
import { formatTimeTo12H } from "@/utils/formatTime";

interface CancellationConfirmationEmailTemplateProps {
  fullName: string;
  service: string | string[];
  date: string;
  time: string;
}

export function CancellationConfirmationEmailTemplate({
  fullName,
  service,
  date,
  time,
}: CancellationConfirmationEmailTemplateProps) {
  const servicesArray =
    typeof service === "string" ? service.split(",").map((s) => s.trim()) : [];

  return (
    <div>
      <h1>¡Cita Cancelada Exitosamente!</h1>
      <p>
        Hola <strong>{fullName}</strong>,
      </p>

      <p>
        Confirmamos que tu cita en Chiky Peluquería ha sido{" "}
        <strong>cancelada</strong> de nuestro sistema.
      </p>

      <div>
        <p>
          <strong>Servicio:</strong> <span>{servicesArray.join(", ")}</span>
        </p>
        <p>
          <strong>Fecha:</strong> <span>{formatDate(date)}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{formatTimeTo12H(time)}</span>
        </p>
      </div>

      <p>Lamentamos cualquier inconveniente que esto pueda causar.</p>
      <p>
        Si deseas reprogramar una nueva cita, no dudes en visitar nuestra página
        de reservas nuevamente.
      </p>

      <p>
        Atentamente,
        <br />
        El equipo de Chiky Peluquería
      </p>

      <hr />

      <p>
        Este es un mensaje de confirmación de cancelación automático. Por favor,
        no respondas a este correo electrónico.
      </p>
    </div>
  );
}
