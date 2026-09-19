import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import AdminUser from "@/models/AdminUser";
import { signToken, setAuthCookie } from "@/lib/auth";

/* ── Rate-limit (per IP) ── */
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

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

/**
 * POST /api/admin/auth/login
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many login attempts — try again in a minute" },
      { status: 429 }
    );
  }

  try {
    const body   = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password format" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    await connectDB();

    /* Fetch user with password (field is `select: false` by default) */
    const user = await AdminUser.findOne({ email, isActive: true }).select("+password");
    if (!user) {
      // Constant-time response to prevent user enumeration
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    /* Update last login timestamp */
    user.lastLoginAt = new Date();
    await user.save();

    const token = signToken({
      adminId: user._id.toString(),
      email:   user.email,
      role:    user.role,
      name:    user.name,
    });

    const res = NextResponse.json({
      success: true,
      admin: {
        id:    user._id.toString(),
        name:  user.name,
        email: user.email,
        role:  user.role,
      },
      token, // also return token so SPA can store it
    });

    setAuthCookie(res, token);
    return res;
  } catch (err) {
    console.error("[POST /api/admin/auth/login]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
