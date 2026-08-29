"use client";

import { useState } from "react";
import CVFormEditor from "@/components/builder/CVFormEditor";
import LivePreview from "@/components/builder/LivePreview";
import type { ResumeData } from "@/lib/ai/parser";

export default function BuilderPage() {
  const [cvData, setCvData] = useState<Partial<ResumeData>>({
    personal: { full_name: "", email: "", phone: "" },
    summary: "",
    skills: [],
    experience: [],
  });

  return (
    <main className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">
      {/* Panel Kiri: Form Input Editor */}
      <section className="w-full md:w-1/2 overflow-y-auto border-r border-slate-800 p-6">
        <CVFormEditor data={cvData} onChange={setCvData} />
      </section>

      {/* Panel Kanan: Live Render Engine Preview */}
      <section className="hidden md:flex md:w-1/2 justify-center overflow-y-auto bg-slate-900 p-6">
        <LivePreview data={cvData} />
      </section>
    </main>
  );
}