Jawaban Untuk Langkah 2:
Untuk MVP dan demo lomba, saya menyarankan 3 template, tetapi implementasinya dilakukan bertahap.
🥇 Pilihan: 3 Template
Gunakan:
1.	Minimalist Clean ATS — aman untuk sistem ATS dan lamaran kerja formal. 
2.	Modern Sidebar — lebih visual dan menarik untuk demo. 
3.	Executive Serif — terlihat formal/premium untuk posisi profesional. 
Jangan membuat ketiganya memiliki sistem yang berbeda. Gunakan satu data CV + satu PDF engine (Puppeteer), lalu hanya template HTML/CSS yang berbeda.
                 CV JSON
                    │
                    ▼
             Template Engine
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
 Minimalist      Modern       Executive
    ATS          Sidebar        Serif
       │            │            │
       └────────────┼────────────┘
                    ▼
                Puppeteer
                    │
                    ▼
                  PDF
Struktur folder
Karena project-mu menggunakan Next.js:
apps/web/
└── src/
    ├── app/
    │   ├── dashboard/
    │   └── api/
    │       └── resume/
    │           └── pdf/
    │               └── route.ts
    │
    └── templates/
        └── resume/
            ├── minimalist-ats/
            │   ├── template.tsx
            │   └── styles.css
            │
            ├── modern-sidebar/
            │   ├── template.tsx
            │   └── styles.css
            │
            └── executive-serif/
                ├── template.tsx
                └── styles.css
UI saat demo
Setelah AI selesai membaca CV:
Choose Your CV Template

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│             │ │             │ │             │
│  Minimalist │ │    Modern   │ │  Executive  │
│     ATS     │ │   Sidebar   │ │    Serif    │
│             │ │             │ │             │
│   Preview   │ │   Preview   │ │   Preview   │
│             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘

       [ Customize ] [ Generate PDF ]
________________________________________
Tapi implementasinya jangan langsung 3 sekaligus
Saya sarankan urutannya:
Tahap 1 — Template utama
Buat Minimalist Clean ATS terlebih dahulu.
Pastikan:
CV Data
 ↓
Template
 ↓
Live Preview
 ↓
Puppeteer
 ↓
PDF
semuanya berhasil.
Tahap 2 — Tambahkan Modern Sidebar
Setelah pipeline pertama stabil, tinggal membuat template kedua dengan data yang sama.
Tahap 3 — Tambahkan Executive Serif
Terakhir tambahkan template ketiga.
Dengan demikian, jika waktu lomba ternyata mepet, kamu tetap memiliki satu template yang sudah benar-benar berfungsi.
________________________________________
Kenapa bukan 1 template saja?
Untuk pengembangan awal, satu template memang paling cepat. Tetapi untuk demo lomba, pemilih template memberikan efek "wow" yang cukup besar.
Juri bisa melihat:
Upload CV → AI membaca → data otomatis terisi → pilih template → AI menyesuaikan CV → PDF profesional.
Itu menunjukkan bahwa aplikasi bukan hanya AI text generator, tetapi benar-benar memiliki produk end-to-end.
Keputusan final
Gunakan 3 template untuk target MVP demo:
Template	Prioritas	Tujuan
Minimalist Clean ATS	🥇 1	Template utama & ATS
Modern Sidebar	🥈 2	Visual demo
Executive Serif	🥉 3	Formal/premium
Implementasi dimulai dari 1 template → pastikan seluruh pipeline bekerja → baru duplikasi sistem ke 2 template lainnya.
Untuk database yang sebelumnya kita buat, template_id sudah mendukung pendekatan ini:
modern-ats
minimalist-ats
modern-sidebar
executive-serif
Jadi arsitektur database tidak perlu diubah besar-besaran.

