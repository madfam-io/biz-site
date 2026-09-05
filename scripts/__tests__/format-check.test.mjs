// Boundary checkpoint (2026-09-04, madfam-site): public repo (Lane C). This file names
// repo paths, commands and check names only; no hosts, credentials or identifiers.
// Policy: internal-devops/docs/repo-boundary-contract.md.
/**
 * `format:check` must verify, never rewrite.
 *
 * The root script was `prettier --write "…"`, so CI's `pnpm format --check`
 * expanded to `prettier --write … --check` — `--write` wins. CI rewrote files
 * in the runner, reported nothing, and was swallowed twice over by
 * `|| echo` plus `continue-on-error: true`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const rootPkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));

test('format:check checks and never writes', () => {
  const script = rootPkg.scripts['format:check'];
  assert.ok(script, 'package.json defines no format:check script');
  assert.match(script, /--check/);
  assert.doesNotMatch(script, /--write/);
});

test('format:check exits non-zero and leaves bytes untouched', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'format-check-'));
  const file = path.join(dir, 'bad.ts');
  const badly = "const   x    =  {a:1,   b:2}\n";
  fs.writeFileSync(file, badly);

  const prettier = path.join(repoRoot, 'node_modules', '.bin', 'prettier');
  const result = spawnSync(prettier, ['--check', file], { cwd: repoRoot, encoding: 'utf8' });

  assert.notEqual(result.status, 0, 'prettier --check accepted badly formatted input');
  assert.equal(fs.readFileSync(file, 'utf8'), badly, 'prettier --check rewrote the file');

  fs.rmSync(dir, { recursive: true, force: true });
});
