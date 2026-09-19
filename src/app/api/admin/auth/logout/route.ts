import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/auth";

/**
 * POST /api/admin/auth/logout
 * Clears the admin session cookie.
 */
export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  clearAuthCookie(res);
  return res;
}
