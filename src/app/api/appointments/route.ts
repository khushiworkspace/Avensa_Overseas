import { NextRequest, NextResponse } from "next/server";
import { MOCK_APPOINTMENTS } from "@/lib/mock-data";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicantId = searchParams.get("applicantId");
  const status = searchParams.get("status");

  let apts = [...MOCK_APPOINTMENTS];
  if (applicantId) apts = apts.filter((a) => a.applicantId === applicantId);
  if (status) apts = apts.filter((a) => a.status === status);

  return NextResponse.json({ success: true, data: apts, total: apts.length });
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Validate auth, check slot availability, book appointment,
    // send confirmation, emit appointment.booked event
    return NextResponse.json(
      { success: false, message: "Appointment service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
