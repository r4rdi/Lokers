"use client";

import { ResumeData } from "@/lib/ai/parser";

interface Props {
  data: Partial<ResumeData>;
  onChange: (updatedData: Partial<ResumeData>) => void;
}

export default function CVFormEditor({ data, onChange }: Props) {
  return (
    <div className="space-y-4 text-slate-100">
      <h3 className="text-lg font-bold text-emerald-400">Informasi Pribadi</h3>
      <div>
        <label className="block text-sm">Nama Lengkap</label>
        <input
          type="text"
          value={data.personal?.full_name || ""}
          onChange={(e) =>
            onChange({
              ...data,
              personal: { ...data.personal, full_name: e.target.value } as any,
            })
          }
          className="w-full rounded bg-slate-800 p-2 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-sm">Ringkasan Professional</label>
        <textarea
          rows={4}
          value={data.summary || ""}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          className="w-full rounded bg-slate-800 p-2 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>
  );
}