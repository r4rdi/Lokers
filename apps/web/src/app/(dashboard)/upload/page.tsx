'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useResumeStore } from '@/stores/useResumeStore';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const setResumeData = useResumeStore((state) => state.setResumeData);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg('Pilih file PDF terlebih dahulu');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Gunakan URL relatif Next.js Route Handler
      const response = await axios.post('/api/cv/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setResumeData(response.data.data);
        router.push('/review');
      }
    } catch (err: any) {
      const serverMessage = err.response?.data?.error || err.message || 'Gagal memproses file PDF';
      setErrorMsg(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload CV Anda</h2>
      <p className="text-gray-500 text-sm mb-6">Unggah dokumen CV (format PDF) untuk diekstrak otomatis oleh AI.</p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {errorMsg && <p className="text-red-600 text-xs font-semibold mb-4">{errorMsg}</p>}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
      >
        {loading ? 'Menganalisis & Mengekstrak Data...' : 'Ekstrak Data Sekarang'}
      </button>
    </div>
  );
}