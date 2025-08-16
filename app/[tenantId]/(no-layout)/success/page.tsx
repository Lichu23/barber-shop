import { getBookingById } from "@/lib/services/bookingService";
import { formatServiceName } from "@/utils/formatServiceName";
import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale"; // Para fechas en español
import SuccessPageWrapper from "./SuccessPageWrapper";

interface SuccessPageProps {
  params: {
    tenantId: string;
  };
  searchParams: {
    bookingId: string;
  };
}

export default async function SuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const { tenantId } = await params;
  const { bookingId } = await searchParams;

  if (!bookingId) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700">
          No se encontró el ID de la reserva.
        </p>
      </div>
    );
  }

  // Obtener los detalles de la reserva usando el Server Component
  const { data: booking, error } = await getBookingById(bookingId, tenantId);

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Error al cargar la reserva
        </h1>
        <p className="text-lg text-gray-700">{error}</p>
        <p className="text-md text-gray-600 mt-2">
          Por favor, verifica el enlace o contacta con soporte.
        </p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Reserva no encontrada
        </h1>
        <p className="text-lg text-gray-700">
          No se pudieron cargar los detalles de la reserva.
        </p>
      </div>
    );
  }

  let formattedStartTime = "No disponible";
  let formattedEndTime = "No disponible";
  let formattedDate = "No disponible";

  if (booking && booking.appointment_datetime) {
    const timeZone = "Europe/Madrid";

    const start = new Date(booking.appointment_datetime);

    if (!isNaN(start.getTime())) {
      const durationMinutes = 45;
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

      formattedStartTime = formatInTimeZone(start, timeZone, "HH:mm"); // -> "19:00"
      formattedEndTime = formatInTimeZone(end, timeZone, "HH:mm"); // -> "19:45"
      formattedDate = formatInTimeZone(start, timeZone, "PPP", { locale: es });
    }
  }

  const formattedServices = booking.services
    .map((service) => formatServiceName(service))
    .join(", ");

  return (
    <SuccessPageWrapper
      booking={booking}
      formattedDate={formattedDate}
      formattedEndTime={formattedEndTime}
      formattedServices={formattedServices}
      formattedStartTime={formattedStartTime}
    />
  );
}
