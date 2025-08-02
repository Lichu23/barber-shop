"use server"
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient, SupabaseClient } from "@supabase/supabase-js"; // Necesario para la consulta a Supabase

// Variables de entorno (asegúrate de que estén definidas)
const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI: string | undefined = process.env.GOOGLE_REDIRECT_URI;

// Verificación inicial de variables de entorno críticas (al cargar el módulo)
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  console.error("Error: Faltan variables de entorno críticas para Google OAuth. Revisa tu .env.local");
  throw new Error("Configuración de Google OAuth incompleta en el servidor.");
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// Cliente de Supabase (inicializado fuera de la función para eficiencia)
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { tenantId, ownerSecretKey } = await req.json();

    if (!tenantId || !ownerSecretKey) {
      return NextResponse.json(
        { error: "Faltan tenantId o ownerSecretKey en el cuerpo de la solicitud." },
        { status: 400 }
      );
    }

    const { data: adminData, error: adminError } = await supabase
      .from('admin_settings')
      .select('id')
      .eq('owner_secret_key', ownerSecretKey)
      .eq('tenant_id', tenantId) 
      .single();

    if (adminError || !adminData) {
      console.error('Clave Secreta/Tenant ID de Owner inválida o no encontrada:', adminError);
      return NextResponse.json({ error: 'Clave de configuración o ID de Salón inválido.' }, { status: 403 });
    }

    const state = `${tenantId}:${ownerSecretKey}`;

    const authUrl: string = oauth2Client.generateAuthUrl({
      access_type: "offline", 
      scope: ['https://www.googleapis.com/auth/calendar.events'],
      prompt: "consent", 
      state: state, 
    });

    return NextResponse.json({ authUrl }, { status: 200 });
  } catch (error: any) {
    console.error("Error al generar URL de autenticación de Google:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor al generar la URL de autenticación." },
      { status: 500 }
    );
  }
}
