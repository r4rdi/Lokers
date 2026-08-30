import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface ParsedCVData {
  fullName?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

export async function parseResumeWithAI(rawText: string): Promise<ParsedCVData> {
  if (!rawText || rawText.trim() === "") {
    throw new Error("Teks CV tidak boleh kosong.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Kamu adalah sistem AI parser CV/Resume profesional. 
    Ekstrak informasi dari teks resume berikut ke dalam format JSON yang valid.
    
    Hanya kembalikan JSON murni tanpa format markdown seperti \`\`\`json.
    
    Struktur JSON harus mengikuti skema berikut:
    {
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "summary": "string",
      "skills": ["string"],
      "experience": [
        {
          "title": "string",
          "company": "string",
          "duration": "string",
          "description": "string"
        }
      ],
      "education": [
        {
          "degree": "string",
          "institution": "string",
          "year": "string"
        }
      ]
    }

    Teks Resume:
    ${rawText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Membersihkan tag markdown jika AI secara tidak sengaja menambahkannya
    const cleanJSON = responseText.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanJSON) as ParsedCVData;
  } catch (error: any) {
    console.error("Gagal melakukan parse CV dengan AI:", error);
    throw new Error(`Gagal memproses data CV: ${error.message}`);
  }
}

// Menambahkan alias export untuk menjaga kompatibilitas impor lama
export { parseResumeWithAI as parseTextToJSON };