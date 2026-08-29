"""# Minimum Viable Product (MVP) - AI Job Portal "Anti Ribet"

## 1. Konsep Utama
Platform agregasi lowongan kerja dengan fitur **"AI-Tailored Cover Letter Generator"**. Sistem ini memfasilitasi pencari kerja dengan mengumpulkan lowongan dari berbagai sumber secara terpusat, lalu menyediakan tombol instan untuk merumuskan surat lamaran (Cover Letter). Surat lamaran ini dikustomisasi secara spesifik berdasarkan kecocokan antara profil kandidat dan deskripsi pekerjaan. Pendekatan ini sangat efisien, hemat biaya infrastruktur server, dan memastikan pengguna memiliki kontrol penuh untuk mereviu lamarannya sebelum dikirimkan secara mandiri.

## 2. Alur Kerja User (User Flow)
1.  **Registrasi & Profiling:** User mendaftar ke portal dan memberikan data diri. (Metode input CV: *TBD - Form manual atau ekstraksi PDF*).
2.  **Browsing Pekerjaan:** User mencari lowongan yang dikumpulkan (hasil scraping) di platform.
3.  **Aksi "Buat Surat Lamaran":** Pada halaman detail pekerjaan, user menekan tombol untuk menyusun surat lamaran.
4.  **Generasi AI (Backend):** Sistem memproses data CV user dan Job Description menggunakan LLM untuk menghasilkan surat lamaran yang tajam dan relevan.
5.  **Output & Review:** Surat lamaran ditampilkan di antarmuka web. User dapat menyalin (copy) teks atau mengunduhnya (download PDF) untuk dikirim bersama lamaran secara mandiri.

## 3. Arsitektur & Teknologi

### A. Frontend (Antarmuka Pengguna)
*   **Teknologi:** Vite React.
*   **Fungsi Utama:**
    *   Menampilkan daftar pekerjaan.
    *   Mengelola *state* (loading, error, success) saat pemrosesan pembuatan surat lamaran.
    *   Menampilkan hasil teks dari AI secara instan.

### B. AI Engine & Prompting
*   **Model:** Gemini API.
*   **Prototyping Tools:** Google AI Studio (untuk tuning prompt).
*   **Struktur Prompting (Contoh):**
    *   **Peran:** Konsultan karier profesional.
    *   **Instruksi:** Menulis surat lamaran kerja yang natural dan profesional, mencocokkan CV dengan kriteria pekerjaan. Dilarang mengarang fakta (halusinasi).
    *   **Input Data:** Teks CV User + Deskripsi Lowongan Pekerjaan.

### C. Web Scraping (Pengumpul Data Lowongan)
*   **Agregator Lowongan (LinkedIn, dsb):** `JobSpy` (Python).
*   **Website Dinamis (Glints, dsb):** `Crawlee` (Node.js/Python).
*   **Sosial Media:** `Twikit` (X/Twitter), `Instaloader` (Instagram), `facebook-scraper` (Facebook).
*   *Catatan Operasional:* Membutuhkan manajemen *proxy* dan *rate limiting* untuk menjaga kelancaran ekstraksi data.

### D. Server & Deployment
*   **Infrastruktur:** Ubuntu Server (Reverse Proxy/Nginx).
*   **Keamanan:** API Key AI dan logika prompt diproses di sisi backend agar terlindungi dari klien.

## 4. Langkah Selanjutnya (Action Items)
1.  **Definisi Input CV:** Memutuskan mekanisme bagaimana user menginput data diri (Form manual berbasis web atau ekstraksi otomatis dari file PDF).
2.  **Pembuatan Prototipe Prompt:** Mengembangkan prompt di Google AI Studio dan mengujinya dengan berbagai sampel Job Description.
3.  **Setup Scraper:** Mengonfigurasi library JobSpy untuk menarik sampel data lowongan dalam jumlah kecil sebagai data awal.
"""