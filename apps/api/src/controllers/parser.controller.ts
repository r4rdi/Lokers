import { Request, Response } from 'express';
import { extractRawTextFromPdf } from '../services/pdf-extract.service';
import { parseResumeWithAI } from '../services/llm-parser.service';

export async function parseResumeHandler(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File PDF wajib diunggah' });
    }

    // 1. Ekstraksi teks mentah dari PDF buffer
    const rawText = await extractRawTextFromPdf(req.file.buffer);

    if (!rawText || rawText.length < 50) {
      return res.status(422).json({ error: 'Dokumen PDF kosong atau tidak terbaca' });
    }

    // 2. Parsing teks mentah ke JSON terstruktur via Gemini LLM
    const structuredResume = await parseResumeWithAI(rawText);

    return res.status(200).json({
      success: true,
      data: structuredResume,
    });
  } catch (error: any) {
    console.error('Error parsing resume:', error);
    return res.status(500).json({ error: error.message || 'Terjadi kesalahan pada server saat parsing PDF' });
  }
}