import { ResumeData } from "@/schemas/resume.schema";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateCVEmbedding(resume: ResumeData): Promise<number[] | null> {
  if (!apiKey) {
    console.error("GEMINI_API_KEY tidak ditemukan.");
    return null;
  }

  // Data Analyst: Merangkai konteks data terstruktur
  const skillsText = Array.isArray(resume.skills) ? resume.skills.join(", ") : "";
  const eduText = Array.isArray(resume.education)
    ? resume.education.map((e) => `${e.degree || ""} ${e.field_of_study || ""} ${e.institution || ""}`).join(" ")
    : "";
  const expText = Array.isArray(resume.experience)
    ? resume.experience.map((e) => `${e.position || ""} ${e.company || ""} ${e.description || ""}`).join(" ")
    : "";

  const combinedText = `Nama: ${resume.nama || ""}. Skills: ${skillsText}. Pendidikan: ${eduText}. Pengalaman: ${expText}`.trim();
  const textToEmbed = combinedText.length > 0 ? combinedText : "Kandidat Resume";

  // URL REST API Gemini resmi untuk text-embedding-004
  const url = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Catatan ML: Jangan masukkan field "model" di dalam body jika URL sudah menyebutkan nama model
        content: {
          parts: [{ text: textToEmbed }]
        }
      })
    });

    const data = await response.json();

    if (response.ok && data?.embedding?.values) {
      return data.embedding.values;
    }

    console.warn("[Embedding Warning] Google API Error:", data?.error?.message || response.statusText);
    return null; // Graceful fallback jika embedding gagal
  } catch (err: any) {
    console.error("[Embedding Exception]:", err.message);
    return null; // Graceful fallback
  }
}