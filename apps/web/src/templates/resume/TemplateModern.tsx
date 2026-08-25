import React from 'react';
import { ResumeData, StylingProps } from './types';

export function TemplateModern({ data, styling }: { data: ResumeData; styling: StylingProps }) {
  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white flex border"
      style={{ fontFamily: styling.fontFamily, fontSize: styling.fontSize, lineHeight: styling.lineSpacing }}
    >
      {/* Kolom Kiri: Sidebar */}
      <div className="w-1/3 bg-slate-50 p-6 border-r border-gray-200 space-y-6">
        <div>
          <h1 className="text-xl font-extrabold uppercase leading-tight" style={{ color: styling.accentColor }}>
            {data.personal.fullName}
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">{data.personal.headline}</p>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p className="font-bold uppercase tracking-wider text-[10px] text-gray-400">Kontak</p>
          <p className="break-all">{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>

        <div>
          <p className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mb-2">Keahlian Utama</p>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s, i) => (
              <span key={i} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded font-medium text-gray-700">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-bold uppercase tracking-wider text-[10px] text-gray-400 mb-2">Pendidikan</p>
          {data.education.map((edu, i) => (
            <div key={i} className="text-xs mb-2">
              <p className="font-bold text-gray-800">{edu.institution}</p>
              <p className="text-gray-500 text-[11px]">{edu.degree}</p>
              <p className="text-gray-400 text-[10px]">{edu.graduationYear}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Main Content */}
      <div className="w-2/3 p-8 space-y-6">
        {data.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: styling.accentColor }}>
              Ringkasan Profesional
            </h2>
            <p className="text-xs text-gray-700">{data.summary}</p>
          </div>
        )}

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-3" style={{ color: styling.accentColor }}>
            Pengalaman Relevan
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp, i) => (
              <div key={i} className="break-inside-avoid text-xs">
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.role}</span>
                  <span className="text-gray-400 font-normal text-[11px]">{exp.period}</span>
                </div>
                <p className="text-gray-600 font-medium text-[11px]">{exp.company}</p>
                <ul className="list-disc ml-4 mt-1.5 space-y-1 text-gray-600">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}