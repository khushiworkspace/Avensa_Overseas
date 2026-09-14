import { NextRequest, NextResponse } from "next/server";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicantId = searchParams.get("applicantId");
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);

  let apps = [...MOCK_APPLICATIONS];

  if (applicantId) apps = apps.filter((a) => a.applicantId === applicantId);
  if (status) apps = apps.filter((a) => a.status === status);

  const total = apps.length;
  const start = (page - 1) * pageSize;
  const data = apps.slice(start, start + pageSize);

  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Validate auth token, create application in DB
    // Emit application.created event to Kafka
    return NextResponse.json(
      { success: false, message: "Application creation service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
