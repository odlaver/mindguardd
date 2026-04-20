import "server-only";

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
];
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
];

function getShiftedDate(date: Date) {
  return new Date(date.getTime() + JAKARTA_OFFSET_MS);
}

export function getJakartaParts(date: Date) {
  const shifted = getShiftedDate(date);

  return {
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    month: shifted.getUTCMonth(),
    year: shifted.getUTCFullYear(),
  };
}

export function getJakartaDateKey(date: Date) {
  const parts = getJakartaParts(date);

  return `${parts.year}-${String(parts.month + 1).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function getJakartaDayRange(date = new Date()) {
  const shifted = getShiftedDate(date);
  const startUtc =
    Date.UTC(
      shifted.getUTCFullYear(),
      shifted.getUTCMonth(),
      shifted.getUTCDate(),
      0,
      0,
      0,
      0,
    ) - JAKARTA_OFFSET_MS;

  return {
    end: new Date(startUtc + 24 * 60 * 60 * 1000),
    start: new Date(startUtc),
  };
}

export function formatShortDate(date: Date) {
  const parts = getJakartaParts(date);
  return `${String(parts.day).padStart(2, "0")} ${shortMonths[parts.month]}`;
}

export function formatDate(date: Date) {
  const parts = getJakartaParts(date);
  return `${String(parts.day).padStart(2, "0")} ${longMonths[parts.month]} ${parts.year}`;
}

export function formatDateTime(date: Date) {
  const parts = getJakartaParts(date);
  return `${String(parts.day).padStart(2, "0")} ${shortMonths[parts.month]} ${parts.year}, ${String(parts.hour).padStart(2, "0")}.${String(parts.minute).padStart(2, "0")}`;
}
