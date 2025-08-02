import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { formatPriceToEuro } from "@/utils/formatPrice";
import { formatTimeTo24H } from "@/utils/formatTime";
import { ExternalLink } from "lucide-react";
import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  service: string;
  date: string;
  time: string;
  totalPrice: number;
  cancellationToken?: string;
  bookingId?: string;
  tenantId: string
}

export function EmailTemplate({
  fullName,
  service,
  date,
  time,
  totalPrice,
  cancellationToken,
  bookingId,
  tenantId
}: EmailTemplateProps) {
  console.log(`confirmation email time:${time}`)
  const cancellationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${tenantId}/cancel?token=${cancellationToken}&id=${bookingId}`; 

  const chikyDireccion =
    "https://www.google.com/maps/place/Peluqueria+Latina+Chiky/@41.3741889,2.1573992,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a265d7ffcf57:0xb70d1351b6080e80!8m2!3d41.3741889!4d2.1599741!16s%2Fg%2F11b7dzd2rc?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"; // Placeholder URL

 return (
    <div>
      <h2>¡Hola, {fullName}!</h2>
      <p>
        <b>Tu reserva fue confirmada!</b>
      </p>
      <p>
        Fecha: <b>{formatDate(date)}</b>
        <br />
        Hora: <b>{time}hs</b>
        <br />
        Total a pagar: <b>{formatPriceToEuro(totalPrice)}</b>
      </p>
      <p>Tus servicios elegidos:</p>
      <ul>
        <li>
            <b>{service}</b> {/* Asumo que 'service' ya es un string como "Corte, Barba" */}
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
      <p>
        ¡Te esperamos! en{" "}
        <Button
          asChild
          className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <p>
            {tenantId}
          </p>
        </Button>
      </p>
    </div>
  )}