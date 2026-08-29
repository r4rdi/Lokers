import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf/extractor";
import { parseTextToJSON } from "@/lib/ai/parser";
import { dbPool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "Berkas PDF wajib diunggah" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Ekstraksi teks dari PDF
    const rawText = await extractTextFromPDF(buffer);

    // 2. Transformasi ke JSON Terstruktur via OpenAI
    const structuredData = await parseTextToJSON(rawText);

    // 3. Simpan ke Database PostgreSQL
    const insertQuery = `
      INSERT INTO resumes (user_id, full_name, email, phone, summary, raw_parsed_data)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [
      userId,
      structuredData.personal.full_name,
      structuredData.personal.email,
      structuredData.personal.phone,
      structuredData.summary,
      JSON.stringify(structuredData),
    ];

    const dbResult = await dbPool.query(insertQuery, values);

    return NextResponse.json({
      success: true,
      resumeId: dbResult.rows[0].id,
      data: structuredData,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}