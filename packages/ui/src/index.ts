/**
 * @madfam-site/ui — app-owned UI package for madfam-site.
 *
 * This package once re-exported a shared, cross-repo UI library. It no longer
 * does, and the shared library is not coming back: the foundation ratified
 * "shared contracts and infra yes, shared UI no" on 2026-07-25, and the
 * foundry's own `@madfam/ui` was deprecated the same day.
 *
 * Sources of record:
 *   - solarpunk-foundry/packages/ui/README.md            (the deprecation)
 *   - solarpunk-foundry/docs/architecture/SELF_CONTAINED_SERVICES.md:148
 *     (per-case ruling: UI components, thin REST clients and theming are
 *     app-owned; auth, webhook envelopes, cross-service types and brand
 *     identity are shared)
 *
 * Shared *values* — brand tokens, locales, currencies, the event taxonomy —
 * still come from the foundation's `@madfam/core`. They are not in this
 * package, and `@madfam-site/core` is this site's own local package, not that
 * one.
 *
 * What this package still owns, and what apps import from it directly:
 *   - ./themes/brand-colors, ./themes/brand-bridge
 *   - hooks (useFormValidation, useLeadForm), lib/utils, types, constants
 *
 * React components live in `apps/web/components/ui`, by design.
 */

export {};
