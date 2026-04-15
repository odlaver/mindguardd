# Product Requirements Document
## MindGuard
**Early Warning System Kesehatan Mental Siswa**

**Status:** Draft Final v2  
**Tanggal:** 15 April 2026

---

## 1. Ringkasan Produk

MindGuard adalah sistem informasi berbasis web yang dirancang untuk membantu sekolah memantau kondisi kesehatan mental siswa secara lebih dini, terstruktur, dan dapat ditindaklanjuti. Sistem berfokus pada pencatatan mood harian siswa, analisis tren emosi, deteksi risiko berbasis aturan, pelaporan anonim, dan tindak lanjut oleh Guru BK. Konsep ini sejalan dengan tujuan awal sistem: mempermudah siswa melakukan check-in emosional dan membantu Guru BK melakukan monitoring berbasis data, bukan observasi manual semata.

MindGuard **bukan alat diagnosis klinis**, melainkan **alat early warning dan dukungan awal** di lingkungan sekolah.

---

## 2. Latar Belakang Masalah

Pemantauan kesehatan mental siswa di sekolah masih banyak dilakukan secara manual melalui observasi guru atau sesi konseling yang sifatnya reaktif. Dampaknya:
- sekolah sulit mendeteksi pola emosi siswa sejak dini,
- data historis kondisi emosional siswa tidak terdokumentasi dengan baik,
- siswa tidak memiliki media ringan dan konsisten untuk mencatat kondisi emosionalnya,
- isu sensitif seperti bullying atau tekanan sosial sulit dilaporkan secara aman,
- Guru BK kesulitan menentukan prioritas kasus yang harus segera ditangani.

---

## 3. Tujuan Produk

### Tujuan Utama
- Menyediakan platform digital bagi siswa untuk mencatat kondisi emosional harian secara mandiri dan rutin.
- Membantu Guru BK memantau tren perubahan mood siswa melalui dashboard yang jelas.
- Mendeteksi pola emosi negatif lebih dini agar intervensi dapat dilakukan lebih cepat.
- Menyediakan kanal pelaporan anonim untuk isu sensitif.
- Mendukung pengelolaan tindak lanjut konseling secara lebih terstruktur.

### Tujuan Institusional
- Meningkatkan kualitas monitoring kesejahteraan siswa.
- Membantu sekolah mengambil keputusan berbasis data.
- Mengurangi kemungkinan masalah emosional siswa terabaikan.

---

## 4. Pengguna dan Role

MindGuard memiliki **3 role utama**:
1. **Siswa**
2. **Guru BK**
3. **Admin**

### 4.1 Siswa
Kebutuhan utama:
- mengisi mood harian dengan sangat cepat,
- melihat riwayat mood pribadi,
- melapor secara anonim,
- mengakses konten edukasi kesehatan mental.

### 4.2 Guru BK
Kebutuhan utama:
- memantau kondisi siswa secara agregat dan individual,
- menerima alert risiko,
- melihat detail riwayat mood siswa,
- mencatat dan mengelola tindak lanjut konseling.

### 4.3 Admin
Kebutuhan utama:
- mengelola akun pengguna,
- mengelola data sekolah dan kelas,
- mengatur threshold alert dan konfigurasi sistem.

---

## 5. Struktur UI dan Mekanisme Akses

### 5.1 Struktur UI
UI MindGuard harus terbagi menjadi **3 area utama** sesuai role:
- **UI Siswa**
- **UI Guru BK**
- **UI Admin**

Setiap role memiliki dashboard, navigasi, dan hak akses yang berbeda.

### 5.2 Mekanisme Login
MindGuard menggunakan **single login page** untuk seluruh pengguna. Pengguna tidak memilih role secara manual di halaman login.

Setelah autentikasi berhasil, sistem akan:
- memverifikasi akun,
- membaca role pengguna dari database,
- mengarahkan pengguna otomatis ke dashboard sesuai role.

### 5.3 Aturan Akses
- **Siswa** hanya dapat mengakses fitur milik siswa.
- **Guru BK** hanya dapat mengakses fitur monitoring, alert, detail siswa, laporan anonim, dan konseling.
- **Admin** hanya dapat mengakses fitur administrasi dan konfigurasi.
- Sistem harus menolak akses ke halaman role lain tanpa izin.

### 5.4 Landing Page per Role Setelah Login
- **Siswa**: halaman pertama setelah login adalah **halaman input mood (Daily Mood Tracker)** agar alur check-in harian menjadi paling cepat dan langsung.
- **Guru BK**: halaman pertama setelah login adalah **Dashboard Monitoring**.
- **Admin**: halaman pertama setelah login adalah **Dashboard Admin / User & System Overview**.

---

## 6. Nilai Utama Produk

### Untuk Siswa
- check-in emosional yang ringan dan cepat,
- ruang refleksi pribadi,
- saluran aman untuk menyampaikan masalah sensitif.

### Untuk Guru BK
- visibilitas kondisi siswa secara lebih jelas,
- prioritas kasus berdasarkan risiko,
- proses tindak lanjut yang terdokumentasi.

### Untuk Sekolah
- sistem early warning yang terukur,
- pengambilan keputusan berbasis data,
- dokumentasi monitoring kesejahteraan siswa.

---

## 7. Ruang Lingkup Produk

### In Scope
- autentikasi dan otorisasi berbasis role,
- single login page,
- dashboard berbeda untuk Siswa, Guru BK, dan Admin,
- Daily Mood Tracker,
- Mood History,
- Dashboard Monitoring BK,
- Student Mood Detail,
- Alert System,
- Whisper Portal,
- Counseling Management,
- Resource Center,
- User & School Management,
- System Configuration.

### Out of Scope untuk MVP
- diagnosis klinis,
- video counseling,
- integrasi penuh dengan sistem akademik sekolah,
- notifikasi eksternal seperti WhatsApp, email, atau SMS,
- AI prediktif lanjutan.

Integrasi eksternal dapat dipertimbangkan pada fase berikutnya.

---

## 8. Fitur Utama

### 8.1 Daily Mood Tracker
Siswa mencatat mood harian menggunakan skala 1-5 berbasis emoji dengan catatan opsional.

**Acceptance Criteria**
- Siswa hanya dapat mengirim 1 input mood per hari.
- Input wajib: skor mood.
- Input opsional: catatan singkat.
- Proses pengisian idealnya selesai dalam <10 detik.
- Sistem menolak duplikasi input pada hari yang sama.
- Halaman ini menjadi **tampilan awal siswa setelah login**.

### 8.2 Mood History
Menampilkan riwayat mood siswa dalam tampilan mingguan dan bulanan.

**Acceptance Criteria**
- Data dapat difilter berdasarkan periode.
- Siswa hanya melihat datanya sendiri.
- Guru BK hanya melihat data siswa yang menjadi kewenangannya.

### 8.3 Dashboard Monitoring Guru BK
Dashboard agregat untuk memantau kondisi siswa.

**Acceptance Criteria**
- Menampilkan distribusi mood.
- Menampilkan daftar siswa dengan tren memburuk.
- Menampilkan alert aktif.
- Menyediakan akses ke detail siswa.

### 8.4 Student Mood Detail
Halaman detail siswa untuk analisis individual.

**Acceptance Criteria**
- Menampilkan histori mood siswa.
- Menampilkan status risiko.
- Menampilkan catatan intervensi jika ada.

### 8.5 Alert System
Sistem memberi peringatan otomatis jika pola mood buruk terdeteksi.

**Aturan awal**
- Mood buruk selama 3-5 hari berturut-turut memicu alert.

**Acceptance Criteria**
- Threshold dapat diatur admin.
- Alert muncul di dashboard BK.
- Alert memiliki status: baru, ditinjau, ditindaklanjuti, selesai.

### 8.6 Whisper Portal
Saluran pelaporan anonim untuk isu sensitif.

**Acceptance Criteria**
- Pelapor tidak perlu menampilkan identitas.
- Guru BK dapat membaca dan menindaklanjuti laporan.
- Admin dapat mengatur kategori laporan.

### 8.7 Counseling Management
Modul pencatatan tindak lanjut konseling oleh Guru BK.

**Acceptance Criteria**
- Guru BK dapat membuat catatan sesi.
- Status sesi dapat diperbarui.
- Riwayat intervensi tersimpan per siswa.

### 8.8 Resource Center
Pusat konten edukasi kesehatan mental untuk siswa.

**Acceptance Criteria**
- Artikel dan tips dapat dikategorikan.
- Dapat diakses kapan saja oleh siswa.

### 8.9 User & School Management
Modul admin untuk mengelola akun dan struktur sekolah.

### 8.10 System Configuration
Modul admin untuk mengatur threshold alert dan parameter operasional lain.

---

## 9. Struktur UI per Role

### 9.1 Dashboard Siswa
**Landing page:** Daily Mood Tracker

Menu utama:
- Daily Mood Tracker
- Mood History
- Whisper Portal
- Resource Center
- Profile

**Prinsip UX:** sederhana, minim friksi, mobile-first.

### 9.2 Dashboard Guru BK
**Landing page:** Dashboard Monitoring

Menu utama:
- Dashboard Monitoring
- Alert Center
- Student Mood Detail
- Counseling Management
- Whisper Reports

**Prinsip UX:** informatif, cepat dibaca, prioritas berbasis risiko.

### 9.3 Dashboard Admin
**Landing page:** Dashboard Admin / Overview

Menu utama:
- User Management
- School/Class Management
- System Configuration
- Category/Threshold Settings
- Access Control

**Prinsip UX:** efisien untuk pengelolaan data dan kontrol sistem.

---

## 10. User Personas

### Siswa
- Mobile-first
- Ingin interaksi cepat
- Tidak suka form yang panjang
- Butuh ruang aman dan tidak menghakimi

### Guru BK
- Waktu terbatas
- Membutuhkan data yang ringkas dan actionable
- Perlu prioritas kasus secara jelas

### Admin
- Fokus pada operasional sistem
- Membutuhkan kontrol konfigurasi yang stabil dan mudah

---

## 11. Jobs-to-be-Done

### Siswa
"Saat saya merasa tidak baik-baik saja, saya ingin mencatat mood saya dengan cepat agar saya bisa lebih sadar pada kondisi saya tanpa merasa terbebani."

### Guru BK
"Saat ada siswa berisiko, saya ingin segera mengetahuinya agar saya bisa menentukan tindak lanjut lebih cepat."

### Admin
"Saat sistem dipakai banyak pengguna, saya ingin dapat mengelola akun dan aturan sistem dengan rapi agar operasional sekolah tetap lancar."

---

## 12. User Flow Inti

### 12.1 Alur Siswa
1. Siswa login.
2. Sistem membaca role dan mengarahkan ke **halaman input mood**.
3. Siswa mengisi mood harian.
4. Sistem menyimpan data.
5. Siswa dapat melihat riwayat mood atau mengakses Resource Center.

### 12.2 Alur Early Warning
1. Sistem mengevaluasi histori mood siswa.
2. Jika threshold tercapai, sistem membuat alert.
3. Alert muncul di dashboard Guru BK.
4. Guru BK membuka detail siswa.
5. Guru BK melakukan review dan tindak lanjut.

### 12.3 Alur Pelaporan Anonim
1. Siswa membuka Whisper Portal.
2. Siswa mengirim laporan.
3. Sistem menyimpan laporan tanpa menampilkan identitas.
4. Guru BK meninjau laporan.
5. Jika perlu, Guru BK menindaklanjuti.

### 12.4 Alur Admin
1. Admin login.
2. Sistem mengarahkan ke dashboard admin.
3. Admin mengelola akun, kelas, dan konfigurasi threshold.

---

## 13. Kebutuhan Fungsional

- Sistem harus menyediakan satu halaman login untuk semua role.
- Sistem harus menentukan role pengguna setelah login berhasil.
- Sistem harus mengarahkan user otomatis ke dashboard sesuai role.
- Sistem harus mengarahkan **Siswa langsung ke halaman input mood** setelah login.
- Sistem harus membatasi akses halaman sesuai role.
- Sistem harus menyediakan input mood harian skala 1-5.
- Sistem harus menyimpan data mood dengan aman.
- Sistem harus mencegah input mood ganda di hari yang sama.
- Sistem harus menampilkan histori mood mingguan dan bulanan.
- Sistem harus menganalisis tren mood secara otomatis.
- Sistem harus membuat alert sesuai threshold.
- Sistem harus menyediakan modul laporan anonim.
- Sistem harus menyediakan modul tindak lanjut konseling.
- Sistem harus menyediakan modul admin untuk manajemen data dan konfigurasi.

---

## 14. Kebutuhan Non-Fungsional

- **Usability:** input mood harus cepat, sederhana, dan intuitif.
- **Security:** autentikasi aman, role-based access, proteksi data sensitif.
- **Performance:** dashboard dan histori dimuat cepat pada koneksi normal.
- **Responsiveness:** optimal di HP, tablet, dan laptop.
- **Reliability:** data yang berhasil dikirim tidak boleh hilang.
- **Privacy:** hanya role berwenang yang dapat mengakses data sensitif siswa.
- **Availability:** sistem tersedia secara stabil untuk penggunaan rutin sekolah.

---

## 15. Data Utama

- Data siswa: nama, NIS, kelas, akun
- Data Guru BK: nama, akun, kelas binaan
- Data admin: akun dan hak akses
- Data mood: skor, tanggal, catatan
- Data tren emosi: hasil agregasi mingguan/bulanan
- Data alert: status, waktu terpicu, alasan
- Data laporan anonim: isi laporan, kategori, tanggal
- Data konseling: jadwal, status, hasil sesi
- Data konfigurasi: threshold alert, kategori laporan, data sekolah/kelas

---

## 16. Edge Cases

- Siswa tidak mengisi mood selama beberapa hari.
- Siswa mencoba input mood lebih dari sekali dalam sehari.
- Laporan anonim digunakan untuk spam atau laporan palsu.
- Alert terlalu banyak sehingga Guru BK mengalami alert fatigue.
- Guru BK mencoba mengakses data siswa di luar kewenangannya.
- Admin salah mengatur threshold sehingga alert terlalu sensitif atau terlalu longgar.
- Koneksi internet terputus saat submit data.

---

## 17. KPI dan Success Metrics

- Persentase siswa yang mengisi mood minimal 4 kali per minggu.
- Rata-rata waktu input mood <10 detik.
- Persentase alert yang ditinjau Guru BK dalam 24 jam.
- Persentase alert yang ditindaklanjuti.
- Jumlah laporan anonim valid yang diproses.
- Stabilitas sistem bulanan.
- Tingkat penggunaan dashboard BK secara aktif.

---

## 18. Risiko Produk

- Siswa tidak rutin melakukan input.
- Data emosional bersifat sangat sensitif.
- Penyalahgunaan fitur anonim.
- Alert fatigue pada Guru BK.
- Keterbatasan koneksi internet di lingkungan sekolah.
- Risiko misklasifikasi karena sistem masih berbasis aturan sederhana.

---

## 19. Prinsip Desain Produk

- **Low friction first**: interaksi siswa harus singkat dan ringan.
- **Privacy by design**: data emosional diperlakukan sebagai data sensitif.
- **Actionable over complex**: dashboard harus membantu tindakan, bukan hanya menampilkan data.
- **Role clarity**: UI, fitur, dan akses harus tegas dibedakan per role.

### Arah Visual UI
- **Primary color:** `#80c394`
- **Secondary color:** `#77bed7`
- **Additional colors:** menyesuaikan kebutuhan UI, dengan prinsip emotional clarity
  - Hijau = aman
  - Kuning = waspada
  - Merah = risiko tinggi

UI siswa harus terasa ramah, ringan, dan tidak menegangkan. UI Guru BK harus jelas, informatif, dan cepat dibaca. UI admin harus efisien dan fokus pada kontrol data.

---

## 20. MVP Scope

### Wajib Ada di MVP
- Single login page
- Role-based redirect
- Dashboard siswa
- Dashboard Guru BK
- Dashboard admin
- Daily Mood Tracker
- Mood History
- Dashboard Monitoring BK
- Student Mood Detail
- Alert System berbasis threshold
- Whisper Portal
- Manajemen dasar pengguna dan kelas

### Fase Berikutnya
- Counseling Management yang lebih lengkap
- Resource Center yang lebih kaya
- Integrasi notifikasi eksternal
- Integrasi sistem sekolah
- Analitik lanjutan

---

## 21. Open Questions

- Apakah siswa boleh mengedit input mood di hari yang sama?
- Apakah satu siswa bisa berada di bawah lebih dari satu Guru BK?
- Bagaimana SLA tindak lanjut alert oleh Guru BK?
- Apakah laporan anonim memerlukan level urgensi?
- Apakah orang tua/wali akan menjadi role baru di fase lanjutan?
- Apakah notifikasi eksternal akan menjadi kebutuhan prioritas pada fase 2?

---

## 22. Kesimpulan

MindGuard dirancang sebagai sistem early warning kesehatan mental siswa yang sederhana, terstruktur, dan dapat ditindaklanjuti. Dengan **3 area UI utama—Siswa, Guru BK, dan Admin—serta single login yang menentukan role secara otomatis**, sistem ini memiliki fondasi produk yang lebih jelas dari sisi UX, akses, dan implementasi teknis. Khusus untuk role siswa, alur dibuat sependek mungkin dengan menjadikan **halaman input mood sebagai tampilan awal setelah login** agar proses check-in harian menjadi cepat, natural, dan konsisten.
