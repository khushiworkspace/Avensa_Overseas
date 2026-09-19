import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Routes jo protect nahi karni (login page khud)
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Sirf /admin/* routes check karo
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Login page publicly accessible hai
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Token dhundho — pehle cookie mein, phir Authorization header mein
  const cookieToken = req.cookies.get("admin_token")?.value;
  const headerToken = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookieToken ?? headerToken;

  // Token nahi mila — login pe redirect
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname); // login ke baad wapas aane ke liye
    return NextResponse.redirect(loginUrl);
  }

  // Token verify karo
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Invalid ya expired token — login pe redirect
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    const res = NextResponse.redirect(loginUrl);
    // Purana invalid cookie clear kar do
    res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Saare /admin routes match karo except static files
    "/admin/:path*",
  ],
};
