import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { IMMIGRATION_ROUTES } from "@/lib/constants";

const schema = z.object({
  nationality: z.string().min(1),
  residenceCountry: z.string().min(1),
  destinationCountry: z.string().min(1),
  purpose: z.string().min(1),
  dateOfBirth: z.string(),
  education: z.string(),
  occupation: z.string(),
  yearsExperience: z.number().optional(),
  hasJobOffer: z.boolean().optional(),
  annualSalary: z.number().optional(),
  languageProficiency: z.string().optional(),
  familyStatus: z.string().optional(),
  currentStatus: z.string().optional(),
  passportExpiry: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { destinationCountry, purpose } = parsed.data;

    // Return candidate routes for the given country and purpose
    const candidateRoutes = IMMIGRATION_ROUTES.filter(
      (r) => r.countryId === destinationCountry && r.category === purpose && r.status === "active"
    );

    return NextResponse.json({
      success: true,
      data: {
        eligibleRoutes: candidateRoutes,
        ruleVersion: "2024.1",
        effectiveDate: "2024-01-01",
        assessedAt: new Date().toISOString(),
        disclaimer:
          "This result is preliminary guidance only and does not constitute a legal determination. Final decisions are made by the competent national authority.",
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
