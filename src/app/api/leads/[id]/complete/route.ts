import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

const completeSchema = z.object({
  name:     z.string().trim().min(1).max(120),
  email:    z.string().email(),
  phone:    z.string().trim().max(30).optional(),
  formData: z.record(z.unknown()).optional(),
});

/**
 * POST /api/leads/[id]/complete
 * Marks a partial lead as COMPLETED when the user submits the full form.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ success: false, message: "Invalid lead id" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = completeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, formData } = parsed.data;

    await connectDB();

    /* Merge any final formData fields */
    const setObj: Record<string, unknown> = {
      status: "COMPLETED",
      completionPercent: 100,
      name,
      email,
    };
    if (phone) setObj.phone = phone;
    if (formData) {
      for (const [key, val] of Object.entries(formData)) {
        setObj[`formData.${key}`] = val;
      }
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: setObj },
      { new: true }
    );

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[POST /api/leads/[id]/complete]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
