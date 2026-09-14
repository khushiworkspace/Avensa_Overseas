import { NextRequest, NextResponse } from "next/server";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const unreadOnly = searchParams.get("unread") === "true";

  let notifs = [...MOCK_NOTIFICATIONS];
  if (userId) notifs = notifs.filter((n) => n.userId === userId);
  if (unreadOnly) notifs = notifs.filter((n) => !n.read);

  notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ success: true, data: notifs, total: notifs.length });
}
