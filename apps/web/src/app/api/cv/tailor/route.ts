import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TailoredOutputSchema = z.object({
  atsMatchScore: z.number().min(0).max(100),
  matchAnalysis: z.object({
    matchedSkills: z.array(z.string()),
    missingSkills: z.array(z.string()),
    matchedKeywords: z.array(z.string()),
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
  }),
  coverLetter: z.object({
    subject: z.string(),
    body: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, userId } = body;

    if (!jobId || !userId) {
      return NextResponse.json({ success: false, error: "Missing jobId or userId" }, { status: 400 });
    }

    // 1. Cek Sisa Kredit User Terlebih Dahulu
    const { data: creditData } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_id", userId)
      .single();

    if (!creditData || creditData.credits < 1) {
      return NextResponse.json(
        { success: false, error: "Kredit AI Anda telah habis." },
        { status: 403 }
      );
    }

    // 2. Ambil Master Job Data (jobs) dan Master CV (user_resumes)
    const [jobRes, cvRes] = await Promise.all([
      supabase.from("jobs").select("*").eq("id", jobId).single(),
      supabase.from("user_resumes").select("*").eq("user_id", userId).eq("is_primary", true).single(),
    ]);

    if (jobRes.error || !jobRes.data) throw new Error("Lowongan kerja tidak ditemukan.");
    if (cvRes.error || !cvRes.data) throw new Error("CV Utama belum dikonfirmasi di halaman review.");

    const targetJob = jobRes.data;
    const masterCv = cvRes.data.parsed_data;

    // 3. Eksekusi Gemini AI
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
Anda adalah Lokers! AI Resume Tailor.
Tujuan: Menyesuaikan CV pengguna dengan lowongan kerja secara akurat tanpa mengarang fakta baru.

LOWONGAN TARGET:
Judul: ${targetJob.title}
Perusahaan: ${targetJob.company}
Deskripsi: ${targetJob.description}
Skills: ${JSON.stringify(targetJob.required_skills)}

CV MASTER:
${JSON.stringify(masterCv)}
`;

    const aiResponse = await model.generateContent(prompt);
    const responseText = aiResponse.response.text();
    if (!responseText) throw new Error("Gagal mendapatkan respon dari AI.");

    const validatedData = TailoredOutputSchema.parse(JSON.parse(responseText));

    // 4. Simpan ke generated_resumes
    const { data: dbData, error: dbError } = await supabase
      .from("generated_resumes")
      .insert({
        user_id: userId,
        job_title: targetJob.title,
        company_name: targetJob.company,
        ats_match_score: validatedData.atsMatchScore,
        match_analysis: validatedData.matchAnalysis,
        tailored_resume: validatedData.tailoredResume,
        cover_letter: validatedData.coverLetter,
      })
      .select()
      .single();

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    // 5. Potong Kredit Menggunakan RPC Atomic (Opsi 2B)
    const { data: deductSuccess } = await supabase.rpc("deduct_user_credit", {
      target_user_id: userId,
    });

    if (!deductSuccess) {
      throw new Error("Gagal mengesahkan pemotongan kredit.");
    }

    return NextResponse.json({ success: true, data: dbData });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal memproses AI Tailor." },
      { status: 500 }
    );
  }
}