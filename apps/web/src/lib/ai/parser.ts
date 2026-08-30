import { GoogleGenAI } from "@google/genai";
import pdfParse from "pdf-parse-fork";
import { resumeSchema, type ResumeData } from "./schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error("Gagal mengurai file PDF: " + (error as Error).message);
  }
}

export async function parseResumeWithAI(rawText: string): Promise<ResumeData> {
  const prompt = `Kamu adalah sistem ekstraksi ATS CV profesional. Ekstrak teks CV mentah berikut menjadi objek JSON persis sesuai struktur ini:

{
  "personal": {
    "name": "Nama Lengkap",
    "email": "email@example.com",
    "phone": "08123456789",
    "address": "Kota/Alamat",
    "linkedin": "url linkedin"
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "education": [
    {
      "institution": "Nama Universitas/Sekolah",
      "degree": "S1/Diploma/SMA",
      "field_of_study": "Jurusan",
      "graduation_year": "2023"
    }
  ],
  "experience": [
    {
      "company": "Nama Perusahaan",
      "position": "Jabatan",
      "start_date": "2021",
      "end_date": "2023",
      "description": "Deskripsi Pekerjaan"
    }
  ]
}

Aturan Penting:
1. "skills" WAJIB berupa Array of Strings tunggal, BUKAN Objek.
2. "graduation_year" WAJIB berupa String.
3. Jangan pernah mengubah nama key utama ("personal", "skills", "education", "experience").

Teks CV Mentah:
${rawText}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });

  const content = response.text;
  if (!content) throw new Error("Tidak ada respons dari modul AI Gemini.");

  let jsonParsed = JSON.parse(content);

  // Sanitasi Otomatis: Jika skills dikembalikan sebagai Objek oleh LLM, ubah menjadi Array
  if (jsonParsed.skills && !Array.isArray(jsonParsed.skills) && typeof jsonParsed.skills === "object") {
    jsonParsed.skills = Object.values(jsonParsed.skills).flat();
  }

  return resumeSchema.parse(jsonParsed);
}