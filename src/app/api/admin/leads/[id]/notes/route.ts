import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import LeadNote from "@/models/LeadNote";
import { requireAdmin } from "@/lib/auth";

const noteSchema = z.object({
  content: z.string().trim().min(1).max(5000),
});

/**
 * POST /api/admin/leads/[id]/notes
 * Add a note to a lead — admin only.
 */
export async function POST(
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
    const parsed = noteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const note = await LeadNote.create({
      leadId:    new mongoose.Types.ObjectId(id),
      adminId:   auth.payload.adminId,
      adminName: auth.payload.name,
      content:   parsed.data.content,
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/leads/[id]/notes]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/admin/leads/[id]/notes
 * List notes for a lead — admin only.
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
    const notes = await LeadNote.find({ leadId: id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, notes });
  } catch (err) {
    console.error("[GET /api/admin/leads/[id]/notes]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
