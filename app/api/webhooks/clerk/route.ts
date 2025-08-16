import { createServerSupabaseClient } from "@/utils/supabase/createClient";
import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

interface ClerkUserCreatedEvent {
  id: string;
  email_addresses?: {
    email_address: string;
    verification: { status: string };
  }[];
  first_name?: string;
  last_name?: string;
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserCreatedEvent;
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const headers: WebhookRequiredHeaders = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  if (
    !headers["svix-id"] ||
    !headers["svix-timestamp"] ||
    !headers["svix-signature"]
  ) {
    return NextResponse.json(
      { error: "Missing required headers" },
      { status: 400 }
    );
  }

  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);

    const event = webhook.verify(body, headers) as ClerkWebhookEvent;

    const supabase = createServerSupabaseClient();

    if (event.type === "user.created") {
      const clerk_user_id = event.data.id;
      console.log("Nuevo usuario creado:", clerk_user_id);

      const { error } = await supabase
        .from("tenants_onboarding")
        .upsert([{ clerk_user_id }], { onConflict: "clerk_user_id" });

      if (error) {
        console.error("Error insertando usuario en onboarding:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error al verificar el webhook:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
