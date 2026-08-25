import { Request, Response } from 'express';
import { generatePdfFromTemplate } from '../services/puppeteer.service';

export async function renderPdfHandler(req: Request, res: Response) {
  try {
    const { resumeData, styling } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Payload resumeData tidak boleh kosong' });
    }

    // Render HTML template menjadi Vector PDF via Puppeteer
    const pdfBuffer = await generatePdfFromTemplate(resumeData, styling || {});

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Lokers_Tailored_Resume.pdf');
    return res.send(pdfBuffer);
  } catch (error: any) {
    console.error('Error rendering PDF:', error);
    return res.status(500).json({ error: 'Gagal membuat file PDF' });
  }
}