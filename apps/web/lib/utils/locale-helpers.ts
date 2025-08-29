/**
 * Locale utility helpers for handling multi-language content
 */

export type SupportedLocale = 'en' | 'es' | 'pt';

export interface LocalizedContent<T = string> {
  en: T;
  es: T;
  pt: T;
}

/**
 * Get localized text based on current locale
 * @param content - Object with localized strings
 * @param locale - Current locale
 * @returns Localized string for the given locale
 */
export function getLocalizedText(content: LocalizedContent<string>, locale: string): string {
  const normalizedLocale = locale as SupportedLocale;
  return content[normalizedLocale] || content['es']; // Default to Spanish
}

/**
 * Get localized content of any type based on current locale
 * @param content - Object with localized content
 * @param locale - Current locale
 * @returns Localized content for the given locale
 */
export function getLocalizedContent<T>(content: LocalizedContent<T>, locale: string): T {
  const normalizedLocale = locale as SupportedLocale;
  return content[normalizedLocale] || content['es']; // Default to Spanish
}

/**
 * Create a localized content object from separate values
 * @param en - English content
 * @param es - Spanish content
 * @param ptBr - Portuguese content
 * @returns LocalizedContent object
 */
export function createLocalizedContent<T>(en: T, es: T, ptBr: T): LocalizedContent<T> {
  return {
    en,
    es,
    pt: ptBr,
  };
}

/**
 * Check if a locale is supported
 * @param locale - Locale to check
 * @returns True if locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return ['en', 'es', 'pt'].includes(locale);
}

/**
 * Get the default locale
 * @returns Default locale (Spanish)
 */
export function getDefaultLocale(): SupportedLocale {
  return 'es';
}

/**
 * Map a locale to its display name
 * @param locale - Locale code
 * @returns Display name for the locale
 */
export function getLocaleDisplayName(locale: string): string {
  const names: LocalizedContent<string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };
  return names[locale as SupportedLocale] || locale;
}
