import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { generateCVEmbedding } from "@/services/embedding.service";

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 });
    }

    const body = await req.json();
    const { cv_id, parsed_data, skills } = body;

    if (!cv_id || !parsed_data) {
      return NextResponse.json({ success: false, message: "ID CV dan parsed_data wajib diisi." }, { status: 400 });
    }

    // Update data CV yang telah dikonfirmasi pengguna di Supabase
    const { data: updatedCV, error: dbError } = await supabase
      .from("cvs")
      .update({
        parsed_data: parsed_data,
        skills: skills || parsed_data.skills || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", cv_id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (dbError) throw dbError;

    // Async Background Re-embedding: Menghasilkan ulang vektor 768-dimensi dari data yang sudah dikoreksi
    (async () => {
      try {
        const vector = await generateCVEmbedding(parsed_data);
        if (vector) {
          await supabase.from("cvs").update({ embedding: vector }).eq("id", cv_id);
        }
      } catch (err) {
        console.error(`[Re-Embedding Error] CV ID: ${cv_id}:`, err);
      }
    })();

    return NextResponse.json({
      success: true,
      message: "CV berhasil diperbarui dan disetujui!",
      data: updatedCV,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Kesalahan server." }, { status: 500 });
  }
}