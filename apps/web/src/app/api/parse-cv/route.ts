import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    try {
        const { rawText } = await request.json();

        if (!rawText) {
            return NextResponse.json({ error: 'Teks CV tidak boleh kosong' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
      Anda adalah HR Tech Specialist & Resume Extractor. 
      Ekstrak data CV berikut ke dalam format JSON yang sah tanpa markdown formatting (hanya raw JSON).
      
      Struktur JSON yang harus dikembalikan:
      {
        "full_name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "headline": "string",
        "summary": "string",
        "skills": ["string"],
        "experiences": [
          {
            "company": "string",
            "position": "string",
            "start_date": "string",
            "end_date": "string",
            "description": "string"
          }
        ],
        "education": [
          {
            "institution": "string",
            "degree": "string",
            "field_of_study": "string",
            "graduation_year": "string"
          }
        ]
      }

      Berikut teks CV pengguna:
      ${rawText}
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json|```/g, '').trim();
        const parsedData = JSON.parse(responseText);

        return NextResponse.json({ data: parsedData });
    } catch (error: any) {
        return NextResponse.json({ error: 'Gagal memproses CV: ' + error.message }, { status: 500 });
    }
}