'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/stores/useResumeStore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Wrench, 
  Plus, 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';

export default function ReviewPage() {
  const router = useRouter();
  const { resumeData, setResumeData } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  // Fallback state jika direct access tanpa upload
  const personal = resumeData?.personal_info || {
    full_name: 'Rafi Ardiansyah',
    headline: 'Software Engineer',
    email: 'rafi.ardiansyah@example.com',
    phone: '081234567890',
    location: 'Jakarta Selatan, Indonesia',
  };

  const experiences = resumeData?.experiences || [
    {
      role: 'Software Engineer',
      company: 'PT Digital Kreasi Nusantara',
      period: 'Januari 2023 - Sekarang',
      highlights: [
        'Merancang dan mengimplementasikan RESTful API backend menggunakan Node.js, Express, dan PostgreSQL.',
        'Mengembangkan modul dashboard interaktif berbasis React, Next.js, dan Tailwind CSS.',
        'Mengurangi waktu respon query database hingga 25% melalui optimasi indeks relasional.',
      ],
    },
  ];

  const education = resumeData?.education || [
    {
      institution: 'Universitas Negeri Indonesia',
      degree: 'S1',
      field_of_study: 'Teknik Informatika',
      graduation_year: '2022',
    },
  ];

  const skills = resumeData?.skills || [
    'JavaScript', 'TypeScript', 'Node.js', 'React', 'Next.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST API'
  ];

  const handleInputChange = (field: string, val: string) => {
    setResumeData({
      ...resumeData,
      personal_info: {
        ...personal,
        [field]: val,
      },
    });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setResumeData({
      ...resumeData,
      skills: [...skills, newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: updated,
    });
  };

  const handleProceedToJobs = () => {
    router.push('/jobs');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-[#5B16FE] to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FACC15]/20 border border-[#FACC15]/40 text-[#FACC15] text-xs font-bold uppercase px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Parsing Complete
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Review & Konfirmasi Data Profil
          </h1>
          <p className="text-xs md:text-sm text-purple-100 mt-1 max-w-xl opacity-90">
            Periksa hasil ekstraksi AI di bawah. Seluruh data ini akan digunakan sebagai basis kustomisasi CV ATS dan matching lowongan kerja.
          </p>
        </div>

        <button
          onClick={handleProceedToJobs}
          className="bg-[#FACC15] hover:bg-yellow-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs md:text-sm transition-all shadow-lg hover:shadow-yellow-400/20 flex items-center gap-2 active:scale-95 shrink-0"
        >
          <span>Simpan & Cari Lowongan Cocok</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Informasi Pribadi */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5B16FE] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Informasi Pribadi & Kontak</h2>
              <p className="text-xs text-slate-500">Identitas utama untuk kepala surat lamaran dan resume.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={personal.full_name || ''}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B16FE] text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Headline / Profesi Target</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={personal.headline || ''}
                  onChange={(e) => handleInputChange('headline', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B16FE] text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Email Aktif</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={personal.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B16FE] text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Nomor Telepon / WhatsApp</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={personal.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B16FE] text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Keahlian (Skills) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Keahlian & Tag Kompetensi ({skills.length})</h2>
              <p className="text-xs text-slate-500">Skill ini digunakan untuk pencocokan kata kunci algoritma ATS.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((sk: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#5B16FE] font-bold text-xs rounded-xl border border-purple-200 transition"
              >
                <span>{sk}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="hover:text-rose-500 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Tambah skill baru (cth: GraphQL, AWS, Figma)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B16FE]"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>
        </div>

        {/* Section 3: Riwayat Pengalaman Kerja */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Pengalaman Kerja Terstruktur</h2>
              <p className="text-xs text-slate-500">Hasil ekstraksi poin pencapaian profesional.</p>
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((exp: any, i: number) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl hover:border-purple-200 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {exp.role} — <span className="text-[#5B16FE]">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 mt-2">
                  {exp.highlights?.map((hl: string, hIdx: number) => (
                    <li key={hIdx} className="leading-relaxed">{hl}</li>
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