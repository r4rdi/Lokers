import { supabase } from "@/lib/supabase";
import { generateCVEmbedding } from "@/services/embedding.service";

const mockJobs = [
  {
    title: "Junior Frontend Developer",
    company: "Tech Start Indonesia",
    description: "Membuat antarmuka web interaktif menggunakan React, Next.js, dan Tailwind CSS.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
  },
  {
    title: "Backend Software Engineer",
    company: "Data Utama Solusindo",
    description: "Mengembangkan REST API, mengelola database PostgreSQL Supabase, dan arsitektur serverless.",
    skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "Docker", "REST API"]
  }
];

export async function seedJobs() {
  for (const job of mockJobs) {
    const dummyResumeData = {
      nama: job.title,
      skills: job.skills,
      education: [],
      experience: [{ position: job.title, company: job.company, description: job.description }]
    };

    const vector = await generateCVEmbedding(dummyResumeData as any);

    await supabase.from("jobs").insert({
      title: job.title,
      company: job.company,
      description: job.description,
      requirements: job.skills,
      embedding: vector
    });
  }
  console.log("Seeding Mock Jobs Sukses!");
}