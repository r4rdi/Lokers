import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { userResume, jobDetails } = await req.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `
Anda adalah seorang AI Career Coach & ATS Specialist.
Tugas Anda adalah menyesuaikan isi CV kandidat agar sangat cocok dengan target lowongan kerja.

Data CV Pengguna:
${JSON.stringify(userResume)}

Data Target Lowongan:
Posisi: ${jobDetails.job_title}
Perusahaan: ${jobDetails.company_name}
Deskripsi/Kualifikasi: ${jobDetails.raw_description}

Berikan output JSON dengan format:
{
  "atsMatchScore": 92,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "tailoredResume": { ...seluruh struktur userResume yang bullet point highlights-nya sudah disesuaikan menggunakan metode STAR dan menyisipkan kata kunci relevan... }
}
`;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Gagal menyesuaikan CV' }, { status: 500 });
  }
}