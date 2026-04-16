import type { NavItem } from "@/components/layout/app-shell";

export const studentNav: NavItem[] = [
  { href: "/student", label: "Mood Harian" },
  { href: "/student/history", label: "Riwayat Mood" },
  { href: "/student/whisper", label: "Kirim Laporan" },
  { href: "/student/resources", label: "Materi Edukasi" },
  { href: "/student/counseling", label: "Konseling" },
];

export const counselorNav: NavItem[] = [
  { href: "/counselor", label: "Dashboard Mood" },
  { href: "/counselor/students", label: "Detail Mood Siswa" },
  { href: "/counselor/alerts", label: "Lihat Alert Risiko" },
  { href: "/counselor/counseling", label: "Kelola Konseling" },
];

export const adminNav: NavItem[] = [
  { href: "/admin", label: "Mengelola Data User dan Sekolah" },
  { href: "/admin/users", label: "Mengelola Akun Pengguna" },
  { href: "/admin/schools", label: "Mengelola Data Kelas/Sekolah" },
  { href: "/admin/system", label: "Mengkonfigurasi Sistem" },
];
