// Boundary checkpoint (2026-09-04, madfam-site): public repo (Lane C). This file names
// repo paths, commands and check names only; no hosts, credentials or identifiers.
// Policy: internal-devops/docs/repo-boundary-contract.md.
/**
 * Every lint-staged command must resolve to a script that exists.
 *
 * Before this test, the config ran `cd apps/cms && npm run lint` against a
 * package that defines no `lint` script and has no eslint dependency, so every
 * commit touching apps/cms died on `npm ERR! Missing script: "lint"` — and it
 * shelled `npm` inside a pnpm workspace.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const rootPkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

/** Maps a workspace package name to its directory. */
function packageDirs() {
  const dirs = new Map();
  for (const group of ['apps', 'packages']) {
    const base = path.join(repoRoot, group);
    if (!fs.existsSync(base)) continue;
    for (const entry of fs.readdirSync(base)) {
      const manifest = path.join(base, entry, 'package.json');
      if (!fs.existsSync(manifest)) continue;
      dirs.set(JSON.parse(fs.readFileSync(manifest, 'utf8')).name, path.join(base, entry));
    }
  }
  return dirs;
}

/** Resolves one lint-staged command to { manifest, script } or null when it targets a binary. */
function targetOf(command, dirs) {
  const filtered = command.match(/^pnpm\s+--filter\s+(\S+)\s+([\w:-]+)/);
  if (filtered) {
    const [, pkg, script] = filtered;
    const dir = dirs.get(pkg);
    assert.ok(dir, `lint-staged targets unknown workspace package: ${pkg}`);
    return { manifest: path.join(dir, 'package.json'), script, command };
  }

  const cded = command.match(/^cd\s+(\S+)\s+&&\s+(?:pnpm|npm)\s+(?:run\s+)?([\w:-]+)/);
  if (cded) {
    const [, dir, script] = cded;
    return { manifest: path.join(repoRoot, dir, 'package.json'), script, command };
  }

  const rootScript = command.match(/^pnpm\s+(?:run\s+)?([\w:-]+)$/);
  if (rootScript) {
    return { manifest: path.join(repoRoot, 'package.json'), script: rootScript[1], command };
  }

  return null; // a bare binary such as `prettier --write`
}

test('every lint-staged command resolves to a script that exists', () => {
  const dirs = packageDirs();
  const commands = Object.values(rootPkg['lint-staged']).flat();
  assert.ok(commands.length > 0, 'lint-staged has no commands');

  for (const command of commands) {
    const target = targetOf(command, dirs);
    if (!target) continue;

    assert.ok(fs.existsSync(target.manifest), `${command} → missing ${target.manifest}`);
    const scripts = JSON.parse(fs.readFileSync(target.manifest, 'utf8')).scripts || {};
    assert.ok(
      Object.hasOwn(scripts, target.script),
      `lint-staged runs "${command}" but ${target.manifest} defines no "${target.script}" script`
    );
  }
});

test('lint-staged does not shell npm inside a pnpm workspace', () => {
  for (const command of Object.values(rootPkg['lint-staged']).flat()) {
    assert.ok(!/\bnpm\s+(run|exec)\b/.test(command), `lint-staged uses npm: ${command}`);
  }
});

test('translation parity runs when a locale bundle is staged', () => {
  const entry = rootPkg['lint-staged']['packages/i18n/src/translations/**/*.json'];
  assert.deepEqual(entry, ['pnpm check:translations']);
});
