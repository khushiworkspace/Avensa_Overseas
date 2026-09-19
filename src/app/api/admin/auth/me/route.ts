import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/admin/auth/me
 * Returns the currently authenticated admin's profile.
 */
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  try {
    await connectDB();
    const user = await AdminUser.findById(auth.payload.adminId).lean();
    if (!user) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      admin: {
        id:          user._id.toString(),
        name:        user.name,
        email:       user.email,
        role:        user.role,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/auth/me]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
