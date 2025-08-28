/**
 * Type definitions for Next-Intl messages
 * This properly types our translation messages to work with Next-Intl
 */

/**
 * Custom type that extends the base message format to support arrays
 * Next-Intl's AbstractIntlMessages doesn't support arrays directly,
 * but our translations use them for features, deliverables, etc.
 */
export type Messages = {
  [key: string]: string | Messages | readonly string[];
};

/**
 * Type guard to check if a value is a valid Messages object
 */
export function isValidMessages(value: unknown): value is Messages {
  if (!value || typeof value !== 'object') {
    return false;
  }

  // Recursively validate the structure
  for (const key in value) {
    const item = (value as Record<string, unknown>)[key];
    if (typeof item === 'string') {
      continue;
    }
    if (Array.isArray(item) && item.every(i => typeof i === 'string')) {
      continue;
    }
    if (typeof item === 'object' && item !== null && isValidMessages(item)) {
      continue;
    }
    return false;
  }

  return true;
}
