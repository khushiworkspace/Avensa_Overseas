import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/auth";

const patchBodySchema = z.object({
  status:     z.enum(["PARTIAL","COMPLETED","CONTACTED","FOLLOW_UP","CONVERTED","CLOSED"]).optional(),
  assignedTo: z.string().trim().max(120).optional(),
});

/**
 * GET /api/admin/leads
 * List / filter / search leads — admin only.
 *
 * Query params:
 *   page, pageSize, status, leadType, search (name/email/phone),
 *   from (ISO date), to (ISO date)
 */
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(req.url);
    const page     = Math.max(1, Number(searchParams.get("page")     ?? 1));
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? 20)));
    const status   = searchParams.get("status");
    const leadType = searchParams.get("leadType");
    const search   = searchParams.get("search")?.trim();
    const from     = searchParams.get("from");
    const to       = searchParams.get("to");

    await connectDB();

    /* Build filter */
    const filter: Record<string, unknown> = {};
    if (status   && status   !== "all") filter.status   = status;
    if (leadType && leadType !== "all") filter.leadType = leadType;

    if (search) {
      const regex = { $regex: search, $options: "i" };
      filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    if (from || to) {
      const dateFilter: Record<string, Date> = {};
      if (from) dateFilter.$gte = new Date(from);
      if (to)   dateFilter.$lte = new Date(to);
      filter.createdAt = dateFilter;
    }

    const [total, leads] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data:  leads,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("[GET /api/admin/leads]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
