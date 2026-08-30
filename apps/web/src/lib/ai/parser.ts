import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface PersonalInfo {
  fullName?: string;
  full_name?: string; // Menambahkan opsi snake_case untuk mendukung komponen UI
  email?: string;
  phone?: string;
  summary?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ParsedCVData {
  personal?: PersonalInfo;
  fullName?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
}

export type ResumeData = ParsedCVData;

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
      "personal": {
        "fullName": "string",
        "full_name": "string",
        "email": "string",
        "phone": "string",
        "summary": "string",
        "location": "string",
        "linkedin": "string",
        "github": "string"
      },
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
    
    const cleanJSON = responseText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJSON) as ParsedCVData;
    
    // Sinkronisasi sinkron antara fullName dan full_name
    if (parsed.personal) {
      const name = parsed.personal.fullName || parsed.personal.full_name || parsed.fullName || parsed.full_name || "";
      parsed.personal.fullName = name;
      parsed.personal.full_name = name;
    } else {
      const name = parsed.fullName || parsed.full_name || "";
      parsed.personal = {
        fullName: name,
        full_name: name,
        email: parsed.email || "",
        phone: parsed.phone || "",
        summary: parsed.summary || "",
      };
    }
    
    return parsed;
  } catch (error: any) {
    console.error("Gagal melakukan parse CV dengan AI:", error);
    throw new Error(`Gagal memproses data CV: ${error.message}`);
  }
}

export { parseResumeWithAI as parseTextToJSON };