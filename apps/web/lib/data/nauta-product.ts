// ─── Nauta Product Data Registry ─────────────────────────────────────────────
// Single source of truth for the standalone Nauta product front door (nauta.quest).
//
// Nauta is one product family with two rungs:
//   • Nauta ERP  — the entitled-services hub. One login gathers every MADFAM
//                  service a business is entitled to, into one operations cockpit.
//                  Self-serve, per-seat. (Bands: self-serve / team / business.)
//   • Nauta vCTO — the fractional-CTO product on top. Advisor-led; a technical
//                  operator runs the stack for you. (Tiers: esencial / ecosistema
//                  / escala.)
//
// This module deliberately REUSES the priced rungs, the catalog, and the CTA
// builders from the value-ladder registry (the price book of record, sourced from
// Tulana #70) so the two public surfaces never drift. It adds only the
// Nauta-product framing: the value pillars, the salida-digna promise, and the
// reading order of the two rungs.
//
// Copy for every user-visible string lives in the `nauta` i18n namespace
// (es/en/pt); this module holds only structure + the (real) prices via re-export.

import {
  ERP_RUNGS,
  VCTO_RUNGS,
  EXTRA_SLICES,
  getRegistrySlices,
  dhanamCheckoutUrl,
  KALYA_DISCOVERY_CALL_URL,
  type LadderRung,
  type RungPrice,
  type ExtraSlice,
} from './value-ladder';
import { type Platform } from './platforms';

// Re-export the load-bearing pieces the page needs, so the page imports one
// module and the coupling to the price book stays explicit and in one place.
export {
  ERP_RUNGS,
  VCTO_RUNGS,
  EXTRA_SLICES,
  getRegistrySlices,
  dhanamCheckoutUrl,
  KALYA_DISCOVERY_CALL_URL,
};
export type { LadderRung, RungPrice, ExtraSlice, Platform };

/** The Dhanam self-serve checkout slug for Nauta ERP (Tulana `nauta-erp`). */
export const NAUTA_ERP_CHECKOUT_SLUG = 'nauta-erp';

/** Direct self-serve checkout for Nauta ERP, tagged with the nauta.quest source. */
export function nautaErpCheckoutUrl(): string {
  const url = new URL('https://dhan.am/pricing');
  url.searchParams.set('product', NAUTA_ERP_CHECKOUT_SLUG);
  url.searchParams.set('source', 'nauta');
  return url.toString();
}

// ─── The two product rungs, in reading order ─────────────────────────────────

export type NautaRungId = 'erp' | 'vcto';

export interface NautaRung {
  id: NautaRungId;
  /** 1 = ERP (base), 2 = vCTO (top). */
  order: number;
  icon: string;
  /** The priced tiers within this rung (from the value-ladder price book). */
  tiers: LadderRung[];
  /** 'self-serve' (ERP) drives a Dhanam CTA; 'discovery-call' (vCTO) drives Kalya. */
  motion: 'self-serve' | 'discovery-call';
}

export const NAUTA_RUNGS: NautaRung[] = [
  { id: 'erp', order: 1, icon: '🏢', tiers: ERP_RUNGS, motion: 'self-serve' },
  { id: 'vcto', order: 2, icon: '🧭', tiers: VCTO_RUNGS, motion: 'discovery-call' },
];

// ─── Value pillars (the "why Nauta" grid) ────────────────────────────────────
// Each pillar is an i18n key suffix within `nauta.pillars.*`. Order is the
// render order on the page.

export const NAUTA_PILLARS = [
  'oneLogin', // one identity across every entitled service
  'salidaDigna', // yours to keep — leaving vCTO never takes the ERP away
  'fiscalNative', // MX-native fiscal/compliance built in, not bolted on
  'vctoOnTap', // a fractional CTO to run it, only when you want one
] as const;

export type NautaPillar = (typeof NAUTA_PILLARS)[number];

// ─── The catalog Nauta unifies ───────────────────────────────────────────────
// The client-facing service set the ERP hub gathers under one login. Sourced
// from the value-ladder registry so the landing narrates exactly the catalog the
// hub entitles. Registry slices carry their own icon + name; extra slices carry
// an i18n label under `nauta.catalog.extra.*` (mirrors the value-ladder shape).

export function getNautaCatalogRegistrySlices(): Platform[] {
  return getRegistrySlices();
}

export function getNautaCatalogExtraSlices(): ExtraSlice[] {
  return EXTRA_SLICES;
}
