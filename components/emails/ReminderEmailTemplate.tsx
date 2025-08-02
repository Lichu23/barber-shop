import { formatDate } from "@/utils/formatDate";
import { formatTimeTo24H } from "@/utils/formatTime";

interface EmailReminderProps {
  fullName: string;
  service: string;
  date: string;
  time: string;
  totalPrice?: number;
}

export function ReminderEmailTemplate({
  fullName,
  service,
  date,
  time,
}: EmailReminderProps) {
  const servicesArray =
    typeof service === "string" ? service.split(",").map((s) => s.trim()) : [];

  const chikyDireccion =
    "https://www.google.com/maps/place/Peluqueria+Latina+Chiky/@41.3741889,2.1573992,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a265d7ffcf57:0xb70d1351b6080e80!8m2!3d41.3741889!4d2.1599741!16s%2Fg%2F11b7dzd2rc?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D";

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
          <strong>Hora:</strong> <span>{time}hs</span>
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

      <p>
        Nos encontramos en:{" "}
        <a href={chikyDireccion} target="_blank" rel="noopener noreferrer">
          Chiky Peluquería (Ver en Google Maps)
        </a>
      </p>

      <hr />

      <p>
        Este es un mensaje de recordatorio automático. Por favor, no respondas a
        este correo electrónico.
      </p>
    </div>
  );
}
