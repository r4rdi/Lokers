'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { LogIn, Lock, Mail, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (data.user) {
        setSuccessMsg('Verifikasi Berhasil! Mengalihkan ke Dashboard...');
        setTimeout(() => {
          router.push('/upload');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal masuk. Periksa kembali email & kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      {/* Form Container */}
      <div className="w-full max-w-[400px] bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col items-center">
        
        {/* Top Floating Badge Icon */}
        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center mb-5 shadow-xs">
          <LogIn className="w-5 h-5 text-slate-800" />
        </div>

        {/* Header Titles */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sign in with email</h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed px-2">
            Make a new doc to bring your words, data, and teams together. For free
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
        <form onSubmit={handleSignIn} className="w-full space-y-3.5">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 text-xs bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400 text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right pt-0.5">
            <a href="#" className="text-[11px] font-medium text-slate-500 hover:text-slate-800 transition">
              Forgot password?
            </a>
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
                <span>Processing...</span>
              </>
            ) : (
              <span>Get Started</span>
            )}
          </button>
        </form>

        {/* Link Ke Halaman Registrasi (Sign Up) */}
        <div className="mt-5 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="font-semibold text-slate-900 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}