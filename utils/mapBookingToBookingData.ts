// utils/mapBookingToBookingData.ts
import type { Booking } from '@/types/booking'; // Asegúrate de que la ruta sea correcta a tu interfaz Booking (de la DB)
import type { ServiceOption } from '@/constants/services'; // Asegúrate de la ruta correcta a ServiceOption
import { BookingDataForSuccessCard } from '@/app/[tenantId]/(no-layout)/success/types/success';


export function mapBookingToBookingData(booking: Booking, allServices: ServiceOption[]): BookingDataForSuccessCard {
  // Construye detailedServices a partir de los valores de 'services' de la base de datos
  const detailedServices: ServiceOption[] = Array.isArray(booking.services)
    ? booking.services
        .map(serviceValue => allServices.find(option => option.value === serviceValue))
        .filter((service): service is ServiceOption => service !== undefined)
    : []; // Si services no es un array, se deja vacío.

  // Asegúrate de que todas las propiedades de BookingDataForSuccessCard están mapeadas
  return {
    id: booking.id,
    tenant_id: booking.tenant_id,
    fullName: booking.full_name,        // Mapeo de snake_case a camelCase
    phoneNumber: booking.phone_number,  // Mapeo de snake_case a camelCase
    email: booking.email,
    date: booking.date,
    time: booking.appointment_time,      // Mapeo de snake_case a camelCase
    totalPrice: booking.total_price,    // Asumimos que total_price ya está en Booking (DB)
    appointmentDateTime: booking.appointment_datetime, // Mapeo de snake_case a camelCase
    cancellationToken: booking.cancellation_token,
    google_calendar_event_id: booking.google_calendar_event_id,
    
    // Propiedades construidas/calculadas
    detailedServices: detailedServices, // <-- Aquí se asignan los servicios detallados
  };
}