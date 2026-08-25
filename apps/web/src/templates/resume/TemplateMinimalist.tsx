import React from 'react';
import { ResumeData, StylingProps } from './types';

export function TemplateMinimalist({ data, styling }: { data: ResumeData; styling: StylingProps }) {
  return (
    <div
      className="w-[210mm] min-h-[297mm] bg-white p-12 text-gray-900 border"
      style={{ fontFamily: styling.fontFamily, fontSize: styling.fontSize, lineHeight: styling.lineSpacing }}
    >
      <header className="border-b-2 pb-3 mb-4" style={{ borderColor: styling.accentColor }}>
        <h1 className="text-2xl font-black tracking-tight uppercase" style={{ color: styling.accentColor }}>
          {data.personal.fullName}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {data.personal.email} {data.personal.phone && `| ${data.personal.phone}`} {data.personal.location && `| ${data.personal.location}`}
        </p>
      </header>

      {data.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5" style={{ color: styling.accentColor }}>
            Tentang Saya
          </h2>
          <p className="text-xs text-gray-700">{data.summary}</p>
        </section>
      )}

      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: styling.accentColor }}>
          Pengalaman Kerja
        </h2>
        <div className="space-y-3">
          {data.experiences.map((exp, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className="flex justify-between font-bold text-xs">
                <span>{exp.role} — {exp.company}</span>
                <span className="text-gray-500 font-normal">{exp.period}</span>
              </div>
              <ul className="list-disc ml-4 mt-1 space-y-0.5 text-xs text-gray-700">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: styling.accentColor }}>
          Pendidikan
        </h2>
        {data.education.map((edu, idx) => (
          <div key={idx} className="flex justify-between text-xs mb-1">
            <div>
              <span className="font-bold">{edu.institution}</span> — {edu.degree} {edu.fieldOfStudy && `(${edu.fieldOfStudy})`}
            </div>
            <span className="text-gray-500">{edu.graduationYear}</span>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: styling.accentColor }}>
          Keahlian
        </h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-100 border text-gray-800 text-[10px] px-2 py-0.5 rounded">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}