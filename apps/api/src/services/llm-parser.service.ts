import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { resumeSchema, type ResumeData } from "../schemas/resume.schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Konversi Zod Schema ke format OpenAPI 3.0
const rawSchema = zodToJsonSchema(resumeSchema as any, { target: "openApi3" }) as any;
const { $schema, ...cleanSchema } = rawSchema;

// Daftar model prioritas (Primary -> Fallback)
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
];

// Helper Function: Delay / Sleep
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function parseResumeWithAI(rawText: string): Promise<ResumeData> {
  let lastError: any = null;

  // 1. Loop melalui daftar model (Fallback Strategy)
  for (const modelName of CANDIDATE_MODELS) {
    // 2. Cobalah hingga 3 kali percobaan per model (Retry Mechanism)
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[AI Parsing] Mencoba model ${modelName} (Percobaan ke-${attempt})...`);

        const response = await ai.models.generateContent({
          model: modelName,
          contents: `Ekstrak informasi dari resume berikut menjadi JSON presisi sesuai skema:\n\n${rawText}`,
          config: {
            responseMimeType: "application/json",
            responseSchema: cleanSchema,
          },
        });

        if (response.text) {
          return JSON.parse(response.text) as ResumeData;
        }
      } catch (error: any) {
        lastError = error;
        console.warn(`[AI Warning] Model ${modelName} gagal pada percobaan ke-${attempt}:`, error.message);

        // Jika error 503 (Overload), tunggu sebelum mencoba lagi (Exponential Backoff: 1s, 2s, 4s)
        if (error.message?.includes("503") || error.status === 503) {
          await sleep(1000 * Math.pow(2, attempt - 1));
        } else {
          // Jika error lain (bukan 503), langsung ganti ke model berikutnya
          break;
        }
      }
    }
  }

  throw new Error(`Seluruh model AI sedang tidak tersedia/overload. Error terakhir: ${lastError?.message || "Unknown error"}`);
}
