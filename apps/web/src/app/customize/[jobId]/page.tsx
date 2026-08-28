import { createClient } from "@supabase/supabase-js";
import TailorResultView from "@/components/cv/TailorResultView";
import { notFound } from "next/navigation";

// Inisialisasi Supabase Client Server-Side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default async function CustomizePage({ params }: PageProps) {
  // Await parameter dynamic route (Next.js App Router)
  const { jobId } = await params;

  // Query database berdasarkan ID resume
  const { data: resumeData, error } = await supabase
    .from("generated_resumes")
    .select("*")
    .eq("id", jobId)
    .single();

  // Jika data tidak ditemukan atau ID tidak valid, tampilkan halaman 404
  if (error || !resumeData) {
    notFound();
  }

  // Passing data ke UI Client Component
  return <TailorResultView data={resumeData} />;
}