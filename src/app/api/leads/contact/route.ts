import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

/* ── Rate-limit helper (simple in-memory, per-IP) ── */
const ipHits = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string, max = 10, windowMs = 60_000): boolean {
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

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName:  z.string().trim().min(1).max(60),
  email:     z.string().email(),
  phone:     z.string().trim().max(30).optional(),
  subject:   z.string().trim().max(120).optional(),
  message:   z.string().trim().min(5).max(3000),
});

/**
 * POST /api/leads/contact
 * Creates a fully-completed contact enquiry lead immediately.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests — please slow down" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, subject, message } = parsed.data;

    await connectDB();

    const lead = await Lead.create({
      leadType:          "contact",
      status:            "COMPLETED",
      name:              `${firstName} ${lastName}`.trim(),
      email,
      phone:             phone || undefined,
      formData:          { firstName, lastName, subject: subject ?? "", message },
      completionPercent: 100,
      lastStep:          1,
      totalSteps:        1,
      source:            "website",
      ipAddress:         ip,
      userAgent:         req.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json(
      { success: true, message: "Your enquiry has been received. We will be in touch shortly.", leadId: lead._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/leads/contact]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
