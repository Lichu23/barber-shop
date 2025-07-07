export type Booking = {
  id?: string // UUID generado por Supabase, opcional al crear
  full_name: string
  phone_number: string
  service: string
  date: string    // formato 'YYYY-MM-DD'
  time: string    // formato 'HH:mm'
  total_price:number
  created_at?: string // timestamp generado automáticamente, opcional
}

export interface ActionResult<T> {
  success?: boolean;
  error?: string;
  data?: T;
}