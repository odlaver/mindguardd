const JAKARTA_OFFSET_MS = 7 * 60 * 60 * 1000;
const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;
const longMonths = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

type JakartaParts = {
  day: number;
  hour: number;
  minute: number;
  month: number;
  second: number;
  year: number;
};

function getShiftedDate(date: Date) {
  return new Date(date.getTime() + JAKARTA_OFFSET_MS);
}

export function getJakartaParts(date: Date): JakartaParts {
  const shifted = getShiftedDate(date);

  return {
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    month: shifted.getUTCMonth(),
    second: shifted.getUTCSeconds(),
    year: shifted.getUTCFullYear(),
  };
}

export function getJakartaDateKey(date: Date) {
  const parts = getJakartaParts(date);

  return `${parts.year}-${String(parts.month + 1).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function formatJakartaShortDate(date: Date) {
  const parts = getJakartaParts(date);
  return `${String(parts.day).padStart(2, "0")} ${shortMonths[parts.month]}`;
}

export function formatJakartaDate(date: Date) {
  const parts = getJakartaParts(date);
  return `${String(parts.day).padStart(2, "0")} ${longMonths[parts.month]} ${parts.year}`;
}

export function formatJakartaTime(
  date: Date,
  options?: {
    withSeconds?: boolean;
  },
) {
  const parts = getJakartaParts(date);
  const base = `${String(parts.hour).padStart(2, "0")}.${String(parts.minute).padStart(2, "0")}`;

  if (!options?.withSeconds) {
    return base;
  }

  return `${base}.${String(parts.second).padStart(2, "0")}`;
}

export function formatJakartaDateTime(date: Date) {
  return `${formatJakartaShortDate(date)} ${getJakartaParts(date).year}, ${formatJakartaTime(date)}`;
}

export function getJakartaInputDateValue(date = new Date()) {
  return getJakartaDateKey(date);
}

export function getJakartaInputTimeValue(date = new Date()) {
  const parts = getJakartaParts(date);
  return `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
}
