import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables.");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const { priceId }: { priceId: string } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Error creating Stripe session:", err.message);
    return NextResponse.json(
      { error: "Could not create checkout session", details: err.message },
      { status: 500 }
    );
  }
}
