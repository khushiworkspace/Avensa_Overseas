import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/leads/stats
 * Returns aggregate counts for the admin dashboard.
 */
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await connectDB();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
      total,
      partial,
      completed,
      newToday,
      byStatus,
      byType,
    ] = await Promise.all([
      Lead.countDocuments({}),
      Lead.countDocuments({ status: "PARTIAL" }),
      Lead.countDocuments({ status: "COMPLETED" }),
      Lead.countDocuments({ createdAt: { $gte: todayStart } }),
      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $group: { _id: "$leadType", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total,
        partial,
        completed,
        newToday,
        byStatus:  byStatus.map((s) => ({ status: s._id, count: s.count })),
        byType:    byType.map((t)   => ({ type: t._id,   count: t.count })),
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/leads/stats]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
