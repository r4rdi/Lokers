import { z } from "zod";

export const resumeSchema = z.object({
  nama: z.string().describe("Nama lengkap candidate dari resume"),
  kontak: z.string().describe("Informasi kontak seperti Email, Nomor Telepon, Alamat, LinkedIn, atau GitHub"),
  skills: z
    .array(z.string())
    .describe(
      "Daftar keahlian teknis, bahasa pemrograman, framework, database, dan tools. Contoh: ['JavaScript', 'TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Docker', 'Git']"
    ),
  education: z
    .array(
      z.object({
        institution: z.string().optional(),
        degree: z.string().optional(),
        field_of_study: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        company: z.string().optional(),
        position: z.string().optional(),
        duration: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>;