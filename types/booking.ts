export type Booking = {
  id?: string; // UUID generado por Supabase, opcional al crear
  full_name: string;
  phone_number: string;
  services: string[];
  email:string;
  date: string; // formato 'YYYY-MM-DD'
  time: string; // formato 'HH:mm'
  total_price: number;
  appointment_datetime?: string;
  reminder_sent_at?: string | null; // Añadido: para el estado del recordatorio
  google_calendar_event_id?: string | null; // Añadido: para el ID del evento de Google Calendar
  cancellation_token?: string | null; // Añadido: para el token de cancelación
  created_at?: string;
  tenant_id:string
};

export interface ActionResult<T> {
  success?: boolean;
  error?: string;
  data?: T;
}

export interface TenantProfileDB { // 'DB' suffix para indicar que viene directamente de la DB
  id: number; // bigint en SQL
  created_at: string; // timestamp with time zone
  updated_at: string | null; // timestamp with time zone (con DEFAULT now() y update)
  tenant_id: string; // text, UNIQUE
  salon_name: string; // text
  hero_slogan: string | null; // text, nullable
  hero_description: string | null; // text, nullable
  hero_image_url: string | null; // text, nullable
  contact_phone: string | null; // text, nullable
  contact_address: string | null; // text, nullable
  opening_hours_summary: string | null; // text, nullable
  opening_hours_detail: string | null; // text, nullable
  contact_email_for_users: string | null; // text, nullable
  social_instagram_url: string | null; // text, nullable
  social_facebook_url: string | null; // text, nullable
  social_tiktok_url: string | null; // text, nullable
  social_twitter_url: string | null; // text, nullable
  subscription_status?: string
  user_id?: string
  stripe_customer_id?: string
}

// Interfaz para la tabla 'admin_settings'
export interface AdminSettingsDB { // 'DB' suffix para indicar que viene directamente de la DB
  id: number; // bigint, PK
  tenant_id: string | null; // text (FK), nullable
  google_refresh_token: string | null; // text, nullable
  google_calendar_id: string | null; // text, nullable
  created_at: string; // timestamp with time zone
  updated_at: string | null; // timestamp with time zone
  owner_secret_key: string | null; // text, UNIQUE
}


export interface SalonGalleryItemDB { // 'DB' suffix
  id: number; // bigint, PK
  tenant_id: string; // text
  image_url: string | null; // text
  name: string | null; // text
  description: string | null; // text
  order: number | null; // smallint
  created_at: string; // timestamp with time zone
}

export interface SalonServiceDB { // 'DB' suffix
  id: number; // bigint, PK
  created_at: string; // timestamp with time zone
  name: string | null; // text
  description: string | null; // text
  price: number | null; // numeric
  value: string | null; // text
  order: number | null; // smallint
  tenant_id: string; // text
  category: string; // text
  icon_name: string | null; // text
  // Si tienes 'is_featured' también:
  // is_featured: boolean | null;
}