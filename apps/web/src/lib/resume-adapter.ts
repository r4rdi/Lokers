// apps/web/src/lib/resume-adapter.ts
import { ResumeData as FormResumeData } from '@/stores/useResumeStore';
import { ResumeData as TemplateResumeData } from '@/templates/resume/types';

export function mapStoreDataToTemplate(data: FormResumeData | null): TemplateResumeData {
  if (!data) {
    return {
      personal: { fullName: '', email: '' },
      experiences: [],
      education: [],
      skills: [],
    };
  }

  return {
    personal: {
      fullName: data.personal_info?.full_name || '',
      email: data.personal_info?.email || '',
      phone: data.personal_info?.phone || '',
      location: data.personal_info?.location || '',
      headline: data.personal_info?.headline || '',
    },
    summary: data.personal_info?.headline ? `Profesional dengan fokus pada bidang ${data.personal_info.headline}. Memiliki keahlian teruji dalam pengembangan solusi teknologi.` : undefined,
    experiences: (data.experiences || []).map((exp) => ({
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      highlights: exp.highlights || [],
    })),
    education: (data.education || []).map((edu) => ({
      institution: edu.institution || '',
      degree: edu.degree || '',
      fieldOfStudy: edu.field_of_study || '',
      graduationYear: edu.graduation_year || '',
    })),
    skills: data.skills || [],
  };
}