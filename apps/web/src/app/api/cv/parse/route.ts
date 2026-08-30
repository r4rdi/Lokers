import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { parseResumeWithAI } from "@/services/llm-parser.service";
import { generateCVEmbedding } from "@/services/embedding.service";

const pdfParse = require("pdf-parse-fixed");

// Respon ramah UI/UX saat endpoint diakses via browser (GET)
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Endpoint /api/cv/parse aktif. Silakan kirimkan request POST (multipart/form-data) untuk memproses CV.",
  });
}

export async function POST(req: Request) {
  try {
    // 1. Resolve Promise cookies() sesuai standar Next.js App Router terbaru
    const cookieStore = await cookies();

    // 2. Inisialisasi Supabase Server Client dengan cookies yang telah resolved
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // 3. Verifikasi Autentikasi User (Supabase Auth)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    // 4. Ekstraksi Dokumen PDF
    let rawText = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: "File PDF tidak ditemukan." },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdfData = await pdfParse(Buffer.from(arrayBuffer));
      rawText = pdfData.text;
    } else {
      const body = await req.json();
      rawText = body.raw_text || "";
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { success: false, message: "Teks resume kosong atau tidak terdeteksi." },
        { status: 400 }
      );
    }

    // 5. AI Parsing (Gemini Multimodal Engine)
    const parsedResult = await parseResumeWithAI(rawText);

    // 6. Simpan Data Parsed ke Supabase (Embedding di-set NULL sementara)
    const { data: insertedCV, error: dbError } = await supabase
      .from("cvs")
      .insert({
        user_id: user.id,
        raw_text: rawText,
        parsed_data: parsedResult,
        skills: parsedResult.skills || [],
        embedding: null,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // 7. Background Job: Asynchronous Vector Embedding (Non-blocking UI)
    (async () => {
      try {
        const vector = await generateCVEmbedding(parsedResult);
        if (vector) {
          await supabase
            .from("cvs")
            .update({ embedding: vector })
            .eq("id", insertedCV.id);
        }
      } catch (err) {
        console.error(`[Async Embedding Background Error] CV ID: ${insertedCV.id}:`, err);
      }
    })();

    // 8. Kembalikan Respon Sukses ke Client Page (/upload)
    return NextResponse.json({
      success: true,
      message: "CV berhasil diunggah dan sedang diolah oleh AI Matching.",
      data: insertedCV,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}