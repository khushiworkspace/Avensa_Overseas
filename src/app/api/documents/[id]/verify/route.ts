import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  result: z.enum(["accepted", "rejected", "needs_review"]),
  reason: z.string().optional(),
});

interface Props { params: { id: string } }

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Validate officer auth and case assignment, update document status,
    // create verification record, emit document.verification.completed event
    return NextResponse.json(
      { success: false, message: "Verification service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
