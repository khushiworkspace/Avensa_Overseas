import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

/* ── Validation schema ── */
const patchSchema = z.object({
  name:              z.string().trim().max(120).optional(),
  email:             z.string().email().optional().or(z.literal("")),
  phone:             z.string().trim().max(30).optional(),
  formData:          z.record(z.unknown()).optional(),
  completionPercent: z.number().min(0).max(100).optional(),
  lastStep:          z.number().int().min(1).optional(),
});

/**
 * PATCH /api/leads/[id]
 * Autosave — updates an existing partial lead.
 * The frontend sends the draftId it received from POST /api/leads/draft.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid lead id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();

    /* Build update — only merge formData fields, never wipe existing ones */
    const update: Record<string, unknown> = {};
    const { name, email, phone, formData, completionPercent, lastStep } = parsed.data;
    if (name  !== undefined) update.name  = name;
    if (email !== undefined) update.email = email || undefined;
    if (phone !== undefined) update.phone = phone;
    if (completionPercent !== undefined) update.completionPercent = completionPercent;
    if (lastStep          !== undefined) update.lastStep          = lastStep;

    /* Deep-merge formData so we never lose previously saved fields */
    const setObj: Record<string, unknown> = { ...update };
    if (formData) {
      for (const [key, val] of Object.entries(formData)) {
        setObj[`formData.${key}`] = val;
      }
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: id, status: { $in: ["PARTIAL"] } }, // only update partial leads
      { $set: setObj },
      { new: true }
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, message: "Lead not found or already completed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[PATCH /api/leads/[id]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
