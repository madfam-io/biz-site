import { i18nConfig, messages } from '@madfam/i18n';

export const { locales } = i18nConfig;
export const { defaultLocale } = i18nConfig;

export function getMessages(locale: string) {
  return messages[locale as keyof typeof messages] || messages[defaultLocale];
}
