Untuk kondisi Lokers! AI saat ini, saya sangat menyarankan memilih Fokus A — Frontend & Form Review terlebih dahulu, kemudian baru Fokus B.

✅ Pilihan terbaik: Fokus A

Alasannya sederhana: data CV hasil AI parsing belum dianggap final sampai pengguna melakukan review dan koreksi. Kalau Matching Engine dibuat sekarang menggunakan parsed_data mentah, skor kecocokan bisa berubah setelah pengguna memperbaiki CV.

Alur yang lebih benar:

                    /upload
                       ↓
                  Upload CV
                       ↓
                 Gemini Parser
                       ↓
                 parsed_data
                       ↓
                    /review
                       ↓
            ┌─────────────────────┐
            │ User Review & Edit  │
            │                     │
            │ ✓ Personal Info     │
            │ ✓ Experience        │
            │ ✓ Education         │
            │ ✓ Skills            │
            │ ✓ Projects          │
            └──────────┬──────────┘
                       ↓
                 [Save & Continue]
                       ↓
               Final CV Data
                       ↓
             Generate Embedding
                       ↓
              Vector Matching
                       ↓
                     /jobs
                       ↓
              Match Score / Ranking
Kenapa Fokus A lebih tepat?
1. parsed_data belum tentu akurat

Gemini bisa saja membaca:

"Node.js, PostgreSQL, Docker"

tetapi menghasilkan struktur yang kurang tepat.

Pengguna harus dapat memperbaikinya sebelum data digunakan untuk matching.

2. Matching harus menggunakan data CV yang sudah dikonfirmasi

Idealnya:

AI Parsed Data
      ↓
User Correction
      ↓
Approved Resume
      ↓
Embedding
      ↓
Matching Engine

Bukan:

AI Parsed Data
      ↓
Embedding
      ↓
Matching
      ↓
User Correction

Karena perubahan skill/pengalaman setelahnya dapat membuat embedding lama tidak lagi merepresentasikan CV terbaru.

3. /review merupakan titik penting antara AI dan pengguna

Ini juga bagus untuk demo lomba.

Juri bisa melihat:

AI membaca CV → pengguna memverifikasi → sistem menggunakan data yang telah dikonfirmasi untuk mencari pekerjaan yang paling sesuai.

Ini membuat konsep human-in-the-loop AI pada Lokers! AI lebih jelas.

Urutan implementasi setelah memilih Fokus A

Saya sarankan mengerjakannya secara bertahap:

Step A1 — Ambil data CV
/user/cv
      ↓
Supabase
      ↓
parsed_data
      ↓
/review
Step A2 — Buat form editor

Minimal:

Personal Information
├── Full Name
├── Email
├── Phone
└── Location

Professional Summary

Skills
├── Skill 1
├── Skill 2
└── [+ Add Skill]

Experience
├── Position
├── Company
├── Period
└── Highlights[]

Education
├── Institution
├── Degree
└── Graduation Year

Projects
├── Project Name
├── Technologies
└── Description
Step A3 — State management

Gunakan state lokal/form state untuk perubahan sementara:

Supabase Data
      ↓
Form State
      ↓
User Edit
      ↓
Validation
Step A4 — Validasi

Pastikan field penting tidak rusak sebelum disimpan.

Misalnya menggunakan Zod:

Form
 ↓
Zod Validation
 ↓
Valid?
 ├── No → tampilkan error
 └── Yes
       ↓
Supabase
Step A5 — Simpan

Setelah user menekan:

Save & Continue

maka:

review data
     ↓
user_resumes / cvs
     ↓
database
     ↓
generate/update embedding
Baru setelah itu Fokus B

Setelah /review selesai, kita lanjutkan:

PHASE 4
Mock Jobs
    ↓
jobs
    ↓
Google Embedding
    ↓
job_embedding
    ↓
match_jobs_for_cv()
    ↓
Cosine Similarity
    ↓
Match Score
    ↓
/jobs

Kemudian bisa diuji dengan contoh:

CV User
    │
    ├── Node.js
    ├── PostgreSQL
    ├── Git
    └── React
         │
         ▼
Matching Engine
         │
    ┌────┼────────────┐
    ▼    ▼            ▼
Backend Full Stack  Frontend
  92%      86%         71%
🎯 Keputusan final

Pilih Fokus A — Frontend & Form Review terlebih dahulu.

Setelah /review benar-benar dapat menampilkan → mengedit → memvalidasi → menyimpan CV final, baru kita mengerjakan Fokus B: Mock Jobs + Embedding + match_jobs_for_cv.

Urutan ini paling aman:

/upload → /review → CV final → embedding → Matching Engine → /jobs → /customize/[jobId] → AI Tailoring → PDF

Dengan demikian, Matching Engine selalu bekerja berdasarkan CV yang sudah dikonfirmasi pengguna, bukan hasil parsing AI yang masih mentah.