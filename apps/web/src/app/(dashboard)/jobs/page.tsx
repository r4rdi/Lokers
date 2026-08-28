"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  required_skills: string[];
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch data dari Supabase via API Route
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const json = await res.json();
        if (json.success) setJobs(json.data);
      } catch (err) {
        console.error("Gagal memuat daftar lowongan:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // 2. Filter Pencarian (Algoritma sederhana Client-side Search)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectJob = (jobId: string) => {
    // Diarahkan langsung ke PHASE 5: AI Tailor Page
    router.push(`/customize/${jobId}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Filter Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rekomendasi Lowongan Kerja</h1>
          <p className="text-sm text-slate-500">
            Pilih lowongan sasaran untuk menyesuaikan CV Anda secara otomatis menggunakan AI.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Cari posisi atau perusahaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid List Jobs */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-slate-500 font-medium animate-pulse">Memuat data lowongan dari database...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl">
          <p className="text-slate-500">Tidak ada lowongan kerja yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-base font-bold text-slate-800 line-clamp-1">{job.title}</h2>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600 mb-3">
                  {job.company} • <span className="text-slate-400">{job.location}</span>
                </p>
                <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {job.required_skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectJob(job.id)}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-all shadow-sm"
              >
                Tailor CV dengan AI
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}