/**
 * Module augmentation for next-intl to properly type our messages
 * This extends the library's types to support our message structure
 */

import 'next-intl';

declare module 'next-intl' {
  /**
   * Extended AbstractIntlMessages to support arrays in our translations
   * This allows proper typing for features, deliverables, and other array-based translations
   */
  interface AbstractIntlMessages {
    [key: string]: string | AbstractIntlMessages | readonly string[] | undefined;
  }
}
