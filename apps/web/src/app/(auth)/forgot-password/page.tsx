'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Validasi Kriteria Password Real-time
    const passwordCriteria = {
        length: newPassword.length >= 8,
        capital: /[A-Z]/.test(newPassword),
        number: /[0-9]/.test(newPassword),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
    };

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Auto-focus ke input OTP berikutnya
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    // Step 1: Kirim OTP
    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setStep(2);
        } catch (err: any) {
            setErrorMessage(err.message || 'Gagal mengirimkan kode OTP.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verifikasi OTP & Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const token = otp.join('');
        if (token.length !== 6) {
            setErrorMessage('Masukkan 6 digit kode OTP secara lengkap.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, newPassword }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setSuccessMessage('Password berhasil diperbarui! Mengarahkan ke halaman login...');
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
        } catch (err: any) {
            setErrorMessage(err.message || 'Proses reset password gagal.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">

                {/* Glow Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

                {/* Back Link */}
                <Link
                    href="/signin"
                    className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Sign In
                </Link>

                {/* Step 1: Request OTP */}
                {step === 1 && (
                    <div>
                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-4 text-indigo-400">
                            <KeyRound className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Lupa Password?</h1>
                        <p className="text-sm text-slate-400 mb-6">
                            Masukkan email yang terdaftar. Kami akan mengirimkan kode OTP 6-digit untuk verifikasi akun Anda.
                        </p>

                        {errorMessage && (
                            <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleRequestOtp} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nama@email.com"
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                            >
                                {loading ? 'Mengirim Kode...' : 'Kirim Kode OTP'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Verification OTP & New Password */}
                {step === 2 && (
                    <div>
                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-4 text-indigo-400">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Verifikasi Kode OTP</h1>
                        <p className="text-sm text-slate-400 mb-6">
                            Kode OTP telah dikirim ke <span className="text-indigo-400 font-medium">{email}</span>.
                        </p>

                        {errorMessage && (
                            <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleResetPassword} className="space-y-5">
                            {/* OTP Input Group */}
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-2">Kode Verifikasi (6-Digit)</label>
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e.target.value, idx)}
                                            className="w-11 h-12 text-center text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Password Baru Input */}
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Password Baru</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
                                    />
                                </div>
                            </div>

                            {/* Indicator Aturan Password */}
                            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                                <span className={`flex items-center gap-1.5 ${passwordCriteria.length ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Min. 8 karakter
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordCriteria.capital ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Huruf kapital
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordCriteria.number ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Angka
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordCriteria.symbol ? 'text-emerald-400' : 'text-slate-500'}`}>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Simbol
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                            >
                                {loading ? 'Memproses...' : 'Perbarui Password'}
                            </button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
}