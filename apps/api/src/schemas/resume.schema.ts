import { z } from "zod";

export const resumeSchema = z.object({
  personal: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    linkedin: z.string().optional(),
  }),
  skills: z.union([
    z.array(z.string()),
    z.object({
      hard_skills: z.array(z.string()).optional(),
      soft_skills: z.array(z.string()).optional(),
      technical_skills: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional(),
    }),
  ]),
  education: z.array(
    z.object({
      degree: z.string(),
      field_of_study: z.string(),
      institution: z.string(),
      year: z.string().optional(),
    })
  ),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      description: z.string(),
    })
  ),
});

export type ResumeData = z.infer<typeof resumeSchema>;
