// Config
export * from './config';

// Translation imports
import esMessages from './translations/es-MX.json';
import enMessages from './translations/en-US.json';

export const messages = {
  'es-MX': esMessages,
  'en-US': enMessages,
} as const;