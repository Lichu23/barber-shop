import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { formatPriceToEuro } from "@/utils/formatPrice";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";

interface EmailTemplateProps {
  fullName: string;
  service: string;
  date: string;
  startTime: string | undefined;
  endTime: string | undefined;
  totalPrice: number;
  cancellationToken?: string;
  bookingId?: string;
  tenantId: string;
  appointmentDateTime: string;
}

export function EmailTemplate({
  fullName,
  service,
  date,
  startTime,
  endTime,
  totalPrice,
  cancellationToken,
  bookingId,
  tenantId,
}: EmailTemplateProps) {
  console.log(`confirmation email time:${startTime} to ${endTime}`);
  const cancellationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${tenantId}/cancel?token=${cancellationToken}&id=${bookingId}`;
  return (
    <div>
      <h2>¡Hola, {fullName}!</h2>
      <p>
        <b>Tu reserva fue confirmada!</b>
      </p>
      <p>
        Fecha: <b>{formatDate(date)}</b>
        <br />
        Hora:{" "}
        <b>
          {startTime}hs - {endTime}hs
        </b>
        <br />
        Total a pagar: <b>{formatPriceToEuro(totalPrice)}</b>
      </p>
      <p>Tus servicios elegidos:</p>
      <ul>
        <li>
          <b>{service}</b>{" "}
        </li>
      </ul>
      {cancellationToken && (
        <div>
          <p>
            Para cancelar tu cita, haz clic aquí:{" "}
            <a href={cancellationLink}>Cancelar Cita</a>
          </p>

          <p>Este enlace es único para tu reserva.</p>
        </div>
      )}
      <p>¡Te esperamos en {tenantId}!</p>
    </div>
  );
}
