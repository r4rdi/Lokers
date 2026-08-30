import { NextRequest, NextResponse } from "next/server";
import { parseResumeWithAI, parseTextToJSON } from "@/lib/ai/parser";
import { dbPool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawText, userId } = body;

    if (!rawText) {
      return NextResponse.json(
        { success: false, error: "Teks CV (rawText) wajib diisi." },
        { status: 400 }
      );
    }

    // Memproses ekstraksi struktur data menggunakan AI Parser
    const parsedData = await parseResumeWithAI(rawText);

    // Opsional: Menyimpan riwayat ekstraksi ke dalam Database jika userId tersedia
    if (userId && dbPool) {
      const query = `
        INSERT INTO cv_extractions (user_id, raw_text, parsed_json, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING id;
      `;
      await dbPool.query(query, [userId, rawText, JSON.stringify(parsedData)]);
    }

    return NextResponse.json({
      success: true,
      message: "Ekstraksi CV berhasil diproses.",
      data: parsedData,
    });
  } catch (error: any) {
    console.error("API Error pada /api/cv/extract:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Terjadi kesalahan internal server.",
      },
      { status: 500 }
    );
  }
}