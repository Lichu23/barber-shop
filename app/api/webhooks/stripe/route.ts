import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables.");
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
if (!webhookSecret) {
  throw new Error(
    "STRIPE_WEBHOOK_SECRET is not set in the environment variables."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const nextHeaders = await headers();

  const sig = nextHeaders.get("stripe-signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Error en la verificación del webhook: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
  
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      // Lógica para cuando el pago es exitoso.
      // Ejemplo: Actualiza tu base de datos para dar acceso al usuario.
      console.log("Payment successful for session:", session.id);
      // Aquí llamarías a tu base de datos para actualizar el estado del usuario.
      break;
    // ... maneja otros tipos de eventos si es necesario
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
