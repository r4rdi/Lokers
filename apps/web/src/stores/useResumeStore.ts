import { create } from 'zustand';

export interface ResumeData {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    headline: string;
  };
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }>;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    graduation_year: string;
  }>;
}

export interface JobItem {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  match_score?: number;
  required_skills: string[];
  raw_description: string;
}

interface ResumeStoreState {
  resumeData: ResumeData | null;
  selectedJob: JobItem | null;
  styling: {
    templateId: 'minimalist-ats' | 'modern-sidebar' | 'executive-serif';
    fontFamily: string;
    accentColor: string;
    fontSize: string;
    lineSpacing: number;
  };
  setResumeData: (data: ResumeData) => void;
  setSelectedJob: (job: JobItem) => void;
  setStyling: (styling: Partial<ResumeStoreState['styling']>) => void;
}

export const useResumeStore = create<ResumeStoreState>((set) => ({
  resumeData: null,
  selectedJob: null,
  styling: {
    templateId: 'minimalist-ats',
    fontFamily: 'Inter',
    accentColor: '#2563EB',
    fontSize: '10pt',
    lineSpacing: 1.3,
  },
  setResumeData: (data) => set({ resumeData: data }),
  setSelectedJob: (job) => set({ selectedJob: job }),
  setStyling: (newStyling) =>
    set((state) => ({ styling: { ...state.styling, ...newStyling } })),
}));