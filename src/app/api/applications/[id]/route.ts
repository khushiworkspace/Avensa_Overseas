import { NextRequest, NextResponse } from "next/server";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

interface Props { params: { id: string } }

export async function GET(_request: NextRequest, { params }: Props) {
  const app = MOCK_APPLICATIONS.find((a) => a.id === params.id);

  if (!app) {
    return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: app });
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const app = MOCK_APPLICATIONS.find((a) => a.id === params.id);

    if (!app) {
      return NextResponse.json({ success: false, message: "Application not found" }, { status: 404 });
    }

    // TODO: Validate auth, permissions, update in DB, emit status change event
    return NextResponse.json(
      { success: false, message: "Application update service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
