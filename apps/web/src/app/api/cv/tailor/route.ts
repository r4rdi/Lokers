import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi SDK Gemini & Supabase
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Skema Validasi Output AI Menggunakan Zod
const TailoredOutputSchema = z.object({
  atsMatchScore: z.number().min(0).max(100),
  matchAnalysis: z.object({
    matchedSkills: z.array(z.string()),
    missingSkills: z.array(z.string()),
    matchedKeywords: z.array(z.string()),
    relevantExperiences: z.array(z.string()),
    relevantProjects: z.array(z.string()),
  }),
  tailoredResume: z.object({
    personal: z.object({
      fullName: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      headline: z.string(),
    }),
    summary: z.string(),
    experiences: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        highlights: z.array(z.string()),
      })
    ),
    skills: z.array(z.string()),
    projects: z.array(
      z.object({
        name: z.string(),
        technologies: z.array(z.string()),
        description: z.string(),
      })
    ),
    education: z.array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        fieldOfStudy: z.string(),
        graduationYear: z.string(),
      })
    ),
    certifications: z.array(z.string()),
  }),
  coverLetter: z.object({
    subject: z.string(),
    body: z.string(),
  }),
  recommendations: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetJob, currentCv, userId } = body;

    // Menarik variabel dari targetJob
    const jobTitle = targetJob?.jobTitle ?? "";
    const companyName = targetJob?.companyName ?? "";
    const jobDescription = targetJob?.rawDescription ?? "";
    const requiredSkills = targetJob?.requiredSkills ?? [];

    // System Prompt Pipeline
    const systemPrompt = `
Anda adalah "Lokers! AI Resume Tailor", sebuah AI profesional yang bertugas menyesuaikan CV kandidat terhadap lowongan kerja tertentu.

TUJUAN UTAMA:
Menganalisis CV kandidat dan lowongan target, kemudian menghasilkan versi CV yang lebih relevan tanpa mengarang pengalaman, pendidikan, proyek, sertifikasi, atau skill yang tidak terdapat dalam data kandidat.

ATURAN UTAMA:
1. Gunakan HANYA informasi yang tersedia pada CURRENT CV.
2. Jangan pernah mengarang pengalaman kerja, perusahaan, jabatan, pendidikan, atau skill baru.
3. Tandai requirement pekerjaan yang tidak ada pada CV sebagai "missing". Jangan diklaim.
4. ATS Match Score harus berupa angka 0 sampai 100 berdasarkan kecocokan nyata.
5. Kembalikan HANYA JSON murni yang sesuai dengan struktur tanpa markdown wrapper.

LOWONGAN TARGET:
Posisi: ${jobTitle}
Perusahaan: ${companyName}
Required Skills: ${JSON.stringify(requiredSkills)}
Deskripsi Lowongan: ${jobDescription}

CURRENT CV KANDIDAT:
${JSON.stringify(currentCv)}
`;

    // Eksekusi Generasi AI
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Model AI gagal menghasilkan respon.");
    }

    // Parsing & Validasi Zod
    const rawJson = JSON.parse(responseText);
    const validatedData = TailoredOutputSchema.parse(rawJson);

    // Persistensi Data ke Supabase
    const { data: dbData, error: dbError } = await supabase
      .from("generated_resumes")
      .insert({
        user_id: userId,
        job_title: jobTitle,
        company_name: companyName,
        ats_match_score: validatedData.atsMatchScore,
        match_analysis: validatedData.matchAnalysis,
        tailored_resume: validatedData.tailoredResume,
        cover_letter: validatedData.coverLetter,
        recommendations: validatedData.recommendations,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Supabase Error: ${dbError.message}`);
    }

    return NextResponse.json({
      success: true,
      data: dbData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses Tailored CV" },
      { status: 500 }
    );
  }
}