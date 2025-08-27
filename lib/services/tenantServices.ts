import { HaircutType } from "@/constants/gallery";
import { ServiceOption } from "@/constants/services";
import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";

export interface TenantProfile {
  tenant_id: string;
  salon_name: string;
  hero_slogan?: string;
  hero_description?: string;
  hero_image_url?: string;
  contact_phone?: string;
  contact_address?: string;
  opening_hours_summary?: string;
  opening_hours_detail?: string;
  contact_email_for_users?: string;
  social_instagram_url?: string;
  social_facebook_url?: string;
  social_tiktok_url?: string;
  social_twitter_url?: string;
  color_primary: string;
  color_secondary: string;
  color_accent: string;
  color_text_dark: string;
  color_text_light: string;
  custom_domain?: string;
  subscription_status?: string;
  stripe_customer_id?: string;
  maps_ubication?: string;
  timezone?:string
}

export interface AdminSettings {
  owner_secret_key: string;
  tenant_id: string;
  google_refresh_token: string;
  google_calendar_id: string;
}

export async function getAdminSettingsByTenantId(
  tenantId: string
): Promise<{ data?: AdminSettings; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId });

  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("*")
      .eq("tenant_id", tenantId)
      .single<AdminSettings>();

    if (error || !data) {
      console.error(
        `Error al obtener configuración para tenantId ${tenantId}:`,
        error?.message
      );
      return {
        error: error?.message || "Configuración de salón no encontrada.",
      };
    }

    return { data };
  } catch (err: any) {
    console.error(
      `Excepción al obtener configuración para tenantId ${tenantId}:`,
      err.message
    );
    return { error: "Error inesperado al obtener configuración de salón." };
  }
}

export async function getTenantProfileById(
  tenantId: string
): Promise<{ data?: TenantProfile; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId }); // <-- ¡AÑADIDO!

  try {
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("tenant_id", tenantId)
      .maybeSingle<TenantProfile>();

    if (error || !data) {
      console.error(
        `Error al obtener perfil para tenantId ${tenantId}:`,
        error?.message
      );
      return { error: error?.message || "Perfil del salón no encontrado." };
    }
    return { data };
  } catch (err: any) {
    console.error(
      `Excepción al obtener perfil para tenantId ${tenantId}:`,
      err.message
    );
    return { error: "Error inesperado al obtener perfil del salón." };
  }
}

export async function updateAdminRefreshToken(
  tenantId: string,
  ownerSecretKey: string,
  refreshToken: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId }); // <-- ¡AÑADIDO!

  try {
    const { error } = await supabase
      .from("admin_settings")
      .update({ google_refresh_token: refreshToken })
      .eq("tenant_id", tenantId)
      .eq("owner_secret_key", ownerSecretKey);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Error inesperado al actualizar token.",
    };
  }
}

export async function updateAdminCalendarId(
  tenantId: string,
  ownerSecretKey: string,
  googleCalendarId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId }); // <-- ¡AÑADIDO!

  try {
    const { error } = await supabase
      .from("admin_settings")
      .update({ google_calendar_id: googleCalendarId })
      .eq("tenant_id", tenantId)
      .eq("owner_secret_key", ownerSecretKey);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Error inesperado al actualizar ID de calendario.",
    };
  }
}

export async function getTenantGalleryItems(
  tenantId: string
): Promise<{ data?: HaircutType[]; error?: string }> {
  const supabase = await createServerSupabaseClient();

  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId });

  try {
    const { data, error } = await supabase
      .from("salon_gallery_items")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("order", { ascending: true });

    if (error) {
      console.error(
        `Error al obtener ítems de galería para tenant ${tenantId}:`,
        error.message
      );
      return { error: error.message };
    }
    return { data: data as HaircutType[] };
  } catch (err: any) {
    console.error(
      `Excepción al obtener ítems de galería para tenant ${tenantId}:`,
      err.message
    );
    return { error: "Error inesperado al obtener ítems de galería." };
  }
}

export async function getTenantServices(
  tenantId: string
): Promise<{ data?: ServiceOption[]; error?: string }> {
  const supabase = await createServerSupabaseClient();
  // console.log(tenantId);
  try {
    const { data, error } = await supabase
      .from("salon_services") // <-- Nombre de tu tabla de servicios
      .select("*") // Selecciona todas las columnas relevantes
      .eq("tenant_id", tenantId) // <-- ¡FILTRAR POR TENANT_ID!
      .order("order", { ascending: true }); // Opcional: ordenar si tienes una columna 'order'

    if (error) {
      console.error(
        `Error al obtener servicios para tenant ${tenantId}:`,
        error.message
      );
      return { error: error.message };
    }

    // console.log(
    //   `getTenantServices: tenantId=${tenantId}, servicios encontrados=${data?.length ?? 0}`
    // );

    return { data: (data ?? []) as ServiceOption[] };
  } catch (err: any) {
    console.error(
      `Excepción al obtener servicios para tenant ${tenantId}:`,
      err.message
    );
    return { error: "Error inesperado al obtener servicios." };
  }
}
