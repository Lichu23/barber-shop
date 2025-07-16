import { NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  console.error(
    "Error: Faltan variables de entorno para Google OAuth. Revisar .env.local"
  );
  throw new Error("Configuración de Google OAuth incompleta en el servidor.");
}

export async function GET(req: Request): Promise<NextResponse> {
  const url: URL = new URL(req.url);
  const ownerSecretKey: string | null = url.searchParams.get("key");

  if (!ownerSecretKey) {
    return NextResponse.json(
      { details: "Clave de configuración no proporcionada." },
      { status: 400 }
    );
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin_settings")
    .select("id")
    .eq("owner_secret_key", ownerSecretKey)
    .single();

  if (adminError || !adminData) {
    console.error(
      "Clave secreta de Owner inválida o no encontrada:",
      adminError
    );
    return NextResponse.json(
      { details: "Clave de configuración inválida." },
      { status: 403 }
    );
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    return NextResponse.json(
      { details: "Configuración de Google OAuth incompleta en el servidor." },
      { status: 500 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );

  // Almacena la ownerSecretKey en el 'state' para recuperarla en el callback
  const authUrl: string = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/calendar.events"],
  prompt: "consent", // <-- Asegúrate de que esto esté aquí
  state: ownerSecretKey,
});

  return NextResponse.json({ authUrl }, { status: 200 });
}
