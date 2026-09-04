#!/usr/bin/env bash
set -uo pipefail

# Tests for scripts/public-hygiene-check.sh.
#
# Boundary checkpoint (2026-09-04, madfam-site): every planted value here is
# synthetic and uses reserved or .invalid names. No real identifier, address or
# credential appears in this file. Policy:
# internal-devops/docs/repo-boundary-contract.md.
#
# Each case builds a throwaway git repository, plants exactly one thing, and
# asserts the exit code. A guard with no planted-violation control is a guard
# nobody has seen fail, so every "clean" case here has a matching "dirty" twin.

SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public-hygiene-check.sh"
passed=0
failed=0

make_repo() {
  local dir
  dir="$(mktemp -d)"
  git -C "$dir" init -q
  git -C "$dir" config user.email test@example.invalid
  git -C "$dir" config user.name test
  printf '%s' "$dir"
}

track() {
  git -C "$1" add -A >/dev/null 2>&1 || true
}

run_case() {
  local name="$1" dir="$2" expected="$3"
  shift 3
  local output actual
  output="$(cd "$dir" && MADFAM_HYGIENE_PATTERNS="${MADFAM_HYGIENE_PATTERNS:-/nonexistent/patterns.txt}" bash "$SCRIPT" "$dir" 2>&1)"
  actual=$?
  if [[ "$actual" == "$expected" ]]; then
    printf 'ok   %s (exit %s)\n' "$name" "$actual"
    passed=$((passed + 1))
  else
    printf 'FAIL %s — expected exit %s, got %s\n%s\n' "$name" "$expected" "$actual" "$output"
    failed=$((failed + 1))
  fi
  rm -rf "$dir"
}

# 1. A concrete npm registry auth value is the true-positive control.
d="$(make_repo)"
printf '//npm.private.invalid/:_auth=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dg==\n' > "$d/.npmrc"  # public-hygiene-allow: synthetic fixture
track "$d"
run_case 'concrete _auth value is a finding' "$d" 1

# 2. The four legitimate env-var forms must not fire.
d="$(make_repo)"
{
  printf '//npm.private.invalid/:_auth=${NPM_TOKEN}\n'
  printf '//npm.private.invalid/:_authToken=%%s\n'
  printf '//npm.private.invalid/:_auth=YOUR_TOKEN_GOES_HERE\n'
  printf '//npm.private.invalid/:_authToken=<REDACTED_TOKEN_VALUE>\n'
} > "$d/.npmrc"
track "$d"
run_case 'placeholder _auth forms are not findings' "$d" 0

# 3. Private, loopback and documentation ranges are not identities.
d="$(make_repo)"
printf 'db 10.0.0.1\nbridge 172.18.0.0\nlocal 127.0.0.1\ndocs 203.0.113.7\n' > "$d/notes.md"
track "$d"
run_case 'RFC1918 / loopback / TEST-NET are not findings' "$d" 0

# 4. A routable IPv4 literal is a finding.
d="$(make_repo)"
printf 'origin 198.18.42.9\n' > "$d/notes.md"  # public-hygiene-allow: synthetic benchmark-range address
track "$d"
run_case 'public IPv4 literal is a finding' "$d" 1

# 5. Octet range-checking: a decimal run is not an address.
d="$(make_repo)"
printf '<path d="M12 0c-6.626 0-12 5.373-12 12 3.492.997.107-.775 11.387.599.111z"/>\n' > "$d/Icon.tsx"
track "$d"
run_case 'SVG path decimals are not addresses' "$d" 0

# 6. A tunnel-identifier-shaped UUID is a finding.
d="$(make_repo)"
printf 'tunnel: 7f3a91c2-4b8e-4d21-9f60-0c1d2e3f4a5b\n' > "$d/notes.md"  # public-hygiene-allow: synthetic UUID fixture
track "$d"
run_case 'tunnel-shaped UUID is a finding' "$d" 1

# 7. FAIL CLOSED: nothing tracked means nothing was read.
d="$(make_repo)"
printf 'untracked\n' > "$d/notes.md"
run_case 'empty tracked file set is UNDETERMINED' "$d" 2

# 8. Untracked files are outside the scan, so a dirty untracked file is not a
#    finding — the scan is of what the repository publishes.
d="$(make_repo)"
printf 'clean\n' > "$d/tracked.md"
track "$d"
printf 'sk_live_AAAAAAAAAAAAAAAAAAAA\n' > "$d/untracked.md"  # public-hygiene-allow: synthetic fixture
run_case 'untracked files are out of scope' "$d" 0

# 9. Without a private pattern file the run is clean but says the class was skipped.
d="$(make_repo)"
printf 'clean\n' > "$d/tracked.md"
track "$d"
out="$(cd "$d" && MADFAM_HYGIENE_PATTERNS=/nonexistent/patterns.txt bash "$SCRIPT" "$d" 2>&1)"
if [[ "$out" == *'classes_skipped=1'* && "$out" == *'node-identity class SKIPPED'* ]]; then
  printf 'ok   missing private pattern file reports classes_skipped=1\n'
  passed=$((passed + 1))
else
  printf 'FAIL missing private pattern file did not report classes_skipped=1\n%s\n' "$out"
  failed=$((failed + 1))
fi
rm -rf "$d"

# 10. With a private pattern file, its patterns are enforced and nothing is skipped.
d="$(make_repo)"
printf 'host example-role-01 is up\n' > "$d/notes.md"
track "$d"
patterns="$(mktemp)"
printf '# one ERE per line\nexample-role-[0-9]{2}\n' > "$patterns"
out="$(cd "$d" && MADFAM_HYGIENE_PATTERNS="$patterns" bash "$SCRIPT" "$d" 2>&1)"
rc=$?
if [[ "$rc" == 1 && "$out" == *'classes_skipped=0'* ]]; then
  printf 'ok   private pattern file is enforced (exit 1, classes_skipped=0)\n'
  passed=$((passed + 1))
else
  printf 'FAIL private pattern file was not enforced — exit %s\n%s\n' "$rc" "$out"
  failed=$((failed + 1))
fi
rm -rf "$d" "$patterns"

printf '\npublic-hygiene tests: passed=%s failed=%s\n' "$passed" "$failed"
[[ "$failed" -eq 0 ]]
