import { z } from "zod";

export const resumeSchema = z.object({
  personal: z
    .object({
      name: z.string().default(""),
      email: z.string().default(""),
      phone: z.string().default(""),
      address: z.string().default(""),
      linkedin: z.string().default(""),
    })
    // Lengkapi seluruh properti pada objek default
    .default({
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
    }),

  skills: z.array(z.string()).default([]),

  education: z
    .array(
      z.object({
        institution: z.string().default(""),
        degree: z.string().default(""),
        field_of_study: z.string().default(""),
        graduation_year: z
          .union([z.string(), z.number()])
          .transform((val) => String(val ?? ""))
          .default(""),
      })
    )
    .default([]),

  experience: z
    .array(
      z.object({
        company: z.string().default(""),
        position: z.string().default(""),
        start_date: z.string().default(""),
        end_date: z.string().default(""),
        description: z.string().default(""),
      })
    )
    .default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;