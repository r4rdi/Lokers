import pdfParse from "pdf-parse-fork";

export async function extractTextFromPDF(fileBuffer: Buffer): Promise<string> {
  try {
    const parsedData = await pdfParse(fileBuffer);
    return parsedData.text;
  } catch (error) {
    throw new Error("Gagal mengurai teks dari berkas PDF: " + (error as Error).message);
  }
}