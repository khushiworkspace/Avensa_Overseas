import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO, differenceInDays } from "date-fns";

// ─── Class name utility ───────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date formatting ──────────────────────────────────────────────────────────

export function formatDate(date: string | Date, fmt = "dd MMM yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, fmt);
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd MMM yyyy, HH:mm");
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

// ─── Number formatting ────────────────────────────────────────────────────────

export function formatCurrency(
  amount: number,
  currency = "EUR",
  locale = "en-GB"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── String utilities ─────────────────────────────────────────────────────────

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string): string {
  return str
    .split(/[\s_-]/)
    .map((w) => capitalize(w.toLowerCase()))
    .join(" ");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Application reference ID ─────────────────────────────────────────────────

export function generateReferenceNumber(): string {
  const prefix = "AO";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ─── Schengen calculator ──────────────────────────────────────────────────────

export function calculateSchengenDays(
  stays: Array<{ entryDate: string; exitDate: string }>,
  referenceDate = new Date()
): { daysUsed: number; daysRemaining: number } {
  const windowStart = new Date(referenceDate);
  windowStart.setDate(windowStart.getDate() - 179);

  let daysUsed = 0;

  for (const stay of stays) {
    const entry = parseISO(stay.entryDate);
    const exit = parseISO(stay.exitDate);

    const effectiveEntry = entry < windowStart ? windowStart : entry;
    const effectiveExit = exit > referenceDate ? referenceDate : exit;

    if (effectiveEntry <= effectiveExit) {
      daysUsed += differenceInDays(effectiveExit, effectiveEntry) + 1;
    }
  }

  return {
    daysUsed: Math.min(daysUsed, 90),
    daysRemaining: Math.max(0, 90 - daysUsed),
  };
}

// ─── Eligibility scoring ──────────────────────────────────────────────────────

export function scoreEligibility(
  answers: Record<string, unknown>,
  criteria: Array<{ field: string; weight: number; test: (v: unknown) => boolean }>
): number {
  let totalWeight = 0;
  let passedWeight = 0;

  for (const criterion of criteria) {
    totalWeight += criterion.weight;
    const value = answers[criterion.field];
    if (criterion.test(value)) {
      passedWeight += criterion.weight;
    }
  }

  return totalWeight > 0 ? Math.round((passedWeight / totalWeight) * 100) : 0;
}

// ─── Status colour helpers ────────────────────────────────────────────────────

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "badge-green",
    inactive: "badge-slate",
    suspended: "badge-red",
    approved: "badge-green",
    rejected: "badge-red",
    pending: "badge-yellow",
    draft: "badge-slate",
    submitted: "badge-blue",
    under_review: "badge-purple",
    completed: "badge-green",
    cancelled: "badge-slate",
    failed: "badge-red",
    succeeded: "badge-green",
    processing: "badge-blue",
    scheduled: "badge-blue",
    confirmed: "badge-green",
  };
  return map[status] ?? "badge-slate";
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

// ─── Validation helpers ───────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-().]{7,20}$/.test(phone);
}

export function isPassportExpirySufficient(
  expiryDate: string,
  monthsRequired = 6
): boolean {
  const expiry = parseISO(expiryDate);
  const minDate = new Date();
  minDate.setMonth(minDate.getMonth() + monthsRequired);
  return expiry > minDate;
}

// ─── Local storage helpers ────────────────────────────────────────────────────

export function safeLocalStorageGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

export function safeLocalStorageSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}
