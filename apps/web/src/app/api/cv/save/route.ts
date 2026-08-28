import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, title, parsedData } = body;

    if (!userId || !parsedData) {
      return NextResponse.json(
        { success: false, error: "UserId dan parsedData wajib diisi." },
        { status: 400 }
      );
    }

    // Simpan ke tabel user_resumes
    const { data, error } = await supabase
      .from("user_resumes")
      .insert({
        user_id: userId,
        title: title || "CV Utama",
        parsed_data: parsedData,
        is_primary: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase Insert Error: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Gagal menyimpan CV." },
      { status: 500 }
    );
  }
}