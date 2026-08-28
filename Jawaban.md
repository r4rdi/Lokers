Untuk Lokers! AI, saya merekomendasikan kombinasi 1A + 2B + 3B. Ini paling aman untuk MVP, demo lomba, sekaligus lebih mudah dikembangkan ke production.

1. Penyimpanan Lowongan → Opsi A

Gunakan pemisahan fungsi:

scraped_jobs
     ↓
Data hasil ingestion/scraping
     ↓
Normalisasi & validasi
     ↓
jobs
     ↓
Data lowongan yang digunakan aplikasi
     ↓
/jobs → /customize/[jobId]

Namun, jangan menyalin data setiap kali pengguna memilih lowongan. Lebih baik jobs menjadi tabel utama yang sudah berisi data lowongan terkurasi dari proses ingestion.

Dengan begitu:

scraped_jobs = staging/raw ingestion
jobs = canonical/production job data
/jobs membaca jobs
/customize/[jobId] menggunakan jobs.id

Ini menghindari duplikasi data dan membuat pipeline scraper lebih rapi.

2. Kredit AI → Opsi B

Kredit dikurangi setelah Gemini berhasil menghasilkan JSON dan hasilnya berhasil disimpan ke generated_resumes.

Alurnya:

Klik Generate
      ↓
Validasi user & credit
      ↓
Gemini API
      ↓
JSON valid?
   ┌──┴──┐
  Tidak  Ya
   ↓      ↓
Tidak    Save
potong   generated_resumes
kredit      ↓
          Kurangi
          1 credit

Ini lebih adil bagi pengguna. Kalau Gemini gagal, timeout, menghasilkan JSON invalid, atau proses penyimpanan gagal, kredit tidak seharusnya hilang.

Tetapi tambahkan server-side locking/idempotency agar satu request tidak bisa mengurangi atau memakai kredit berkali-kali karena double-click/retry.

3. AI Tailor → Opsi B: Manual Trigger

Saya sangat merekomendasikan Manual Trigger.

Saat /customize/[jobId] dibuka:

┌──────────────────────────────────────────────┐
│ LOWONGAN TARGET        │ CV ANDA             │
│                                              │
│ Junior Backend Dev      │ Professional       │
│ PT ABC                  │ Summary             │
│                                              │
│ Requirements            │ Skills              │
│ • Node.js               │ • JavaScript        │
│ • PostgreSQL            │ • React             │
│ • REST API              │ • Node.js           │
│                                              │
│ Match awal: 72%         │                     │
│                                              │
│                        [Generate Tailored CV] │
└──────────────────────────────────────────────┘

Setelah pengguna menekan:

Generate Tailored CV

baru:

CV Master
    +
Job Target
    ↓
Gemini
    ↓
Tailored CV
    +
ATS Match Score
    +
Cover Letter
    ↓
Preview diperbarui
    ↓
generated_resumes
Kenapa bukan Auto-trigger?

Karena membuka halaman tidak selalu berarti pengguna ingin menggunakan kredit AI.

Misalnya pengguna hanya ingin:

melihat detail lowongan;
membandingkan requirement;
melihat CV mereka;
mengganti template;
kembali ke halaman tersebut.

Kalau Auto-trigger digunakan, setiap membuka halaman bisa berpotensi menjalankan AI dan mengurangi/mengunci penggunaan kredit.

Manual trigger jauh lebih baik untuk UX dan kontrol biaya.

Keputusan final

1. Lowongan: Opsi A
2. Kredit AI: Opsi B
3. AI Tailor: Opsi B

Sehingga arsitektur Phase 5:

                    /jobs
                      │
                      ▼
                 jobs.id
                      │
                      ▼
             /customize/[jobId]
                      │
          ┌───────────┴───────────┐
          │                       │
      Job Data                Master CV
          │                       │
          └───────────┬───────────┘
                      ▼
             [Generate Tailored CV]
                      │
                      ▼
                 Credit Check
                      │
                      ▼
                 Gemini API
                      │
                      ▼
              Structured JSON
                      │
                 Zod Validate
                      │
              ┌───────┴───────┐
              │               │
            Valid           Invalid
              │               │
              ▼               ▼
      generated_resumes     Error
              │
              ▼
        Deduct 1 Credit
              │
              ▼
       Update Split-Screen
              │
       ┌──────┴──────┐
       ▼             ▼
 Tailored CV    Cover Letter
       │
       ▼
   Export PDF
Satu revisi penting pada database

Karena sebelumnya kita memiliki scraped_jobs dan jobs, saya menyarankan jangan membuat keduanya memiliki struktur/fungsi yang identik.

Idealnya:

scraped_jobs
→ staging/raw ingestion
→ boleh memiliki data sementara/metadata scraper

jobs
→ canonical job
→ data yang ditampilkan aplikasi
→ memiliki ID stabil yang digunakan `/customize/[jobId]`

Sedangkan user_resumes tetap menjadi master CV pengguna, dan generated_resumes menjadi snapshot CV yang sudah ditailor terhadap job tertentu.

Dengan struktur tersebut, Phase 5 akan jauh lebih bersih dan kita bisa lanjut ke Matching Engine + /api/cv/tailor tanpa perlu mengubah fondasi database lagi.