# Catatan Rilis (Changelog)

Semua perubahan penting pada proyek **MindGuard** akan dicatat di dalam berkas ini secara berkala.

Format penulisan changelog ini didasarkan pada standar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan mengikuti aturan penomoran versi [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-05-30

### Ditambahkan
- **Autentikasi & Integrasi Sesi:** Implementasi Better-Auth berbasis Drizzle adapter untuk menangani sistem login multi-peran (*Siswa*, *Guru BK*, *Admin*).
- **Check-in Harian Siswa (Mood Tracker):** Antarmuka responsif bagi siswa untuk mencatat suasana hati harian mereka (skor 1-5) beserta catatan jurnal opsional.
- **Sistem Pelaporan Bisikan (Whisper Reports):** Fitur pelaporan insiden, perundungan, atau tekanan emosional secara rapi (bisa bersifat anonim) demi kenyamanan siswa.
- **Dasbor Konseling Guru BK:** Panel khusus bimbingan konseling untuk meninjau status permohonan konseling dari siswa, penjadwalan tatap muka/online, dan pengisian hasil sesi konseling.
- **Sistem Alert Risiko Spasial:** Mesin pemantau otomatis yang memberikan sinyal peringatan kepada Guru BK bila mendeteksi pola penurunan suasana hati siswa secara berulang dalam kurun 14 hari terakhir.
- **Pengujian Fungsional Otomatis:** Setup test suite server-side untuk memvalidasi performa skema validasi data Zod.
- **Konfigurasi Lingkungan:** Berkas template `.env.example`, konfigurasi basis data Turso (LibSQL), setup Drizzle ORM, serta deployment otomatis Vercel.

### Diperbaiki / Dioptimalkan
- **Pembersihan Peran Akun:** Menghapus sepenuhnya peran *"homeroom"* (Wali Kelas) dari seluruh skema database, kueri data server, mockup seeding, serta kontrol otorisasi halaman untuk mempersempit fokus operasional sistem pada Guru BK dan Siswa.
- **Pembersihan Repositori:** Memindahkan dokumen biner berukuran besar (`SKPL.docx` dan `SKPL MindGuard - Final.pdf`) keluar dari area Git repositori ke direktori Downloads lokal pengguna guna menghindari bloat repositori.

---
*MindGuard Versi v0.1.0 diluncurkan sebagai fondasi arsitektur stabil pertama.*
