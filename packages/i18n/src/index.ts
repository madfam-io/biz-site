// Config
export * from './config';

// Utils
export * from './utils/translations';
export * from './utils/routes';

// Hooks
export * from './hooks/useTypedTranslations';

// Translation imports
import esMessages from './translations/es-MX.json';
import enMessages from './translations/en-US.json';
import ptMessages from './translations/pt-BR.json';

export const messages = {
  'es-MX': esMessages,
  'en-US': enMessages,
  'pt-BR': ptMessages,
} as const;