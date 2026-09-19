import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import LeadNote from "@/models/LeadNote";
import { requireAdmin } from "@/lib/auth";

const patchSchema = z.object({
  status:     z.enum(["PARTIAL","COMPLETED","CONTACTED","FOLLOW_UP","CONVERTED","CLOSED"]).optional(),
  assignedTo: z.string().trim().max(120).optional(),
  name:       z.string().trim().max(120).optional(),
  phone:      z.string().trim().max(30).optional(),
});

/**
 * GET /api/admin/leads/[id]
 * Return a single lead with its notes — admin only.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 });
  }

  try {
    await connectDB();
    const [lead, notes] = await Promise.all([
      Lead.findById(id).lean(),
      LeadNote.find({ leadId: id }).sort({ createdAt: -1 }).lean(),
    ]);

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead, notes });
  } catch (err) {
    console.error("[GET /api/admin/leads/[id]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/leads/[id]
 * Update status / assignment — admin only.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid id" }, { status: 400 });
  }

  try {
    const body   = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true }
    );

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[PATCH /api/admin/leads/[id]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
