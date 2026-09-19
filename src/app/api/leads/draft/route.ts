import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

/* ── Rate-limit helper (simple in-memory, per-IP) ── */
const ipHits = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, max = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

/* ── Validation schema ── */
const draftSchema = z.object({
  leadType:          z.enum(["eligibility", "contact", "short-stay"]),
  name:              z.string().trim().max(120).optional(),
  email:             z.string().email().optional().or(z.literal("")),
  phone:             z.string().trim().max(30).optional(),
  formData:          z.record(z.unknown()).optional(),
  completionPercent: z.number().min(0).max(100).optional(),
  lastStep:          z.number().int().min(1).optional(),
  totalSteps:        z.number().int().min(1).optional(),
});

/**
 * POST /api/leads/draft
 * Creates a new partial lead.  Returns the new _id as draftId for
 * subsequent autosave PATCH calls.
 */
export async function POST(req: NextRequest) {
  try {
    /* Rate limit by IP */
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests — please slow down" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = draftSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { leadType, name, email, phone, formData, completionPercent, lastStep, totalSteps } =
      parsed.data;

    await connectDB();

    const lead = await Lead.create({
      leadType,
      status: "PARTIAL",
      name:   name   || undefined,
      email:  email  || undefined,
      phone:  phone  || undefined,
      formData:          formData          ?? {},
      completionPercent: completionPercent ?? 0,
      lastStep:          lastStep          ?? 1,
      totalSteps:        totalSteps        ?? 5,
      source:    "website",
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json(
      { success: true, draftId: lead._id.toString(), lead },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/leads/draft]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
