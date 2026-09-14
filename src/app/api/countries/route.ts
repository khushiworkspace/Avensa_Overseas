import { NextRequest, NextResponse } from "next/server";
import { COUNTRIES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const schengen = searchParams.get("schengen");

  let countries = [...COUNTRIES];

  if (status) {
    countries = countries.filter((c) => c.status === status);
  }
  if (schengen === "true") {
    countries = countries.filter((c) => c.schengen);
  }

  return NextResponse.json({
    success: true,
    data: countries,
    total: countries.length,
  });
}
