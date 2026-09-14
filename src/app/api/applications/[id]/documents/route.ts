import { NextRequest, NextResponse } from "next/server";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";

interface Props { params: { id: string } }

export async function GET(_request: NextRequest, { params }: Props) {
  const docs = MOCK_DOCUMENTS.filter((d) => d.applicationId === params.id);
  return NextResponse.json({ success: true, data: docs, total: docs.length });
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    // TODO: Validate auth, accept multipart/form-data, run malware scan,
    // store in S3 with encrypted key, create document record in DB
    // Emit document.uploaded event to Kafka
    return NextResponse.json(
      { success: false, message: "Document upload service not yet configured" },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
