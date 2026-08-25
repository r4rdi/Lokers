import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY belum terpasang di .env.local' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = (formData.get('file') || formData.get('resume')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File PDF wajib diunggah' }, { status: 400 });
    }

    // 1. Ekstraksi binary file ke Base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    // 2. Query ke Google ModelService.ListModels untuk mendeteksi model yang tersedia
    const listModelsRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
      method: 'GET',
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!listModelsRes.ok) {
      const errData = await listModelsRes.json();
      throw new Error(`Gagal otentikasi API Key: ${errData.error?.message || listModelsRes.statusText}`);
    }

    const { models } = await listModelsRes.json();

    // 3. Filter model yang aktif, mendukung generateContent, dan bukan model deprecated
    const validGenerateModels = (models || []).filter((m: any) =>
      m.supportedGenerationMethods?.includes('generateContent') &&
      !m.name.includes('2.5') // Hindari model 2.5 yang sudah deprecated
    );

    if (validGenerateModels.length === 0) {
      throw new Error('Tidak ada model Gemini yang mendukung generateContent untuk API Key ini.');
    }

    // Prioritaskan gemini-3.6-flash, lalu lini flash terbaru lainnya
    const selectedModelObj =
      validGenerateModels.find((m: any) => m.name.includes('gemini-3.6-flash')) ||
      validGenerateModels.find((m: any) => m.name.includes('3.6')) ||
      validGenerateModels.find((m: any) => m.name.includes('flash')) ||
      validGenerateModels[0];

    const modelResourceName = selectedModelObj.name; // Contoh: "models/gemini-3.6-flash"
    console.log(`[Lokers AI] Model aktif yang digunakan: ${modelResourceName}`);

    // 4. Kirim Permintaan Ekstraksi CV ke Model Terpilih
    const generateEndpoint = `https://generativelanguage.googleapis.com/v1beta/${modelResourceName}:generateContent`;

    const promptText = `Ekstrak data CV berikut dan hasilkan HANYA dalam format JSON murni tanpa pembungkus Markdown lain:
{
  "personal_info": {
    "full_name": "Nama Lengkap",
    "email": "Email",
    "phone": "Nomor HP/WA",
    "location": "Kota/Domisili",
    "headline": "Profesi/Keahlian Utama"
  },
  "experiences": [
    {
      "role": "Posisi",
      "company": "Nama Perusahaan",
      "period": "Waktu Kerja",
      "highlights": ["Pencapaian 1", "Pencapaian 2"]
    }
  ],
  "education": [
    {
      "institution": "Universitas/Sekolah",
      "degree": "Jenjang",
      "field_of_study": "Jurusan",
      "graduation_year": "Tahun Lulus"
    }
  ],
  "skills": ["Skill 1", "Skill 2"]
}`;

    const generatePayload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1,
      },
    };

    const generateRes = await fetch(generateEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(generatePayload),
    });

    const generateResult = await generateRes.json();

    if (!generateRes.ok) {
      throw new Error(generateResult.error?.message || `Ekstraksi gagal dengan status: ${generateRes.status}`);
    }

    // 5. Bersihkan respon JSON dari format Markdown code block
    let rawJsonText = generateResult.candidates?.[0]?.content?.parts?.[0]?.text || '';
    rawJsonText = rawJsonText.replace(/```json\n?|```/g, '').trim();

    const structuredData = JSON.parse(rawJsonText);

    return NextResponse.json({
      success: true,
      data: structuredData,
    });
  } catch (error: any) {
    console.error('[API Error Detail]:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengekstrak data dari dokumen PDF' },
      { status: 500 }
    );
  }
}