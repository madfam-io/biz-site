import { i18nConfig, messages, type Locale } from '@madfam/i18n';

export const { locales } = i18nConfig;
export const { defaultLocale } = i18nConfig;
export type { Locale };

export function getMessages(locale: string) {
  return messages[locale as keyof typeof messages] || messages[defaultLocale];
}
