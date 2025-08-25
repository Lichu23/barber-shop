import { formatDate } from "@/utils/formatDate";
import { formatTimeTo24H } from "@/utils/formatTime";

interface EmailReminderProps {
  fullName: string;
  service: string;
  date: string;
  startTime: string | undefined;
  totalPrice?: number;
  tenantId:string | undefined
}

export function ReminderEmailTemplate({
  fullName,
  service,
  date,
  startTime,
  tenantId
}: EmailReminderProps) {
  const servicesArray =
    typeof service === "string" ? service.split(",").map((s) => s.trim()) : [];

  return (
    <div>
      <h1>¡Recordatorio de tu cita en Chiky Peluquería!</h1>
      <p>
        Hola <strong>{fullName}</strong>,
      </p>

      <p>Solo queríamos recordarte tu próxima cita programada con nosotros.</p>

      <div>
        <p>
          <strong>Servicio:</strong> <span>{servicesArray.join(", ")}</span>
        </p>
        <p>
          <strong>Fecha:</strong> <span>{formatDate(date)}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{startTime}hs</span>
        </p>
      </div>

      <p>
        ¡Esperamos verte pronto! Por favor, llega a tiempo para disfrutar de tu
        experiencia completa.
      </p>
      <p>
        Si necesitas reprogramar o cancelar, por favor contáctanos lo antes
        posible.
      </p>

      <p>Nos encontramos en: {tenantId}</p>

      <hr />

      <p>
        Este es un mensaje de recordatorio automático. Por favor, no respondas a
        este correo electrónico.
      </p>
    </div>
  );
}
