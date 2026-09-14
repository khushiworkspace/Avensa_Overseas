import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    // TODO: Verify Stripe webhook signature using STRIPE_WEBHOOK_SECRET
    // Parse event, handle payment_intent.succeeded / payment_intent.payment_failed
    // Use idempotency key to prevent duplicate processing
    // Emit payment.succeeded or payment.failed to Kafka

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 });
  }
}
