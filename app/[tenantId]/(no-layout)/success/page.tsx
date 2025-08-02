import { getBookingById } from "@/lib/services/bookingService";
import { formatServiceName } from "@/utils/formatServiceName";
import { format } from "date-fns"; // Para formatear la fecha
import { es } from "date-fns/locale"; // Para fechas en español
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";

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
  const { tenantId } = params;
  const { bookingId } = searchParams;

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

    // 2. Verifica que la fecha sea válida
    if (!isNaN(start.getTime())) {
      const durationMinutes = 45;
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

      // 3. Formatea la fecha y las horas para la zona horaria de España
      formattedStartTime = formatInTimeZone(start, timeZone, "HH:mm"); // -> "19:00"
      formattedEndTime = formatInTimeZone(end, timeZone, "HH:mm"); // -> "19:45"
      formattedDate = formatInTimeZone(start, timeZone, "PPP", { locale: es });
    }
  }

  const formattedServices = booking.services
    .map((service) => formatServiceName(service))
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✔</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          ¡Reserva Confirmada!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Tu cita ha sido agendada con éxito. Aquí están los detalles:
        </p>

        <div className="text-left space-y-3">
          <p className="text-gray-800">
            <strong className="font-semibold">Nombre:</strong>{" "}
            {booking.full_name}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Email:</strong> {booking.email}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Teléfono:</strong>{" "}
            {booking.phone_number}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Servicios:</strong>{" "}
            {formattedServices}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Fecha:</strong> {formattedDate}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Hora:</strong>{" "}
            {formattedStartTime} - {formattedEndTime}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Precio Total:</strong>{" "}
            {booking.total_price}€
          </p>
        </div>

        <p className="text-md text-gray-600 mt-8">
          Te hemos enviado un email de confirmación con estos detalles.
        </p>

        <a
          href={`/${tenantId}`}
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
