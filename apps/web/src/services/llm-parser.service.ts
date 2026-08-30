import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { resumeSchema, type ResumeData } from "@/schemas/resume.schema";

// Memastikan API Key terbaca dan tidak bernilai undefined/kosong
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY belum dikonfigurasi pada environment variable (.env.local).");
}

const ai = new GoogleGenAI({ apiKey });

const rawSchema = zodToJsonSchema(resumeSchema as any, { target: "openApi3" }) as any;
const { $schema, ...cleanSchema } = rawSchema;

function ensureArray<T>(value: any): T[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object" || typeof value === "string") return [value as T];
  return [];
}

export async function parseResumeWithAI(rawText: string): Promise<ResumeData> {
  const prompt = `Ekstrak data resume berikut ke JSON sesuai skema:\n${rawText}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: cleanSchema,
        temperature: 0,
      },
    });

    if (!response.text) {
      throw new Error("Respon teks dari AI kosong.");
    }

    const parsed = JSON.parse(response.text) as ResumeData;
    return {
      ...parsed,
      skills: ensureArray<string>(parsed.skills),
      education: ensureArray<any>(parsed.education),
      experience: ensureArray<any>(parsed.experience),
    };
  } catch (error: any) {
    throw new Error(`Gagal parsing CV: ${error.message}`);
  }
}