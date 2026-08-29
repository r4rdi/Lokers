import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF, parseResumeWithAI } from "@/lib/ai/parser";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File PDF wajib diunggah." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Format file harus berupa PDF." },
        { status: 400 }
      );
    }

    // Convert file browser ArrayBuffer ke Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Pipeline Execution
    const rawText = await extractTextFromPDF(buffer);
    const parsedResume = await parseResumeWithAI(rawText);

    return NextResponse.json({
      success: true,
      data: parsedResume,
    });
  } catch (error: any) {
    console.error("[CV_PARSE_ERROR]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Terjadi kesalahan server internal." },
      { status: 500 }
    );
  }
}