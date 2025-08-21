import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabaseClient } from "@/utils/supabase/createClient";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("Invalid signature:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = session.metadata?.clerk_user_id ?? null;
      const tenantId = session.metadata?.tenantId ?? null;

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : (session.subscription?.id ?? null);

      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : (session.customer?.id ?? null);

      if ((clerkUserId || tenantId) && subscriptionId) {
        await supabase
          .from("tenants_onboarding")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          })
          .or(`clerk_user_id.eq.${clerkUserId},tenant_id.eq.${tenantId}`);
      } else {
        console.log(
          "Supabase update successful for checkout.session.completed"
        );
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerk_user_id ?? null;
      const tenantId = sub.metadata?.tenantId ?? null;

      const subscription = await stripe.subscriptions.retrieve(sub.id, {
        expand: ["latest_invoice.lines"],
      });
      const invoice = subscription.latest_invoice as Stripe.Invoice | null;

      let paidUntil: string | null = null;

      if (invoice) {
        const line = invoice.lines.data.find(
          (item) => item.period?.end !== undefined
        );
        if (line && line.period?.end) {
          paidUntil = new Date(line.period.end * 1000).toISOString();
        }
      }

      if (clerkUserId || tenantId) {
        await supabase
          .from("tenants_onboarding")
          .update({
            stripe_subscription_id: subscription.id,
            subscription_status: subscription.status,
            paid_until: paidUntil, 
          })
          .or(`clerk_user_id.eq.${clerkUserId},tenant_id.eq.${tenantId}`);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const clerkUserId = sub.metadata?.clerk_user_id ?? null;
      const tenantId = sub.metadata?.tenantId ?? null;

      if (clerkUserId || tenantId) {
        await supabase
          .from("tenants_onboarding")
          .update({ subscription_status: sub.status })
          .or(`clerk_user_id.eq.${clerkUserId},tenant_id.eq.${tenantId}`);
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription?: string;
      };
      const subscriptionId = invoice.subscription ?? null;
      const clerkUserId = invoice.metadata?.clerk_user_id ?? null;
      const tenantId = invoice.metadata?.tenantId ?? null;

      const paidUntil = invoice.period_end
        ? new Date(invoice.period_end * 1000).toISOString()
        : null;

      if ((clerkUserId || tenantId) && subscriptionId) {
        await supabase
          .from("tenants_onboarding")
          .update({
            stripe_subscription_id: subscriptionId,
            paid_until: paidUntil,
            subscription_status: "Subscripcion activa",
          })
          .or(`clerk_user_id.eq.${clerkUserId},tenant_id.eq.${tenantId}`);
      }
      break;
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
