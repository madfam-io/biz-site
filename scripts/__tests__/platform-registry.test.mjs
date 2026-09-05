// Boundary checkpoint (2026-09-05, madfam-site): these guards read the PUBLIC
// projection of the product registry only — public product names, public
// product domains, SPDX licences and public repository names. The private
// registry's own fields (operator notes, billing plan prefixes, ports,
// namespaces, per-client tenancy) are stripped upstream and never reach this
// repo. Public sink. Policy: internal-devops/docs/repo-boundary-contract.md.
//
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

import {
  GENERATED_TS_PATH,
  LOCALES,
  PROJECTION_PATH,
  deriveRegistry,
  readProjection,
  registryJsonPath,
  renderAll,
} from '../generate-platform-registry.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');

const read = path => readFileSync(path, 'utf8');
const rel = path => relative(ROOT, path);

/**
 * The site's product catalog is generated from a vendored copy of the private
 * ecosystem registry's public projection. These are the checks that make that
 * true rather than aspirational:
 *
 *   1. the vendored projection still hashes to the stamp in the generated file,
 *      so a hand-edit of either one is a red check rather than a silent claim;
 *   2. regenerating produces exactly what is committed;
 *   3. no product the registry has retired renders on any surface;
 *   4. the hand-kept presentation overlay cannot invent a product;
 *   5. every product URL the site ships is a registry domain.
 *
 * Each test prints a read-proof, so "I read nothing" and "I read everything and
 * found nothing wrong" can never produce the same output.
 */

test('the vendored projection matches the freshness stamp in the generated file', () => {
  const raw = read(PROJECTION_PATH);
  const actual = createHash('sha256').update(raw).digest('hex');

  const generated = read(GENERATED_TS_PATH);
  const stamped = /sha256: '([0-9a-f]{64})'/.exec(generated);
  assert.ok(stamped, 'platforms.generated.ts carries no sha256 stamp');

  assert.equal(
    actual,
    stamped[1],
    `${rel(PROJECTION_PATH)} has been edited by hand (or re-vendored without ` +
      'regenerating). Re-copy it from internal-devops/ecosystem/registry/ and run ' +
      'node scripts/generate-platform-registry.mjs --apply'
  );

  console.log(`  read-proof: projection_bytes=${raw.length} sha256=${actual.slice(0, 12)}`);
});

test('every generated file is what the projection generates today', () => {
  const { outputs, registry } = renderAll();

  for (const [path, expected] of outputs) {
    assert.equal(
      read(path),
      expected,
      `${rel(path)} is stale. Run: node scripts/generate-platform-registry.mjs --apply`
    );
  }

  assert.equal(outputs.length, 1 + LOCALES.length);
  console.log(
    `  read-proof: generated_files=${outputs.length} products=${registry.products.length} ` +
      `retired=${registry.retired.length}`
  );
});

test('the three locale registry bundles are identical, so parity cannot drift', () => {
  const bundles = LOCALES.map(locale => read(registryJsonPath(locale)));
  for (const bundle of bundles) assert.equal(bundle, bundles[0]);

  const keys = Object.keys(JSON.parse(bundles[0])).filter(key => !key.startsWith('$'));
  assert.ok(keys.length > 0, 'the registry bundle is empty');
  console.log(`  read-proof: locales=${LOCALES.length} products_per_locale=${keys.length}`);
});

/** Files that render, or feed, something a visitor can see. */
function renderingSurfaces() {
  const roots = [
    join(ROOT, 'apps/web/app'),
    join(ROOT, 'apps/web/components'),
    join(ROOT, 'apps/web/lib'),
    join(ROOT, 'packages/i18n/src/translations'),
  ];
  const skip = new Set(['node_modules', '.next', 'coverage', '__tests__', 'e2e', 'test-utils']);
  const files = [];

  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(ts|tsx|json)$/.test(entry.name)) {
        files.push(full);
      }
    }
  };

  for (const root of roots) if (statSync(root).isDirectory()) walk(root);
  // The vendored projection carries the tombstones on purpose — that is what
  // makes a retired brand a KNOWN retired brand instead of an unknown string.
  return files.filter(file => file !== PROJECTION_PATH && file !== GENERATED_TS_PATH);
}

test('no retired or tombstoned product renders anywhere on the site', () => {
  const registry = deriveRegistry(readProjection());
  assert.ok(registry.retired.length > 0, 'the projection carries no tombstones to check');

  const files = renderingSurfaces();
  const offences = [];

  for (const product of registry.retired) {
    // Match the brand as a word and the slug as a slug, so that a retired
    // "SPARK" cannot hide inside "sparkline" and cannot escape as "spark".
    const patterns = [
      new RegExp(`\\b${product.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
      new RegExp(`(^|[^a-z0-9])${product.slug}([^a-z0-9]|$)`, 'i'),
    ];
    for (const file of files) {
      const content = read(file);
      if (patterns.some(pattern => pattern.test(content))) {
        offences.push(`${product.name} (${product.slug}) in ${rel(file)}`);
      }
    }
  }

  assert.deepEqual(offences, [], `retired products must never render:\n  ${offences.join('\n  ')}`);
  console.log(
    `  read-proof: retired_brands=${registry.retired.length} surfaces_scanned=${files.length} ` +
      `offences=${offences.length}`
  );
});

test('the presentation overlay cannot invent, rename or resurrect a product', () => {
  const registry = deriveRegistry(readProjection());
  const known = new Map(registry.products.map(product => [product.slug, product]));
  const retired = new Set(registry.retired.map(product => product.slug));

  const overlay = read(join(ROOT, 'apps/web/lib/data/platforms.presentation.ts'));
  const body = overlay.slice(overlay.indexOf('PLATFORM_PRESENTATION'));
  const slugs = [...body.matchAll(/^ {2}'?([a-z0-9][a-z0-9-]*)'?: \{$/gm)].map(match => match[1]);

  assert.ok(slugs.length > 0, 'no overlay entries found — the parser is wrong, not the data');

  for (const slug of slugs) {
    assert.ok(known.has(slug), `overlay slug "${slug}" is in no registry product`);
    assert.ok(!retired.has(slug), `overlay slug "${slug}" is retired and must not render`);
  }

  // The overlay must carry presentation only: a product name typed here would
  // be a second source of truth for something the registry already owns.
  for (const product of known.values()) {
    assert.ok(
      !new RegExp(`'${product.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`).test(body),
      `overlay restates the registry name "${product.name}" — names come from the registry`
    );
  }

  console.log(
    `  read-proof: overlay_slugs=${slugs.length} registry_products=${known.size} ` +
      `surfaced=${slugs.length}`
  );
});

test('every product URL the site ships is a registry domain', () => {
  const projection = readProjection();
  const hosts = new Set();
  for (const product of projection.data.products) {
    const domains = product.domains ?? {};
    if (domains.primary) hosts.add(domains.primary);
    for (const host of domains.hosts ?? []) hosts.add(host);
  }

  const generated = read(GENERATED_TS_PATH);
  const urls = [...generated.matchAll(/'https:\/\/([^/']+)/g)].map(match => match[1]);
  assert.ok(urls.length > 0, 'the generated file ships no URLs — the parser is wrong');

  const unknown = urls.filter(host => host !== 'github.com' && !hosts.has(host));
  assert.deepEqual(unknown, [], `URLs on hosts the registry does not own: ${unknown.join(', ')}`);

  console.log(
    `  read-proof: urls_checked=${urls.length} registry_hosts=${hosts.size} unknown=${unknown.length}`
  );
});
