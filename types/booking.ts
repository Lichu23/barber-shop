export type Booking = {
  id?: string; // UUID generado por Supabase, opcional al crear
  full_name: string;
  phone_number: string;
  service: string;
  date: string; // formato 'YYYY-MM-DD'
  time: string; // formato 'HH:mm'
  total_price: number;
  appointment_datetime?: string;
  reminder_sent_at?: string | null; // Añadido: para el estado del recordatorio
  google_calendar_event_id?: string | null; // Añadido: para el ID del evento de Google Calendar
  cancellation_token?: string | null; // Añadido: para el token de cancelación
  created_at?: string;
};

export interface ActionResult<T> {
  success?: boolean;
  error?: string;
  data?: T;
}
