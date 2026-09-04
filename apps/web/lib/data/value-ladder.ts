// ─── Value Ladder Data Registry ──────────────────────────────────────────────
// Single source of truth for the public value ladder front door.
//
// Derived from the strategy of record:
//   internal-devops/docs/strategy/2026-08-29-madfam-value-ladder-and-self-selection.md
//   (§2 the four bands + doctrine, §3 the self-selector, §4 benchmarked prices)
//
// Boundary note: that path is in the PRIVATE internal-devops repo and is cited by
// name only. Never copy its pricing rationale, cost bands or client detail here.
// Policy: internal-devops/docs/repo-boundary-contract.md
//
// The ladder is the catalog, arranged: four ascending BANDS, each holding one or
// more RUNGS (a SKU-tier or a slice). Copy for every user-visible string lives in
// the `valueLadder` i18n namespace (es/en/pt); this module holds only the
// structure, the (load-bearing, real) prices, and the self-selector mapping.

import { PLATFORMS, type Platform } from './platforms';

export type BandId = 'slice' | 'bundle' | 'erp' | 'vcto';

/** How a rung is entered/purchased — drives which CTA is shown. */
export type LadderMotion = 'self-serve' | 'discovery-call';

/**
 * A price for a rung. `kind`:
 *   - 'fixed'   : a real, benchmarked MXN price (from Tulana #70). `amount` is
 *                 the number; `unit` is the i18n key suffix (per seat/mo, /mo).
 *   - 'tbd'     : not yet priced (Band-2 bundles). NEVER invent a number — the
 *                 UI shows a «desde / a la medida» label from i18n instead.
 */
export type RungPrice =
  { kind: 'fixed'; amount: number; currency: 'MXN'; unitKey: string } | { kind: 'tbd' };

export interface LadderRung {
  /** Stable id, also the i18n key suffix within `valueLadder.rungs.*`. */
  id: string;
  band: BandId;
  /** Dhanam checkout product slug (Bands 1–3). Absent → discovery-call only. */
  checkoutSlug?: string;
  price: RungPrice;
  motion: LadderMotion;
}

export interface LadderBand {
  id: BandId;
  /** 1..4 — ascending scope-of-value / price. */
  order: number;
  icon: string;
  /** Default motion for the band (a rung may override via its own `motion`). */
  motion: LadderMotion;
}

// ─── The four bands ──────────────────────────────────────────────────────────

export const BANDS: LadderBand[] = [
  { id: 'slice', order: 1, icon: '🧩', motion: 'self-serve' },
  { id: 'bundle', order: 2, icon: '🎁', motion: 'self-serve' },
  { id: 'erp', order: 3, icon: '🏢', motion: 'self-serve' },
  { id: 'vcto', order: 4, icon: '🧭', motion: 'discovery-call' },
];

export function getBand(id: BandId): LadderBand {
  const band = BANDS.find(b => b.id === id);
  if (!band) throw new Error(`Unknown band: ${id}`);
  return band;
}

/** Bands ordered top-of-ladder first (vCTO → slice) for a "climb up" render. */
export const BANDS_DESC: LadderBand[] = [...BANDS].sort((a, b) => b.order - a.order);

// ─── Band 3 (Nauta ERP) + Band 4 (Nauta vCTO) rungs ──────────────────────────
// Prices are REAL and benchmarked (Tulana #70, dry-run @ FX 17.0 MXN/USD).
// Do not change without a corresponding Tulana price change — they are the
// public face of the price book.

export const ERP_RUNGS: LadderRung[] = [
  {
    id: 'erp-self-serve',
    band: 'erp',
    checkoutSlug: 'nauta-erp',
    price: { kind: 'fixed', amount: 144, currency: 'MXN', unitKey: 'perSeatMonth' },
    motion: 'self-serve',
  },
  {
    id: 'erp-team',
    band: 'erp',
    checkoutSlug: 'nauta-erp',
    price: { kind: 'fixed', amount: 181, currency: 'MXN', unitKey: 'perSeatMonth' },
    motion: 'self-serve',
  },
  {
    id: 'erp-biz',
    band: 'erp',
    checkoutSlug: 'nauta-erp',
    price: { kind: 'fixed', amount: 405, currency: 'MXN', unitKey: 'perSeatMonth' },
    motion: 'self-serve',
  },
];

export const VCTO_RUNGS: LadderRung[] = [
  {
    id: 'vcto-esencial',
    band: 'vcto',
    // Band 4 is advisor-led by nature (needs scope) — no self-serve checkout (D-4).
    price: { kind: 'fixed', amount: 8000, currency: 'MXN', unitKey: 'perMonth' },
    motion: 'discovery-call',
  },
  {
    id: 'vcto-ecosistema',
    band: 'vcto',
    price: { kind: 'fixed', amount: 16000, currency: 'MXN', unitKey: 'perMonth' },
    motion: 'discovery-call',
  },
  {
    id: 'vcto-escala',
    band: 'vcto',
    price: { kind: 'fixed', amount: 45000, currency: 'MXN', unitKey: 'perMonth' },
    motion: 'discovery-call',
  },
];

// ─── Band 2 (curated bundles) ────────────────────────────────────────────────
// Bundles are NOT YET PRICED (composed in Tulana's GtmBundleScenario). Price is
// 'tbd' — the UI renders «desde / a la medida», never a fabricated number.
// The launch anchor set (strategy §D-2): "MX Fiscal" and "Design→Sell".

export interface LadderBundle {
  /** i18n key suffix within `valueLadder.bundles.*`. */
  id: string;
  /** Slugs of the platform slices this bundle composes. */
  slices: string[];
  checkoutSlug: string;
  price: RungPrice;
}

export const BUNDLES: LadderBundle[] = [
  {
    id: 'mx-fiscal',
    slices: ['karafiel', 'tezca'],
    checkoutSlug: 'bundle-mx-fiscal',
    price: { kind: 'tbd' },
  },
  {
    id: 'design-to-sell',
    slices: ['yantra4d', 'forge-sight', 'cotiza-studio'],
    checkoutSlug: 'bundle-design-to-sell',
    price: { kind: 'tbd' },
  },
];

// ─── Band 1 (single slices) ──────────────────────────────────────────────────
// The client-facing slice set, matching the Nauta ERP hub's catalog. Slugs use
// the platforms registry (single source of truth); the ordering below is the
// public "what you can buy self-serve" reading order. crea-map, kalya, symbiosis
// are ecosystem platforms sold self-serve but not (yet) in the site's PLATFORMS
// registry — they are represented as slugs so the ladder narrates the full
// client-facing catalog, with copy in i18n and CTA to Dhanam checkout.

/** Slices that ARE in the PLATFORMS registry (get an icon + detail affordances). */
const REGISTRY_SLICE_SLUGS = [
  'dhanam',
  'karafiel',
  'tezca',
  'forge-sight',
  'cotiza-studio',
  'voxa',
  'yantra4d',
] as const;

/**
 * Client-facing slices sold self-serve at Band 1 that do NOT (yet) have a
 * PLATFORMS registry entry on this site. They still belong on the ladder (the
 * Nauta ERP hub entitles them), so the ladder narrates the full catalog.
 */
export interface ExtraSlice {
  /** i18n key suffix within `valueLadder.slices.extra.*`. */
  id: string;
  slug: string;
  icon: string;
  checkoutSlug: string;
}

export const EXTRA_SLICES: ExtraSlice[] = [
  { id: 'crea-map', slug: 'crea-map', icon: '🗺️', checkoutSlug: 'crea-map' },
  { id: 'kalya', slug: 'kalya', icon: '📅', checkoutSlug: 'kalya' },
  { id: 'selva', slug: 'selva', icon: '🌳', checkoutSlug: 'selva' },
  { id: 'symbiosis', slug: 'symbiosis', icon: '🧬', checkoutSlug: 'symbiosis' },
  { id: 'acervo', slug: 'acervo', icon: '📚', checkoutSlug: 'acervo' },
];

/** Platform slices resolved from the registry, in the public reading order. */
export function getRegistrySlices(): Platform[] {
  return REGISTRY_SLICE_SLUGS.map(slug => PLATFORMS.find(p => p.slug === slug)).filter(
    (p): p is Platform => Boolean(p)
  );
}

// ─── CTA targets ─────────────────────────────────────────────────────────────

/** Dhanam self-serve checkout (Bands 1–3), tagged with the ladder source. */
export function dhanamCheckoutUrl(productSlug: string): string {
  const url = new URL('https://dhan.am/pricing');
  url.searchParams.set('product', productSlug);
  url.searchParams.set('source', 'ladder');
  return url.toString();
}

// Kalya discovery-call booking (Band 4, or anyone who wants help). Canonical
// host is kalya.app. TODO(handle): confirm the MADFAM booking handle — the site
// has no existing "book a call" CTA to reuse, so `/madfam` is a placeholder
// pending the real Kalya event-type slug for the discovery call.
export const KALYA_DISCOVERY_CALL_URL = 'https://kalya.app/madfam';

// ─── Self-selector ("Encuentra tu escalón") ─────────────────────────────────
// Mirrors the AssessmentClient pattern: question ids + scored/mapped options →
// a recommendation. Two questions map a visitor to a band + a candidate SKU set;
// a size question sizes the tier within the recommended band.
//
// Honesty rule (strategy §3.4): recommend the SMALLEST rung that does the job;
// the rung above is shown as an option, never a default.

export type NeedId = 'invoices' | 'bookings' | 'money' | 'design-to-sell' | 'unify' | 'run-for-me';

export type SizeId = 'solo' | 'team' | 'biz';

/** Each "need" answer maps to a band and a candidate SKU/slice set. */
export interface NeedOption {
  id: NeedId;
  band: BandId;
  /** Candidate slice/bundle/SKU slugs surfaced with the recommendation. */
  candidates: string[];
}

export const NEED_OPTIONS: NeedOption[] = [
  { id: 'invoices', band: 'slice', candidates: ['karafiel'] },
  { id: 'bookings', band: 'slice', candidates: ['kalya'] },
  { id: 'money', band: 'slice', candidates: ['dhanam'] },
  {
    id: 'design-to-sell',
    band: 'bundle',
    candidates: ['bundle-design-to-sell'],
  },
  { id: 'unify', band: 'erp', candidates: ['nauta-erp'] },
  { id: 'run-for-me', band: 'vcto', candidates: ['nauta-vcto'] },
];

export const SIZE_OPTIONS: SizeId[] = ['solo', 'team', 'biz'];

export interface LadderRecommendation {
  band: BandId;
  /** The recommended rung id (smallest that does the job), when determinable. */
  rungId?: string;
  /** The candidate slugs to surface (slice / bundle / SKU). */
  candidates: string[];
  /** The rung above, offered as an option (never a default). */
  upsellBand?: BandId;
  price: RungPrice;
  motion: LadderMotion;
  /** Dhanam checkout slug for the primary self-serve CTA, when applicable. */
  checkoutSlug?: string;
}

/**
 * The self-selector engine. Given a need + a size, return the smallest rung that
 * does the job, its price and motion, the CTA target, and the (optional) rung
 * above as an upsell. Pure + deterministic so it can be unit-tested and run
 * client-side with no network.
 */
export function recommendRung(need: NeedId, size: SizeId): LadderRecommendation {
  const option = NEED_OPTIONS.find(o => o.id === need);
  if (!option) {
    throw new Error(`Unknown need: ${need}`);
  }
  const { band } = option;

  // Band 4 (vCTO) — advisor-led, size selects the vCTO tier.
  if (band === 'vcto') {
    const rung =
      size === 'biz'
        ? VCTO_RUNGS.find(r => r.id === 'vcto-escala')
        : size === 'team'
          ? VCTO_RUNGS.find(r => r.id === 'vcto-ecosistema')
          : VCTO_RUNGS.find(r => r.id === 'vcto-esencial');
    return {
      band,
      rungId: rung?.id,
      candidates: option.candidates,
      price: rung?.price ?? { kind: 'tbd' },
      motion: 'discovery-call',
    };
  }

  // Band 3 (ERP) — size selects the ERP tier. Upsell = vCTO (run it for me).
  if (band === 'erp') {
    const rung =
      size === 'biz'
        ? ERP_RUNGS.find(r => r.id === 'erp-biz')
        : size === 'team'
          ? ERP_RUNGS.find(r => r.id === 'erp-team')
          : ERP_RUNGS.find(r => r.id === 'erp-self-serve');
    return {
      band,
      rungId: rung?.id,
      candidates: option.candidates,
      upsellBand: 'vcto',
      price: rung?.price ?? { kind: 'tbd' },
      motion: 'self-serve',
      checkoutSlug: rung?.checkoutSlug,
    };
  }

  // Band 2 (bundle) — unpriced. Larger size hints the ERP as the upsell.
  if (band === 'bundle') {
    return {
      band,
      candidates: option.candidates,
      upsellBand: 'erp',
      price: { kind: 'tbd' },
      motion: 'self-serve',
      checkoutSlug: option.candidates[0],
    };
  }

  // Band 1 (slice) — smallest rung. A team/biz-sized buyer is offered the bundle
  // (for design-to-sell needs) or the ERP as the natural next rung.
  return {
    band: 'slice',
    candidates: option.candidates,
    upsellBand: size === 'solo' ? 'bundle' : 'erp',
    // Slice prices are per-product (Tulana, 49/85) and live on the product's own
    // page — the ladder does not hardcode them, so 'tbd' here routes the visitor
    // to the product/checkout rather than showing a fabricated slice price.
    price: { kind: 'tbd' },
    motion: 'self-serve',
    checkoutSlug: option.candidates[0],
  };
}
