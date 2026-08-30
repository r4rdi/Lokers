'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { useResumeStore } from '@/stores/useResumeStore';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ArrowRight,
  Download,
  FileDown
} from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const router = useRouter();

  // Fungsi mengunduh template PDF acuan ramah ATS
  const handleDownloadTemplate = () => {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
    });

    const margin = 40;
    let yPos = 50;

    // Header Nama & Kontak
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('(Nama Lengkap Anda)', margin, yPos);

    yPos += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('Email: contoh@gmail.com | Telepon: +62 812-3456-7890 | Lokasi: Jakarta Selatan, DKI Jakarta', margin, yPos);

    yPos += 14;
    doc.text('LinkedIn: linkedin.com/in/username-123456 | GitHub: github.com/username', margin, yPos);

    // Garis Pemisah
    yPos += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, 555, yPos);

    // Ringkasan Profesional
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('RINGKASAN PROFESIONAL', margin, yPos);

    yPos += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const summaryText = 'Software Engineer dengan pengalaman membangun aplikasi web modern dan layanan backend berbasis Node.js dan PostgreSQL. Berpengalaman dalam pengembangan RESTful API dan integrasi antarmuka React.';
    const splitSummary = doc.splitTextToSize(summaryText, 515);
    doc.text(splitSummary, margin, yPos);
    yPos += splitSummary.length * 13 + 8;

    // Pengalaman Kerja
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PENGALAMAN KERJA', margin, yPos);

    yPos += 16;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Software Engineer — PT Digital Kreasi Nusantara', margin, yPos);
    doc.setFont('helvetica', 'italic');
    doc.text('Januari 2023 - Sekarang', 450, yPos);

    yPos += 13;
    doc.setFont('helvetica', 'normal');
    doc.text('• Merancang dan mengimplementasikan RESTful API backend menggunakan Node.js, Express, dan PostgreSQL.', margin + 10, yPos);
    yPos += 13;
    doc.text('• Mengembangkan modul dashboard interaktif berbasis React, Next.js, dan Tailwind CSS.', margin + 10, yPos);
    yPos += 13;
    doc.text('• Mengurangi waktu respon query database hingga 25% melalui optimasi indeks relasional.', margin + 10, yPos);

    yPos += 16;
    doc.setFont('helvetica', 'bold');
    doc.text('Junior Web Developer — PT Solusi Inovasi Asia', margin, yPos);
    doc.setFont('helvetica', 'italic');
    doc.text('Maret 2022 - Desember 2022', 425, yPos);

    yPos += 13;
    doc.setFont('helvetica', 'normal');
    doc.text('• Membangun antarmuka website responsif menggunakan React dan Tailwind CSS.', margin + 10, yPos);
    yPos += 13;
    doc.text('• Berkolaborasi dengan tim backend untuk integrasi endpoint REST API.', margin + 10, yPos);

    // Pendidikan
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('PENDIDIKAN', margin, yPos);

    yPos += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('S1 Teknik Informatika — Universitas Negeri Indonesia', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text('2018 - 2022', 505, yPos);

    // Keahlian
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('KEAHLIAN & KOMPETENSI', margin, yPos);

    yPos += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('• Bahasa & Framework: JavaScript, TypeScript, Node.js, React, Next.js, Express, Tailwind CSS', margin + 10, yPos);
    yPos += 13;
    doc.text('• Database & Tools: PostgreSQL, Git, Docker, REST API, Postman', margin + 10, yPos);

    // Unduh File
    doc.save('Contoh-Resume-Acuan-ATS.pdf');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setErrorMsg('');
      } else {
        setErrorMsg('Format file tidak didukung. Harap unggah file PDF.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg('Pilih dokumen CV (PDF) terlebih dahulu');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/cv/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setResumeData(response.data.data);
        router.push('/review');
      }
    } catch (err: any) {
      // Menangani status HTTP 401 (Unauthorized)
      if (err.response?.status === 401) {
        setErrorMsg('Sesi Anda telah berakhir atau belum login. Mengalihkan ke halaman login...');
        setTimeout(() => {
          router.push('/login'); // Ganti dengan rute login aplikasi kamu
        }, 1500);
        return;
      }

      const serverMessage =
        err.response?.data?.message || err.response?.data?.error || err.message || 'Gagal memproses dokumen PDF';
      setErrorMsg(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* Main Interactive Card Container */}
        <div className="relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200/90 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">

          {/* Subtle Top Glow Ornament */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-purple-400/20 to-transparent blur-2xl pointer-events-none" />

          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#5B16FE] text-xs font-bold uppercase px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FACC15] fill-[#FACC15]" />
              <span>Generative Multimodal Parsing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Upload CV Anda
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Unggah resume PDF Anda. AI otomatis mengekstrak seluruh kompetensi, pengalaman, dan menyusun format standar ATS.
            </p>
          </div>

          {/* Banner Referensi Acuan Format CV (Baru Ditambahkan) */}
          <div className="mb-6 p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5B16FE]/10 text-[#5B16FE] flex items-center justify-center shrink-0">
                <FileDown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Belum punya format acuan?</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Unduh template CV ATS yang pasti terbaca akurat</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="bg-white hover:bg-purple-50 text-[#5B16FE] border border-purple-200 hover:border-[#5B16FE] px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs shrink-0 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Template</span>
            </button>
          </div>

          {/* Interactive Dropzone Container */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              group relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer
              transition-all duration-300 ease-out transform
              hover:scale-[1.02] hover:border-[#5B16FE] hover:shadow-xl hover:shadow-purple-500/20
              ${isDragging ? 'scale-[1.03] border-[#5B16FE] bg-purple-50/70 shadow-2xl shadow-purple-500/25 ring-4 ring-purple-100' : 'border-slate-300 bg-slate-50/60 hover:bg-purple-50/30'}
            `}
          >
            {/* Continuous Shimmer Light Beam Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Dropzone Inner Content */}
            {!file ? (
              <div className="flex flex-col items-center justify-center space-y-3 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-purple-100 flex items-center justify-center text-[#5B16FE] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-[#5B16FE] transition-colors">
                    Klik untuk memilih atau seret file ke sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Mendukung file dokumen PDF (Maks. 10MB)
                  </p>
                </div>
              </div>
            ) : (
              /* Selected File State */
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-purple-200 shadow-sm relative z-10">
                <div className="flex items-center gap-3 text-left overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#5B16FE] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Siap diekstrak
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-colors shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Error Message Toast Notification */}
          {errorMsg && (
            <div className="mt-4 flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl animate-fade-in font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Interactive Extraction Action Button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`
              w-full mt-6 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5
              transition-all duration-300 relative overflow-hidden shadow-md
              ${loading || !file
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-[#5B16FE] hover:bg-[#4208B8] text-white shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 hover:-translate-y-0.5 active:scale-[0.98]'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI sedang menganalisis dokumen...</span>
              </>
            ) : (
              <>
                <span>Ekstrak Data Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#FACC15]" />
              </>
            )}
          </button>

          {/* Footer Security Badges */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Data Terproteksi
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5B16FE]" /> Gemini Multimodal Engine
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}