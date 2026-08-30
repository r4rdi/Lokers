import pdfParse from "pdf-parse-fork";

export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error: any) {
    throw new Error("Gagal mengurai file PDF: " + error.message);
  }
}
