// Config
export * from './config';

// Utils
export * from './utils/translations';
export * from './utils/routes';

// Hooks
export * from './hooks/useTypedTranslations';

// Translation imports
import esMessages from './translations/es.json';
import enMessages from './translations/en.json';
import ptMessages from './translations/pt-br.json';

export const messages = {
  es: esMessages,
  en: enMessages,
  'pt-br': ptMessages,
} as const;
