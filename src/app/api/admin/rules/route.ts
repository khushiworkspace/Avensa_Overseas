import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ruleSchema = z.object({
  routeId: z.string().min(1),
  criterionName: z.string().min(1),
  condition: z.enum(["equals", "gte", "lte", "in", "not_in", "required"]),
  value: z.union([z.string(), z.number(), z.array(z.string())]),
  required: z.boolean(),
  effectiveFrom: z.string(),
  effectiveTo: z.string().optional(),
  sourceUrl: z.string().url(),
  notes: z.string().optional(),
});

export async function GET() {
  // TODO: Return paginated rules from DB filtered by routeId / status
  return NextResponse.json({ success: false, message: "Rules service not yet configured" }, { status: 501 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ruleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Validate admin auth, create rule in draft state,
    // require approval before publishing, emit rule.created event
    return NextResponse.json(
      { success: false, message: "Rules service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
