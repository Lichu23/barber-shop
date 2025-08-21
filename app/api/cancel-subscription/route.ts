import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { subscriptionId, clerkUserId } = body;

  if (!subscriptionId) {
    return NextResponse.json(
      { error: "subscriptionId is required" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  try {
    await stripe.subscriptions.cancel(subscriptionId);

    if (clerkUserId) {
      const { error } = await supabase
        .from("tenants_onboarding")
        .update({
          subscription_status: "Cancelada",
          paid_until: null,
        })
        .or(
          `clerk_user_id.eq.${clerkUserId},stripe_subscription_id.eq.${subscriptionId}`
        );

      if (error) {
        console.error("Error updating subscription status:", error);
        return NextResponse.json(
          { error: "DB update failed" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "Subscription cancelled and DB updated" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
