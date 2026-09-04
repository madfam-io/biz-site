import { describe, it, expect, vi, afterEach } from 'vitest';
import { useTranslations } from 'next-intl';
import { messages } from '@madfam-site/i18n';

import { Footer } from '@/components/Footer';
import { render, screen } from '../providers';

/**
 * These two tests exist because the previous test fixture was 203 hand-kept
 * inline message lines. It drifted from the shipped bundle, and the drift was
 * invisible: `Footer.tsx` resolved `footer.ecosystem.valueLadder`, the fixture
 * did not define it, and next-intl logged `MISSING_MESSAGE` while the suite
 * stayed green.
 */

function Probe() {
  const t = useTranslations('footer.ecosystem');
  return <span data-testid="probe">{t('valueLadder')}</span>;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('test providers', () => {
  it('uses the shipped message bundle, not a hand-kept fixture', () => {
    render(<Probe />, { locale: 'en' });

    const expected = (messages.en as Record<string, any>).footer.ecosystem.valueLadder;
    expect(expected).toBeTruthy();
    expect(screen.getByTestId('probe').textContent).toBe(expected);
    expect(screen.getByTestId('probe').textContent).not.toContain('MISSING_MESSAGE');
  });

  it('emits no MISSING_MESSAGE while rendering the Footer', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Footer />, { locale: 'en' });

    const offending = errorSpy.mock.calls
      .flat()
      .map(arg => (arg instanceof Error ? arg.message : String(arg)))
      .filter(text => text.includes('MISSING_MESSAGE'));

    expect(offending).toEqual([]);
  });
});
