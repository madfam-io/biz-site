# Madfam Site Agent Operating Guide

> [!IMPORTANT]
> Routine production operations must use Enclii web, API, or CLI. Treat raw
> `kubectl`, `helm`, SSH, provider CLI/API, `docker exec`, and direct container
> access as platform bootstrap or documented break-glass only, and record any
> missing Enclii adapter gap.

<!-- MADFAM-AGENTS-CANONICAL v1 -->

> Last Updated: 2026-09-05

This is the canonical instruction file for Claude, Codex, and any other LLM
agent working in this repository. `CLAUDE.md` is kept only as a compatibility
redirect and should not become the source of truth again.

## Required operating doctrine

- Read this file before making repo changes.
- Prefer existing repo conventions, scripts, and docs over introducing new
  patterns.
- Preserve user work and never revert unrelated changes.
- Treat production operations as Enclii-first: use Enclii web, API, or CLI for
  provisioning, deployment, observability, domains, secrets, provider
  operations, scaling, rollback, and remediation.
- Use direct `kubectl`, `helm`, SSH, provider CLIs/APIs, `docker exec`, or
  direct container access only for platform bootstrap or documented break-glass
  emergencies when Enclii is unavailable or lacks an implemented adapter.
- Record any missing Enclii adapter gap instead of normalizing raw production
  access in docs or runbooks.
- Keep environment examples placeholder-only. Do not add live credentials,
  base64-encoded secrets, token-shaped examples, or production webhook URLs to
  docs, templates, workflow logs, issues, PRs, or LLM chat.

## Repo entrypoints

- `README.md`
- `ECOSYSTEM.md`
- `docs/`
- `infra/`
- `.github/workflows/`

## LLM context files

- `llms.txt` is the compact context index.
- `llms-full.txt` is the durable full-context map and operating contract.
- `AGENTS.md` is canonical for agent instructions.
- `CLAUDE.md` redirects here for Claude compatibility.

## Repo-boundary contract

> Boundary checkpoint (2026-09-04, madfam-site): this section states lane
> membership and the banned classes by name. It contains no values, no
> identities and no operational detail. Policy:
> `internal-devops/docs/repo-boundary-contract.md`.

- `internal-devops` is the private canonical source for production topology,
  node identity, capacity, costs, secrets, incident evidence, client
  engagements, and operational runbooks. It is **Lane A**.
- `solarpunk-foundry` is the designated **public ecosystem contract repo**
  (Lane B), and is **permanently public** by owner statement (2026-09-04). The
  canonical cross-repo ecosystem map lives there, not here.
- **This repo is Lane C: the public corporate site.** Its job is marketing
  surface, public product copy, and the code that renders them. Keep sensitive
  operational, pricing, client and audit context out.
- Use redacted summaries and canonical links when cross-referencing private
  context. Never copy Vault paths, secret names with retrieval detail, or raw
  break-glass `kubectl`/SSH procedures into this repo.
- If uncertain, place the detail in `internal-devops` and keep a short pointer
  here.
- Any public doc carrying ecosystem context must include one short boundary note
  with a canonical link target.

**Never publish from this repo:** node hostnames, any public IP, hardware model
numbers or capacity figures, the Cloudflare tunnel identifier, cost ledgers,
internal hourly rates, revenue or ROI projections, Vault paths or secret names
with retrieval detail, incident diagnoses and evidence trails, client identities
or engagement detail, operator local paths.

**Already public and stays public:** the topology _shape_ — a 4-node bare-metal
k3s cluster (one control plane, one worker, two CI builders), ingress through a
single Cloudflare Tunnel with zero exposed node ports, Longhorn CSI block
storage, Cloudflare R2 object storage, ArgoCD GitOps with self-heal.

The public checklist is [`docs/PUBLIC_REPO_BOUNDARY.md`](docs/PUBLIC_REPO_BOUNDARY.md).
Two CI guards enforce part of it — `scripts/public-hygiene-check.sh` and
`scripts/boundary-checkpoint-check.sh`, both run by
`.github/workflows/public-hygiene.yml`. Read their `classes_skipped=` and
`source=` lines: a green run is not proof a change is boundary-clean, and the
node-identity class is deliberately not expressed in a public script.

## Maintenance

Regenerate or repair these files with
`internal-devops/scripts/sync-agent-docs.py` from the labspace ecosystem.

---

## Legacy CLAUDE.md guidance imported on 2026-05-13

<!-- BEGIN LEGACY_CLAUDE_IMPORT -->

# CLAUDE.md - AI Assistant Context for MADFAM Codebase

This document provides essential context for AI assistants working on the MADFAM corporate website.

## Quick Start

```bash
# Development
pnpm install
pnpm dev

# Build
pnpm build

# Test
pnpm test
pnpm typecheck
```

## Project Overview

**Company**: MADFAM - AI consultancy and product studio  
**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Turborepo
**Architecture**: Monorepo with shared packages  
**Languages**: Spanish (es), English (en), Portuguese (pt)

## Repository Structure

```
madfam-site/
├── apps/
│   ├── web/           # Main Next.js website
│   └── cms/           # Payload CMS (optional)
├── packages/
│   ├── ui/            # Themes/tokens only. UI components are app-owned:
│   │                  # solarpunk-foundry/docs/architecture/SELF_CONTAINED_SERVICES.md
│   │                  # (2026-07-25) rules theming and UI per-app, contracts shared.
│   ├── core/          # Business logic, feature flags, logger
│   ├── i18n/          # Translations (es, en, pt)
│   ├── analytics/     # Tracking (Plausible integration)
│   └── email/         # Email templates and Resend sender
├── docs/              # All documentation
├── README.md          # Project README
├── AGENTS.md          # This file — canonical for agents
└── CLAUDE.md          # Compatibility redirect to AGENTS.md
```

## Business Context

### Ecosystem Structure

MADFAM is a solarpunk ecosystem of open platforms for creators, makers, and entrepreneurs in LATAM. Three conversion paths:

1. **Use a MADFAM Platform** — the digital platforms (each with Free + Pro tiers).
   The catalog is **generated**, not hand-kept: `apps/web/lib/data/platforms.generated.ts`
   is derived from the vendored ecosystem registry projection
   (`apps/web/lib/data/projection.public.json`), and
   `apps/web/lib/data/platforms.ts` merges it with the hand-kept presentation
   overlay. Count the catalog there rather than restating a number anywhere —
   including here. The lists below are illustrative, not exhaustive, and a
   product that is not in the registry does not render on the site at all.
2. **Use Primavera Maker Node** — Physical fabrication (3D printing, CNC, laser cutting)
3. **Become an Ecosystem Member** — One membership unlocks Pro across all platforms + discounted fabrication

### Digital Platforms (by MADFAM)

Self-serve flagships (public sign-up, pricing, free tier or trial):

- **Karafiel** (https://karafiel.mx): Mexican CFDI / RFC / SAT compliance
- **Dhanam** (https://dhan.am): Financial wellness + ecosystem billing backbone
- **Forgesight** (https://forgesight.quest): Digital fabrication pricing intelligence
- **Tezca** (https://tezca.mx): Mexican regulatory intelligence
- **Fortuna** (https://fortuna.tube): Problem intelligence / NBI scoring API
- **Rondelio** (https://rondel.io): Game intelligence cloud (TCG / tabletop)

Platform / infrastructure (B2B, white-glove default):

- **Enclii** (https://enclii.dev): Sovereign cloud PaaS on bare-metal K8s
- **Janua** (https://janua.dev): Self-hosted identity platform
- **Selva** (https://selva.town): Autonomous agent platform (240+ tools, A2A protocol)

Ecosystem services (consumed by other platforms):

- **Cotiza**: Automated quoting and estimation
- **Yantra4D**: Parametric design platform
- **Pravara MES**: Manufacturing execution system
- **Avala** (https://avala.studio): Competency-based training

**Retired — never render on the site:** PENNY is absorbed by **Selva**
(https://selva.town). Where a successor mention reads naturally, say Selva;
otherwise delete. SPARK and Primavera3D are likewise retired brands.

### Solutions

- **Primavera Maker Node**: Physical fabrication hub (3D printing, CNC, laser cutting)
- **MADFAM Co-Labs**: Collaborations & co-creations (a MADFAM Company)
- **Showtech**: Technology showcase & events (Coming Soon)

### Programs

- **Design & Fabrication** — End-to-end design and digital fabrication
- **Launch Program** — Strategic consulting for startups entering the ecosystem
- **Scale Program** — Platform integration and workflow automation for growing projects
- **Partner Program** — Technology partnerships for organizations embedding MADFAM tech

## Critical Rules

### File Management

- **NEVER** create files unless absolutely necessary
- **ALWAYS** prefer editing existing files
- **NEVER** create documentation proactively (only on request)

### Routing

- All routes are internationalized with `[locale]` prefix
- Use `getLocalizedUrl()` helper for navigation
- Middleware handles locale detection and routing

### Branding

- Products/Platforms: "by MADFAM"
- Co-Labs / Showtech: "a MADFAM Company"
- No references to the retired SPARK or Primavera3D brands
- "Innovaciones MADFAM S.A.S. de C.V." is the **legal entity** and is not a
  retired brand: it belongs on legal and footer surfaces
- Maker Node is "Primavera Maker Node" (formerly Primavera3D)

### Mobile Optimization

- Touch targets: 44px minimum, 48px recommended
- Use MobileButton and MobileInput components
- Font size 16px minimum for inputs (prevents iOS zoom)

## Key Data Files

- **Platform Registry (generated)**: `apps/web/lib/data/platforms.generated.ts` — every product FACT (name, icon, category, layer, track, status, product URL, GitHub URL, licence, order), generated from `apps/web/lib/data/projection.public.json` by `pnpm generate:platforms`. Never edit either by hand: `pnpm test:scripts` verifies the projection's SHA-256 against the stamp in the generated file, and re-derives every output.
- **Platform Presentation Overlay (hand-kept)**: `apps/web/lib/data/platforms.presentation.ts` — accent palette, feature count, detail-page existence, ecosystem relationships, CTA shape. Presentation only; a product fact typed here is a CI failure. Adding a slug here is how a registry product gets surfaced — it must exist in the registry and must not be retired.
- **Platform Catalog (merged)**: `apps/web/lib/data/platforms.ts` — merges the two at import time into `PLATFORMS`. Used by platform detail pages, homepage, products page, navbar, footer, search index, sitemap.
- **Registry i18n bundle (generated)**: `packages/i18n/src/translations/{en,es,pt}/platforms.registry.json` — registry names and licences as an i18n namespace (`platformsRegistry`). Identical in all three locales by construction; display names are brand marks and are not translated.
- **Platform Translations**: `packages/i18n/src/translations/{en,es,pt}/platforms.json` — ~290 keys per locale with taglines, value props, features, CTAs, comparison tables, tech specs.
- **Platform Detail Pages**: `apps/web/app/[locale]/platforms/[slug]/page.tsx` — dynamic route with `generateStaticParams` over every slug in `platforms.ts`.
- **Integration Flow**: Design (Yantra4D) → Quote (Cotiza) → Price (Forgesight) → Finance (Dhanam) → Manufacture (Pravara MES) → Comply (Tezca/Avala)

## Common Tasks

### Add New Page

```tsx
// apps/web/app/[locale]/new-page/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function NewPage() {
  const t = await getTranslations('newPage');
  return <main>{t('title')}</main>;
}
```

### Create Component

```tsx
// apps/web/components/NewComponent.tsx
import { cn } from '@/components/ui/utils';

interface NewComponentProps {
  className?: string;
}

export function NewComponent({ className }: NewComponentProps) {
  return <div className={cn('base-styles', className)} />;
}
```

### Add Translation

```json
// packages/i18n/src/translations/[locale]/newPage.json
{
  "title": "Page Title",
  "description": "Page description"
}
```

## Code Standards

### TypeScript

- Strict mode enabled
- Explicit return types for functions
- Interfaces for component props

### Styling

- Tailwind CSS only (no inline styles)
- Mobile-first responsive design
- Use design tokens from the `@theme` block in `apps/web/app/globals.css`.
  **Not `tailwind.config.ts`** — Tailwind v4 never reads it (no `@config`
  directive exists), so anything added there silently emits nothing.

### Git Commits

- Conventional commits format
- Pre-commit hooks run linting
- Auto-generated commit signature

## Environment Variables

Required:

```env
NEXT_PUBLIC_ENV=development|staging|production
DATABASE_URL=
```

Optional (services activate when configured):

```env
REDIS_URL=                        # Multi-pod rate limiting & CMS cache
SENTRY_DSN=                       # Server-side error tracking
NEXT_PUBLIC_SENTRY_DSN=           # Client-side error tracking
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=     # Plausible analytics
RESEND_API_KEY=                   # Email sending via Resend
RESEND_FROM_EMAIL=                # Sender address (default: hello@madfam.io)
CMS_WEBHOOK_SECRET=               # CMS cache invalidation webhook auth
N8N_WEBHOOK_URL=                  # n8n workflow automation
```

## Testing & Quality

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

## Deployment

- **Development**: `pnpm dev`
- **Staging**: Push to staging branch
- **Production**: push to `main` → CI builds → GHCR → digest commit into
  `k8s/production` → ArgoCD syncs. **Enclii is the only deployment path.** MADFAM
  migrated completely off Vercel (owner confirmation, 2026-09-04); the Vercel
  configuration was deleted from this repo on that date.

## Performance Guidelines

1. Lazy load below-fold content
2. Optimize images with next/image
3. Use dynamic imports for heavy components
4. Keep bundle under 200KB per route
5. Implement proper loading states

## Security

- Nonce-based CSP with `strict-dynamic` for script-src
- Input validation with Zod
- Redis-backed rate limiting (falls back to in-memory)
- Sentry error tracking (guarded by env var)
- No secrets in code
- Sanitize user content
- Use environment variables

## Debugging Tips

### Common Issues

- **Build errors**: Run `pnpm clean && pnpm install`
- **Type errors**: Check `pnpm typecheck`
- **Import errors**: Verify package exports
- **Style issues**: Check `apps/web/app/globals.css` — the `@theme` block for
  tokens, the `@plugin` lines for plugins. `tailwind.config.ts` is inert under
  v4 and is the wrong file to debug in; a utility that emits no CSS is usually
  one that only exists there.

### Useful Commands

```bash
pnpm clean           # Clean all caches
pnpm build           # Build all packages
pnpm dev             # Start dev server
```

## AI Assistant Notes

When working on this codebase:

1. Follow existing patterns
2. Maintain consistency
3. Consider all 3 languages
4. Test mobile responsiveness
5. Validate with TypeScript
6. Keep responses concise
7. Use TodoWrite for task tracking

## Documentation Index

All detailed documentation is in `/docs/`:

- Architecture details: `docs/development/ARCHITECTURE.md`
- API documentation: `docs/API.md`
- Testing guide: `docs/TESTING.md`
- Deployment guide: `docs/deployment/DEPLOYMENT.md`
- Brand guidelines: `docs/guides/brand/BRAND_IMPLEMENTATION_GUIDE.md`
- Mobile guide: `docs/guides/MOBILE_OPTIMIZATION_GUIDE.md`
- Public/private boundary: `docs/PUBLIC_REPO_BOUNDARY.md`

## Infrastructure

- **K8s**: HPA with 2-5 replicas, 70% CPU target
- **Rate limiting**: Redis-backed (multi-pod safe) with in-memory fallback
- **CMS cache**: Write-through Redis cache with webhook invalidation
- **Search**: Server-side search API at `/api/search`
- **Analytics**: Plausible via `sendBeacon` (no cookie consent needed)
- **Email**: Resend integration via email queue processor

---

**Maintained by**: MADFAM Development Team. The document stamp is the ISO
`Last Updated` line in the banner at the top of this file.

<!-- END LEGACY_CLAUDE_IMPORT -->
