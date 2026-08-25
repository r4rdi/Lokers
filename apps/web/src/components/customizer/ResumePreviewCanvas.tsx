// apps/web/src/components/customizer/ResumePreviewCanvas.tsx
'use client';

import React from 'react';
import { resumeTemplates, TemplateId } from '@/templates/resume/registry';
import { ResumeData, StylingProps } from '@/templates/resume/types';

interface ResumePreviewCanvasProps {
  data: ResumeData;
  templateId: TemplateId;
  styling: StylingProps;
}

export function ResumePreviewCanvas({ data, templateId, styling }: ResumePreviewCanvasProps) {
  // Ambil komponen template dari registry secara dinamis
  const SelectedTemplateComponent = resumeTemplates[templateId] || resumeTemplates['minimalist-ats'];

  return (
    <div id="cv-preview-sheet" className="shadow-2xl transition-all duration-300">
      <SelectedTemplateComponent data={data} styling={styling} />
    </div>
  );
}