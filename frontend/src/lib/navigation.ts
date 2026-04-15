import type { NavItem } from "@/components/layout/app-shell";

export const studentNav: NavItem[] = [
  { href: "/student", label: "Mood Harian" },
  { href: "/student/history", label: "Riwayat Mood" },
  { href: "/student/whisper", label: "Kirim Laporan" },
  { href: "/student/resources", label: "Materi Edukasi" },
  { href: "/student/counseling", label: "Jadwal Konseling" },
];

export const counselorNav: NavItem[] = [
  { href: "/counselor", label: "Monitoring" },
  { href: "/counselor/alerts", label: "Alert Center" },
  { href: "/counselor/students/raka-pratama", label: "Student Detail" },
  { href: "/counselor/whispers", label: "Whisper Reports" },
];

export const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin", label: "User & School" },
  { href: "/admin", label: "System Config" },
];
