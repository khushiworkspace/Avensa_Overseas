import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials format", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // TODO: Implement actual authentication via Keycloak / Auth0 / Cognito
    // For MVP: validate against user store, generate session token
    return NextResponse.json(
      { success: false, message: "Authentication service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
