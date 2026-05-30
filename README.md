# MindGuard - Aplikasi Pemantauan Kesehatan Mental Siswa & Konseling Sekolah

MindGuard adalah platform *smart-education* dan *civic-tech* berbasis Next.js yang dirancang khusus untuk memfasilitasi deteksi dini kondisi kesehatan mental siswa, pelaporan insiden secara anonim (*Whisper Reports*), serta penjadwalan konseling interaktif bersama Guru Bimbingan Konseling (BK).

Platform ini dibuat untuk mempermudah sekolah memantau kesejahteraan psikologis (*psychological well-being*) siswa secara berkala dan terukur.

---

## 🌟 Fitur Utama

1. **Portal Siswa (Student Portal) - `/student`**
   - **Check-in Harian (Mood Tracker):** Siswa dapat mencatat suasana hati mereka setiap hari (skor 1-5 beserta catatan opsional) dengan antarmuka yang ramah.
   - **Konseling Mandiri (Counseling Booking):** Fitur pemesanan jadwal konseling bersama Guru BK dengan pemilihan topik (akademik, sosial, pribadi) dan slot waktu.
   - **Whisper Report (Laporan Anonim):** Ruang aman bagi siswa untuk melaporkan perundungan (*bullying*), tekanan akademik, atau masalah pribadi secara aman (bisa anonim).
   - **Edukasi & Edu-Resources:** Akses langsung ke materi edukasi kesehatan mental pilihan.

2. **Portal Guru BK (Counselor Portal) - `/counselor`**
   - **Alert Otomatis (Automatic Risk Scoring):** Sistem cerdas yang mendeteksi penurunan mood berulang pada siswa dan menandai siswa yang memerlukan perhatian segera (*Perlu perhatian* / *Monitor*).
   - **Manajemen Konseling:** Penerimaan, penjadwalan (tatap muka/online), konfirmasi, dan pencatatan hasil sesi konseling (*counseling outcome & follow-up*).
   - **Manajemen Laporan Bisikan (Whispers):** Menindaklanjuti pengaduan siswa, menentukan langkah selanjutnya (*next steps*), dan melacak status penyelesaian masalah.

3. **Portal Administrator (Admin Portal) - `/admin`**
   - **Manajemen Pengguna:** Pengelolaan akun Admin, Guru BK, dan Siswa secara komprehensif.
   - **Konfigurasi Sistem:** Pengaturan parameter ambang batas alert otomatis, bobot penilaian risiko, dan konfigurasi operasional lainnya secara dinamis.

---

## 🛠️ Tech Stack & Arsitektur Kode

Aplikasi ini dikembangkan dengan arsitektur modern yang mengedepankan performa tinggi, efisiensi memori, dan kemudahan deployment:

* **Framework:** Next.js 15+ (React 19, TypeScript) menggunakan **App Router**
* **Database & ORM:** SQLite / Turso (LibSQL) dengan **Drizzle ORM**
* **Autentikasi:** **Better-Auth** (State-of-the-art authentication library untuk Next.js dengan Drizzle adapter)
* **Validasi Input:** **Zod** untuk validasi skema data dan keamanan tingkat server
* **Gaya Visual (Styling):** Tailwind CSS v4 dengan PostCSS
* **Zona Waktu:** Penanganan otomatis zona waktu lokal Jakarta (WIB) tanpa dependensi library besar untuk optimalisasi ukuran bundle.

---

## 📁 Struktur Direktori Repositori

```text
C:\!mindguardd\
├── app\                         # Folder Utama Next.js App
│   ├── drizzle\                 # Berkas migrasi database otomatis oleh Drizzle Kit
│   ├── public\                  # Aset statis & ikon
│   ├── scripts\                 # Script utilitas (Seeding, setup Turso, reset DB)
│   ├── src\
│   │   ├── app\                 # Routing halaman berdasarkan peran (Admin, Counselor, Student, Login, API)
│   │   ├── components\          # Komponen UI modular
│   │   ├── db\                  # Client database (client.ts), schema utama (schema.ts), dan auth schema
│   │   ├── lib\                 # Library (Auth, Server Actions, Utility, Sesi)
│   │   └── tests\               # Pengujian fungsionalitas server (zod schema & utility)
│   ├── package.json             # Manajer dependensi Next.js
│   └── tsconfig.json            # Konfigurasi TypeScript
├── SKPL MindGuard - Final.pdf   # Dokumen spesifikasi kebutuhan perangkat lunak (Dipindah ke Downloads/)
├── SKPL.docx                    # Dokumen mentah SKPL (Dipindah ke Downloads/)
├── italicize_foreign_terms.bas  # Makro pendukung (Dipindah ke Downloads/)
└── README.md                    # Dokumentasi utama (berkas ini)
```

---

## 🚀 Panduan Setup & Menjalankan Aplikasi

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### 2. Pemasangan Lokal
1. Masuk ke direktori `app`:
   ```bash
   cd app
   ```
2. Instal seluruh dependensi:
   ```bash
   npm install
   ```
3. Salin templat berkas env:
   ```bash
   cp .env.example .env.local
   ```
4. Untuk pengembangan lokal tanpa database Turso cloud, Anda dapat menggunakan file database SQLite lokal dengan mengisi nilai berikut di `.env.local`:
   ```env
   TURSO_DATABASE_URL=file:./data/mindguard.db
   ```
5. Jalankan migrasi dan seed data demo bawaan (seperti akun admin, guru BK, siswa, sekolah, dan data mood):
   ```bash
   npm run db:setup
   ```
6. Jalankan server pengembangan Next.js:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Akun Demo Bawaan (Default Credentials)
Setelah melakukan seeding data (`npm run db:setup`), Anda dapat masuk menggunakan akun demo berikut:

* **Akun Admin:**
  * Email: `admin@mindguard.id`
  * Password: `password123`
* **Akun Guru BK (Counselor):**
  * Email: `bk.nusantara@mindguard.id` (Sekolah: SMA Nusantara)
  * Password: `password123`
* **Akun Siswa (Student):**
  * Email: `budi.nusantara@mindguard.id` (Sekolah: SMA Nusantara, Kelas: XI IPA 2)
  * Password: `password123`

---

## 🧪 Menjalankan Pengujian (Testing)
Aplikasi ini dilengkapi dengan rangkaian pengujian fungsionalitas Zod schema secara modular. Untuk menjalankan pengujian:
```bash
cd app
npm test
```

---

## ☁️ Panduan Deploy ke Vercel & Turso Cloud

### A. Integrasi Database Turso Cloud
Jika ingin memindahkan database ke Turso Cloud secara gratis:
1. Jalankan login Turso:
   ```bash
   npm run turso:login
   ```
2. Buat database MindGuard di Turso:
   ```bash
   turso db create mindguardd
   ```
3. Ambil URL database dan token akses, lalu masukkan ke `.env.local` proyek Vercel/Lokal Anda:
   ```env
   TURSO_DATABASE_URL=libsql://mindguardd-[org-name].turso.io
   TURSO_AUTH_TOKEN=[your-turso-token]
   ```

### B. Deployment ke Vercel
Karena aplikasi utama Next.js berada di dalam subfolder `app`, pastikan saat menambahkan proyek di Vercel:
1. Set **Root Directory** ke: `app`
2. Konfigurasikan Environment Variables berikut di dasbor Vercel:
   - `BETTER_AUTH_SECRET` (dapat di-generate secara acak)
   - `BETTER_AUTH_URL` (URL produksi Vercel Anda, misal: `https://mindguardd.vercel.app`)
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
3. Lakukan deploy proyek.

---
*MindGuard dikembangkan untuk mendukung sekolah inklusif yang sehat secara mental demi masa depan pendidikan Indonesia yang cerah.*
