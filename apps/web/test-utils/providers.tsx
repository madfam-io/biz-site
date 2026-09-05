import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render as rtlRender, type RenderResult } from '@testing-library/react';
import { messages } from '@madfam-site/i18n';

/**
 * Test providers.
 *
 * The message set is the app's own shipped bundle (`apps/web/i18n.config.ts`
 * reads the same export), NOT a hand-kept fixture. A hand-kept copy drifts:
 * before this change it was 203 inline lines that omitted, among others,
 * `footer.ecosystem.valueLadder`, so `Footer.tsx` emitted a runtime
 * `MISSING_MESSAGE` inside a green suite. Any key the app can resolve at
 * runtime resolves here too, by construction.
 */

type TestLocale = 'en' | 'es' | 'pt';

interface WrapperProps {
  children: React.ReactNode;
  locale?: TestLocale;
}

function AllTheProviders({ children, locale = 'es' }: WrapperProps) {
  return (
    <NextIntlClientProvider messages={messages[locale]} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    locale = 'es',
    ...renderOptions
  }: { locale?: TestLocale } & Parameters<typeof rtlRender>[1] = {}
): RenderResult {
  return rtlRender(ui, {
    wrapper: ({ children }) => <AllTheProviders locale={locale}>{children}</AllTheProviders>,
    ...renderOptions,
  });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
