import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";
import { z } from "zod";

// Menggunakan require untuk menghindari error tipe ES Module pada pdf-parse
const pdfParse = require("pdf-parse");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const ParsedCvSchema = z.object({
  personal: z.object({
    fullName: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    headline: z.string().default(""),
  }),
  summary: z.string().default(""),
  experiences: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      period: z.string(),
      highlights: z.array(z.string()),
    })
  ).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(
    z.object({
      name: z.string(),
      technologies: z.array(z.string()),
      description: z.string(),
    })
  ).default([]),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      graduationYear: z.string(),
    })
  ).default([]),
  certifications: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "File tidak ditemukan." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let rawText = "";

    if (file.name.endsWith(".pdf")) {
      // Ekstraksi teks dari PDF secara langsung
      const pdfData = await pdfParse(buffer);
      rawText = pdfData.text;
    } else if (file.name.endsWith(".docx")) {
      const docxData = await mammoth.extractRawText({ buffer });
      rawText = docxData.value;
    } else {
      return NextResponse.json(
        { success: false, error: "Format file harus .pdf atau .docx" },
        { status: 400 }
      );
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { success: false, error: "Gagal membaca teks dari file dokumen." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
Anda adalah AI CV Parser. Tugas Anda adalah mengekstrak teks mentah dari CV pengguna menjadi format JSON yang sangat rapi dan terstruktur.

ATURAN PARSING:
1. Ekstrak data apa adanya tanpa mengarang informasi baru.
2. Jika ada informasi yang tidak ditemukan, beri nilai string kosong "" atau array kosong [].
3. Kelompokkan skill secara eksplisit.
4. Kembalikan HANYA JSON sesuai struktur yang diwajibkan.

TEKS RAW CV:
${rawText}
`;

    const aiResponse = await model.generateContent(prompt);
    const responseText = aiResponse.response.text();

    if (!responseText) {
      throw new Error("Gemini AI gagal memproses ekstraksi teks.");
    }

    const parsedJson = JSON.parse(responseText);
    const validatedCvData = ParsedCvSchema.parse(parsedJson);

    return NextResponse.json({
      success: true,
      data: validatedCvData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal melakukan ekstraksi CV." },
      { status: 500 }
    );
  }
}