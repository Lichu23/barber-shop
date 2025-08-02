// app/api/auth/google-callback/route.ts
// Esta API no lleva [tenantId] en su URL. Es una URL global a la que Google redirige.
import { NextResponse } from "next/server";
import { google, Auth } from "googleapis";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { updateAdminCalendarId, updateAdminRefreshToken } from "@/lib/services/tenantServices";

// Variables de entorno (asegúrate de que estén definidas en .env.local y Vercel)
const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI: string | undefined = process.env.GOOGLE_REDIRECT_URI; // Tu URL completa de callback

// Configuración de Supabase (se asume que es global y correcta)
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Verificación inicial de variables de entorno críticas
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI) {
  console.error("Error: Faltan variables de entorno críticas para Google OAuth. Revisa tu .env.local");
  throw new Error("Configuración de Google OAuth incompleta en el servidor.");
}

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// MODIFICACIÓN CLAVE: Eliminar el argumento 'params' de la firma de la función GET
export async function GET(req: Request): Promise<NextResponse> {
  const url: URL = new URL(req.url);
  const code: string | null = url.searchParams.get("code");
  const state: string | null = url.searchParams.get("state"); // Captura el parámetro 'state' completo

  // Obtener la base URL para redirecciones (ej. http://localhost:3000 o https://www.lichu.org)
  const baseUrl: string = process.env.GOOGLE_REDIRECT_URI!.split("/api/auth/google-callback")[0];
  if (!baseUrl) {
    console.error("Error: GOOGLE_REDIRECT_URI en .env.local está malformada. No se pudo extraer la base URL.");
    return NextResponse.json({ error: "Configuración de URL de redirección incompleta." }, { status: 500 });
  }

  // Validaciones iniciales de los parámetros de la URL
  if (!code) {
    console.error("No se recibió código de autorización de Google.");
    return NextResponse.redirect(
      `${baseUrl}/error?msg=${encodeURIComponent("No se recibió el código de autorización de Google.")}`
    );
  }
  if (!state) {
    console.error("Parámetro 'state' faltante en el callback de Google.");
    return NextResponse.redirect(
      `${baseUrl}/error?msg=${encodeURIComponent("Parámetro de estado inválido o faltante.")}`
    );
  }

  // Desestructurar tenantId y ownerSecretKey del 'state'
  const [tenantId, ownerSecretKey] = state.split(':'); // state no es null aquí
  if (!tenantId || !ownerSecretKey) {
    console.error(`Estado inválido: tenantId (${tenantId}) o ownerSecretKey (${ownerSecretKey}) faltantes.`);
    return NextResponse.redirect(`${baseUrl}/error?msg=${encodeURIComponent("Error en la información de estado de la autenticación.")}`);
  }

  try {
    // Intercambiar el código de autorización por tokens
    const { tokens }: { tokens: Auth.Credentials } = await oauth2Client.getToken(code);
    const { refresh_token } = tokens;
    if (!refresh_token) {
      console.error('No se recibió refresh token. Asegúrate de usar access_type: "offline" y prompt: "consent" en generateAuthUrl.');
      return NextResponse.redirect(
        `${baseUrl}/${tenantId}/setup-calendar?status=no_refresh_token&details=${encodeURIComponent("No se pudo obtener el token de refresco. Vuelve a intentar y otorga todos los permisos.")}`
      );
    }

    // Actualizar el refresh token en admin_settings usando el servicio
    const { success: refreshUpdateSuccess, error: refreshUpdateError } = await updateAdminRefreshToken(tenantId, ownerSecretKey, refresh_token);
    if (!refreshUpdateSuccess || refreshUpdateError) {
      console.error(`Error al actualizar refresh token para tenant ${tenantId}:`, refreshUpdateError);
      return NextResponse.redirect(`${baseUrl}/${tenantId}/setup-calendar?status=db_save_failed&details=${encodeURIComponent('Error al guardar el token de Google en la base de datos.')}`);
    }

    // Opcional: Si quieres guardar el calendarId ('primary') en este momento
    const googleCalendarId: string = 'primary';
    const { success: calIdUpdateSuccess, error: calIdUpdateError } = await updateAdminCalendarId(tenantId, ownerSecretKey, googleCalendarId);
    if (!calIdUpdateSuccess || calIdUpdateError) {
      console.error(`Error al actualizar calendarId para tenant ${tenantId}:`, calIdUpdateError);
    }

    console.log(`Tokens de Google guardados para Owner con clave: ${ownerSecretKey} (Tenant: ${tenantId})`);
    // Redireccionar a la página de configuración del salón con el tenantId
    return NextResponse.redirect(`${baseUrl}/${tenantId}/setup-calendar?status=google_connected_success`);

  } catch (error: any) {
    console.error("Error durante el intercambio de código o guardado:", error);
    return NextResponse.redirect(
      `${baseUrl}/${tenantId}/setup-calendar?status=auth_failed&details=${encodeURIComponent(error.message || 'Error desconocido durante la autenticación.')}`
    );
  }
}