import { Locale } from '../config';

export type TranslationValue = string | string[] | Record<string, any>;

export interface LocaleContent<T = string> {
  'es-MX': T;
  'en-US': T;
  'pt-BR': T;
}

/**
 * Get content for the current locale with fallback support
 */
export function getLocalizedContent<T = string>(
  content: Partial<LocaleContent<T>>,
  locale: Locale,
  fallbackLocale: Locale = 'es-MX'
): T {
  return content[locale] ?? content[fallbackLocale] ?? ('' as T);
}

/**
 * Create a locale-aware object with proper typing
 */
export function createLocalizedObject<T>(
  defaultContent: T,
  enContent: T,
  ptContent: T
): LocaleContent<T> {
  return {
    'es-MX': defaultContent,
    'en-US': enContent,
    'pt-BR': ptContent,
  };
}

/**
 * Check if all locales have content
 */
export function hasAllLocales<T>(content: Partial<LocaleContent<T>>): content is LocaleContent<T> {
  return Boolean(content['es-MX'] && content['en-US'] && content['pt-BR']);
}

/**
 * Get missing locales from a content object
 */
export function getMissingLocales<T>(content: Partial<LocaleContent<T>>): Locale[] {
  const locales: Locale[] = ['es-MX', 'en-US', 'pt-BR'];
  return locales.filter(locale => !content[locale]);
}

/**
 * Interpolate variables in a translation string
 */
export function interpolate(
  text: string,
  variables: Record<string, string | number>
): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
    text
  );
}