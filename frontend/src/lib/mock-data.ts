export type MoodPoint = {
  date: string;
  score: number;
  note?: string;
};

export type ReviewStatus = "Baru" | "Sedang Ditinjau" | "Selesai";

export type AlertStatus = ReviewStatus;

export type AlertItem = {
  id: string;
  studentId: string;
  student: string;
  className: string;
  reason: string;
  severity: "Tinggi" | "Sedang";
  status: AlertStatus;
  lastUpdated: string;
  summary: string;
  recommendation: string;
};

export type WhisperReport = {
  id: string;
  studentId?: string;
  ownerLabel: string;
  title: string;
  category: string;
  urgency: "Tinggi" | "Normal";
  status?: ReviewStatus;
  submittedAt: string;
  excerpt: string;
  detail: string;
  nextStep: string;
  assignedTo: string;
};

export type ResourceItem = {
  id: string;
  category: string;
  title: string;
  readTime: string;
  summary: string;
  points: string[];
};

export type CounselingSession = {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  counselor: string;
  when: string;
  format: "Tatap muka" | "Online";
  location: string;
  status: ReviewStatus;
  invitationStatus: ReviewStatus;
  focus: string;
  note: string;
  outcome?: string;
  followUp?: string;
};

export type CounselingRequest = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  topic: string;
  preferredSlot: string;
  summary: string;
  status: ReviewStatus;
  submittedAt: string;
};

export type CounselorStudent = {
  id: string;
  name: string;
  className: string;
  trend: string;
  latestMood: number;
  risk: "Tinggi" | "Sedang" | "Aman";
  focus: string;
  moodHistory: MoodPoint[];
};

export type StudentIntervention = {
  studentId: string;
  title: string;
  owner: string;
  status: ReviewStatus;
  when: string;
};

export const studentProfile = {
  name: "Raka Pratama",
  className: "XI IPA 2",
  streak: 11,
  completionRate: "82%",
  todayDate: "15 April 2026",
};

export const studentMoodOptions = [
  { score: 5, emoji: "😁", label: "Sangat Baik", tone: "bg-safe/15 text-safe" },
  { score: 4, emoji: "🙂", label: "Baik", tone: "bg-primary/20 text-foreground" },
  { score: 3, emoji: "😐", label: "Biasa", tone: "bg-secondary/20 text-foreground" },
  { score: 2, emoji: "😟", label: "Lagi Berat", tone: "bg-warning/20 text-foreground" },
  { score: 1, emoji: "😣", label: "Butuh Bantuan", tone: "bg-danger/18 text-danger" },
];

export const studentMoodHistory: MoodPoint[] = [
  { date: "02 Apr", score: 4, note: "Lebih tenang setelah tugas selesai." },
  { date: "03 Apr", score: 4 },
  { date: "04 Apr", score: 3, note: "Mulai capek." },
  { date: "05 Apr", score: 2, note: "Banyak tekanan kelompok." },
  { date: "06 Apr", score: 2 },
  { date: "07 Apr", score: 2, note: "Susah tidur." },
  { date: "08 Apr", score: 3 },
  { date: "09 Apr", score: 4 },
  { date: "10 Apr", score: 3 },
  { date: "11 Apr", score: 4 },
  { date: "12 Apr", score: 5, note: "Libur membantu reset." },
  { date: "13 Apr", score: 4 },
  { date: "14 Apr", score: 3 },
  { date: "15 Apr", score: 2, note: "Tegang menjelang presentasi." },
];

export const counselorOverview = {
  monitoredStudents: 214,
  activeAlerts: 12,
  reviewedToday: 7,
  anonymousReports: 5,
};

export const counselorStudents: CounselorStudent[] = [
  {
    id: "raka-pratama",
    name: "Raka Pratama",
    className: "XI IPA 2",
    trend: "Turun 3 hari",
    latestMood: 2,
    risk: "Tinggi",
    focus: "Tekanan tugas dan pola tidur belum stabil.",
    moodHistory: studentMoodHistory,
  },
  {
    id: "nabila-rahma",
    name: "Nabila Rahma",
    className: "X IPS 1",
    trend: "Stabil rendah",
    latestMood: 2,
    risk: "Sedang",
    focus: "Perlu cek relasi sosial di kelas dan rasa aman saat belajar.",
    moodHistory: [
      { date: "02 Apr", score: 3, note: "Masih lelah setelah tugas praktik." },
      { date: "03 Apr", score: 3 },
      { date: "04 Apr", score: 2, note: "Mulai menghindari kerja kelompok." },
      { date: "05 Apr", score: 2 },
      { date: "06 Apr", score: 2, note: "Merasa tidak dianggap saat diskusi." },
      { date: "07 Apr", score: 3 },
      { date: "08 Apr", score: 3 },
      { date: "09 Apr", score: 2, note: "Cemas masuk kelas tertentu." },
      { date: "10 Apr", score: 2 },
      { date: "11 Apr", score: 3 },
      { date: "12 Apr", score: 3 },
      { date: "13 Apr", score: 2, note: "Lebih banyak diam." },
      { date: "14 Apr", score: 2 },
      { date: "15 Apr", score: 2, note: "Butuh teman bicara yang aman." },
    ],
  },
  {
    id: "rafael-adi",
    name: "Rafael Adi",
    className: "XI IPA 1",
    trend: "Naik setelah intervensi",
    latestMood: 4,
    risk: "Aman",
    focus: "Respon baik setelah sesi awal dan ritme belajar membaik.",
    moodHistory: [
      { date: "02 Apr", score: 2, note: "Masih terbebani target ujian." },
      { date: "03 Apr", score: 2 },
      { date: "04 Apr", score: 3, note: "Mulai lebih teratur." },
      { date: "05 Apr", score: 3 },
      { date: "06 Apr", score: 3 },
      { date: "07 Apr", score: 4, note: "Sudah bisa membagi waktu." },
      { date: "08 Apr", score: 4 },
      { date: "09 Apr", score: 4 },
      { date: "10 Apr", score: 3 },
      { date: "11 Apr", score: 4 },
      { date: "12 Apr", score: 4 },
      { date: "13 Apr", score: 4, note: "Merasa lebih ringan." },
      { date: "14 Apr", score: 4 },
      { date: "15 Apr", score: 4, note: "Konsisten lebih stabil." },
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "ALT-021",
    studentId: "raka-pratama",
    student: "Raka Pratama",
    className: "XI IPA 2",
    reason: "Mood 2 selama 3 hari berturut-turut",
    severity: "Tinggi",
    status: "Baru",
    lastUpdated: "15 Apr 2026, 07.12",
    summary: "Penurunan mood konsisten muncul bersama catatan tugas yang menumpuk dan tidur yang terganggu.",
    recommendation: "Lakukan check-in singkat hari ini lalu jadwalkan sesi lanjutan minggu ini.",
  },
  {
    id: "ALT-019",
    studentId: "nabila-rahma",
    student: "Nabila Rahma",
    className: "X IPS 1",
    reason: "Tren menurun selama 5 hari",
    severity: "Sedang",
    status: "Baru",
    lastUpdated: "15 Apr 2026, 06.40",
    summary: "Mood stabil di level rendah dan beberapa catatan mengarah ke tekanan sosial dalam kelompok kelas.",
    recommendation: "Validasi situasi kelas dan cek kebutuhan dukungan sosial yang aman.",
  },
  {
    id: "ALT-017",
    studentId: "rafael-adi",
    student: "Rafael Adi",
    className: "XI IPA 1",
    reason: "Catatan mengindikasikan konflik sosial",
    severity: "Tinggi",
    status: "Selesai",
    lastUpdated: "14 Apr 2026, 15.20",
    summary: "Catatan harian menunjukkan konflik berulang dengan teman sebaya dan penurunan energi saat di sekolah.",
    recommendation: "Pantau dua hari lagi sambil koordinasi dengan wali kelas untuk observasi terbatas.",
  },
];

export const whisperReports: WhisperReport[] = [
  {
    id: "WSP-091",
    studentId: "raka-pratama",
    ownerLabel: "Anonim XI IPA 2",
    title: "Bullying verbal saat jam istirahat",
    category: "Bullying",
    urgency: "Tinggi",
    status: "Sedang Ditinjau",
    submittedAt: "15 Apr 2026, 08.10",
    excerpt: "Ada teman sekelas yang sering mengejek soal kondisi rumah dan dilakukan di depan banyak orang.",
    detail:
      "Ejekan terjadi saat istirahat dan biasanya dilakukan di depan beberapa teman lain. Saya mulai menghindari area kantin karena takut kejadian serupa terulang.",
    nextStep: "Guru BK sedang meninjau laporan dan menentukan langkah aman berikutnya.",
    assignedTo: "Bu Sinta",
  },
  {
    id: "WSP-088",
    studentId: "nabila-rahma",
    ownerLabel: "Anonim X IPS 1",
    title: "Tekanan kelompok tugas",
    category: "Tekanan sosial",
    urgency: "Normal",
    status: "Sedang Ditinjau",
    submittedAt: "14 Apr 2026, 19.32",
    excerpt: "Saya merasa dijadikan cadangan terus saat kerja kelompok dan mulai malas masuk kelas itu.",
    detail:
      "Situasi ini membuat saya tidak nyaman saat pembagian kelompok dimulai. Saya belum ingin menyebut nama, tapi saya ingin ada cara supaya pembagian tugas terasa lebih adil.",
    nextStep: "Laporan masih dipelajari untuk melihat pola yang berulang sebelum ditindaklanjuti.",
    assignedTo: "Bu Sinta",
  },
  {
    id: "WSP-083",
    studentId: "rafael-adi",
    ownerLabel: "Anonim XI IPA 1",
    title: "Sulit bicara ke wali kelas",
    category: "Relasi sekolah",
    urgency: "Normal",
    status: "Selesai",
    submittedAt: "13 Apr 2026, 12.05",
    excerpt: "Takut cerita langsung karena khawatir dianggap mencari perhatian.",
    detail:
      "Saya bingung mulai dari mana kalau harus bicara langsung. Setelah dibantu BK, saya akhirnya bisa menyampaikan inti masalah secara bertahap.",
    nextStep: "Kasus sudah ditutup setelah sesi pendampingan awal selesai.",
    assignedTo: "Bu Sinta",
  },
];

export const studentInterventions: StudentIntervention[] = [
  {
    studentId: "raka-pratama",
    title: "Check-in singkat",
    owner: "Bu Sinta",
    status: "Baru",
    when: "15 Apr 2026, 10.30",
  },
  {
    studentId: "raka-pratama",
    title: "Observasi kelas",
    owner: "Wali kelas XI IPA 2",
    status: "Sedang Ditinjau",
    when: "16 Apr 2026",
  },
  {
    studentId: "nabila-rahma",
    title: "Pendampingan relasi kelompok",
    owner: "Bu Sinta",
    status: "Sedang Ditinjau",
    when: "17 Apr 2026",
  },
  {
    studentId: "rafael-adi",
    title: "Sesi evaluasi",
    owner: "Bu Sinta",
    status: "Selesai",
    when: "11 Apr 2026",
  },
];

export const resources: ResourceItem[] = [
  {
    id: "presentasi-tanpa-panik",
    category: "Tekanan Akademik",
    title: "3 cara meredakan panik sebelum presentasi",
    readTime: "4 menit",
    summary: "Langkah cepat untuk menurunkan tegang beberapa menit sebelum tampil.",
    points: [
      "Atur napas 4 hitungan masuk, 6 hitungan keluar selama satu menit.",
      "Pilih satu kalimat pembuka sederhana supaya pikiran tidak kosong.",
      "Fokus pada satu wajah yang aman dilihat saat mulai berbicara.",
    ],
  },
  {
    id: "tidur-lebih-stabil",
    category: "Perawatan Diri",
    title: "Rutinitas malam 10 menit supaya tidur lebih stabil",
    readTime: "6 menit",
    summary: "Rutinitas singkat untuk menenangkan tubuh sebelum tidur.",
    points: [
      "Jauhkan layar 10 menit sebelum tidur.",
      "Redupkan cahaya dan pilih satu aktivitas yang sama setiap malam.",
      "Tulis satu pikiran yang mengganggu agar tidak ikut dibawa ke tempat tidur.",
    ],
  },
  {
    id: "menyampaikan-batasan",
    category: "Relasi Sosial",
    title: "Cara menyampaikan batasan tanpa memicu konflik",
    readTime: "5 menit",
    summary: "Kalimat yang tegas tapi tetap tenang saat kamu ingin menjaga batas.",
    points: [
      "Mulai dari kebutuhanmu, bukan menyalahkan orang lain.",
      "Gunakan kalimat pendek dan tidak berputar-putar.",
      "Ulangi inti batasmu jika lawan bicara mencoba menggeser topik.",
    ],
  },
  {
    id: "pikiran-terasa-penuh",
    category: "Manajemen Emosi",
    title: "Apa yang bisa dilakukan saat pikiran terasa penuh",
    readTime: "5 menit",
    summary: "Cara cepat merapikan pikiran saat terasa terlalu ramai.",
    points: [
      "Pisahkan apa yang bisa diselesaikan hari ini dan yang belum perlu dipikirkan.",
      "Pilih satu hal kecil yang bisa kamu bereskan dalam 10 menit.",
      "Berhenti sejenak dari notifikasi agar pikiran tidak terus tertarik ke banyak arah.",
    ],
  },
  {
    id: "teknik-25-menit",
    category: "Fokus Belajar",
    title: "Teknik 25 menit untuk mulai belajar tanpa berat",
    readTime: "4 menit",
    summary: "Mulai belajar dari blok waktu pendek agar tidak terasa menumpuk.",
    points: [
      "Tentukan satu target kecil yang realistis untuk 25 menit pertama.",
      "Simpan ponsel di luar jangkauan selama timer berjalan.",
      "Ambil jeda 5 menit sebelum pindah ke blok berikutnya.",
    ],
  },
  {
    id: "reset-7-menit",
    category: "Pemulihan Cepat",
    title: "Reset 7 menit setelah hari sekolah yang melelahkan",
    readTime: "3 menit",
    summary: "Reset singkat agar tubuh dan kepala tidak terus tegang sampai malam.",
    points: [
      "Ganti posisi tubuh dan lakukan peregangan ringan.",
      "Minum air dan duduk tanpa layar selama beberapa menit.",
      "Tentukan satu hal yang tidak perlu kamu bawa sampai malam.",
    ],
  },
];

export const counselingSessions: CounselingSession[] = [
  {
    id: "CS-201",
    studentId: "raka-pratama",
    studentName: "Raka Pratama",
    title: "Check-in mingguan",
    counselor: "Bu Sinta",
    when: "17 Apr 2026, 10.30",
    format: "Tatap muka",
    location: "Ruang BK 2",
    status: "Baru",
    invitationStatus: "Sedang Ditinjau",
    focus: "Tekanan tugas dan pola tidur",
    note: "Datang 5 menit lebih awal dan bawa catatan jika ada hal yang ingin dibahas.",
  },
  {
    id: "CS-196",
    studentId: "nabila-rahma",
    studentName: "Nabila Rahma",
    title: "Sesi tindak lanjut",
    counselor: "Bu Sinta",
    when: "22 Apr 2026, 13.00",
    format: "Online",
    location: "Google Meet sekolah",
    status: "Sedang Ditinjau",
    invitationStatus: "Baru",
    focus: "Evaluasi progress setelah sesi pertama",
    note: "Link meeting akan dibagikan lewat wali kelas sebelum sesi dimulai.",
  },
  {
    id: "CS-184",
    studentId: "rafael-adi",
    studentName: "Rafael Adi",
    title: "Sesi awal",
    counselor: "Bu Sinta",
    when: "10 Apr 2026, 09.00",
    format: "Tatap muka",
    location: "Ruang BK 2",
    status: "Selesai",
    invitationStatus: "Selesai",
    focus: "Mengenali sumber tekanan utama",
    note: "Sesi selesai dengan rencana check-in lanjutan minggu berikutnya.",
    outcome: "Siswa mampu menjelaskan pemicu utama dan setuju menjalani sesi evaluasi lanjutan.",
    followUp: "Pantau ritme belajar selama satu minggu dan cek ulang di sesi berikutnya.",
  },
];

export const counselingRequests: CounselingRequest[] = [
  {
    id: "REQ-031",
    studentId: "raka-pratama",
    studentName: "Raka Pratama",
    className: "XI IPA 2",
    topic: "Tekanan akademik",
    preferredSlot: "Setelah jam sekolah",
    summary: "Butuh sesi lanjutan untuk membahas tugas yang terasa menumpuk dan pola tidur yang belum stabil.",
    status: "Baru",
    submittedAt: "16 Apr 2026, 08.10",
  },
  {
    id: "REQ-027",
    studentId: "nabila-rahma",
    studentName: "Nabila Rahma",
    className: "X IPS 1",
    topic: "Relasi pertemanan",
    preferredSlot: "Istirahat siang",
    summary: "Ingin bicara soal dinamika kelompok kelas yang mulai terasa menguras energi.",
    status: "Sedang Ditinjau",
    submittedAt: "15 Apr 2026, 13.20",
  },
];

export const adminMetrics = {
  totalUsers: 684,
  activeStudents: 602,
  counselors: 6,
  classes: 18,
};

export const adminThresholds = [
  {
    label: "Alert otomatis",
    description: "Mood <= 2 selama 3 hari berturut-turut",
    status: "Aktif",
  },
  {
    label: "Escalation review",
    description: "Whisper urgency tinggi harus ditinjau <= 24 jam",
    status: "Aktif",
  },
  {
    label: "Daily reminder",
    description: "Nonaktif di MVP untuk hindari noise awal",
    status: "Tertunda",
  },
];

export const classHealth = [
  { className: "XI IPA 2", completion: "86%", riskBand: "Perlu perhatian" },
  { className: "X IPS 1", completion: "79%", riskBand: "Monitor" },
  { className: "XI IPA 1", completion: "91%", riskBand: "Stabil" },
  { className: "XII IPA 3", completion: "74%", riskBand: "Perlu perhatian" },
];
