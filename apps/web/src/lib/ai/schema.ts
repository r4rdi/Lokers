import { z } from "zod";

export const resumeSchema = z.object({
  personal: z.object({
    full_name: z.string().default(""),
    email: z.string().email().or(z.literal("")).default(""),
    phone: z.string().default(""),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  summary: z.string().default(""),
  skills: z.array(z.string()).default([]),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      start_date: z.string(),
      end_date: z.string().optional(),
      description: z.string(),
    })
  ).default([]),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      field_of_study: z.string().optional(),
      graduation_year: z.string(),
    })
  ).default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;