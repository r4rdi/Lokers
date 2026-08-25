// apps/web/src/app/(dashboard)/customize/[jobId]/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/stores/useResumeStore';
import { ResumePreviewCanvas } from '@/components/customizer/ResumePreviewCanvas';
import { mapStoreDataToTemplate } from '@/lib/resume-adapter';
import { TemplateId } from '@/templates/resume/registry';
import axios from 'axios';

export default function CustomizePage() {
  const router = useRouter();
  const { resumeData, selectedJob, styling, setStyling } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);

  if (!resumeData || !selectedJob) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-gray-600">Data sesi lowongan tidak ditemukan.</p>
        <button
          onClick={() => router.push('/jobs')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
        >
          Pilih Lowongan dari Katalog
        </button>
      </div>
    );
  }

  // Ubah data store ke format kontrak template
  const templateFormattedData = mapStoreDataToTemplate(resumeData);

  const handleDownloadVectorPdf = async () => {
    setIsExporting(true);
    try {
      const cvContainer = document.getElementById('cv-preview-sheet');
      if (!cvContainer) return;

      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4 portrait; margin: 0; }
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; background: white; }
          </style>
        </head>
        <body>
          ${cvContainer.innerHTML}
        </body>
        </html>
      `;

      const response = await axios.post(
        '/api/resume/pdf',
        { htmlContent: fullHtml },
        { responseType: 'blob' }
      );

      // Instant File Download ke komputer lokal
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `CV_${resumeData.personal_info.full_name.replace(/\s+/g, '_')}_${selectedJob.job_title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      alert('Gagal membuat PDF vektor. Pastikan endpoint PDF aktif.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-65px)] bg-slate-100 overflow-hidden">
      {/* PANEL KIRI: Toolbar Customization */}
      <div className="w-full md:w-5/12 bg-white border-r border-gray-200 p-6 overflow-y-auto space-y-6">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Target Posisi
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">{selectedJob.job_title}</h2>
          <p className="text-xs text-gray-500">{selectedJob.company_name} • {selectedJob.location}</p>
        </div>

        {/* Dynamic Template Switcher */}
        <div className="border-t pt-4">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
            Pilih Desain Template
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStyling({ templateId: 'minimalist-ats' })}
              className={`p-3 rounded-xl border text-left transition-all ${
                styling.templateId === 'minimalist-ats'
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-1'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-gray-900">Minimalist ATS</div>
              <div className="text-[11px] text-gray-500 mt-0.5">1 Kolom Bersih, Standar ATS Formal</div>
            </button>

            <button
              onClick={() => setStyling({ templateId: 'modern-sidebar' })}
              className={`p-3 rounded-xl border text-left transition-all ${
                styling.templateId === 'modern-sidebar'
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-1'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-gray-900">Modern Sidebar</div>
              <div className="text-[11px] text-gray-500 mt-0.5">2 Kolom Visual, Profil & Skill di Samping</div>
            </button>
          </div>
        </div>

        {/* Color Customizer */}
        <div className="border-t pt-4">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
            Warna Aksen Identitas
          </label>
          <div className="flex gap-3">
            {[
              { label: 'Navy Blue', hex: '#2563EB' },
              { label: 'Emerald Green', hex: '#059669' },
              { label: 'Burgundy Red', hex: '#DC2626' },
              { label: 'Slate Dark', hex: '#1F2937' },
              { label: 'Royal Purple', hex: '#7C3AED' },
            ].map((c) => (
              <button
                key={c.hex}
                title={c.label}
                onClick={() => setStyling({ accentColor: c.hex })}
                style={{ backgroundColor: c.hex }}
                className={`w-7 h-7 rounded-full transition-transform ${
                  styling.accentColor === c.hex ? 'scale-125 ring-2 ring-offset-2 ring-gray-900' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button: Instant PDF Download */}
        <div className="border-t pt-4">
          <button
            onClick={handleDownloadVectorPdf}
            disabled={isExporting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {isExporting ? 'Merender Dokumen PDF...' : '📥 Unduh PDF ATS-Friendly'}
          </button>
        </div>
      </div>

      {/* PANEL KANAN: Real-time Live Canvas */}
      <div className="w-full md:w-7/12 p-8 flex justify-center items-start overflow-y-auto bg-slate-300">
        <ResumePreviewCanvas
          data={templateFormattedData}
          templateId={styling.templateId as TemplateId}
          styling={styling}
        />
      </div>
    </div>
  );
}