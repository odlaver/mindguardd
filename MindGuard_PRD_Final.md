# Product Requirements Document (PRD)
## MindGuard — Early Warning System Kesehatan Mental Siswa

**Versi Dokumen:** 2.0.0 (Final — Diselaraskan Penuh dengan Source Code)
**Tanggal Rilis:** 20 April 2026
**Status:** Approved

---

## 1. Latar Belakang & Problem Statement

### 1.1 Gambaran Kondisi Saat Ini
Pemantauan kesehatan mental siswa di lingkungan sekolah menengah Indonesia mayoritas masih bersifat reaktif: sekolah baru bergerak ketika ada laporan insiden atau ketika kondisi siswa sudah tampak melampaui batas. Guru BK umumnya kewalahan karena perbandingan jumlah Guru BK dengan siswa tidak ideal, sehingga mustahil untuk memonitor ratusan siswa secara personal setiap hari.

**Masalah konkret yang teridentifikasi:**
- Tidak ada sistem pencatatan mood rutin yang terstandarisasi; semua bergantung ingatan dari guru.
- Siswa tidak memiliki kanal aman untuk melaporkan isu sensitif (bullying, tekanan sosial, masalah keluarga) tanpa takut diekspos.
- Guru BK tidak dapat menentukan siapa siswa yang paling membutuhkan perhatian darurat pada hari tertentu.
- Proses konseling tidak terdokumentasi secara digital; catatan tercecer di kertas atau tidak terjaga konsistensinya.
- Tidak ada visibilitas data agregat untuk Admin yang bertanggung jawab atas operasional sekolah.

### 1.2 Peluang yang Dapat Ditangkap
Dengan pencatatan mood harian berbasis skor yang sederhana, sistem dapat mengotomasi identifikasi pola emosi negatif dan langsung memprioritaskan perhatian Guru BK terhadap siswa yang paling berisiko — jauh sebelum masalah berkembang menjadi krisis.

---

## 2. Visi Produk

> **"MindGuard hadir untuk mengubah pemantauan kesehatan mental di sekolah dari pendekatan reaktif menjadi proaktif — berbasis data, terstruktur, dan inklusif bagi seluruh sivitas sekolah."**

MindGuard bukan alat diagnosis klinis. MindGuard adalah sistem early warning dan manajemen tindak lanjut yang membantu ekosistem sumber daya manusia di sekolah berkolaborasi dalam menjaga kesejahteraan emosional siswa.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama
1. Menyediakan platform digital bagi siswa untuk mencatat kondisi emosional harian secara mandiri, rutin, dan ringan (kurang dari 10 detik per sesi).
2. Mengidentifikasi secara otomatis siswa yang memiliki tren penurunan mood berturut-turut dan mengklasifikasikannya sebagai risiko tinggi / sedang.
3. Memfasilitasi Guru BK dalam mengelola seluruh alur konseling — dari pengajuan siswa, penjadwalan, pelaksanaan, hingga dokumentasi tindak lanjut — dalam satu platform terpadu.
4. Menyediakan kanal pelaporan anonim yang aman untuk isu-isu sensitif yang tidak dapat disampaikan langsung.
5. Memberikan Admin visibilitas menyeluruh atas kondisi kesehatan emosional di seluruh sekolah yang dinaunginya.

### 3.2 Tujuan Sekunder
- Meningkatkan kebiasaan refleksi diri pada siswa melalui fitur gamifikasi ringan (streak dan completion rate).
- Mendorong Guru BK untuk beroperasi secara proaktif melalui sistem notifikasi alert terstruktur.
- Membangun fondasi data historis emosi siswa yang dapat digunakan untuk analisis jangka panjang.

---

## 4. Pengguna & Role

MindGuard mengoperasikan **tiga role utama** dengan akses, dashboard, dan fungsionalitas yang sepenuhnya terpisah:

### 4.1 Siswa (Student)
**Deskripsi:** Pengguna akhir utama aplikasi. Mayoritas mengakses via HP.
**Kebutuhan fungsional:**
- Mengisi mood harian dalam waktu sangat singkat.
- Melihat riwayat perkembangan mood pribadi.
- Melaporkan masalah sensitif secara anonim maupun terbuka.
- Mengajukan permintaan untuk sesi konseling.
- Melihat dan mengonfirmasi jadwal sesi konseling yang sudah dijadwalkan.
- Mengakses materi edukasi kesehatan mental.

**Karakteristik UX:** Antarmuka harus terasa ringan, ramah, tidak klinis, dan mobile-first. Setiap penghalang interaksi tambahan berpotensi mengurangi angka check-in harian.

### 4.2 Guru BK (Counselor)
**Deskripsi:** Otoritas konseling satu-satunya dalam sistem. Bertanggung jawab penuh atas tindak lanjut kesehatan mental siswa.
**Kebutuhan fungsional:**
- Memantau seluruh data siswa dalam satu dashboard: jumlah alert aktif, laporan masuk, jumlah ditinjau hari ini, dan total siswa yang dipantau.
- Melihat daftar siswa beserta status risiko (Tinggi, Sedang, Aman), tren mood terkini, dan ringkasan fokus masalah.
- Masuk ke halaman detail tiap siswa untuk membaca riwayat mood secara mendalam.
- Meninjau, mengubah status, dan menindaklanjuti peringatan risiko (Alert).
- Mengelola pengajuan konseling dari siswa: menyetujui atau menolak, menjadwalkan sesi, dan mencatat hasil sesi.
- Melihat dan mengelola seluruh laporan Whisper Portal.
- Mencatat riwayat intervensi (Student Interventions) untuk siswa berisiko tinggi.

**Karakteristik UX:** Antarmuka informatif, terstruktur, dan cepat dibaca. Prioritas informasi harus berbasis tingkat risiko. Guru BK tidak boleh membuang waktu membaca data yang tidak relevan.

### 4.3 Admin Sekolah (Admin)
**Deskripsi:** Pengelola operasional sistem. Bertanggung jawab atas integritas data pengguna dan konfigurasi parameter sistem.
**Kebutuhan fungsional:**
- Melihat ringkasan sistem secara menyeluruh: jumlah pengguna, siswa aktif, Guru BK, kelas, dan status completion rate tiap sekolah.
- Mengidentifikasi sekolah dan kelas yang memerlukan perhatian khusus (berdasarkan riskBand).
- Mengelola akun seluruh pengguna (Siswa, Guru BK, dan Admin).
- Mengelola data sekolah dan kelas.
- Melihat dan mengubah konfigurasi sistem (system configs), termasuk threshold alert.

---

## 5. Pemetaan Fitur Berdasarkan Role

| Fitur / Halaman                         | Siswa | Guru BK | Admin |
|-----------------------------------------|:-----:|:-------:|:-----:|
| Mood Tracker Harian                     | ✅    | —       | —     |
| Riwayat Mood Pribadi                    | ✅    | —       | —     |
| Whisper Portal (Kirim Laporan)          | ✅    | —       | —     |
| Resource Center (Materi Edukasi)        | ✅    | —       | —     |
| Konseling Hub (Ajukan & Lihat Jadwal)   | ✅    | —       | —     |
| Dashboard Monitoring Mood               | —     | ✅      | —     |
| Detail Mood Siswa (per individu)        | —     | ✅      | —     |
| Alert Risiko (Daftar & Detail)          | —     | ✅      | —     |
| Kelola Konseling (Jadwal & Agenda)      | —     | ✅      | —     |
| Whisper Reports (Kelola Laporan)        | —     | ✅      | —     |
| Dashboard Admin (Ringkasan Sistem)      | —     | —       | ✅    |
| Akun Pengguna (User Management)         | —     | —       | ✅    |
| Data Kelas & Sekolah                    | —     | —       | ✅    |
| Konfigurasi Sistem (System Config)      | —     | —       | ✅    |

---

## 6. Logika Sistem & Business Rules

### 6.1 Mekanisme Autentikasi & Redirect
- Sistem menggunakan **satu halaman login tunggal** (`/login`) untuk semua role.
- Setelah login berhasil, Better Auth memvalidasi kredensial dan sistem membaca field `role` dari tabel `user` di database.
- Redirect otomatis dilakukan berdasarkan peta berikut:
  - `student` → `/student` (Daily Mood Tracker)
  - `counselor` → `/counselor` (Dashboard Monitoring)
  - `admin` → `/admin` (Ringkasan Sistem)
- Middleware Next.js (`requireRole`) menjaga setiap halaman agar hanya dapat diakses oleh role yang sesuai dan menolak akses pihak lain dengan redirect ke halaman tidak ditemukan.

### 6.2 Logika Daily Mood Tracker
- Siswa hanya dapat melakukan **satu kali check-in per hari kalender** berdasarkan zona waktu **Jakarta (Asia/Jakarta, GMT+7)**.
- Sistem menentukan apakah siswa sudah check-in hari ini dengan mengambil `moodEntries` yang `recordedAt`-nya berada dalam rentang awal hari (00:00:00+07:00) hingga akhir hari (23:59:59+07:00) untuk tanggal berjalan.
- Jika sudah ada entri hari ini, halaman tracker menampilkan submission yang sudah masuk (bukan form kosong).

### 6.3 Logika Risk Assessment (Penentuan Risiko Siswa)
Sistem mengklasifikasikan setiap siswa ke dalam tiga tingkatan risiko secara otomatis berdasarkan dua data utama:

| Tingkatan | Kondisi Pemicu |
|-----------|----------------|
| **Tinggi** | Terdapat alert aktif (status ≠ "Selesai") dengan severity = "Tinggi" |
| **Sedang** | Terdapat alert aktif dengan severity = "Sedang" ATAU skor mood terakhir ≤ 2 |
| **Aman** | Tidak ada alert aktif DAN skor mood terakhir > 2 |

### 6.4 Logika Trend Analysis
Tren mood siswa dihitung dari **3 entri mood terakhir** dalam riwayatnya:

| Tren | Kondisi |
|------|---------|
| **Naik 3 hari** | Skor hari ke-3 > hari ke-2 > hari ke-1 (perbaikan progresif) |
| **Turun 3 hari** | Skor hari ke-3 < hari ke-2 < hari ke-1 (pemicu utama alert) |
| **Stabil Rendah** | Ketiga skor berada di ≤ 2 |
| **Fluktuatif** | Tidak memenuhi pola di atas |
| **Belum cukup data** | Jumlah entri mood < 3 |

### 6.5 Logika Streak & Completion Rate (Siswa)
- **Streak**: Dihitung mundur dari entri mood paling baru. Selama ada entri di hari tersebut, counter naik. Berhenti ketika ada hari yang tidak memiliki entri.
- **Completion Rate**: Dihitung berdasarkan berapa hari dari 14 hari terakhir siswa melakukan check-in. Formula: `(jumlah_hari_aktif / 14) × 100%`, maksimum 100%.

### 6.6 Logika Alert System
- Alert dibuat secara manual (oleh admin atau batch-seed) atau secara otomatis (berdasarkan threshold yang dikonfigurasi) dan disimpan di tabel `alerts`.
- Setiap alert memiliki `severity` (`Tinggi` atau `Sedang`) dan `status` (`Baru`, `Sedang Ditinjau`, `Selesai`).
- Di halaman Alert Risiko Guru BK, badge warna merah (danger) diberikan untuk status "Baru" dan kuning (warning) untuk "Sedang Ditinjau".
- Threshold pemicu alert yang tertulis di UI adalah: **mood ≤ 2 selama 3 hari berturut-turut**.

### 6.7 Siklus Hidup Konseling (Counseling Lifecycle)
Terdapat empat milestone utama dalam alur konseling MindGuard:

```
1. [REQUEST oleh SISWA]
   - Siswa mengisi form: Topik, Ringkasan kebutuhan, Slot waktu yang diinginkan.
   - Status Request: "Baru" → menunggu respons BK.

2. [PENJADWALAN oleh GURU BK]
   - BK meninjau request, membuat CounselingSession:
     Format (Tatap Muka / Online), Lokasi/Link, Waktu, Fokus, dan Catatan.
   - Status Session: "Menunggu Konfirmasi".

3. [KONFIRMASI oleh SISWA]
   - Siswa melihat sesi yang sudah terjadwal, mengonfirmasi kehadiran.
   - Status Session: "Dikonfirmasi".

4. [PENYELESAIAN & DOKUMENTASI]
   - Setelah sesi berlangsung, BK mengisi Hasil (Outcome) dan Saran Tindak Lanjut (Follow-up).
   - Siswa dapat menambahkan catatan penyelesaian dari sisi mereka.
   - Status Session: "Selesai".
```

### 6.8 Logika Whisper Portal
- Pelapor dapat memilih menjadi **Anonim** (identitas disembunyikan) atau menampilkan identitas terbuka.
- Sistem menyimpan field `ownerLabel` (misal: "Anonim" atau nama lengkap) dan `studentUserId` (bisa null jika benar-benar anonim).
- Setiap laporan memiliki `urgency` (`Normal` / `Tinggi`), `category`, `status` (`Baru`, `Sedang Ditinjau`, `Selesai`).
- Guru BK yang ditugaskan disimpan di field `assignedTo` dan langkah tindak lanjut di `nextStep`.

### 6.9 Logika Risk Band (Sekolah & Kelas – Perspektif Admin)
- Setiap `schoolClass` memiliki field `riskBand` dengan nilai: `Stabil`, `Monitor`, atau `Perlu perhatian`.
- Di Dashboard Admin, sekolah yang memiliki kelas dengan `riskBand = "Perlu perhatian"` akan muncul di list "Sekolah membutuhkan perhatian" dan diurutkan dari completion rate terendah.
- Completion Rate Sekolah diwarnai: ≥85% = Aman (hijau), ≥80% = Waspada (kuning), <80% = Risiko (merah).

---

## 7. Struktur Navigasi & Halaman

### 7.1 Dashboard Siswa (`/student`)
**Menu Navigasi Siswa:**
1. **Mood Harian** (`/student`) — Halaman pertama setelah login.
2. **Riwayat Mood** (`/student/history`)
3. **Kirim Laporan** (`/student/whisper`) — Whisper Portal.
4. **Materi Edukasi** (`/student/resources`) — Resource Center.
5. **Konseling** (`/student/counseling`) — Hub konseling.

**Sub-halaman Konseling Siswa:**
- `/student/counseling/schedule` — Daftar sesi terjadwal.
- `/student/counseling/request` — Form pengajuan sesi baru.
- `/student/counseling/[sessionId]` — Detail sesi tertentu.

### 7.2 Dashboard Guru BK (`/counselor`)
**Menu Navigasi Guru BK:**
1. **Dashboard Mood** (`/counselor`) — Halaman pertama setelah login.
2. **Detail Mood Siswa** (`/counselor/students`) — Daftar semua siswa.
3. **Lihat Alert Risiko** (`/counselor/alerts`) — Daftar alert aktif.
4. **Kelola Konseling** (`/counselor/counseling`) — Hub konseling BK.

**Sub-halaman Guru BK:**
- `/counselor/students/[studentId]` — Detail mood dan intervensi seorang siswa.
- `/counselor/alerts/[alertId]` — Detail alert tertentu.
- `/counselor/counseling/schedule` — Pengajuan masuk & penjadwalan.
- `/counselor/counseling/agenda` — Agenda & Riwayat Sesi.
- `/counselor/counseling/[sessionId]` — Detail sesi tertentu.
- `/counselor/whispers` — Daftar semua laporan Whisper.
- `/counselor/whispers/[id]` — Detail laporan Whisper.

### 7.3 Dashboard Admin (`/admin`)
**Menu Navigasi Admin:**
1. **Ringkasan** (`/admin`) — Halaman pertama setelah login.
2. **Akun Pengguna** (`/admin/users`) — Kelola semua pengguna.
3. **Data Kelas** (`/admin/schools`) — Kelola sekolah dan kelas.
4. **Pengaturan** (`/admin/system`) — Konfigurasi sistem.

**Sub-halaman Admin:**
- `/admin/users/[userId]` — Detail akun pengguna.
- `/admin/schools/[schoolId]` — Detail sekolah.
- `/admin/schools/classes/[classId]` — Detail kelas.
- `/admin/system/[configId]` — Detail & ubah nilai konfigurasi.

---

## 8. Spesifikasi Data (Skema Entitas)

### 8.1 Tabel `user` (via Better Auth)
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `name` | string | Nama lengkap pengguna |
| `email` | string | Email login (unik) |
| `role` | enum | `student` / `counselor` / `admin` |
| `schoolId` | string | Referensi ke tabel sekolah |
| `classId` | string (nullable) | Khusus siswa dan wali kelas |
| `studentCode` | string (nullable) | NIS (khusus siswa) |
| `lastAccessAt` | timestamp | Waktu login terakhir |

### 8.2 Tabel `mood_entry`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `userId` | string (FK) | Referensi ke `user` |
| `score` | integer (1–5) | Skor mood harian |
| `note` | text (nullable) | Catatan opsional siswa |
| `recordedAt` | timestamp | Waktu pengisian (basis Jakarta Time) |

### 8.3 Tabel `alert`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `studentUserId` | string (FK) | Siswa yang memicu alert |
| `reason` | text | Alasan alert dibuat |
| `severity` | enum | `Tinggi` / `Sedang` |
| `status` | enum | `Baru` / `Sedang Ditinjau` / `Selesai` |
| `lastUpdatedAt` | timestamp | Waktu pembaruan terakhir |
| `summary` | text | Ringkasan situasi siswa |
| `recommendation` | text | Saran tindak lanjut untuk BK |

### 8.4 Tabel `whisper_report`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `studentUserId` | string (FK, nullable) | Null jika benar-benar anonim |
| `ownerLabel` | string | Label identitas pengirim (misal: "Anonim") |
| `title` | string | Judul laporan |
| `category` | string | Kategori masalah |
| `urgency` | enum | `Tinggi` / `Normal` |
| `status` | enum | `Baru` / `Sedang Ditinjau` / `Selesai` |
| `submittedAt` | timestamp | Waktu pengiriman |
| `excerpt` | text | Cuplikan singkat isi laporan |
| `detail` | text | Isi laporan lengkap |
| `nextStep` | text | Rencana tindak lanjut oleh BK |
| `assignedTo` | string | Nama Guru BK yang ditugaskan |

### 8.5 Tabel `counseling_request`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `studentUserId` | string (FK) | Siswa pemohon |
| `topic` | string | Topik konseling |
| `preferredSlot` | string | Waktu yang diinginkan siswa |
| `summary` | string | Ringkasan singkat kebutuhan |
| `status` | enum | `Baru` / `Dijadwalkan` / `Selesai` |
| `submittedAt` | timestamp | Waktu pengajuan |
| `scheduledSessionId` | string (FK, nullable) | Sesi yang dihasilkan dari request ini |

### 8.6 Tabel `counseling_session`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `requestId` | string (FK, nullable) | Request yang memicu sesi ini |
| `studentUserId` | string (FK) | Siswa peserta sesi |
| `counselorUserId` | string (FK, nullable) | Guru BK yang memimpin sesi |
| `title` | string | Judul sesi |
| `counselorName` | string | Nama BK (cache) |
| `scheduledAt` | timestamp | Waktu sesi dijadwalkan |
| `format` | enum | `Tatap muka` / `Online` |
| `location` | string | Tempat / link sesi |
| `status` | enum | `Menunggu Konfirmasi` / `Dikonfirmasi` / `Selesai` |
| `invitationStatus` | enum | Status konfirmasi dari sisi siswa |
| `focus` | string | Topik utama sesi |
| `note` | string | Catatan Guru BK sebelum sesi |
| `outcome` | text (nullable) | Hasil yang dicapai setelah sesi |
| `followUp` | text (nullable) | Rencana tindak lanjut |
| `studentConfirmationNote` | text (nullable) | Catatan konfirmasi dari siswa |
| `studentCompletionNote` | text (nullable) | Catatan penyelesaian dari siswa |

### 8.7 Tabel `student_intervention`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | Primary key |
| `studentUserId` | string (FK) | Siswa yang diintervensi |
| `title` | string | Judul / ringkasan intervensi |
| `owner` | string | Nama pihak yang bertanggung jawab |
| `status` | enum | `Baru` / `Sedang Ditinjau` / `Selesai` |
| `whenLabel` | string | Label waktu intervensi |

### 8.8 Tabel `resource` & `resource_point`
- `resource`: Menyimpan judul artikel, kategori, read time, dan ringkasan.
- `resource_point`: Menyimpan poin-poin detail dalam sebuah artikel, berurutan berdasarkan `sortOrder`.

### 8.9 Tabel `school` & `school_class`
- `school`: Nama sekolah, kepala sekolah, jumlah BK, kelas, dan siswa.
- `school_class`: Nama kelas, schoolId, nama wali kelas (`homeroomName`), nama BK (`counselorName`), jumlah siswa, completion rate, dan risk band.

### 8.10 Tabel `system_config`
- Menyimpan parameter konfigurasi sistem: nama, kelompok (`groupName`), nilai aktif (`value`), status (`Aktif`/`Tertunda`), ringkasan, dan dampak perubahan.

---

## 9. Kebutuhan Non-Fungsional

### 9.1 Keamanan (Security)
- Semua halaman dilindungi oleh middleware `requireRole` yang memvalidasi role setiap kali halaman diakses, bukan hanya saat login.
- Tidak ada data mood atau intervensi siswa yang dapat diakses lintas role tanpa otorisasi.
- Whisper Portal menjamin anonimitas penuh jika dipilih (tidak menyimpan `studentUserId`).
- Session dikelola oleh Better Auth dengan enkripsi backend modern.
- File `.env.local` tidak boleh masuk ke version control (terlindungi oleh `.gitignore`).

### 9.2 Performa (Performance)
- Seluruh data halaman diambil secara **server-side** (Next.js Server Component), sehingga pengguna menerima HTML siap-tampil tanpa loading state tambahan.
- Seluruh query database dioptimalkan dengan `Promise.all` untuk pemanggilan paralel maksimum.

### 9.3 Lokalisasi (Localization)
- Sistem dioperasikan dalam **Bahasa Indonesia** penuh.
- Seluruh log waktu menggunakan **Zona Waktu Asia/Jakarta (GMT+7)** secara konsisten untuk menentukan hari operasional.

### 9.4 Responsivitas (Responsive Design)
- Dashboard Siswa dioptimalkan untuk **mobile-first** (layar 375px ke atas).
- Dashboard Guru BK dan Admin dioptimalkan untuk **desktop/tablet** (layar ≥1024px) namun tetap dapat diakses dari HP.

### 9.5 Ketersediaan (Availability)
- Aplikasi di-deploy ke **Vercel** (Edge Network global).
- Database menggunakan **Turso (LibSQL Serverless)** yang terdistribusi di region AP-Northeast untuk latensi minimum bagi pengguna Asia Tenggara.

---

## 10. Desain & Panduan UI/UX

### 10.1 Tema Visual
- **Warna Primer:** `#80c394` (Sea Green — melambangkan ketenangan dan harapan).
- **Warna Sekunder:** `#77bed7` (Sky Blue).
- **Warna Peringatan:** Sistem tiga level menggunakan Green (Aman), Yellow/Orange (Waspada/Monitor), Red (Bahaya/Tinggi).
- **Typography:** Font Google — Inter, dengan variabel CSS `--font-inter`.

### 10.2 Komponen UI Utama
- **MetricCard**: Menampilkan angka statistik utama beserta label tren.
- **SectionCard**: Kontainer kartu dalam layout konten.
- **StatusBadge**: Badge warna berdasarkan "tone" (`aman`, `warning`, `danger`, `monitor`, `neutral`).
- **AppShell**: Layout kerangka utama aplikasi yang memuat sidebar navigasi dan konten halaman.

### 10.3 Prinsip UX
- **Low Friction First**: Setiap interaksi siswa harus bisa diselesaikan dalam sesedikit mungkin langkah.
- **Actionable by Default**: Dashboard Guru BK harus langsung menunjukkan "apa yang harus dilakukan hari ini."
- **Clarity over Complexity**: Tidak ada jargon teknis di antarmuka pengguna; semua label menggunakan bahasa Indonesia yang mudah dimengerti.

---

## 11. User Flows Utama

### 11.1 Flow Siswa: Check-In Harian
1. Siswa login → Diarahkan ke `/student`.
2. Jika belum check-in hari ini: Form mood muncul (pilih skor 1-5, tambahkan catatan opsional, submit).
3. Sistem menyimpan entry ke database dengan timestamp Jakarta.
4. Jika sudah check-in: Halaman menampilkan submission hari ini.

### 11.2 Flow Siswa: Ajukan Konseling
1. Siswa membuka `/student/counseling`.
2. Klik "Ajukan Konseling" → Masuk ke `/student/counseling/request`.
3. Isi form: topik, ringkasan kebutuhan, pilih slot waktu.
4. Submit → Data tersimpan di `counseling_request` dengan status "Baru".
5. Siswa kembali ke hub konseling, menunggu jadwal dari Guru BK.

### 11.3 Flow Guru BK: Menangani Alert
1. Guru BK login → Melihat Dashboard `/counselor`.
2. Melihat jumlah alert aktif di metric card dan daftar "Siswa prioritas".
3. Klik "Alert Risiko" → Masuk ke `/counselor/alerts`.
4. Memilih alert → Detail alert di `/counselor/alerts/[alertId]`.
5. Mengubah status alert menjadi "Sedang Ditinjau" → Proses tindak lanjut dimulai.
6. Ketika selesai ditangani → Status diubah menjadi "Selesai".

### 11.4 Flow Guru BK: Menjadwalkan Konseling
1. Guru BK ke `/counselor/counseling` → Klik "Jadwal & Pengajuan".
2. Melihat daftar request masuk (status "Baru").
3. Memilih request → Membuat sesi baru (mengisi waktu, format, lokasi, fokus).
4. Sesi tersimpan dan status request berubah menjadi "Dijadwalkan".
5. Siswa melihat sesi di halaman `/student/counseling/schedule` dan mengonfirmasi.

### 11.5 Flow Admin: Memantau Kondisi Sistem
1. Admin login → Melihat Ringkasan di `/admin`.
2. Melihat metric: Total pengguna, Siswa aktif, Guru BK, dan Kelas.
3. Melihat daftar sekolah yang memerlukan perhatian berdasarkan completion rate.
4. Menavigasi ke `/admin/users` untuk verifikasi akun baru.
5. Menavigasi ke `/admin/system` untuk mengelola konfigurasi (misalnya mengubah threshold alert).

---

## 12. Skenario Edge Cases

| Skenario | Penanganan Sistem |
|---|---|
| Siswa submit mood dua kali dalam satu hari | Sistem menolak; menampilkan submission pertama. |
| Siswa dengan 0 entri mood | Trend = "Belum cukup data"; Risk = "Aman" (tidak ada alert). |
| Guru BK mengakses halaman `/student` | Middleware menolak akses; redirect ke halaman tidak ditemukan. |
| Siswa mencoba mengakses `/counselor` | Middleware menolak akses. |
| Whisper report dikirim anonim | `studentUserId` tidak disimpan; hanya `ownerLabel = "Anonim"`. |
| Konfigurasi sistem status "Tertunda" | Muncul di ringkasan Admin sebagai "Permintaan Tertunda". |

---

## 13. Ruang Lingkup (Scope)

### 13.1 In Scope (Fitur yang Sudah Ada di Codebase)
- Autentikasi email & password berbasis Better Auth.
- Role-based access control dan redirect otomatis.
- Daily Mood Tracker dengan daily lockout.
- Riwayat Mood & Streak/Completion Rate siswa.
- Dashboard Monitoring Guru BK dengan student priority list.
- Detail Mood Siswa (per individu dengan tren & alert).
- Alert System dengan severity dan status management.
- Whisper Portal (kirim, kelola, tindak lanjut).
- Counseling Management lengkap (request → schedule → session → closure).
- Student Interventions (pencatatan tindak lanjut).
- Resource Center (artikel & poin edukasi).
- Admin Dashboard (ringkasan sistem, permintaan tertunda, log admin).
- User Management (daftar & detail pengguna).
- School & Class Management.
- System Configuration (konfigurasi & threshold).

### 13.2 Out of Scope (Belum Ada/Fase Berikutnya)
- Diagnosis klinis atau saran medis otomatis berbasis AI.
- Notifikasi eksternal (email, WhatsApp, push notification).
- Video counseling terintegrasi.
- Integrasi dengan sistem akademik sekolah (raport, absensi).
- AI prediktif lanjutan untuk analisis tren jangka panjang.
- Multi-bahasa (i18n).

---

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Siswa mengisi mood asal-asalan (data tidak valid) | Analisis tren tidak akurat | Desain UI yang ramah dan tidak membebani; catatan opsional mengurangi tekanan. |
| Alert fatigue: terlalu banyak alert membuat BK abai | Penurunan efektivitas sistem | Threshold dapat dikonfigurasi Admin; prioritasi berdasarkan severity. |
| Penyalahgunaan Whisper Portal untuk spam | Beban kerja BK meningkat | Kategorisasi wajib dan urgency level membantu filter laporan valid. |
| Kebocoran data emosional siswa | Risiko privasi & legal | Middleware role ketat; tidak ada data lintas role; session dienkripsi. |
| Koneksi ke Turso terputus | Downtime database | Turso menggunakan LibSQL dengan replikasi otomatis. |

---

## 15. Kesimpulan

MindGuard adalah sistem early warning mental health yang memberikan:
- **Siswa**: Ruang aman, kanal ekspresi, dan jalur bantuan yang jelas.
- **Guru BK**: Alat navigasi berbasis data untuk menentukan prioritas tindakan dan mendokumentasikan seluruh alur konseling secara digital.
- **Admin**: Visibilitas operasional penuh atas kondisi ekosistem mental sekolah.

Dokumen PRD ini mencerminkan **kondisi aktual codebase** — setiap fitur, entitas data, dan logika bisnis yang tercantum di sini telah diimplementasikan dan dapat diuji secara langsung di aplikasi.

---
*[End of Master PRD — MindGuard v2.0.0]*
