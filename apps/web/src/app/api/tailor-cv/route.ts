import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { userProfile, jobDetails } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      Anda adalah Career Consultant Profesional & Ahli ATS (Applicant Tracking System).
      Tugas Anda adalah memodifikasi (tailor) CV pengguna agar SELARAS DENGAN SANGAT PRESISI terhadap kualifikasi lowongan target.

      Aturan Penting:
      1. JANGAN PERNAH MENAMBAHKAN pengalaman atau skill palsu yang tidak ada pada CV asli pengguna.
      2. Tonjolkan pencapaian dan kata kunci (keywords) yang paling relevan dengan requirement pekerjaan.
      3. Hitung perkiraan ATS Match Score (0-100%).
      4. Buatkan 1 draft Cover Letter yang persuasif dan profesional.

      Target Lowongan:
      Judul: ${jobDetails.title}
      Perusahaan: ${jobDetails.company}
      Deskripsi & Requirements: ${JSON.stringify(jobDetails.requirements)}

      Profil Pengguna Asli:
      ${JSON.stringify(userProfile)}

      Kembalikan HANYA format JSON valid tanpa markdown tambahan:
      {
        "ats_match_score": 88,
        "tailored_summary": "string",
        "highlighted_skills": ["string"],
        "optimized_experiences": [
          {
            "position": "string",
            "company": "string",
            "bullet_points": ["string"]
          }
        ],
        "cover_letter": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    const tailoredOutput = JSON.parse(responseText);

    return NextResponse.json({ result: tailoredOutput });
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal membuat Tailored CV: ' + error.message }, { status: 500 });
  }
}