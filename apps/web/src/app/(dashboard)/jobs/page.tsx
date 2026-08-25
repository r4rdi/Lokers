'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Banknote, 
  CheckCircle2, 
  Sparkles, 
  SlidersHorizontal,
  Bookmark,
  ArrowRight
} from 'lucide-react';

const SEED_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Backend Developer',
    company: 'SIRCLO Tech',
    location: 'Tangerang Selatan (Hybrid)',
    type: 'Penuh Waktu',
    experience: 'Fresh Grad / 1 Thn',
    salary: 'Rp 7.000.000 - 10.000.000',
    matchScore: 98,
    tags: ['Node.js', 'PostgreSQL', 'Express', 'REST API'],
    logoBg: 'bg-sky-50 text-sky-600 border-sky-100',
    logoText: 'SIRCLO',
  },
  {
    id: 'job-2',
    title: 'Full Stack Software Engineer',
    company: 'PT. Digital Kreasi Nusantara',
    location: 'Jakarta Selatan (On-site)',
    type: 'Penuh Waktu',
    experience: '1-3 Tahun',
    salary: 'Rp 9.000.000 - 14.000.000',
    matchScore: 95,
    tags: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    logoBg: 'bg-purple-50 text-[#5B16FE] border-purple-100',
    logoText: 'DKN',
  },
  {
    id: 'job-3',
    title: 'Frontend Web Specialist',
    company: 'SG-EDTS Solutions',
    location: 'Jakarta Pusat (Hybrid)',
    type: 'Kontrak',
    experience: '1-2 Tahun',
    salary: 'Rp 8.000.000 - 11.000.000',
    matchScore: 91,
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    logoBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    logoText: 'EDTS',
  },
  {
    id: 'job-4',
    title: 'Junior DevOps & Cloud Associate',
    company: 'Finture Global',
    location: 'Jakarta Selatan (On-site)',
    type: 'Penuh Waktu',
    experience: 'Min. Fresh Grad',
    salary: 'Rp 8.000.000 - 12.000.000',
    matchScore: 84,
    tags: ['Docker', 'Linux', 'PostgreSQL', 'CI/CD'],
    logoBg: 'bg-amber-50 text-amber-600 border-amber-100',
    logoText: 'FINT',
  },
];

export default function JobsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const filteredJobs = SEED_JOBS.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchSearch;
  });

  const handleSelectJob = (jobId: string) => {
    router.push(`/customize/${jobId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-b from-[#5B16FE] via-[#3B28CC] to-[#1E1B4B] rounded-3xl p-8 md:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 text-xs text-purple-200 font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" /> Semantic AI Match Engine Aktif
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Peluang Karir Terkurasi Untuk Profil Anda
          </h1>
          <p className="text-xs md:text-sm text-purple-100 mt-2 opacity-90">
            Sistem mencocokkan keahlian Anda secara instan dengan lowongan live di database.
          </p>

          {/* Search Console */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari posisi atau keahlian (cth: Backend, React, Docker)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
              />
            </div>
            <button className="bg-[#FACC15] hover:bg-yellow-300 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs md:text-sm transition-all shadow-md active:scale-95">
              Filter Lowongan
            </button>
          </div>
        </div>
      </div>

      {/* Grid Lowongan */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">Daftar Lowongan Rekomendasi</h2>
          <p className="text-xs text-slate-500">Menampilkan {filteredJobs.length} posisi yang sesuai dengan kata kunci profil Anda.</p>
        </div>
        <span className="text-xs font-bold text-[#5B16FE] bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full">
          ⚡ 100% Cocok Standard ATS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group relative"
          >
            <div>
              {/* Card Top: Logo & Match Score */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs border shadow-sm ${job.logoBg}`}>
                    {job.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#5B16FE] transition text-sm md:text-base leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      {job.company}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </p>
                  </div>
                </div>

                <div className="bg-purple-100 text-[#5B16FE] text-xs font-black px-2.5 py-1 rounded-xl shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#5B16FE]" />
                  <span>{job.matchScore}% Match</span>
                </div>
              </div>

              {/* Card Meta Details */}
              <div className="space-y-1.5 text-xs text-slate-600 font-normal mb-4">
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {job.type}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.experience}
                </p>
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <Banknote className="w-3.5 h-3.5 text-slate-400" /> {job.salary}
                </p>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktif hari ini
              </span>
              <button
                onClick={() => handleSelectJob(job.id)}
                className="bg-[#5B16FE] hover:bg-[#4208B8] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
              >
                <span>Tailor My CV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}