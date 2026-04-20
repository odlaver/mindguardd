export type MoodPoint = {
  date: string;
  score: number;
  note?: string;
};

export type ReviewStatus = "Baru" | "Sedang Ditinjau" | "Selesai";
export type CounselingRequestStatus = "Baru" | "Dijadwalkan" | "Selesai";
export type CounselingSessionStatus =
  | "Menunggu Konfirmasi"
  | "Dikonfirmasi"
  | "Selesai";

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
  requestId?: string;
  studentId: string;
  studentName: string;
  title: string;
  counselor: string;
  when: string;
  format: "Tatap muka" | "Online";
  location: string;
  status: CounselingSessionStatus;
  invitationStatus: CounselingSessionStatus;
  focus: string;
  note: string;
  outcome?: string;
  followUp?: string;
  studentConfirmationNote?: string;
  studentCompletionNote?: string;
};

export type CounselingRequest = {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  topic: string;
  preferredSlot: string;
  summary: string;
  status: CounselingRequestStatus;
  submittedAt: string;
  scheduledSessionId?: string;
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
  {
    id: "dinda-ayu",
    name: "Dinda Ayu",
    className: "X IPA 3",
    trend: "Fluktuatif",
    latestMood: 3,
    risk: "Sedang",
    focus: "Mulai kewalahan dengan ritme organisasi dan tuntutan akademik.",
    moodHistory: [
      { date: "02 Apr", score: 4, note: "Masih cukup seimbang." },
      { date: "03 Apr", score: 3 },
      { date: "04 Apr", score: 3, note: "Tugas mulai menumpuk." },
      { date: "05 Apr", score: 2 },
      { date: "06 Apr", score: 3, note: "Sedikit lebih tenang setelah istirahat." },
      { date: "07 Apr", score: 4 },
      { date: "08 Apr", score: 3 },
      { date: "09 Apr", score: 2, note: "Panik saat persiapan lomba." },
      { date: "10 Apr", score: 3 },
      { date: "11 Apr", score: 3 },
      { date: "12 Apr", score: 4 },
      { date: "13 Apr", score: 3 },
      { date: "14 Apr", score: 2, note: "Mulai kurang tidur." },
      { date: "15 Apr", score: 3, note: "Butuh bantu atur prioritas." },
    ],
  },
  {
    id: "bagas-nugroho",
    name: "Bagas Nugroho",
    className: "XII IPA 3",
    trend: "Turun 3 hari",
    latestMood: 1,
    risk: "Tinggi",
    focus: "Cemas tinggi menjelang kelulusan dan makin menarik diri dari kelas.",
    moodHistory: [
      { date: "02 Apr", score: 3, note: "Masih bisa ikut ritme kelas." },
      { date: "03 Apr", score: 3 },
      { date: "04 Apr", score: 2, note: "Mulai sulit fokus." },
      { date: "05 Apr", score: 2 },
      { date: "06 Apr", score: 2, note: "Merasa gagal sebelum ujian dimulai." },
      { date: "07 Apr", score: 3 },
      { date: "08 Apr", score: 2 },
      { date: "09 Apr", score: 2 },
      { date: "10 Apr", score: 2, note: "Menghindari obrolan soal kampus." },
      { date: "11 Apr", score: 2 },
      { date: "12 Apr", score: 2 },
      { date: "13 Apr", score: 2, note: "Tidur makin tidak teratur." },
      { date: "14 Apr", score: 1, note: "Merasa sangat kewalahan." },
      { date: "15 Apr", score: 1, note: "Butuh respons cepat dari BK." },
    ],
  },
  {
    id: "salma-kirana",
    name: "Salma Kirana",
    className: "XI IPS 2",
    trend: "Naik 3 hari",
    latestMood: 4,
    risk: "Aman",
    focus: "Mulai stabil setelah dapat ruang bicara dengan wali kelas.",
    moodHistory: [
      { date: "02 Apr", score: 2, note: "Masih canggung setelah konflik kelompok." },
      { date: "03 Apr", score: 2 },
      { date: "04 Apr", score: 3 },
      { date: "05 Apr", score: 3 },
      { date: "06 Apr", score: 2, note: "Masih kepikiran komentar teman." },
      { date: "07 Apr", score: 3 },
      { date: "08 Apr", score: 3 },
      { date: "09 Apr", score: 3 },
      { date: "10 Apr", score: 3 },
      { date: "11 Apr", score: 4, note: "Mulai merasa lebih aman." },
      { date: "12 Apr", score: 4 },
      { date: "13 Apr", score: 4 },
      { date: "14 Apr", score: 4, note: "Sudah lebih nyaman di kelas." },
      { date: "15 Apr", score: 4, note: "Ingin tetap rutin check-in." },
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
  {
    id: "ALT-025",
    studentId: "bagas-nugroho",
    student: "Bagas Nugroho",
    className: "XII IPA 3",
    reason: "Mood 1 selama 2 hari dengan catatan kecemasan ujian",
    severity: "Tinggi",
    status: "Baru",
    lastUpdated: "15 Apr 2026, 09.05",
    summary: "Catatan terbaru menunjukkan kecemasan intens, gangguan tidur, dan kecenderungan menarik diri dari pembahasan akademik.",
    recommendation: "Prioritaskan check-in hari ini dan siapkan opsi pendampingan singkat dengan wali kelas.",
  },
  {
    id: "ALT-022",
    studentId: "dinda-ayu",
    student: "Dinda Ayu",
    className: "X IPA 3",
    reason: "Mood fluktuatif dengan catatan kelelahan",
    severity: "Sedang",
    status: "Sedang Ditinjau",
    lastUpdated: "15 Apr 2026, 08.22",
    summary: "Mood berubah cukup tajam antara aktivitas organisasi dan sekolah, dengan pola kurang tidur mulai muncul.",
    recommendation: "Bantu siswa memetakan prioritas pekan ini dan cek batas beban kegiatan tambahan.",
  },
  {
    id: "ALT-020",
    studentId: "salma-kirana",
    student: "Salma Kirana",
    className: "XI IPS 2",
    reason: "Pemulihan pasca konflik kelompok",
    severity: "Sedang",
    status: "Selesai",
    lastUpdated: "13 Apr 2026, 11.30",
    summary: "Monitoring ditutup setelah siswa menunjukkan kenaikan mood stabil dan relasi kelas membaik.",
    recommendation: "Lanjutkan check-in ringan mingguan selama dua minggu.",
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
  {
    id: "WSP-094",
    studentId: "bagas-nugroho",
    ownerLabel: "Anonim XII IPA 3",
    title: "Teman terlihat makin menutup diri",
    category: "Kesehatan mental",
    urgency: "Tinggi",
    status: "Baru",
    submittedAt: "15 Apr 2026, 09.18",
    excerpt: "Sudah beberapa hari dia diam terus dan bilang takut banget soal ujian akhir.",
    detail:
      "Teman saya mulai menghindar dari obrolan kelas, sering duduk sendiri, dan pernah bilang tidak sanggup mengejar semua target menjelang kelulusan.",
    nextStep: "Perlu validasi cepat dan penentuan tindak lanjut aman bersama BK.",
    assignedTo: "Bu Maya",
  },
  {
    id: "WSP-090",
    studentId: "dinda-ayu",
    ownerLabel: "Anonim X IPA 3",
    title: "Kelelahan karena kegiatan berlapis",
    category: "Beban aktivitas",
    urgency: "Normal",
    status: "Sedang Ditinjau",
    submittedAt: "15 Apr 2026, 07.48",
    excerpt: "Dia kelihatan capek terus karena sekolah, lomba, dan organisasi numpuk bareng.",
    detail:
      "Belakangan ini dia sering datang terlihat lelah dan bilang jam tidurnya berantakan karena persiapan lomba ditambah tugas sekolah.",
    nextStep: "BK meninjau kemungkinan check-in preventif dan koordinasi ringan dengan pembina kegiatan.",
    assignedTo: "Bu Maya",
  },
  {
    id: "WSP-085",
    studentId: "salma-kirana",
    ownerLabel: "Anonim XI IPS 2",
    title: "Minta ruang aman untuk bercerita",
    category: "Relasi sosial",
    urgency: "Normal",
    status: "Selesai",
    submittedAt: "13 Apr 2026, 09.40",
    excerpt: "Awalnya bingung harus cerita ke siapa setelah konflik kelompok membesar.",
    detail:
      "Laporan ini masuk sebelum mediasi kelas dilakukan. Setelah ditindaklanjuti, siswa sudah mendapat ruang bicara dengan wali kelas dan guru BK.",
    nextStep: "Kasus ditutup, lanjut monitoring ringan.",
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
  {
    studentId: "bagas-nugroho",
    title: "Check-in prioritas",
    owner: "Bu Maya",
    status: "Baru",
    when: "15 Apr 2026, 11.00",
  },
  {
    studentId: "dinda-ayu",
    title: "Review beban kegiatan",
    owner: "Bu Maya",
    status: "Sedang Ditinjau",
    when: "16 Apr 2026",
  },
  {
    studentId: "salma-kirana",
    title: "Monitoring pasca mediasi",
    owner: "Wali kelas XI IPS 2",
    status: "Selesai",
    when: "12 Apr 2026",
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
    requestId: "REQ-031",
    studentId: "raka-pratama",
    studentName: "Raka Pratama",
    title: "Check-in mingguan",
    counselor: "Bu Sinta",
    when: "17 Apr 2026, 10.30",
    format: "Tatap muka",
    location: "Ruang BK 2",
    status: "Menunggu Konfirmasi",
    invitationStatus: "Menunggu Konfirmasi",
    focus: "Tekanan tugas dan pola tidur",
    note: "Jadwal dibuat guru BK dan menunggu konfirmasi siswa.",
  },
  {
    id: "CS-196",
    requestId: "REQ-027",
    studentId: "nabila-rahma",
    studentName: "Nabila Rahma",
    title: "Sesi tindak lanjut",
    counselor: "Bu Sinta",
    when: "22 Apr 2026, 13.00",
    format: "Online",
    location: "Google Meet sekolah",
    status: "Dikonfirmasi",
    invitationStatus: "Dikonfirmasi",
    focus: "Evaluasi progress setelah sesi pertama",
    note: "Link meeting akan dibagikan lewat wali kelas sebelum sesi dimulai.",
    studentConfirmationNote: "Saya setuju dengan jadwal online dan ingin membahas dinamika kelompok.",
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
    studentCompletionNote: "Sesi membantu saya lebih paham apa yang memicu tekanan saat belajar.",
  },
  {
    id: "CS-205",
    requestId: "REQ-034",
    studentId: "bagas-nugroho",
    studentName: "Bagas Nugroho",
    title: "Sesi respons cepat",
    counselor: "Bu Maya",
    when: "15 Apr 2026, 14.00",
    format: "Tatap muka",
    location: "Ruang BK 1",
    status: "Menunggu Konfirmasi",
    invitationStatus: "Menunggu Konfirmasi",
    focus: "Kecemasan menjelang ujian dan rasa kewalahan",
    note: "Sesi dibuat dari alert prioritas dan menunggu respons siswa.",
  },
  {
    id: "CS-199",
    requestId: "REQ-033",
    studentId: "dinda-ayu",
    studentName: "Dinda Ayu",
    title: "Sesi penataan prioritas",
    counselor: "Bu Maya",
    when: "18 Apr 2026, 09.30",
    format: "Online",
    location: "Google Meet sekolah",
    status: "Dikonfirmasi",
    invitationStatus: "Dikonfirmasi",
    focus: "Mengatur beban organisasi dan akademik",
    note: "Sesi lanjutan untuk menyusun ritme mingguan yang lebih realistis.",
    studentConfirmationNote: "Saya bisa hadir pagi dan ingin fokus bahas jadwal kegiatan.",
  },
  {
    id: "CS-188",
    requestId: "REQ-029",
    studentId: "salma-kirana",
    studentName: "Salma Kirana",
    title: "Sesi pemulihan relasi",
    counselor: "Bu Sinta",
    when: "11 Apr 2026, 13.30",
    format: "Tatap muka",
    location: "Ruang BK 2",
    status: "Selesai",
    invitationStatus: "Selesai",
    focus: "Pemulihan rasa aman setelah konflik kelompok",
    note: "Sesi berjalan baik dengan target memastikan dukungan di kelas.",
    outcome: "Siswa merasa lebih aman untuk kembali aktif dan sepakat pada monitoring singkat.",
    followUp: "Check-in ringan bersama wali kelas pekan depan.",
    studentCompletionNote: "Saya merasa lebih lega setelah situasinya dibicarakan dengan tenang.",
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
    status: "Dijadwalkan",
    submittedAt: "16 Apr 2026, 08.10",
    scheduledSessionId: "CS-201",
  },
  {
    id: "REQ-027",
    studentId: "nabila-rahma",
    studentName: "Nabila Rahma",
    className: "X IPS 1",
    topic: "Relasi pertemanan",
    preferredSlot: "Istirahat siang",
    summary: "Ingin bicara soal dinamika kelompok kelas yang mulai terasa menguras energi.",
    status: "Dijadwalkan",
    submittedAt: "15 Apr 2026, 13.20",
    scheduledSessionId: "CS-196",
  },
  {
    id: "REQ-034",
    studentId: "bagas-nugroho",
    studentName: "Bagas Nugroho",
    className: "XII IPA 3",
    topic: "Kecemasan ujian",
    preferredSlot: "Jam BK pagi",
    summary: "Butuh ruang bicara cepat karena kecemasan menjelang ujian mulai terasa sangat berat dan mengganggu tidur.",
    status: "Dijadwalkan",
    submittedAt: "15 Apr 2026, 09.10",
    scheduledSessionId: "CS-205",
  },
  {
    id: "REQ-033",
    studentId: "dinda-ayu",
    studentName: "Dinda Ayu",
    className: "X IPA 3",
    topic: "Manajemen beban",
    preferredSlot: "Pagi sebelum kelas",
    summary: "Ingin menyusun ulang prioritas karena kegiatan sekolah dan organisasi mulai terasa tidak seimbang.",
    status: "Dijadwalkan",
    submittedAt: "15 Apr 2026, 07.55",
    scheduledSessionId: "CS-199",
  },
  {
    id: "REQ-029",
    studentId: "salma-kirana",
    studentName: "Salma Kirana",
    className: "XI IPS 2",
    topic: "Konflik kelompok",
    preferredSlot: "Setelah istirahat kedua",
    summary: "Meminta ruang aman untuk membahas konflik kelompok yang sempat bikin tidak nyaman berada di kelas.",
    status: "Selesai",
    submittedAt: "10 Apr 2026, 10.40",
    scheduledSessionId: "CS-188",
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

export type AdminUserRole = "Admin" | "Guru BK" | "Siswa" | "Wali Kelas";
export type AdminAccountStatus = "Aktif" | "Menunggu" | "Nonaktif";

export type AdminUser = {
  id: string;
  name: string;
  role: AdminUserRole;
  schoolId: string;
  schoolName: string;
  className?: string;
  email: string;
  status: AdminAccountStatus;
  lastAccess: string;
};

export type AdminSchool = {
  id: string;
  name: string;
  principal: string;
  counselorCount: number;
  studentCount: number;
  classCount: number;
  completion: string;
};

export type AdminClass = {
  id: string;
  schoolId: string;
  schoolName: string;
  className: string;
  homeroom: string;
  studentCount: number;
  counselor: string;
  completion: string;
  riskBand: "Stabil" | "Monitor" | "Perlu perhatian";
};

export type AdminSystemConfig = {
  id: string;
  name: string;
  group: string;
  value: string;
  status: "Aktif" | "Tertunda";
  summary: string;
  impact: string;
};

export const adminUsers: AdminUser[] = [
  {
    id: "usr-001",
    name: "Raka Pratama",
    role: "Siswa",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "XI IPA 2",
    email: "raka.pratama@mindguard.id",
    status: "Aktif",
    lastAccess: "16 Apr 2026, 08.10",
  },
  {
    id: "usr-002",
    name: "Bu Sinta",
    role: "Guru BK",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    email: "sinta.bk@mindguard.id",
    status: "Aktif",
    lastAccess: "16 Apr 2026, 07.45",
  },
  {
    id: "usr-003",
    name: "Pak Adi",
    role: "Wali Kelas",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "XI IPA 2",
    email: "adi.wali@mindguard.id",
    status: "Aktif",
    lastAccess: "15 Apr 2026, 15.22",
  },
  {
    id: "usr-004",
    name: "Nadia Putri",
    role: "Siswa",
    schoolId: "sch-002",
    schoolName: "SMA Cakrawala",
    className: "X IPS 1",
    email: "nadia.putri@mindguard.id",
    status: "Menunggu",
    lastAccess: "Belum masuk",
  },
  {
    id: "usr-005",
    name: "Admin Sekolah Pusat",
    role: "Admin",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    email: "admin@mindguard.id",
    status: "Aktif",
    lastAccess: "16 Apr 2026, 09.00",
  },
  {
    id: "usr-006",
    name: "Dinda Ayu",
    role: "Siswa",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "X IPA 3",
    email: "dinda.ayu@mindguard.id",
    status: "Aktif",
    lastAccess: "15 Apr 2026, 07.50",
  },
  {
    id: "usr-007",
    name: "Bagas Nugroho",
    role: "Siswa",
    schoolId: "sch-002",
    schoolName: "SMA Cakrawala",
    className: "XII IPA 3",
    email: "bagas.nugroho@mindguard.id",
    status: "Aktif",
    lastAccess: "15 Apr 2026, 08.02",
  },
  {
    id: "usr-008",
    name: "Salma Kirana",
    role: "Siswa",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "XI IPS 2",
    email: "salma.kirana@mindguard.id",
    status: "Aktif",
    lastAccess: "15 Apr 2026, 09.14",
  },
  {
    id: "usr-009",
    name: "Bu Maya",
    role: "Guru BK",
    schoolId: "sch-002",
    schoolName: "SMA Cakrawala",
    email: "maya.bk@mindguard.id",
    status: "Aktif",
    lastAccess: "15 Apr 2026, 16.05",
  },
];

export const adminSchools: AdminSchool[] = [
  {
    id: "sch-001",
    name: "SMA Nusantara",
    principal: "Drs. Haris Setiawan",
    counselorCount: 3,
    studentCount: 412,
    classCount: 11,
    completion: "88%",
  },
  {
    id: "sch-002",
    name: "SMA Cakrawala",
    principal: "Dewi Lestari, M.Pd.",
    counselorCount: 2,
    studentCount: 272,
    classCount: 7,
    completion: "81%",
  },
  {
    id: "sch-003",
    name: "SMA Bhaskara",
    principal: "Rizal Mahendra, M.Pd.",
    counselorCount: 2,
    studentCount: 318,
    classCount: 9,
    completion: "84%",
  },
];

export const adminClasses: AdminClass[] = [
  {
    id: "cls-001",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "XI IPA 2",
    homeroom: "Pak Adi",
    studentCount: 34,
    counselor: "Bu Sinta",
    completion: "86%",
    riskBand: "Perlu perhatian",
  },
  {
    id: "cls-002",
    schoolId: "sch-002",
    schoolName: "SMA Cakrawala",
    className: "X IPS 1",
    homeroom: "Bu Rina",
    studentCount: 31,
    counselor: "Bu Maya",
    completion: "79%",
    riskBand: "Monitor",
  },
  {
    id: "cls-003",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "XI IPA 1",
    homeroom: "Pak Yudi",
    studentCount: 33,
    counselor: "Bu Sinta",
    completion: "91%",
    riskBand: "Stabil",
  },
  {
    id: "cls-004",
    schoolId: "sch-001",
    schoolName: "SMA Nusantara",
    className: "X IPA 3",
    homeroom: "Bu Laras",
    studentCount: 32,
    counselor: "Bu Maya",
    completion: "77%",
    riskBand: "Monitor",
  },
  {
    id: "cls-005",
    schoolId: "sch-002",
    schoolName: "SMA Cakrawala",
    className: "XII IPA 3",
    homeroom: "Pak Bimo",
    studentCount: 30,
    counselor: "Bu Maya",
    completion: "73%",
    riskBand: "Perlu perhatian",
  },
  {
    id: "cls-006",
    schoolId: "sch-003",
    schoolName: "SMA Bhaskara",
    className: "XI IPS 2",
    homeroom: "Bu Dina",
    studentCount: 33,
    counselor: "Bu Sinta",
    completion: "89%",
    riskBand: "Stabil",
  },
];

export const adminSystemConfigs: AdminSystemConfig[] = [
  {
    id: "cfg-001",
    name: "Alert otomatis",
    group: "Alert",
    value: "Mood <= 2 selama 3 hari",
    status: "Aktif",
    summary: "Pemicu alert risiko otomatis.",
    impact: "Masuk ke antrean alert BK.",
  },
  {
    id: "cfg-002",
    name: "Review whisper tinggi",
    group: "Whisper",
    value: "<= 24 jam",
    status: "Aktif",
    summary: "Batas waktu tinjau laporan dengan urgensi tinggi.",
    impact: "Muncul di prioritas BK.",
  },
  {
    id: "cfg-003",
    name: "Pengingat harian",
    group: "Notifikasi",
    value: "Pukul 07.00",
    status: "Tertunda",
    summary: "Pengingat check-in siswa.",
    impact: "Belum dijalankan di rilis ini.",
  },
  {
    id: "cfg-004",
    name: "Escalation ujian akhir",
    group: "Alert",
    value: "Mood 1-2 + kata kunci ujian",
    status: "Aktif",
    summary: "Prioritas tambahan untuk siswa akhir yang menunjukkan kecemasan intens.",
    impact: "Masuk ke antrean prioritas tinggi BK.",
  },
];
