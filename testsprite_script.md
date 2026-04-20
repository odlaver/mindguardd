# MindGuard — TestSprite Testing Script
**Aplikasi:** MindGuard Early Warning System
**URL Produksi:** [Ganti dengan URL Vercel kamu, contoh: https://mindguard.vercel.app]
**Bahasa UI:** Bahasa Indonesia
**Tanggal:** 20 April 2026

---

## Akun Demo (Gunakan ini untuk login)

| Role | Email | Password |
|---|---|---|
| Siswa | `nabila.rahma@mindguard.id` | `Mindguard123!` |
| Siswa | `rafael.adi@mindguard.id` | `Mindguard123!` |
| Siswa | `nadia.putri@mindguard.id` | `Mindguard123!` |
| Guru BK | `maya.bk@mindguard.id` | `Mindguard123!` |
| Guru BK | `budi.bk@mindguard.id` | `Mindguard123!` |
| Admin | `admin@mindguard.id` | `Mindguard123!` |

---

## SKENARIO 1 — Login & Role Redirect

### 1.1 Login sebagai Siswa
1. Buka halaman utama aplikasi.
2. Pastikan halaman Login tampil dengan form Email dan Password.
3. Isi email: `nabila.rahma@mindguard.id`, password: `Mindguard123!`
4. Klik tombol **Sign in**.
5. **Expected:** Pengguna diarahkan ke halaman `/student` — halaman Mood Harian (Daily Mood Tracker).
6. Pastikan tidak ada pesan error "Email atau password tidak cocok".

### 1.2 Login sebagai Guru BK
1. Logout dari akun siswa (atau buka sesi baru).
2. Login menggunakan email: `maya.bk@mindguard.id`, password: `Mindguard123!`
3. **Expected:** Pengguna diarahkan ke halaman `/counselor` — halaman Dashboard Mood BK.
4. Halaman harus menampilkan **metric cards** berisi: "Siswa dipantau", "Alert aktif", "Ditinjau hari ini", "Laporan masuk".

### 1.3 Login sebagai Admin
1. Login menggunakan email: `admin@mindguard.id`, password: `Mindguard123!`
2. **Expected:** Pengguna diarahkan ke halaman `/admin` — halaman Ringkasan Sistem.
3. Halaman menampilkan metric cards: Total pengguna, Siswa aktif, Guru BK, Kelas.

### 1.4 Verifikasi Blokir Akses Lintas Role
1. Saat login sebagai **Siswa**, coba akses manual URL `/counselor`.
2. **Expected:** Sistem menolak akses dan redirect ke halaman tidak ditemukan atau halaman login.
3. Saat login sebagai **Guru BK**, coba akses URL `/admin`.
4. **Expected:** Sistem menolak akses.

---

## SKENARIO 2 — Fitur Siswa

> Login sebagai `nabila.rahma@mindguard.id` untuk semua skenario ini.

### 2.1 Daily Mood Tracker
1. Setelah login, pastikan berada di halaman `/student`.
2. Cari form input mood (biasanya berupa pilihan emoji atau angka 1–5).
3. Pilih salah satu skor mood (misalnya angka 3 atau 4).
4. Isi kolom catatan opsional dengan teks singkat, misalnya: *"Hari ini cukup baik."*
5. Klik tombol submit/kirim.
6. **Expected:** Data mood tersimpan dan halaman memperbarui tampilannya (tidak ada form kosong lagi, melainkan menampilkan submission hari ini).

### 2.2 Verifikasi Tidak Bisa Check-In Dua Kali
1. Setelah berhasil submit mood, coba submit ulang (jika masih ada tombol).
2. **Expected:** Sistem tidak mengizinkan input mood kedua di hari yang sama; tampilkan data yang sudah diinput.

### 2.3 Riwayat Mood
1. Klik menu navigasi **"Riwayat Mood"** (`/student/history`).
2. **Expected:** Halaman menampilkan data riwayat mood dalam bentuk grafik atau daftar.
3. Pastikan data yang ditampilkan berisi entri dari hari-hari sebelumnya.

### 2.4 Whisper Portal — Kirim Laporan
1. Klik menu navigasi **"Kirim Laporan"** (`/student/whisper`).
2. **Expected:** Halaman Whisper Portal terbuka.
3. Isi form laporan dengan:
   - Pilih identitas: Anonim atau Terbuka.
   - Isi judul laporan: *"Tes pengiriman laporan."*
   - Pilih kategori (jika ada pilihan).
   - Isi detail laporan.
4. Klik submit/kirim laporan.
5. **Expected:** Laporan berhasil dikirim. Halaman menampilkan konfirmasi atau laporan muncul di daftar laporan milik siswa.

### 2.5 Materi Edukasi — Resource Center
1. Klik menu **"Materi Edukasi"** (`/student/resources`).
2. **Expected:** Halaman menampilkan daftar artikel/konten edukasi.
3. Klik salah satu artikel untuk membuka detailnya.
4. **Expected:** Halaman detail artikel menampilkan judul, ringkasan, dan poin-poin konten.

### 2.6 Konseling — Ajukan Permintaan
1. Klik menu **"Konseling"** (`/student/counseling`).
2. **Expected:** Halaman hub konseling tampil dengan dua pilihan: "Lihat Jadwal" dan "Ajukan Konseling".
3. Klik **"Ajukan Konseling"** → masuk ke form pengajuan.
4. Isi form:
   - Topik: *"Stres menghadapi ujian."*
   - Ringkasan: *"Saya merasa cemas dan sulit fokus."*
   - Slot waktu: pilih salah satu opsi.
5. Klik submit.
6. **Expected:** Permintaan tersimpan. Kembali ke halaman konseling; badge "X sesi" bertambah atau ada konfirmasi.

### 2.7 Konseling — Lihat Jadwal Sesi
1. Klik **"Lihat Jadwal"** (`/student/counseling/schedule`).
2. **Expected:** Halaman menampilkan daftar sesi yang sudah dijadwalkan oleh Guru BK (jika ada).
3. Klik salah satu sesi untuk melihat detailnya.
4. **Expected:** Detail sesi menampilkan: nama BK, tanggal/waktu, format (Tatap Muka/Online), lokasi, dan status.

---

## SKENARIO 3 — Fitur Guru BK

> Login sebagai `maya.bk@mindguard.id` untuk semua skenario ini.

### 3.1 Dashboard Monitoring
1. Setelah login, pastikan berada di `/counselor`.
2. Verifikasi tampilan 4 metric cards: Siswa dipantau, Alert aktif, Ditinjau hari ini, Laporan masuk.
3. Pastikan terdapat bagian **"Siswa prioritas"** yang menampilkan siswa berrisiko tinggi.
4. Pastikan terdapat bagian **"Alert terbaru"** yang berisi daftar alert.
5. Klik salah satu link siswa prioritas untuk membuka detailnya.

### 3.2 Detail Mood Siswa
1. Klik menu navigasi **"Detail Mood Siswa"** (`/counselor/students`).
2. **Expected:** Daftar semua siswa yang dipantau dengan status risiko tiap siswa (Tinggi/Sedang/Aman).
3. Klik tombol **"Detail"** pada salah satu siswa.
4. **Expected:** Halaman detail siswa menampilkan: riwayat mood, tren, status risiko, dan daftar intervensi (jika ada).

### 3.3 Alert Risiko
1. Klik menu navigasi **"Lihat Alert Risiko"** (`/counselor/alerts`).
2. **Expected:** Daftar semua alert aktif dengan badge severity (Tinggi=merah, Sedang=kuning) dan badge status (Baru=merah, Sedang Ditinjau=kuning, Selesai=hijau).
3. Klik salah satu alert.
4. **Expected:** Halaman detail alert menampilkan: nama siswa, alasan alert, ringkasan situasi, rekomendasi tindak lanjut, dan opsi untuk mengubah status.

### 3.4 Kelola Konseling — Jadwal & Pengajuan
1. Klik menu navigasi **"Kelola Konseling"** (`/counselor/counseling`).
2. **Expected:** Halaman hub konseling BK tampil dengan dua pilihan: "Jadwal & Pengajuan" dan "Agenda & Riwayat".
3. Klik **"Jadwal & Pengajuan"** (`/counselor/counseling/schedule`).
4. **Expected:** Daftar pengajuan masuk dari siswa (status "Baru") tampil.
5. Klik salah satu pengajuan untuk melihat atau meresponsnya.

### 3.5 Kelola Konseling — Agenda & Riwayat
1. Kembali ke `/counselor/counseling`, klik **"Agenda & Riwayat"** (`/counselor/counseling/agenda`).
2. **Expected:** Daftar sesi konseling (aktif dan arsip) tampil dengan status tiap sesi.
3. Klik salah satu sesi untuk melihat detailnya.
4. **Expected:** Detail sesi menampilkan: nama siswa, nama BK, jadwal, format, lokasi, fokus, catatan, outcome (jika sudah selesai).

### 3.6 Whisper Reports — Kelola Laporan
1. Navigasi ke `/counselor/whispers` (melalui sidebar atau link yang tersedia).
2. **Expected:** Daftar semua laporan Whisper Portal tampil dengan status tiap laporan.
3. Klik salah satu laporan.
4. **Expected:** Detail laporan menampilkan: identitas pengirim (atau "Anonim"), kategori, urgensi, detail lengkap isi laporan, petugas yang ditugaskan, dan langkah tindak lanjut.

---

## SKENARIO 4 — Fitur Admin

> Login sebagai `admin@mindguard.id` untuk semua skenario ini.

### 4.1 Ringkasan Sistem (Dashboard)
1. Setelah login, pastikan berada di `/admin`.
2. Verifikasi metric cards: Total pengguna, Siswa aktif, Guru BK, dan Jumlah Kelas.
3. Pastikan terdapat bagian **"Sekolah membutuhkan perhatian"** dengan progress bar completion rate.
4. Pastikan terdapat bagian **"Permintaan tertunda"** yang menampilkan item prioritas.
5. Pastikan terdapat bagian **"Log admin"** dengan aktivitas pengguna terakhir.

### 4.2 Akun Pengguna (User Management)
1. Klik menu **"Akun Pengguna"** (`/admin/users`).
2. **Expected:** Daftar seluruh pengguna tampil (Siswa, Guru BK, dan Admin).
3. Verifikasi kolom yang ditampilkan: Nama, Role, Sekolah, Status aktif, dan Akses terakhir.
4. Klik salah satu pengguna untuk melihat detail akun.
5. **Expected:** Halaman detail pengguna menampilkan informasi lengkap.

### 4.3 Data Kelas (School Management)
1. Klik menu **"Data Kelas"** (`/admin/schools`).
2. **Expected:** Daftar sekolah tampil dengan completion rate dan risk band tiap kelas.
3. Klik salah satu sekolah untuk melihat detail.
4. **Expected:** Halaman detail sekolah menampilkan daftar kelas beserta info risk band tiap kelas.

### 4.4 Konfigurasi Sistem (System Config)
1. Klik menu **"Pengaturan"** (`/admin/system`).
2. **Expected:** Daftar kartu konfigurasi sistem tampil, masing-masing dengan nama, group, nilai aktif, ringkasan, dan dampak.
3. Status badge "Aktif" berwarna hijau, "Tertunda" berwarna kuning.
4. Klik tombol **"Ubah"** pada salah satu konfigurasi.
5. **Expected:** Halaman detail konfigurasi terbuka dan menampilkan opsi untuk mengubah nilai.

---

## SKENARIO 5 — Keamanan & Validasi

### 5.1 Login dengan Kredensial Salah
1. Di halaman login, masukkan email valid tetapi password salah.
2. **Expected:** Sistem menampilkan pesan error (misalnya: "Email atau password tidak cocok").
3. Pengguna tetap berada di halaman login.

### 5.2 Akses Halaman tanpa Login
1. Tanpa login, coba akses langsung URL `/student`.
2. **Expected:** Sistem redirect ke halaman login.
3. Coba akses `/counselor` dan `/admin` tanpa login.
4. **Expected:** Semua redirect ke halaman login.

### 5.3 Siswa Mencoba Akses Halaman Guru BK
1. Login sebagai Siswa.
2. Coba akses manual URL `/counselor`.
3. **Expected:** Akses ditolak — redirect ke halaman error atau login.

---

## CATATAN PENTING UNTUK TESTSPRITE

1. **Aplikasi berbahasa Indonesia** — Semua label tombol, menu, dan teks adalah Bahasa Indonesia.
2. **Redirect berbasis role** — Setelah login, URL akan otomatis berubah tergantung role akun.
3. **Daily check-in** — Jika sudah ada submission mood hari ini, form tidak akan muncul lagi (ini bukan bug, ini fitur).
4. **Sidebar navigasi** — Menu navigasi terletak di sidebar kiri (desktop) atau menu hamburger (mobile).
5. **Jangan mengubah password** akun demo atau memasukkan data yang berisi karakter berbahaya/SQL injection.
6. **Vercel production** mungkin butuh 1–2 detik loading pada request pertama (cold start). Ini normal.
