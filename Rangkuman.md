Tentu. Berdasarkan konsep, arsitektur, dan fitur Lokers! AI yang sudah kita susun sebelumnya, alur penggunaan website dapat dibuat menjadi sebuah user journey end-to-end yang lebih terstruktur. Alur ini juga dapat digunakan sebagai dasar untuk flowchart, dokumentasi sistem, proposal lomba, maupun implementasi kode frontend/backend.

Alur Penggunaan Website Lokers! AI

Secara umum, konsep utama Lokers! AI adalah:

Pengguna membuat akun → mencari lowongan → mengunggah CV sekali → AI memahami profil pengguna → mencocokkan profil dengan lowongan → membuat CV/cover letter yang disesuaikan → pengguna melakukan review → dokumen final dapat diekspor.

Alur sederhananya:

Landing Page
     ↓
Sign Up
     ↓
Email Verification
     ↓
Sign In
     ↓
Dashboard
     ↓
Eksplor / Cari Lowongan
     ↓
Pilih Lowongan
     ↓
Upload CV / Profil
     ↓
AI Parsing CV
     ↓
Review & Edit Data
     ↓
AI Job Matching
     ↓
Pilih Lowongan Target
     ↓
AI Tailored CV + Cover Letter
     ↓
Live Customizer
     ↓
Export PDF
     ↓
Simpan Riwayat
1. Landing Page

Ketika pengguna pertama kali mengakses website Lokers! AI, pengguna akan diarahkan ke halaman utama.

Pada halaman ini terdapat beberapa bagian utama:

Logo Lokers! AI
Navigasi:
Eksplor Loker
Cara Kerja AI
Untuk Perusahaan
Pusat Bantuan
Tombol Upload Profil Sekali
Tombol Masuk
Tombol Daftar
Tombol Pasang Loker (B2B)

Hero section menjelaskan value proposition:

Lamar Ribuan Loker Otomatis Pakai AI — Lebih Pasti & Cepat

Kemudian pengguna dapat memilih kategori pencarian seperti:

Butuh Cepat
Perusahaan Top
Kerja Remote
MT / ODP
Fresh Graduate

Pengguna yang belum memiliki akun diarahkan ke:

/signup

2. Sign Up / Pendaftaran Akun

Pengguna baru harus membuat akun Lokers! AI.

Form pendaftaran minimal:

Nama Lengkap
Email
Password
Konfirmasi Password

[ Daftar ]

Email harus merupakan email aktif, karena email tersebut digunakan untuk proses verifikasi akun.

Aturan password

Password harus memenuhi ketentuan:

Minimal 8 karakter
Minimal 1 huruf kapital
Minimal 1 angka
Minimal 1 simbol

Contoh format yang memenuhi aturan:

Lokers#2026

Sistem sebaiknya memberikan indikator secara langsung:

✓ Minimal 8 karakter
✓ Mengandung huruf kapital
✓ Mengandung angka
✓ Mengandung simbol

Jadi pengguna mengetahui persyaratan password sebelum melakukan pendaftaran.

3. Verifikasi Email / 2-Step Verification

Setelah pengguna menekan Daftar, sistem membuat proses verifikasi.

Alurnya:

User memasukkan email
        ↓
Supabase Auth
        ↓
Email verification / OTP
        ↓
Kode dikirim ke email
        ↓
User memasukkan kode
        ↓
Kode valid?
   ├── Tidak → tampilkan error
   └── Ya
         ↓
   Akun terverifikasi

Kode verifikasi hanya digunakan untuk memastikan bahwa pengguna memang memiliki akses terhadap alamat email tersebut.

Supabase

Data identitas akun disimpan melalui Supabase Auth, sedangkan data tambahan pengguna dapat disimpan pada tabel seperti:

auth.users
     ↓
user_profiles

Dengan demikian, auth.users.id menjadi identitas utama pengguna di sistem.

4. Penyimpanan Data Akun

Setelah verifikasi berhasil, sistem memiliki identitas pengguna.

Contohnya:

auth.users
│
├── id
├── email
├── encrypted password
└── authentication metadata
        │
        ▼
user_profiles
│
├── user_id
├── full_name
├── phone
├── location
├── headline
└── profile information

Password tidak disimpan secara manual oleh aplikasi di tabel profil. Pengelolaan kredensial autentikasi dilakukan oleh Supabase Auth.

Ini penting untuk keamanan sistem.

5. Sign In

Setelah akun berhasil dibuat dan diverifikasi, pengguna diarahkan ke halaman:

/signin

Form:

Email
Password

[ Masuk ]

Forgot Password?

Pengguna memasukkan:

Email yang sudah didaftarkan
Password yang dibuat pada Sign Up

Jika kredensial valid:

Sign In
   ↓
Supabase Auth
   ↓
Session berhasil
   ↓
Dashboard

Jika gagal:

Email/password salah
        ↓
Tampilkan pesan error
6. Forgot Password

Pada halaman Sign In terdapat:

Forgot Password?

Ketika dipilih:

Forgot Password
       ↓
Masukkan email
       ↓
Kode verifikasi dikirim
       ↓
Masukkan kode
       ↓
Kode valid
       ↓
Buat password baru
       ↓
Konfirmasi password
       ↓
Password berhasil diperbarui
       ↓
Sign In

Password baru tetap harus memenuhi aturan keamanan:

≥ 8 karakter
+ huruf kapital
+ angka
+ simbol

Dengan demikian, mekanisme pemulihan akun tetap memiliki verifikasi identitas melalui email.

7. Dashboard Lokers! AI

Setelah berhasil login, pengguna masuk ke Dashboard.

Dashboard menjadi pusat aktivitas pengguna.

Contohnya:

┌─────────────────────────────────────────────┐
│ Lokers! AI                         Profile   │
├─────────────────────────────────────────────┤
│                                             │
│ Halo, Rafi! 👋                              │
│                                             │
│ [Cari Lowongan...]                          │
│                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│ │ Lowongan │ │ CV Saya  │ │ Lamaran Saya │ │
│ │   120    │ │    1     │ │      5       │ │
│ └──────────┘ └──────────┘ └──────────────┘ │
│                                             │
│ Rekomendasi Lowongan                        │
│                                             │
└─────────────────────────────────────────────┘

Dari dashboard pengguna dapat mengakses:

Eksplor Lowongan
CV/Profile
AI Matching
CV Generator
Cover Letter Generator
Portfolio Generator
Lowongan tersimpan
Riwayat lamaran
Pengaturan akun
8. LoKers Scraping — Pengumpulan Data Lowongan

Salah satu fitur utama adalah LoKers Scraping.

Sistem mengambil data lowongan dari sumber yang telah ditentukan menggunakan scraper/service backend.

Alurnya:

Job Portal
    ↓
Scraper
    ↓
Raw Job Data
    ↓
scraped_jobs
    ↓
Normalisasi
    ↓
jobs
    ↓
Embedding
    ↓
Job Matching
    ↓
Frontend /jobs

Data yang dapat dikumpulkan antara lain:

Judul pekerjaan
Nama perusahaan
Lokasi
Deskripsi
Kualifikasi
Skill
Jenis pekerjaan
Rentang gaji
URL sumber
Waktu publikasi/scraping

Untuk MVP, data dapat terlebih dahulu menggunakan mock jobs, kemudian scraper lowongan nyata diintegrasikan setelah Matching Engine stabil.

9. Halaman Eksplor Lowongan — /jobs

Pengguna dapat mencari lowongan menggunakan search bar.

Contohnya:

Backend Developer

atau:

Node.js

atau:

UI/UX Designer

atau:

PT Telkom

Sistem kemudian menampilkan lowongan yang relevan.

10. Filtering Lowongan

Pengguna dapat mempersempit hasil pencarian menggunakan berbagai filter.

Berdasarkan pengalaman
Level Pengalaman
├── Fresh Graduate
├── Junior
├── Mid-Level
└── Senior
Berdasarkan jenis pekerjaan
Jenis Kerja
├── Full Time
├── Internship
├── Contract
└── Freelance
Berdasarkan lokasi
Tipe Lokasi
├── On-site
├── Hybrid
└── Remote
Berdasarkan gaji
Rentang Gaji
├── < Rp3 juta
├── Rp3–5 juta
├── Rp5–10 juta
└── > Rp10 juta
Berdasarkan industri

Misalnya:

Teknologi
Finance
E-Commerce
Manufaktur
Pendidikan
Healthcare
11. Pengguna Memilih Lowongan

Ketika pengguna menemukan lowongan yang menarik, pengguna dapat membuka:

Detail Lowongan

Contohnya:

Junior Backend Developer

PT ABC Teknologi

📍 Yogyakarta
💼 Full Time
💰 Rp5–7 juta

Requirements:
• Node.js
• PostgreSQL
• REST API
• Git
• Docker

[ Simpan ]
[ Buat CV Tailored ]

Ketika pengguna memilih Buat CV Tailored, sistem mengarahkan ke:

/customize/[jobId]
12. Upload Profil / CV Sekali

Konsep utama Lokers! AI adalah:

Upload profil sekali, gunakan berkali-kali.

Pengguna mengunggah CV PDF/DOCX.

Upload CV
    ↓
PDF/DOCX Parser
    ↓
Raw Text
    ↓
Gemini AI
    ↓
Structured JSON

AI mengekstrak:

Nama
Email
Nomor telepon
Lokasi
Professional summary
Pengalaman
Pendidikan
Skill
Project
Sertifikasi, jika tersedia
13. Halaman /review

Hasil parsing AI tidak langsung dianggap sempurna.

Pengguna diarahkan ke halaman:

/review

Contohnya:

Review Your Information

Personal Information
────────────────────
Nama       [ Rafi Ardiansyah ]
Email      [ example@email.com ]
Lokasi     [ Yogyakarta ]

Skills
────────────────────
[ Node.js ] [ PostgreSQL ] [ Git ]
[ + Tambah Skill ]

Experience
────────────────────
Backend Developer
PT ABC
2025 - 2026

[ Edit ]

Education
────────────────────
SMK ...

Pengguna dapat:

Mengubah informasi
Menambahkan skill
Menghapus informasi yang salah
Mengubah pengalaman
Memperbaiki pendidikan
Menambahkan project

Setelah selesai:

Save & Continue

14. AI Membuat Representasi Profil Pengguna

Setelah data CV dikonfirmasi, sistem dapat membuat embedding profil.

CV Final
   ↓
Profile Text
   ↓
Embedding Model
   ↓
768-dimensional vector
   ↓
profile_embedding

Data ini digunakan oleh Matching Engine.

15. AI Job Matching

Sekarang sistem memiliki:

User Profile Embedding
          +
Job Embedding

Kemudian PostgreSQL + pgvector menghitung kemiripan menggunakan Cosine Similarity/Distance.

Contoh:

CV User
   │
   ├── Node.js
   ├── PostgreSQL
   ├── REST API
   └── Docker
          │
          ▼
    Matching Engine
          │
    ┌─────┼─────┐
    ▼     ▼     ▼
  94%    87%    73%
  Job A  Job B  Job C

Hasilnya dapat ditampilkan sebagai:

94% Match

beserta alasan kecocokannya.

16. AI Tailoring di /customize/[jobId]

Setelah pengguna memilih lowongan, halaman Customize menampilkan editor split-screen.

┌──────────────────────┬──────────────────────────┐
│ DETAIL LOWONGAN      │ CV TAILORED              │
│                      │                          │
│ Junior Backend Dev   │ Professional Summary     │
│                      │                          │
│ Requirements         │ Experience              │
│ • Node.js            │                          │
│ • PostgreSQL         │                          │
│ • REST API           │ Skills                   │
│                      │                          │
│ Match: 82%           │ ATS Score: 91%           │
│                      │                          │
│                      │ [Generate Tailored CV]   │
└──────────────────────┴──────────────────────────┘

AI tidak boleh mengarang pengalaman atau skill pengguna.

AI hanya melakukan tailoring berdasarkan:

CV pengguna
     +
Requirement lowongan
     ↓
Gemini AI
     ↓
Tailored CV

Misalnya AI dapat menonjolkan pengalaman yang memang sudah ada dan relevan dengan:

Node.js
PostgreSQL
REST API
17. Cover Letter Generator

Setelah CV berhasil ditailor, AI juga dapat menghasilkan Cover Letter berdasarkan:

profil pengguna;
pengalaman;
skill;
posisi target;
perusahaan;
requirement lowongan.

Pengguna dapat mengedit hasilnya sebelum digunakan.

18. Live Customizer

Pengguna kemudian dapat menyesuaikan tampilan CV.

Misalnya:

Template
├── Minimalist ATS
├── Modern
└── Executive

Font
├── Inter
├── Roboto
└── Open Sans

Font Size
├── Compact
├── Standard
└── Large

Preview diperbarui secara langsung.

Karena sebelumnya kita memilih pendekatan template React modular, struktur dapat berupa:

TemplateMinimalist.tsx
TemplateModern.tsx
TemplateExecutive.tsx

Template yang sama kemudian dapat digunakan oleh preview dan generator PDF.

19. Export PDF

Setelah pengguna puas:

Export PDF

maka:

Final CV JSON
     ↓
Template
     ↓
HTML + CSS
     ↓
Puppeteer
     ↓
A4 PDF
     ↓
PDF Final

Hasilnya adalah CV profesional yang siap digunakan untuk melamar pekerjaan.

20. Penyimpanan Riwayat

Setiap CV yang telah dibuat dapat disimpan ke:

generated_resumes

Misalnya:

User
 │
 ├── CV Master
 │
 ├── Tailored CV - PT ABC
 │
 ├── Tailored CV - PT XYZ
 │
 └── Tailored CV - Company DEF

Dengan demikian pengguna tidak perlu membuat ulang CV dari awal.

21. Sistem Credits / Penggunaan AI

Untuk fitur AI yang membutuhkan pemrosesan, sistem dapat menggunakan mekanisme credits.

Contohnya:

AI Credits
──────────
5 Credits

Ketika pengguna menjalankan AI Tailor:

Check Credit
     ↓
Gemini API
     ↓
Berhasil
     ↓
Simpan generated_resume
     ↓
-1 Credit

Jika AI gagal:

Gemini Error
     ↓
Credit tidak dipotong

Ini sesuai dengan arsitektur yang sebelumnya kita pilih.

22. Alur Keseluruhan Lokers! AI

Jika diringkas menjadi satu alur besar:

                    ┌───────────────┐
                    │ Landing Page  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    Sign Up    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │ Email Verify  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    Sign In    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   Dashboard   │
                    └───────┬───────┘
                            ↓
              ┌─────────────┴─────────────┐
              ↓                           ↓
       ┌─────────────┐             ┌─────────────┐
       │    /jobs    │             │ Upload CV   │
       └──────┬──────┘             └──────┬──────┘
              │                           ↓
              │                    ┌─────────────┐
              │                    │ AI Parsing  │
              │                    └──────┬──────┘
              │                           ↓
              │                    ┌─────────────┐
              │                    │   /review   │
              │                    └──────┬──────┘
              │                           ↓
              │                    CV Final + Embedding
              │                           │
              └──────────────┬────────────┘
                             ↓
                     ┌───────────────┐
                     │ Job Matching  │
                     └───────┬───────┘
                             ↓
                    Match Score / Ranking
                             ↓
                     Pilih Lowongan
                             ↓
                  /customize/[jobId]
                             ↓
                  ┌──────────────────┐
                  │ Generate AI      │
                  │ Tailored CV      │
                  └────────┬─────────┘
                           ↓
                  ATS Match + Cover Letter
                           ↓
                    Live Customizer
                           ↓
                     Export PDF
                           ↓
                    Simpan Riwayat
Inti Konsep Lokers! AI

Dengan alur tersebut, Lokers! AI bukan sekadar website pencari lowongan. Produk ini memiliki tiga lapisan utama:

① LoKers Scraping

Mengumpulkan dan mengorganisasi lowongan dari berbagai sumber.

② AI Job Matching

Memahami profil pengguna dan mencocokkannya dengan requirement pekerjaan menggunakan embedding/vector matching.

③ AI CV & Portfolio Generator

Mengubah satu CV master menjadi dokumen yang disesuaikan dengan lowongan tertentu:

1 CV Master
      ↓
 ┌────┼────┬────┐
 ↓    ↓    ↓    ↓
Job A Job B Job C Job D
 ↓    ↓    ↓    ↓
CV-A CV-B CV-C CV-D

Inilah konsep “Upload Profil Sekali” yang menjadi pembeda utama Lokers! AI: pengguna tidak perlu membuat CV baru dari nol untuk setiap lowongan. Sistem memahami profil mereka sekali, kemudian AI membantu menyesuaikannya dengan setiap peluang kerja yang dipilih.