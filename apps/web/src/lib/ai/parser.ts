import OpenAI from "openai";
import * as pdfParse from "pdf-parse";
import { resumeSchema, type ResumeData } from "./schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Step A: Extract Raw Text dari PDF Buffer
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    // Menangani kompatibilitas call antara namespace dan default function
    const parseFn = typeof pdfParse === "function" ? pdfParse : (pdfParse as any).default || pdfParse;
    const data = await parseFn(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error("Gagal mengurai file PDF: " + (error as Error).message);
  }
}

// Step B: Send Raw Text ke OpenAI & Validate Schema
export async function parseResumeWithAI(rawText: string): Promise<ResumeData> {
  const prompt = `Kamu adalah sistem ekstraksi ATS CV profesional. Ekstrak teks CV mentah berikut menjadi JSON terstruktur sesuai skema yang diminta. Jangan buat data fiktif jika tidak ada di CV.
  
Teks CV Mentah:
${rawText}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Tidak ada respons dari modul AI.");

  const jsonParsed = JSON.parse(content);
  
  return resumeSchema.parse(jsonParsed);
}