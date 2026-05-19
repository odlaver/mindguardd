export type MoodPoint = {
  date: string;
  note?: string;
  score: number;
};

export type ReviewStatus = "Baru" | "Sedang Ditinjau" | "Selesai";
export type CounselingRequestStatus = "Baru" | "Dijadwalkan" | "Selesai";
export type CounselingSessionStatus =
  | "Menunggu Konfirmasi"
  | "Dikonfirmasi"
  | "Selesai";

export type AlertStatus = ReviewStatus;

export type AlertItem = {
  className: string;
  id: string;
  lastUpdated: string;
  reason: string;
  recommendation: string;
  severity: "Tinggi" | "Sedang";
  status: AlertStatus;
  student: string;
  studentId: string;
  summary: string;
};

export type WhisperReport = {
  assignedTo: string;
  category: string;
  detail: string;
  excerpt: string;
  id: string;
  nextStep: string;
  ownerLabel: string;
  status?: ReviewStatus;
  studentId?: string;
  submittedAt: string;
  title: string;
  urgency: "Tinggi" | "Normal";
};

export type ResourceItem = {
  category: string;
  id: string;
  points: string[];
  readTime: string;
  summary: string;
  title: string;
};

export type CounselingSession = {
  counselor: string;
  focus: string;
  followUp?: string;
  format: "Tatap muka" | "Online";
  id: string;
  invitationStatus: CounselingSessionStatus;
  location: string;
  note: string;
  outcome?: string;
  requestId?: string;
  status: CounselingSessionStatus;
  studentCompletionNote?: string;
  studentConfirmationNote?: string;
  studentId: string;
  studentName: string;
  title: string;
  when: string;
};

export type CounselingRequest = {
  className: string;
  id: string;
  preferredSlot: string;
  scheduledSessionId?: string;
  status: CounselingRequestStatus;
  studentId: string;
  studentName: string;
  submittedAt: string;
  summary: string;
  topic: string;
};

export type CounselorStudent = {
  className: string;
  focus: string;
  id: string;
  latestMood: number;
  moodHistory: MoodPoint[];
  name: string;
  risk: "Tinggi" | "Sedang" | "Aman";
  trend: string;
};

export type StudentIntervention = {
  owner: string;
  status: ReviewStatus;
  studentId: string;
  title: string;
  when: string;
};

export type AdminUserRole = "Admin" | "Guru BK" | "Siswa" | "Wali Kelas";
export type AdminAccountStatus = "Aktif" | "Menunggu" | "Nonaktif";

export type AdminUser = {
  className?: string;
  email: string;
  id: string;
  lastAccess: string;
  name: string;
  role: AdminUserRole;
  schoolId: string;
  schoolName: string;
  status: AdminAccountStatus;
};

export type AdminSchool = {
  classCount: number;
  completion: string;
  counselorCount: number;
  id: string;
  name: string;
  principal: string;
  studentCount: number;
};

export type AdminClass = {
  className: string;
  completion: string;
  counselor: string;
  homeroom: string;
  id: string;
  riskBand: "Stabil" | "Monitor" | "Perlu perhatian";
  schoolId: string;
  schoolName: string;
  studentCount: number;
};

export type AdminSystemConfig = {
  group: string;
  id: string;
  impact: string;
  name: string;
  status: "Aktif" | "Tertunda";
  summary: string;
  value: string;
};
