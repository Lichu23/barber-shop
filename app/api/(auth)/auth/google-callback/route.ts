// app/api/auth/google-callback/route.ts
import { NextResponse } from "next/server";
import { google, Auth } from "googleapis";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const GOOGLE_CLIENT_ID: string | undefined = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI: string | undefined = process.env.GOOGLE_REDIRECT_URI; // This is your full callback URL

// Ensure these environment variables are correctly typed and will not be undefined
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Initial check for critical Google OAuth environment variables
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  console.error(
    "Error: Missing Google OAuth environment variables. Check your .env.local"
  );
  // If these critical variables are missing, the app cannot proceed.
  // Throwing an error here is appropriate as it's a server-side configuration issue.
  throw new Error("Google OAuth configuration incomplete on the server.");
}

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

export async function GET(req: Request): Promise<NextResponse> {
  const url: URL = new URL(req.url);
  const code: string | null = url.searchParams.get("code");
  const ownerSecretKey: string | null = url.searchParams.get("state");

  // Get the base URL for redirects (e.g., http://localhost:3000)
  // We use the non-null assertion '!' here because GOOGLE_REDIRECT_URI is checked above.
  const baseUrl: string = GOOGLE_REDIRECT_URI!.split("/api/auth/google-callback")[0];
  
  if (!baseUrl) {
    console.error(
      "Error: GOOGLE_REDIRECT_URI in .env.local is malformed. Could not extract base URL."
    );
    return NextResponse.json(
      { error: "Redirect URL configuration incomplete." },
      { status: 500 }
    );
  }

  // Handle missing authorization code
  if (!code) {
    console.error("No Google authorization code received.");
    return NextResponse.redirect(
      `${baseUrl}/setup-calendar?status=auth_failed&details=${encodeURIComponent("No authorization code received.")}`
    );
  }
  // Handle missing owner secret key (state parameter)
  if (!ownerSecretKey) {
    console.error("Owner secret key missing in callback.");
    return NextResponse.redirect(
      `${baseUrl}/setup-calendar?status=auth_failed&details=${encodeURIComponent("Owner key missing in callback. Invalid URL.")}`
    );
  }

  try {
    // Exchange the authorization code for tokens
    const { tokens }: { tokens: Auth.Credentials } = await oauth2Client.getToken(code);
    const { refresh_token, access_token } = tokens; // access_token is used implicitly by setCredentials

    if (!refresh_token) {
      console.error(
        'No refresh token received. Ensure "access_type: offline" and "prompt: consent" are used in generateAuthUrl.'
      );
      return NextResponse.redirect(
        `${baseUrl}/setup-calendar?status=no_refresh_token&details=${encodeURIComponent("Could not get refresh token. Please try again and grant all permissions.")}`
      );
    }

    // Set credentials for the OAuth2 client
    oauth2Client.setCredentials(tokens);

  
    const primaryCalendarId: string = "primary";

    // Save refresh_token and calendarId in Supabase for the identified Owner
    const { data, error } = await supabase
      .from("admin_settings")
      .update({
        google_refresh_token: refresh_token,
        google_calendar_id: primaryCalendarId,
      })
      .eq("owner_secret_key", ownerSecretKey); // Update the correct Owner's row

    if (error) {
      console.error("Error saving tokens to Supabase:", error);
      return NextResponse.redirect(
        `${baseUrl}/setup-calendar?status=db_save_failed&details=${encodeURIComponent("Error saving configuration to database.")}`
      );
    }

    console.log(
      `Google tokens saved for Owner with key: ${ownerSecretKey}`
    );
    // Redirect to success page
    return NextResponse.redirect(
      `${baseUrl}/setup-calendar?status=google_connected_success`
    );
  } catch (error: any) {
    console.error("Error during code exchange or saving:", error);
    // Redirect to error page with details
    return NextResponse.redirect(
      `${baseUrl}/setup-calendar?status=auth_failed&details=${encodeURIComponent(error.message || "Unknown error during authentication.")}`
    );
  }
}