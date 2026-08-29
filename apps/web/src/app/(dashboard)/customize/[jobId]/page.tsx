"use client";

import React, { useEffect, useState, use } from "react";
import TailorResultView from "@/components/cv/TailorResultView";

export default function CustomizePage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<any>(null);

  // Load Job Detail dari Database (jobs)
  useEffect(() => {
    async function fetchJobDetail() {
      try {
        const res = await fetch("/api/jobs");
        const json = await res.json();
        if (json.success) {
          const found = json.data.find((j: any) => j.id === jobId);
          setJob(found);
        }
      } catch (err) {
        console.error("Gagal memuat detail pekerjaan:", err);
      } finally { // <-- Perbaikan ada di baris ini: mengganti 'font-medium' dengan 'finally'
        setLoading(false);
      }
    }
    fetchJobDetail();
  }, [jobId]);

  // Handle Manual Trigger AI Tailor (Opsi 3B + Dedupe 2B)
  const handleGenerateTailoredCv = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/cv/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          userId: "d3b07384-d113-40e4-a19a-ca1e1f1857ef", // Dummy Auth ID
        }),
      });

      const result = await response.json();
      if (result.success) {
        setGeneratedResume(result.data);
      } else {
        alert(`Gagal: ${result.error}`);
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem saat memproses AI Tailor.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Memuat data lowongan...</div>;
  if (!job) return <div className="p-8 text-center text-red-500">Lowongan pekerjaan tidak ditemukan.</div>;

  // JIKA RESUME SUDAH BERHASIL DI-GENERATE: Tampilkan TailorResultView
  if (generatedResume) {
    return <TailorResultView data={generatedResume} />;
  }

  // JIKA BELUM DI-GENERATE: Tampilkan Split View + Button Manual Trigger (Opsi 3B)
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{job.title}</h1>
          <p className="text-sm text-slate-500">{job.company} • {job.location}</p>
        </div>
        <button
          onClick={handleGenerateTailoredCv}
          disabled={generating}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
        >
          {generating ? "Menganalisis & Tailoring AI..." : "Generate Tailored CV (1 Kredit)"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-800 mb-4">Target Job Requirements</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{job.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {job.required_skills?.map((s: string, i: number) => (
              <span key={i} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center p-8">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-3">
            AI
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">Siap untuk Menyesuaikan CV?</h3>
          <p className="text-xs text-slate-500 max-w-xs mb-4">
            Klik tombol di atas untuk menganalisis kata kunci dan mencocokkan CV Anda dengan posisi ini.
          </p>
        </div>
      </div>
    </div>
  );
}