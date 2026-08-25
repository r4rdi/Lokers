import * as pdfParseModule from 'pdf-parse';

// Handle interoperabilitas modul CommonJS/ESM
const pdfParse: any = (pdfParseModule as any).default || pdfParseModule;

export async function extractRawTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  } catch (error) {
    throw new Error('Gagal mengekstrak teks dari PDF');
  }
}