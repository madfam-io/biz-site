import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { DEFAULT_PLAUSIBLE_HOST, PLAUSIBLE_DOMAIN, PLAUSIBLE_HOST } from '../plausible';

describe('Plausible configuration', () => {
  it('defaults to the self-hosted instance, never Plausible Cloud', () => {
    expect(DEFAULT_PLAUSIBLE_HOST).toBe('https://plausible.madfam.io');
    expect(PLAUSIBLE_HOST).toBe('https://plausible.madfam.io');
    expect(PLAUSIBLE_HOST).not.toContain('plausible.io/');
    expect(new URL(PLAUSIBLE_HOST).hostname).not.toBe('plausible.io');
  });

  it('reports no domain when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is unset', () => {
    // Guards the reconciliation of lib/environment.ts: a fabricated 'madfam.io'
    // default reported analytics as configured on builds where it was inert.
    expect(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN).toBeUndefined();
    expect(PLAUSIBLE_DOMAIN).toBeUndefined();
  });

  it('never hardcodes Plausible Cloud in the CSP or the beacon endpoint', () => {
    const csp = readFileSync(join(__dirname, '..', '..', 'middleware.ts'), 'utf8');
    const beacon = readFileSync(
      join(__dirname, '..', '..', '..', '..', 'packages', 'analytics', 'src', 'index.ts'),
      'utf8'
    );
    expect(csp).not.toContain('https://plausible.io');
    expect(beacon).not.toContain('https://plausible.io/');
    expect(csp).toContain('${PLAUSIBLE_HOST}');
  });
});
