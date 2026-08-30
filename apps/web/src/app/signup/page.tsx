'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { UserPlus, Lock, Mail, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, User } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Eksekusi Pendaftaran ke Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw new Error(error.message);

      if (data.user) {
        // Jika auto-confirm aktif atau email tidak membutuhkan konfirmasi
        if (data.session) {
          setSuccessMsg('Pendaftaran berhasil! Mengalihkan ke dashboard...');
          setTimeout(() => {
            router.push('/upload');
          }, 1200);
        } else {
          // Jika Supabase membutuhkan konfirmasi email
          setSuccessMsg('Akun berhasil dibuat! Mengalihkan ke halaman Login...');
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mendaftar. Silakan periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      {/* Form Container Container */}
      <div className="w-full max-w-[400px] bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col items-center">
        
        {/* Top Floating Badge Icon */}
        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center mb-5 shadow-xs">
          <UserPlus className="w-5 h-5 text-slate-800" />
        </div>

        {/* Header Titles */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create an account</h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed px-2">
            Start optimizing your CV with AI-powered analysis today.
          </p>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="w-full mb-4 flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="w-full mb-4 flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSignUp} className="w-full space-y-3.5">
          {/* Full Name Input */}
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-10 pr-3.5 py-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-3.5 py-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (Min. 6 Characters)"
              className="w-full pl-10 pr-10 py-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-[#5B16FE] transition-all placeholder:text-slate-400 text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        {/* Navigation Link to SignIn */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signin')}
              className="font-semibold text-slate-900 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}