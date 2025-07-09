import { i18nConfig, messages } from '@madfam/i18n';

export const locales = i18nConfig.locales;
export const defaultLocale = i18nConfig.defaultLocale;

export function getMessages(locale: string) {
  return messages[locale as keyof typeof messages] || messages[defaultLocale];
}