import { NextRequest, NextResponse } from "next/server";
import { IMMIGRATION_ROUTES } from "@/lib/constants";

interface Props { params: { id: string } }

export async function GET(_request: NextRequest, { params }: Props) {
  const routes = IMMIGRATION_ROUTES.filter(
    (r) => r.countryId === params.id && r.status === "active"
  );

  return NextResponse.json({
    success: true,
    data: routes,
    total: routes.length,
  });
}
