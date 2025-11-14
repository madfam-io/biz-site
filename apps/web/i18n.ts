import { messages } from '@madfam/i18n';
import { getRequestConfig } from 'next-intl/server';

const configHandler = getRequestConfig(async ({ locale }) => {
  return {
    locale: locale as string,
    messages: messages[locale as keyof typeof messages] as any,
  };
});

export default configHandler;
