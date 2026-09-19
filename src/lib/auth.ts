import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET  = process.env.JWT_SECRET as string;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN ?? "6h";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

/* ─── Token payload ──────────────────────────────────────────────── */
export interface AdminTokenPayload {
  adminId: string;
  email:   string;
  role:    string;
  name:    string;
}

/* ─── Sign ───────────────────────────────────────────────────────── */
export function signToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
}

/* ─── Verify ─────────────────────────────────────────────────────── */
export function verifyToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

/* ─── Extract token from request ────────────────────────────────── */
export function extractToken(req: NextRequest): string | null {
  // 1. Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  // 2. Cookie (for browser sessions)
  const cookieToken = req.cookies.get("admin_token")?.value;
  return cookieToken ?? null;
}

/* ─── Auth guard — call at the top of admin API handlers ────────── */
export function requireAdmin(
  req: NextRequest
): { payload: AdminTokenPayload } | NextResponse {
  const token = extractToken(req);
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — no token provided" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — invalid or expired token" },
      { status: 401 }
    );
  }

  return { payload };
}

/* ─── Role guard ─────────────────────────────────────────────────── */
export function requireRole(
  req: NextRequest,
  allowedRoles: string[]
): { payload: AdminTokenPayload } | NextResponse {
  const result = requireAdmin(req);
  if (result instanceof NextResponse) return result;

  if (!allowedRoles.includes(result.payload.role)) {
    return NextResponse.json(
      { success: false, message: "Forbidden — insufficient permissions" },
      { status: 403 }
    );
  }

  return result;
}

/* ─── Set auth cookie helper ─────────────────────────────────────── */
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 6, // 6 hours in seconds
    path:     "/",
  });
}

/* ─── Clear auth cookie helper ───────────────────────────────────── */
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   0,
    path:     "/",
  });
}
