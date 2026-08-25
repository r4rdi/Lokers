Jawaban untuk pertanyaan penentu langkah selanjutnya:

Prioritas Modul: Opsi A — Dynamic Template Switcher
Aktifkan minimal TemplateMinimalist dan TemplateModern terlebih dahulu.
Pergantian template harus berlangsung real-time tanpa reload.
Pastikan seluruh data resume tetap sama ketika template berganti.
Setelah mekanisme registry dan preview stabil, lanjut ke Opsi B (AI Tailoring & ATS Matching), kemudian Opsi C (Database & /resume/[id]).
Mekanisme Ekspor PDF: Untuk demo lomba, pilih instant file download terlebih dahulu.
Pengguna menekan Download PDF → PDF langsung dihasilkan → otomatis terunduh ke komputer.
Tidak perlu mengunggah PDF ke Supabase Storage pada tahap awal, sehingga alurnya lebih cepat, sederhana, dan mengurangi ketergantungan pada storage/public URL.
Supabase Storage dan public shareable link dapat ditambahkan pada tahap Opsi C setelah sistem penyimpanan resume sudah stabil.

Urutan implementasi yang saya rekomendasikan:

Tahap 1
Dynamic Template Switcher
        ↓
Tahap 2
AI Tailoring + ATS Keyword Matching
        ↓
Tahap 3
generated_resumes + /resume/[id]
        ↓
Tahap 4
PDF Export + Instant Download
        ↓
Tahap 5
Supabase Storage + Public Shareable Resume

Dengan demikian, fokus implementasi berikutnya adalah /customize/[jobId] + Template Registry + Dynamic Template Switcher, dengan target Minimalist dan Modern dapat berganti secara instan di preview kanan tanpa reload.