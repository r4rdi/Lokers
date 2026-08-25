export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  headline?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
}