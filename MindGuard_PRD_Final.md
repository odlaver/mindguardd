# Product Requirements Document (PRD)
## MindGuard - Early Warning dan Alur Konseling Siswa

**Versi Dokumen:** 2.1.0
**Tanggal Update:** 19 Mei 2026
**Status:** Disesuaikan dengan implementasi frontend saat ini
**Aplikasi:** Next.js App Router di folder `frontend`

---

## 1. Ringkasan Produk

MindGuard adalah aplikasi sekolah untuk membantu siswa mencatat kondisi emosional harian, mengirim laporan privat, dan mengajukan konseling. Guru BK menggunakan data tersebut untuk memantau siswa prioritas, membaca alert risiko, mengelola laporan Whisper, dan menjadwalkan sesi konseling. Admin menggunakan aplikasi untuk memantau operasional sekolah, pengguna, kelas, dan konfigurasi sistem.

MindGuard bukan alat diagnosis klinis. Produk ini berfungsi sebagai sistem pencatatan, early warning, dan koordinasi tindak lanjut di lingkungan sekolah.

---

## 2. Kondisi Implementasi Saat Ini

### 2.1 Stack Teknis

- Framework: Next.js 16.2.6 App Router
- UI: React 19.2.4, Tailwind CSS 4
- Auth: Better Auth dengan email dan password
- Database: Drizzle ORM + LibSQL/Turso, dengan fallback lokal `file:./data/mindguard.db`
- Validasi input: Zod
- Deployment target: Vercel, root directory `frontend`

### 2.2 Script Utama

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan app lokal |
| `npm run build` | Build production Next.js |
| `npm run lint` | ESLint |
| `npm test` | Unit test form schema |
| `npm run db:generate` | Generate migration Drizzle |
| `npm run db:migrate` | Apply migration |
| `npm run db:seed` | Seed data demo |
| `npm run db:reset` | Reset database demo |
| `npm run db:setup` | Migrate lalu seed |

### 2.3 Status Keamanan Dependency

Dependency sudah diperbarui agar audit bersih:

- `next` menggunakan `^16.2.6`
- `eslint-config-next` menggunakan `^16.2.6`
- `postcss` dioverride ke `^8.5.15`
- `@esbuild-kit/core-utils > esbuild` dioverride ke `^0.28.0`

Target saat ini: `npm audit --omit=dev` menghasilkan `0 vulnerabilities`.

---

## 3. Pengguna dan Role

MindGuard saat ini memiliki tiga role aktif di UI:

| Role | Status | Home route |
|---|---|---|
| `student` | Aktif | `/student` |
| `counselor` | Aktif | `/counselor` |
| `admin` | Aktif | `/admin` |
| `homeroom` | Dicadangkan di auth schema | Belum punya dashboard khusus |

Catatan: field `role` di Better Auth mendukung `homeroom`, tetapi navigasi dan dashboard aktif hanya tersedia untuk student, counselor, dan admin.

---

## 4. Tujuan Produk

### 4.1 Tujuan Utama

1. Memudahkan siswa melakukan mood check-in harian dengan input singkat.
2. Memberi siswa kanal laporan privat untuk isu seperti bullying, tekanan sosial, relasi sekolah, atau masalah pribadi.
3. Menyediakan alur pengajuan konseling dari siswa ke Guru BK.
4. Membantu Guru BK melihat prioritas siswa, alert, laporan Whisper, dan jadwal konseling.
5. Membantu Admin memantau pengguna, sekolah, kelas, dan konfigurasi sistem.

### 4.2 Batasan Produk

- Tidak memberi diagnosis medis.
- Tidak memberi rekomendasi terapi otomatis.
- Tidak mengirim notifikasi eksternal.
- Tidak memiliki video counseling terintegrasi.
- Tidak menyediakan dashboard khusus wali kelas pada versi saat ini.

---

## 5. Fitur Berdasarkan Role

### 5.1 Siswa

Fitur aktif:

- Login.
- Mood check-in harian.
- Melihat status check-in hari ini.
- Melihat riwayat mood.
- Mengirim laporan Whisper.
- Melihat riwayat dan detail laporan Whisper milik sendiri.
- Mengajukan konseling.
- Melihat jadwal konseling.
- Mengonfirmasi jadwal konseling.
- Menandai sesi konseling selesai dari sisi siswa dengan catatan penutupan.
- Membaca resource/materi edukasi.

### 5.2 Guru BK

Fitur aktif:

- Login.
- Dashboard monitoring siswa.
- Melihat daftar siswa dan ringkasan risiko.
- Melihat detail siswa, mood history, alert, dan intervensi.
- Melihat daftar alert risiko.
- Melihat detail alert.
- Melihat daftar pengajuan konseling.
- Menjadwalkan konseling dari request yang masih baru.
- Melihat agenda dan riwayat sesi konseling.
- Melihat detail sesi konseling.
- Melihat daftar laporan Whisper.
- Membuka detail laporan Whisper.
- Mengubah status laporan Whisper: `Baru`, `Sedang Ditinjau`, `Selesai`.

Fitur yang masih read-only atau belum lengkap:

- Update status alert belum tersedia sebagai API aktif.
- Pencatatan outcome dan follow-up oleh Guru BK belum punya form/API aktif, meskipun field database sudah ada.

### 5.3 Admin

Fitur aktif:

- Login.
- Dashboard ringkasan sistem.
- Melihat daftar pengguna.
- Melihat detail pengguna.
- Melihat daftar sekolah dan kelas.
- Melihat detail sekolah.
- Melihat detail kelas.
- Melihat konfigurasi sistem.
- Mengubah konfigurasi sistem melalui endpoint PATCH system config.

Fitur yang masih read-only atau belum lengkap:

- Create/update/delete pengguna belum tersedia di UI aktif.
- Create/update/delete sekolah dan kelas belum tersedia di UI aktif.

---

## 6. Matriks Fitur

| Fitur | Siswa | Guru BK | Admin | Status |
|---|:---:|:---:|:---:|---|
| Login email/password | Ya | Ya | Ya | Aktif |
| Role redirect | Ya | Ya | Ya | Aktif |
| Mood check-in | Ya | Tidak | Tidak | Aktif |
| Riwayat mood pribadi | Ya | Tidak | Tidak | Aktif |
| Laporan Whisper | Ya | Ya | Tidak | Aktif |
| Update status Whisper | Tidak | Ya | Tidak | Aktif |
| Pengajuan konseling | Ya | Lihat | Tidak | Aktif |
| Penjadwalan konseling | Tidak | Ya | Tidak | Aktif |
| Konfirmasi sesi konseling | Ya | Lihat | Tidak | Aktif |
| Penutupan sesi oleh siswa | Ya | Lihat | Tidak | Aktif |
| Alert risiko | Tidak | Lihat | Tidak | Read-only |
| Student intervention | Tidak | Lihat | Tidak | Read-only |
| User management | Tidak | Tidak | Lihat | Read-only |
| School/class management | Tidak | Tidak | Lihat | Read-only |
| System config | Tidak | Tidak | Edit | Aktif |

---

## 7. Alur Autentikasi dan Otorisasi

### 7.1 Login

- Login berada di `/login`.
- Auth route dikelola oleh Better Auth di `/api/auth/[...all]`.
- Setelah session valid, user diarahkan berdasarkan role:
  - `admin` ke `/admin`
  - `counselor` ke `/counselor`
  - selain itu ke `/student`

### 7.2 Proteksi Halaman

- Server layout menggunakan `requireRole`.
- Jika tidak login, user diarahkan ke `/`.
- Jika role tidak sesuai, user diarahkan ke home route milik role-nya.
- Halaman counselor memakai `requireSchoolScopedRole` agar data dapat dibatasi berdasarkan `schoolId`.

### 7.3 Proteksi API

Route handler memakai validasi session dan role server-side.

Endpoint aktif:

| Endpoint | Method | Role | Fungsi |
|---|---|---|---|
| `/api/check-ins` | POST | student | Simpan mood harian |
| `/api/whispers` | POST | student | Kirim laporan Whisper |
| `/api/whispers/[reportId]` | PATCH | counselor | Update status Whisper |
| `/api/counseling/requests` | POST | student | Ajukan konseling |
| `/api/counseling/sessions` | POST | counselor | Buat jadwal sesi |
| `/api/counseling/sessions/[sessionId]/confirm` | PATCH | student | Konfirmasi jadwal |
| `/api/counseling/sessions/[sessionId]/complete` | PATCH | student | Tandai sesi selesai |
| `/api/admin/system-configs/[configId]` | PATCH | admin | Update konfigurasi |
| `/api/session/track` | POST | authenticated | Update last access |

Aturan penting:

- Siswa tidak mengirim `studentUserId` dari client untuk mutasi utama; server memakai `session.user.id`.
- Konselor harus memiliki `schoolId` untuk update Whisper dan membuat jadwal konseling.
- Konselor hanya boleh menjadwalkan siswa di sekolah yang sama.
- Admin-only endpoint hanya menerima role `admin`.

---

## 8. Business Rules

### 8.1 Mood Check-In

- Siswa hanya dapat check-in satu kali per hari.
- Hari dihitung berdasarkan zona waktu Jakarta (`Asia/Jakarta`, GMT+7).
- Payload:
  - `score`: integer 1 sampai 5.
  - `note`: opsional, maksimum 300 karakter.
- Jika siswa sudah check-in hari itu, endpoint mengembalikan conflict.

### 8.2 Student Access State

Dashboard siswa membaca apakah siswa sudah check-in hari ini. Jika sudah, UI menampilkan submission hari ini. Jika belum, UI menampilkan form check-in.

### 8.3 Risk Assessment Guru BK

Risk siswa dihitung dari data yang tersedia di server:

| Risk | Kondisi |
|---|---|
| `Tinggi` | Ada alert aktif dengan severity `Tinggi` |
| `Sedang` | Ada alert aktif atau skor mood terakhir <= 2 |
| `Aman` | Tidak ada alert aktif dan skor mood terakhir > 2 |

Jika belum ada mood history, skor terakhir dianggap 0 dalam daftar counselor sehingga siswa dapat tampil perlu diperhatikan tergantung konteks data.

### 8.4 Trend Mood

Trend dihitung dari tiga entri mood terakhir:

| Trend | Kondisi |
|---|---|
| `Naik 3 hari` | Skor naik berturut-turut |
| `Turun 3 hari` | Skor turun berturut-turut |
| `Stabil rendah` | Tiga skor terakhir semuanya <= 2 |
| `Fluktuatif` | Tidak cocok dengan pola di atas |
| `Belum cukup data` | Data kurang dari tiga entri |

### 8.5 Streak dan Completion Rate

- Streak dihitung mundur dari hari entri mood terbaru dan berhenti ketika ada hari kosong.
- Completion rate siswa dihitung dari jumlah hari aktif dalam 14 hari terakhir.
- Completion rate kelas dan sekolah dihitung dari jumlah siswa yang check-in hari ini dibanding total siswa pada scope tersebut.

### 8.6 Whisper Portal

Implementasi saat ini:

- Form siswa meminta `category`, `urgency`, `detail`, dan `title` opsional.
- `detail` minimal 20 karakter dan maksimal 2000 karakter.
- `title` opsional, jika diisi minimal 3 karakter dan maksimal 120 karakter.
- `urgency` hanya `Normal` atau `Tinggi`.
- Sistem membuat `excerpt` maksimum 120 karakter.
- UI menampilkan laporan sebagai anonim/privat.
- Database tetap menyimpan `studentUserId` pengirim agar siswa bisa melihat riwayat laporannya dan Guru BK dapat membuka detail siswa jika diperlukan.

Konsekuensi produk:

- Klaim yang tepat adalah "laporan privat dengan identitas ditampilkan anonim di UI", bukan anonimitas penuh tanpa jejak identitas.
- True anonymous report tanpa `studentUserId` belum diimplementasikan.

### 8.7 Alur Konseling

Alur aktif saat ini:

1. Siswa mengajukan konseling.
   - Input: topic, preferred slot, summary.
   - Status request awal: `Baru`.
   - Siswa tidak bisa membuat request baru jika masih ada request/sesi aktif.

2. Guru BK menjadwalkan sesi.
   - Input: requestId, tanggal, waktu, format.
   - Format: `Tatap muka` atau `Online`.
   - Waktu harus lebih besar dari waktu saat ini.
   - Request harus masih `Baru` dan belum punya scheduledSessionId.
   - Student harus berada di sekolah yang sama dengan counselor.
   - Session dibuat dengan status `Menunggu Konfirmasi`.
   - Request berubah menjadi `Dijadwalkan`.

3. Siswa mengonfirmasi jadwal.
   - Hanya bisa dilakukan oleh student pemilik session.
   - Hanya untuk session `Menunggu Konfirmasi`.
   - Status session berubah menjadi `Dikonfirmasi`.

4. Siswa menandai konseling selesai.
   - Hanya bisa dilakukan setelah status `Dikonfirmasi`.
   - Siswa wajib mengisi catatan minimal 4 karakter.
   - Session berubah menjadi `Selesai`.
   - Request terkait berubah menjadi `Selesai`.

Field `outcome` dan `followUp` sudah ada di database dan halaman detail dapat menampilkannya, tetapi editor aktif dari sisi Guru BK belum tersedia.

### 8.8 Alert

Alert saat ini berfungsi sebagai data monitoring:

- Ditampilkan di halaman counselor.
- Dipakai untuk menghitung risk siswa.
- Memiliki severity `Tinggi` atau `Sedang`.
- Memiliki status `Baru`, `Sedang Ditinjau`, atau `Selesai`.

Belum ada endpoint aktif untuk membuat atau mengubah alert dari UI.

### 8.9 System Config

Admin dapat mengubah:

- `value`
- `status`
- `summary`
- `impact`

Validasi:

- `value`: wajib, maksimum 200 karakter.
- `status`: `Aktif` atau `Tertunda`.
- `summary`: 3 sampai 800 karakter.
- `impact`: 3 sampai 800 karakter.

---

## 9. Navigasi

### 9.1 Student

| Route | Fungsi |
|---|---|
| `/student` | Mood harian dan dashboard siswa |
| `/student/history` | Riwayat mood |
| `/student/whisper` | Kirim dan lihat riwayat laporan Whisper |
| `/student/whisper/[reportId]` | Detail laporan milik siswa |
| `/student/resources` | Daftar materi edukasi |
| `/student/resources/[resourceId]` | Detail materi |
| `/student/counseling` | Hub konseling siswa |
| `/student/counseling/request` | Form pengajuan konseling |
| `/student/counseling/schedule` | Jadwal konseling |
| `/student/counseling/[sessionId]` | Detail sesi dan aksi siswa |

### 9.2 Counselor

| Route | Fungsi |
|---|---|
| `/counselor` | Dashboard mood dan prioritas siswa |
| `/counselor/students` | Daftar siswa |
| `/counselor/students/[studentId]` | Detail siswa |
| `/counselor/alerts` | Daftar alert |
| `/counselor/alerts/[alertId]` | Detail alert |
| `/counselor/counseling` | Hub konseling Guru BK |
| `/counselor/counseling/schedule` | Penjadwalan request |
| `/counselor/counseling/agenda` | Agenda dan riwayat sesi |
| `/counselor/counseling/[sessionId]` | Detail sesi |
| `/counselor/whispers` | Daftar laporan Whisper |
| `/counselor/whispers/[reportId]` | Detail dan update status Whisper |

### 9.3 Admin

| Route | Fungsi |
|---|---|
| `/admin` | Ringkasan sistem |
| `/admin/users` | Daftar pengguna |
| `/admin/users/[userId]` | Detail pengguna |
| `/admin/schools` | Daftar sekolah dan kelas |
| `/admin/schools/[schoolId]` | Detail sekolah |
| `/admin/schools/classes/[classId]` | Detail kelas |
| `/admin/system` | Daftar konfigurasi |
| `/admin/system/[configId]` | Detail dan edit konfigurasi |

---

## 10. Skema Data Utama

### 10.1 `user`

Field tambahan di Better Auth:

| Field | Keterangan |
|---|---|
| `role` | `student`, `counselor`, `admin`, `homeroom` |
| `schoolId` | Scope sekolah user |
| `classId` | Scope kelas, terutama siswa |
| `studentCode` | Kode/NIS siswa |
| `lastAccessAt` | Timestamp akses terakhir |

### 10.2 `mood_entry`

| Field | Keterangan |
|---|---|
| `id` | Primary key |
| `userId` | FK ke user |
| `score` | Integer 1-5 |
| `note` | Catatan opsional |
| `recordedAt` | Timestamp pengisian |

### 10.3 `whisper_report`

| Field | Keterangan |
|---|---|
| `id` | Primary key |
| `studentUserId` | FK ke user, nullable di schema |
| `ownerLabel` | Label pengirim yang ditampilkan |
| `title` | Judul laporan |
| `category` | Kategori laporan |
| `urgency` | `Tinggi` atau `Normal` |
| `status` | `Baru`, `Sedang Ditinjau`, `Selesai` |
| `submittedAt` | Timestamp |
| `excerpt` | Cuplikan singkat |
| `detail` | Isi lengkap |
| `nextStep` | Narasi tindak lanjut |
| `assignedTo` | Nama penanggung jawab |

### 10.4 `counseling_request`

| Field | Keterangan |
|---|---|
| `id` | Primary key |
| `studentUserId` | FK siswa |
| `topic` | Topik |
| `preferredSlot` | Slot yang nyaman |
| `summary` | Ringkasan kebutuhan |
| `status` | `Baru`, `Dijadwalkan`, `Selesai` |
| `submittedAt` | Timestamp |
| `scheduledSessionId` | FK ke session, nullable |

### 10.5 `counseling_session`

| Field | Keterangan |
|---|---|
| `id` | Primary key |
| `requestId` | FK request, nullable |
| `studentUserId` | FK siswa |
| `counselorUserId` | FK counselor, nullable |
| `title` | Judul sesi |
| `counselorName` | Nama counselor tersimpan |
| `scheduledAt` | Jadwal sesi |
| `format` | `Tatap muka` atau `Online` |
| `location` | Lokasi/link yang dibuat sistem |
| `status` | `Menunggu Konfirmasi`, `Dikonfirmasi`, `Selesai` |
| `invitationStatus` | Status undangan siswa |
| `focus` | Fokus sesi |
| `note` | Catatan awal |
| `outcome` | Hasil, nullable |
| `followUp` | Tindak lanjut, nullable |
| `studentConfirmationNote` | Catatan konfirmasi siswa |
| `studentCompletionNote` | Catatan penutupan siswa |

### 10.6 Entitas Lain

| Tabel | Fungsi |
|---|---|
| `alert` | Alert risiko siswa |
| `student_intervention` | Riwayat intervensi siswa |
| `resource` | Materi edukasi |
| `resource_point` | Poin materi edukasi |
| `school` | Data sekolah |
| `school_class` | Data kelas |
| `system_config` | Konfigurasi sistem |

---

## 11. Kebutuhan Non-Fungsional

### 11.1 Keamanan

- Auth server-side di halaman dan API.
- API tidak percaya payload client untuk identitas user.
- Counselor scoped by `schoolId` pada alur sensitif.
- Input divalidasi dengan Zod.
- Secret disimpan di environment variable.
- `.env*`, database lokal, build output, dan `node_modules` diabaikan oleh gitignore.

Catatan privasi:

- Whisper saat ini bersifat privat/anonim secara tampilan, bukan anonim penuh secara data.
- Data emosional siswa tetap harus diperlakukan sebagai data sensitif.

### 11.2 Performa

- Halaman utama mengambil data dari server component.
- Data access layer berada di `src/lib/server/data.ts`.
- Beberapa query memakai `Promise.all` untuk paralelisme.
- Next.js melakukan server rendering on demand untuk route yang membutuhkan session/data runtime.

### 11.3 Lokalisasi

- Bahasa UI: Indonesia.
- Perhitungan hari operasional memakai waktu Jakarta.
- Jadwal konseling diparse dengan offset `+07:00`.

### 11.4 Responsivitas

- Student flow dibuat mobile-first.
- Counselor dan Admin lebih padat untuk desktop/tablet, tetap dapat diakses dari layar kecil.

---

## 12. Edge Cases

| Skenario | Perilaku saat ini |
|---|---|
| Siswa submit mood dua kali pada hari yang sama | Ditolak dengan conflict |
| Payload form tidak valid | Ditolak dengan pesan validasi umum |
| Siswa mencoba update session milik siswa lain | Tidak ditemukan karena query memakai `session.user.id` |
| Konselor tanpa `schoolId` membuat jadwal | Ditolak 403 |
| Konselor menjadwalkan siswa sekolah lain | Ditolak 403 |
| Konselor update Whisper di luar sekolahnya | Tidak ditemukan/ditolak melalui scope sekolah |
| Request konseling sudah dijadwalkan | Tidak bisa dijadwalkan ulang |
| Session belum dikonfirmasi | Tidak bisa ditandai selesai |
| System config id tidak ditemukan | Mengembalikan 404 |

---

## 13. In Scope Versi Saat Ini

- Auth email/password.
- Role-based page access.
- Role-based API access.
- Student mood check-in.
- Mood history.
- Student dashboard.
- Counselor dashboard.
- Counselor student detail.
- Alert display.
- Whisper create dan status update.
- Counseling request, schedule, confirm, complete.
- Resource center.
- Admin overview.
- Admin users/schools/classes read-only views.
- Admin system config update.
- Local database fallback dan Turso setup.
- Unit tests untuk form schemas.

---

## 14. Out of Scope / Backlog

- True anonymous Whisper tanpa `studentUserId`.
- CRUD pengguna dari Admin.
- CRUD sekolah dan kelas dari Admin.
- CRUD alert dari Guru BK/Admin.
- Form outcome dan follow-up konseling dari Guru BK.
- Notifikasi email/WhatsApp/push.
- Dashboard wali kelas.
- Export laporan PDF/CSV.
- Integrasi kalender.
- Integrasi sistem akademik/absensi.
- Multi-bahasa.
- AI diagnosis atau prediksi klinis.

---

## 15. Kriteria Penerimaan Saat Ini

Project dianggap sehat jika:

1. `npm run lint` lulus.
2. `npm test` lulus.
3. `npm run build` lulus.
4. `npm audit --omit=dev` menghasilkan 0 vulnerability.
5. Role student tidak dapat mengakses data milik siswa lain melalui API.
6. Role counselor tidak dapat membuat jadwal untuk siswa dari sekolah lain.
7. Role admin saja yang dapat mengubah system config.

Status terakhir sebelum dokumen ini diperbarui:

- Lint: pass.
- Test: pass.
- Build: pass.
- Dependency audit production: 0 vulnerabilities.

---

## 16. Kesimpulan

MindGuard saat ini sudah memiliki fondasi produk yang jelas untuk tiga aktor utama: siswa, Guru BK, dan admin. Fitur inti yang sudah berjalan adalah mood check-in, laporan Whisper, monitoring counselor, alur konseling dasar, resource center, dan konfigurasi admin.

Fokus pengembangan berikutnya sebaiknya diarahkan ke fitur operasional yang belum lengkap: CRUD admin, manajemen alert aktif, outcome/follow-up konseling dari Guru BK, dan keputusan produk terkait apakah Whisper harus benar-benar anonim secara data atau cukup privat secara tampilan.

---

*[End of PRD - MindGuard v2.1.0]*
