'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResumeStore } from '@/stores/useResumeStore';
import { Sparkles, Save, Plus, Trash2, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

// 1. Komponen Internal yang Memuat Logika Hook & UI Utama
function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cvId = searchParams.get('id');

  const { resumeData, setResumeData } = useResumeStore();
  const [formData, setFormData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (resumeData) {
      setFormData(resumeData);
    }
  }, [resumeData]);

  if (!formData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#5B16FE]" />
        <p className="text-sm font-medium text-slate-500">Memuat data hasil parsing AI...</p>
      </div>
    );
  }

  // Handler pengubahan field kontak/identitas dasar
  const handleContactChange = (field: string, val: string) => {
    setFormData((prev: any) => ({
      ...prev,
      parsed_data: {
        ...prev.parsed_data,
        kontak: { ...prev.parsed_data?.kontak, [field]: val }
      }
    }));
  };

  // Handler Tambah & Hapus Skill
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    const currentSkills = formData.parsed_data?.skills || [];
    setFormData((prev: any) => ({
      ...prev,
      parsed_data: {
        ...prev.parsed_data,
        skills: [...currentSkills, newSkill.trim()]
      }
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    const updated = [...(formData.parsed_data?.skills || [])];
    updated.splice(index, 1);
    setFormData((prev: any) => ({
      ...prev,
      parsed_data: { ...prev.parsed_data, skills: updated }
    }));
  };

  // Handler Simpan Ke Supabase & Lanjut ke Match Engine (/jobs)
  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put('/api/cv/update', {
        cv_id: cvId || formData.id,
        parsed_data: formData.parsed_data,
        skills: formData.parsed_data?.skills || [],
      });

      if (response.data.success) {
        setResumeData(response.data.data);
        router.push('/jobs'); // Berpindah ke Tahap Matching Engine
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal menyimpan data resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const contact = formData.parsed_data?.kontak || {};
  const skills = formData.parsed_data?.skills || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-50 text-[#5B16FE] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Human-in-the-Loop Review
          </div>
          <h1 className="text-2xl font-black text-slate-900">Verifikasi Data CV Anda</h1>
          <p className="text-xs text-slate-500 mt-1">Periksa dan sesuaikan ekstraksi AI sebelum digunakan oleh Matching Engine.</p>
        </div>
        <button
          onClick={handleSaveAndContinue}
          disabled={isSaving}
          className="bg-[#5B16FE] hover:bg-[#4208B8] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition shrink-0 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Simpan & Cari Lowongan</span>
              <ArrowRight className="w-4 h-4 text-[#FACC15]" />
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Data Kontak & Profil */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 border-b pb-2">Informasi Kontak & Diri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Nama Lengkap</label>
              <input
                type="text"
                value={contact.nama || ''}
                onChange={(e) => handleContactChange('nama', e.target.value)}
                className="w-full mt-1 p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5B16FE] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Email</label>
              <input
                type="text"
                value={contact.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full mt-1 p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5B16FE] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Nomor Telepon</label>
              <input
                type="text"
                value={contact.telepon || ''}
                onChange={(e) => handleContactChange('telepon', e.target.value)}
                className="w-full mt-1 p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5B16FE] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Lokasi</label>
              <input
                type="text"
                value={contact.lokasi || ''}
                onChange={(e) => handleContactChange('lokasi', e.target.value)}
                className="w-full mt-1 p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#5B16FE] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Keahlian & Tech Stack */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 border-b pb-2">Keahlian (Skills & Competencies)</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill: string, idx: number) => (
              <span key={idx} className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-[#5B16FE] text-xs font-bold px-3 py-1.5 rounded-xl">
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(idx)} className="hover:text-rose-600">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tambah keahlian baru (misal: Docker, Next.js)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="flex-1 p-2.5 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-[#5B16FE]"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Main Page Component (Export Default) yang Menggunakan Suspense Wrapper
export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#5B16FE]" />
          <p className="text-sm font-medium text-slate-500">Memuat modul review...</p>
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}