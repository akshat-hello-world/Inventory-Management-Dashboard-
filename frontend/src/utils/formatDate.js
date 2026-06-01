// ==================================================
// Date Formatter
// ==================================================

const DEFAULT_LOCALE = "en-IN";


/**
 * Format date.
 *
 * Example:
 * 2026-05-31T10:30:00Z
 * => 31 May 2026
 */
export const formatDate = (
  value,
  locale = DEFAULT_LOCALE
) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    locale,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(date);
};


/**
 * Format date & time.
 *
 * Example:
 * 2026-05-31T10:30:00Z
 * => 31 May 2026, 04:00 PM
 */
export const formatDateTime = (
  value,
  locale = DEFAULT_LOCALE
) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    locale,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
};


/**
 * Format short date.
 *
 * Example:
 * 2026-05-31T10:30:00Z
 * => 31/05/2026
 */
export const formatShortDate = (
  value,
  locale = DEFAULT_LOCALE
) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    locale,
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  ).format(date);
};


/**
 * Relative time formatter.
 *
 * Examples:
 * "2 days ago"
 * "3 hours ago"
 */
export const formatRelativeTime = (
  value
) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const diffInSeconds = Math.floor(
    (Date.now() - date.getTime()) / 1000
  );

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(
      diffInSeconds / interval.seconds
    );

    if (count >= 1) {
      return `${count} ${interval.label}${
        count > 1 ? "s" : ""
      } ago`;
    }
  }

  return "Just now";
};