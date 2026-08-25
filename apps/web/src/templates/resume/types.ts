export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    headline?: string;
  };
  summary?: string;
  experiences: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    graduationYear?: string;
  }[];
  skills: string[];
  projects?: {
    name: string;
    technologies: string[];
    description: string;
  }[];
}

export interface StylingProps {
  fontFamily: string;
  accentColor: string;
  fontSize: string;
  lineSpacing: number;
}