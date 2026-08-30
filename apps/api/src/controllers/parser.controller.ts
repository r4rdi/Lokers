import { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase"; // Path disesuaikan ke folder config
import { extractTextFromPDF } from "../services/pdf.service";
import { parseResumeWithAI } from "../services/llm-parser.service";
import { generateCVEmbedding } from "../services/embedding.service";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function parseResumeHandler(req: MulterRequest, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: "File PDF wajib diunggah." });
    }

    // 1. Ekstraksi & Parse AI
    const rawText = await extractTextFromPDF(file.buffer);
    const parsedData = await parseResumeWithAI(rawText);

    // 2. Generate Vector Embedding
    console.log("Membuat vector embedding...");
    const embedding = await generateCVEmbedding(parsedData);

    // 3. Simpan ke Supabase Database
    console.log("Memulai insert data ke tabel 'cvs' Supabase...");
    const { data, error } = await supabaseAdmin
      .from("cvs")
      .insert({
        raw_text: rawText,
        parsed_data: parsedData,
        skills: parsedData.skills,
        embedding: embedding,
      })
      .select();

    if (error) {
      console.error("Gagal Insert Supabase:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log("Berhasil Insert ke Supabase:", data);

    return res.status(200).json({
      success: true,
      message: "CV berhasil diparse dan disimpan ke Supabase!",
      data: data[0],
    });
  } catch (error: any) {
    console.error("Controller Error Catch:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Gagal memproses parsing CV.",
    });
  }
}