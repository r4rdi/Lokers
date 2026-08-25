import React from 'react';
import '@/styles/globals.css';
import Link from 'next/link';
import { Sparkles, FileText, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Lokers! AI - Platform Karir Cerdas Terintegrasi AI Generatif',
  description: 'Ekstrak CV otomatis, dapatkan rekomendasi loker spesifik, dan rancang resume ATS tailored dalam hitungan detik.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen antialiased flex flex-col selection:bg-[#5B16FE] selection:text-white">
        {/* TOP BRAND NAVIGATION */}
        <nav className="bg-[#5B16FE] text-white px-4 md:px-8 lg:px-12 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md border-b border-purple-800/40 backdrop-blur-md bg-opacity-95">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-black tracking-tight flex items-center group shrink-0">
              <span className="group-hover:tracking-wider transition-all">Lokers</span>
              <span className="text-[#FACC15] text-2xl leading-none">!</span>
              <span className="ml-2 text-[9px] uppercase font-bold tracking-wider bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-purple-200">
                AI
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-5 text-xs font-medium text-purple-100">
              <Link href="/upload" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Upload CV
              </Link>
              <Link href="/jobs" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> Peluang Karir
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/upload"
              className="bg-[#FACC15] hover:bg-yellow-300 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-900" />
              <span>AI Resume Parser</span>
            </Link>
          </div>
        </nav>

        {/* MAIN BODY VIEW */}
        <main className="flex-1">{children}</main>

        {/* COMPACT FOOTER */}
        <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
          <p>© 2026 Lokers! Inc. Platform Karir AI #LebihPasti & Cepat.</p>
        </footer>
      </body>
    </html>
  );
}