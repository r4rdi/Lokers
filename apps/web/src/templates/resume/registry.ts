import { TemplateMinimalist } from './TemplateMinimalist';
import { TemplateModern } from './TemplateModern';

export const resumeTemplates = {
  'minimalist-ats': TemplateMinimalist,
  'modern-sidebar': TemplateModern,
  'executive-serif': TemplateMinimalist, // Fallback sementara sebelum template ke-3 dibuat
};

export type TemplateId = keyof typeof resumeTemplates;