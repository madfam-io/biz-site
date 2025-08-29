// Config
export * from './config';

// Utils
export * from './utils/translations';
export * from './utils/routes';

// Hooks
export * from './hooks/useTypedTranslations';

// Translation imports - Now using modular structure
import esMessages from './translations/es';
import enMessages from './translations/en';
import ptMessages from './translations/pt';

export const messages = {
  es: esMessages,
  en: enMessages,
  pt: ptMessages,
} as const;
