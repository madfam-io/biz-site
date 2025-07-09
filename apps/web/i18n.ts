import { getRequestConfig } from 'next-intl/server';
import { messages } from '@madfam/i18n';

const configHandler: any = getRequestConfig(async ({ locale }) => {
  return {
    messages: messages[locale as keyof typeof messages] as any
  };
});

export default configHandler;