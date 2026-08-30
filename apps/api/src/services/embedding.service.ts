import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../schemas/resume.schema";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCVEmbedding(resume: ResumeData): Promise<number[]> {
  // 1. Formatting & Safe-guarding array data resume
  const skillsList = Array.isArray(resume.skills) 
    ? resume.skills.join(", ") 
    : typeof resume.skills === "object" && resume.skills !== null
      ? Object.values(resume.skills).flat().filter(Boolean).join(", ")
      : "";

  const educationList = (resume.education || [])
    .map((e) => `${e.degree || ''} ${e.field_of_study || ''} at ${e.institution || ''}`)
    .join("; ");

  const experienceList = (resume.experience || [])
    .map((ex) => `${ex.position || ''} at ${ex.company || ''}: ${ex.description || ''}`)
    .join("; ");

  const textToEmbed = `
    Skills: ${skillsList}
    Education: ${educationList}
    Experience: ${experienceList}
  `.trim();

  // 2. Gunakan model gemini-embedding-001 dengan paksaan dimensi 768
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: textToEmbed,
    config: {
      outputDimensionality: 768, // Menjamin kecocokan dengan kolom database PostgreSQL vector(768)
    },
  });

  const embeddingValues = response.embeddings?.[0]?.values;

  if (!embeddingValues) {
    throw new Error("Gagal membangkitkan vector embedding dari Google GenAI SDK.");
  }

  return embeddingValues;
}
