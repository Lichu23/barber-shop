import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Base URL para success/cancel
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";

  const supabase = createServerSupabaseClient();

  // Busca el tenant y (opcionalmente) customer ya existente
  const { data: row, error } = await supabase
    .from("tenants_onboarding")
    .select("tenant_id, stripe_customer_id")
    .eq("clerk_user_id", userId)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  const tenantId = row.tenant_id; // Idealmente ya está seteado cuando apruebas el onboarding
  if (!tenantId) {
    return NextResponse.json(
      { error: "Este usuario aún no tiene tenant_id asignado" },
      { status: 409 }
    );
  }

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    undefined;

  // Reutiliza o crea Customer
  let customerId = row.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { clerk_user_id: userId, tenantId },
    });
    customerId = customer.id;

    await supabase
      .from("tenants_onboarding")
      .update({ stripe_customer_id: customerId, billing_email: email ?? null })
      .eq("clerk_user_id", userId);
  }

  // Crea la sesión de pago (suscripción)
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    payment_method_types: ["card", "link"], // Link + Card
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    customer_update: {
      address: "auto",
    },
    success_url: `${origin}/dashboard?payment=success`,
    cancel_url: `${origin}/dashboard?payment=cancelled`,
    metadata: { clerk_user_id: userId, tenantId },
    subscription_data: {
      metadata: { clerk_user_id: userId, tenantId },
    },
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
