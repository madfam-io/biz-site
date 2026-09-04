/**
 * Regression tests for scripts/security-check.js.
 *
 * The script used to report "Critical: 0 ... Status: ✅ PASS", exit 0, while
 * printing two ❌ lines: its own findings were pushed into `this.issues` but
 * the summary was keyed off `criticalCount`, which only `checkDependencies()`
 * ever assigned — and it runs last, so it overwrote everything.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const SecurityAuditor = require('../security-check.js');

function auditor() {
  return new SecurityAuditor();
}

function critical(message = 'Input Validation: synthetic') {
  return { level: 'critical', message, details: {} };
}

test('a critical finding fails the run and exits 1', async () => {
  const a = auditor();
  a.issues.push(critical());

  const report = a.buildReport();
  assert.equal(report.status, 'FAIL');
  assert.equal(report.summary.failing, 1);
  assert.equal(await exitCodeOf(a), 1);
});

test('dependency criticals still fail the run', async () => {
  const a = auditor();
  a.depCritical = 2;

  const report = a.buildReport();
  assert.equal(report.summary.findings.critical, 0);
  assert.equal(report.summary.dependencies.critical, 2);
  assert.equal(report.status, 'FAIL');
  assert.equal(await exitCodeOf(a), 1);
});

test('a clean run passes and exits 0', async () => {
  const a = auditor();

  const report = a.buildReport();
  assert.equal(report.status, 'PASS');
  assert.equal(report.summary.failing, 0);
  assert.equal(await exitCodeOf(a), 0);
});

test('finding counts are not clobbered by audit metadata', () => {
  // The exact regression: one critical finding, then dependency metadata that
  // reports zero of everything. The finding must survive.
  const a = auditor();
  a.issues.push(critical());
  a.depCritical = 0;
  a.depModerate = 0;
  a.depLow = 0;

  const report = a.buildReport();
  assert.equal(report.summary.findings.critical, 1);
  assert.equal(report.summary.failing, 1);
  assert.equal(report.status, 'FAIL');
});

test('placeholder .env values are not reported as secrets', () => {
  const content = [
    '# a comment SECRET=not-a-real-one',
    'NEXT_PUBLIC_AVALA_API_KEY="replace-with-public-avala-client-key-if-used"',
    'API_SECRET="__CHANGE_ME__at-least-32-characters-long__"',
    'RESEND_API_KEY=',
    'JANUA_JWKS_URL=http://localhost:8000/.well-known/jwks.json',
  ].join('\n');

  assert.deepEqual(SecurityAuditor.findSecretAssignments(content), []);
});

test('a real-looking secret assignment is still reported', () => {
  const content = 'API_SECRET=7f3b9c1d4e6a8b2c5d0e9f1a3b7c5d2e\n';

  assert.deepEqual(SecurityAuditor.findSecretAssignments(content), ['API_SECRET']);
});

/** Runs generateReport() in a temp cwd with process.exit stubbed, and returns the code. */
async function exitCodeOf(a) {
  const cwd = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'security-check-'));
  const realExit = process.exit;
  const realLog = console.log;
  let code;

  process.chdir(dir);
  console.log = () => {};
  process.exit = value => {
    code = value;
    throw new Error('__exit__');
  };

  try {
    await a.generateReport();
  } catch (error) {
    if (error.message !== '__exit__') throw error;
  } finally {
    process.exit = realExit;
    console.log = realLog;
    process.chdir(cwd);
    fs.rmSync(dir, { recursive: true, force: true });
  }

  return code;
}
