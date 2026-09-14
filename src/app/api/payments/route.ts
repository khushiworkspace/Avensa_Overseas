import { NextRequest, NextResponse } from "next/server";
import { MOCK_PAYMENTS } from "@/lib/mock-data";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicantId = searchParams.get("applicantId");

  let payments = [...MOCK_PAYMENTS];
  if (applicantId) payments = payments.filter((p) => p.applicantId === applicantId);

  return NextResponse.json({ success: true, data: payments, total: payments.length });
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Validate auth, create Stripe PaymentIntent with idempotency key,
    // return client_secret for frontend to confirm payment
    return NextResponse.json(
      { success: false, message: "Payment service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
