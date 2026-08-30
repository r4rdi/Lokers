import { z } from "zod";

export const resumeSchema = z.object({
  personal: z
    .object({
      name: z.string().optional().default(""),
      full_name: z.string().optional().default(""),
      email: z.string().optional().default(""),
      phone: z.string().optional().default(""),
      address: z.string().optional().default(""),
      linkedin: z.string().optional().default(""),
    })
    .default({
      name: "",
      full_name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
    }),

  summary: z.string().optional().default(""),

  skills: z.array(z.string()).default([]),

  education: z
    .array(
      z.object({
        institution: z.string().optional().default(""),
        degree: z.string().optional().default(""),
        field_of_study: z.string().optional().default(""),
        graduation_year: z
          .union([z.string(), z.number()])
          .transform((val) => String(val ?? ""))
          .optional()
          .default(""),
      })
    )
    .default([]),

  experience: z
    .array(
      z.object({
        company: z.string().optional().default(""),
        position: z.string().optional().default(""),
        start_date: z.string().optional().default(""),
        end_date: z.string().optional().default(""),
        description: z.string().optional().default(""),
      })
    )
    .default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;