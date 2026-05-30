# Panduan Kontribusi (Contributing Guidelines)

Terima kasih telah tertarik untuk berkontribusi pada pengembangan **MindGuard**! Kami sangat menghargai dukungan Anda dalam menciptakan platform yang aman dan nyaman bagi kesehatan mental siswa di sekolah.

Untuk menjaga kualitas kode dan kolaborasi yang sehat, mohon ikuti panduan berkontribusi di bawah ini.

---

## 🤝 Cara Berkontribusi

### 1. Melaporkan Bug atau Masalah (Issues)
Jika Anda menemukan bug, kendala keamanan, atau memiliki ide fitur baru:
*   Periksa daftar **Issues** yang ada terlebih dahulu untuk memastikan masalah belum dilaporkan.
*   Jika belum ada, buat Issue baru dengan menyertakan:
    *   Deskripsi yang jelas mengenai kendala atau usulan fitur.
    *   Langkah-langkah untuk mereproduksi bug (bila ada).
    *   Informasi lingkungan (sistem operasi, browser, versi Node.js).

### 2. Mengirimkan Pull Request (PR)
Jika Anda ingin memperbaiki bug atau mengembangkan fitur baru secara langsung:
1.  **Fork** repositori ini ke akun GitHub Anda.
2.  Buat cabang (*branch*) baru dari `main` dengan nama yang deskriptif:
    ```bash
    git checkout -b feat/nama-fitur
    # atau
    git checkout -b fix/nama-bug
    ```
3.  Lakukan perubahan kode Anda. Pastikan kode mengikuti standar formatting dan teruji secara lokal.
4.  Lakukan pengujian lokal untuk memastikan tidak ada fitur lama yang rusak:
    ```bash
    cd app
    npm test
    ```
5.  Komit perubahan Anda dengan pesan komit yang rapi dan mengikuti standar *Conventional Commits*:
    ```bash
    git commit -m "feat(app): deskripsi perubahan fitur"
    ```
6.  **Push** cabang tersebut ke repositori fork Anda di GitHub.
7.  Buka **Pull Request** ke cabang `main` repositori resmi kami.

---

## 💻 Standar Pengkodean (Coding Standards)

*   **TypeScript:** Seluruh kode baru di dalam folder `src` wajib ditulis menggunakan tipe-aman (*strict type-safety*) TypeScript.
*   **Formating & Linting:** Kami menggunakan ESLint untuk menjaga gaya penulisan kode tetap seragam. Jalankan linting sebelum komit:
    ```bash
    npm run lint
    ```
*   **Database Migrations:** Jika Anda mengubah skema tabel di `db/schema.ts`, buat berkas migrasi baru menggunakan:
    ```bash
    npm run db:generate
    ```
    Sertakan berkas migrasi tersebut di dalam Pull Request Anda.

---
*Kontribusi Anda sangat berarti dalam mendukung kesejahteraan mental generasi masa depan!*
