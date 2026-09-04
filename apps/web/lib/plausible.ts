/**
 * Plausible analytics configuration.
 *
 * Both values are `NEXT_PUBLIC_*`, so Next inlines them at **build** time.
 * Setting them in the runtime Secret or Deployment env has no effect — they
 * have to reach `docker build` as build-args (see `apps/web/Dockerfile` and
 * the `build-args:` block in `.github/workflows/deploy-web.yml`).
 *
 * MADFAM runs its own Plausible instance; the default host is the self-hosted
 * one, never Plausible Cloud (solarpunk-foundry/templates/env/madfam-integrations.env:17).
 */

/** Self-hosted Plausible instance. Used when NEXT_PUBLIC_PLAUSIBLE_HOST is unset. */
export const DEFAULT_PLAUSIBLE_HOST = 'https://plausible.madfam.io';

/** Origin serving the Plausible script and receiving events. */
export const PLAUSIBLE_HOST = (
  process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || DEFAULT_PLAUSIBLE_HOST
).replace(/\/+$/, '');

/**
 * Site domain registered in Plausible. Undefined means analytics is not
 * configured for this build: no script tag is injected and no events are sent.
 */
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || undefined;
