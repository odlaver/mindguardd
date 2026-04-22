import "server-only";

import {
  formatJakartaDate,
  formatJakartaDateTime,
  formatJakartaShortDate,
} from "@/lib/time";

export { getJakartaDateKey, getJakartaParts } from "@/lib/time";

const JAKARTA_OFFSET_MS = 7 * 60 * 60 * 1000;

function getShiftedDate(date: Date) {
  return new Date(date.getTime() + JAKARTA_OFFSET_MS);
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
  return formatJakartaShortDate(date);
}

export function formatDate(date: Date) {
  return formatJakartaDate(date);
}

export function formatDateTime(date: Date) {
  return formatJakartaDateTime(date);
}
