"use client";

import { ResumeData } from "@/lib/ai/parser";

export default function LivePreview({ data }: { data: Partial<ResumeData> }) {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-10 shadow-2xl rounded-sm">
      <h1 className="text-3xl font-bold tracking-tight">{data.personal?.full_name || "Nama Lengkap"}</h1>
      <p className="text-sm text-slate-600 border-b pb-4 mt-1">
        {data.personal?.email} | {data.personal?.phone}
      </p>

      {data.summary && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-slate-800 uppercase tracking-wider">Ringkasan</h2>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-slate-800 uppercase tracking-wider">Keahlian</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-slate-100 px-3 py-1 text-xs rounded border">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}