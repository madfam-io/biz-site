#!/usr/bin/env bash
set -euo pipefail

# Public-repo hygiene guard for madfam-site.
#
# madfam-site is a PUBLIC repository (Lane C, public corporate site). This scans
# every tracked text file for live credential-looking material and for private
# operational detail that belongs in internal-devops.
#
# Boundary checkpoint (2026-09-04): this script names pattern CLASSES, never
# values and never node identities. The node-identity class is deliberately not
# expressed here — see "node identity" below. Policy:
# internal-devops/docs/repo-boundary-contract.md. Public checklist:
# docs/PUBLIC_REPO_BOUNDARY.md.
#
# Exit codes:
#   0  clean (read the classes_skipped= line before believing it)
#   1  at least one finding
#   2  UNDETERMINED — the file set could not be established, so nothing was read

ROOT="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
cd "$ROOT"

status=0
classes_skipped=0

# Every TRACKED file that grep considers text. The previous generation of this
# script used a `find` over doc extensions only, which is why .npmrc, .yml, .sh,
# .ts and .json were never read at all.
scan_files() {
  git ls-files -z 2>/dev/null | xargs -0 -r grep -IlZ '' 2>/dev/null | tr '\0' '\n'
}

FILES="$(scan_files || true)"

# FAIL CLOSED. An empty file set means we could not look — outside a git tree, a
# tarball export, a container without .git. "I could not look" must never report
# the same result as "I looked and it was clean".
if [[ -z "$FILES" ]]; then
  cat >&2 <<'MSG'
[public-hygiene] UNDETERMINED — could not establish the tracked file set.

Nothing was scanned. This guard protects the public/private boundary, so a run
that read no files must not report a pass. Run it from inside the repository
work tree.
MSG
  printf 'Public hygiene check UNDETERMINED — files_scanned=0 classes_skipped=%s\n' "$classes_skipped"
  exit 2
fi

file_count="$(printf '%s\n' "$FILES" | grep -c . || true)"

# A reason-bearing per-line pragma. It exists because this guard's own pattern
# definitions and its synthetic test fixtures are, by construction, the shapes it
# looks for — and excluding those two FILES wholesale would create exactly the
# blind spot an attacker would choose. The reason is required by the regex, so a
# bare pragma cannot be pasted onto a real finding.
ALLOW_PRAGMA_RE='public-hygiene-allow:[[:space:]]*[^[:space:]].{5,}'

# Values that are obviously not live. Kept deliberately narrow: it filters the
# MATCHED LINE, not the file, so a real value on the next line is still caught.
PLACEHOLDER_RE='\$\{|\$[A-Z_]{3,}|[Yy][Oo][Uu][Rr][-_]|REDACTED|[Rr]eplace[-_]with|CHANGEME|[Cc]hange[-_][Mm]e|PLACEHOLDER|EXAMPLE|<[A-Za-z_]+>|%s|xxxx|XXXX|\.\.\.'

check_pattern() {
  local label="$1"
  local pattern="$2"
  local filter_placeholders="${3:-no}"
  local matches
  matches=$(printf '%s\n' "$FILES" | tr '\n' '\0' | xargs -0 -r grep -HnE "$pattern" 2>/dev/null || true)
  if [[ -n "$matches" ]]; then
    matches=$(printf '%s\n' "$matches" | grep -Ev "$ALLOW_PRAGMA_RE" || true)
  fi
  if [[ "$filter_placeholders" == "yes" && -n "$matches" ]]; then
    matches=$(printf '%s\n' "$matches" | grep -Ev "$PLACEHOLDER_RE" || true)
  fi
  if [[ -n "$matches" ]]; then
    printf '\n[public-hygiene] %s\n' "$label" >&2
    printf '%s\n' "$matches" >&2
    status=1
  fi
}

# --- credential shapes ------------------------------------------------------

check_pattern 'Stripe live/test secret key pattern' 'sk_(live|test)_[A-Za-z0-9_]{16,}'
check_pattern 'GitHub token pattern' 'gh[pousr]_[A-Za-z0-9_]{20,}'
check_pattern 'AWS access key pattern' 'AKIA[0-9A-Z]{16}'
check_pattern 'Private key marker' '\-\-\-\-\-BEGIN [A-Z ]*PRIVATE KEY\-\-\-\-\-'
check_pattern 'Concrete admin bootstrap password assignment' "ADMIN_BOOTSTRAP_PASSWORD='[^<][^']{6,}'"
check_pattern 'Concrete JWT secret assignment' 'JANUA_JWT_SECRET=([^<$][^[:space:]]{12,})' yes  # public-hygiene-allow: pattern definition, not a value
check_pattern 'Private kubeconfig reference' '\-\-kubeconfig=/|\.kube/config|client-certificate-data|client-key-data|certificate-authority-data'  # public-hygiene-allow: pattern definition, not a value

# npm registry auth with a concrete value. The narrower `//host/:_` form was
# measured against the foundry tree and matched four legitimate env-var lines,
# so this matches the assignment itself and post-filters placeholders.
check_pattern 'npm registry auth with a concrete value' ':_auth(Token)?=[A-Za-z0-9+/=_.-]{16,}' yes

# --- infrastructure identifiers --------------------------------------------

# Public IPv4. Octets are range-checked, so a decimal run inside an SVG path or
# a version string is not an address. Private, loopback, link-local,
# documentation (TEST-NET-1/2/3), unspecified and broadcast ranges are excluded:
# they are not identities.
#
# DOCUMENTED NARROWING: lines carrying SVG path data are skipped. Icon paths are
# long decimal runs and produced the only false positives measured on this tree
# (apps/web/components/Footer.tsx, a GitHub glyph). Recorded here and in
# docs/PUBLIC_REPO_BOUNDARY.md rather than left implicit.
IPV4_OCTET='(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])'
IPV4_RE="\\b${IPV4_OCTET}(\\.${IPV4_OCTET}){3}\\b"
IPV4_EXCLUDE='^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.0\.2\.|198\.51\.100\.|203\.0\.113\.|0\.0\.0\.0$|255\.)'
SVG_LINE='<path|<svg|viewBox|d="[Mm][0-9 .,-]'

ipv4_candidates="$(printf '%s\n' "$FILES" | tr '\n' '\0' \
  | xargs -0 -r grep -HnE "$IPV4_RE" 2>/dev/null \
  | grep -Ev "$SVG_LINE" | grep -Ev "$ALLOW_PRAGMA_RE" || true)"

ipv4_hits=""
while IFS= read -r candidate; do
  [[ -n "$candidate" ]] || continue
  location="$(printf '%s' "$candidate" | cut -d: -f1,2)"
  addresses="$(printf '%s' "$candidate" | cut -d: -f3- \
    | grep -oE "$IPV4_RE" | grep -Ev "$IPV4_EXCLUDE" || true)"
  [[ -n "$addresses" ]] || continue
  while IFS= read -r address; do
    [[ -n "$address" ]] || continue
    ipv4_hits+="${location}: ${address}"$'\n'
  done <<< "$addresses"
done <<< "$ipv4_candidates"

if [[ -n "$ipv4_hits" ]]; then
  printf '\n[public-hygiene] %s\n' 'Public IPv4 literal' >&2
  printf '%s' "$ipv4_hits" >&2
  status=1
fi

# Cloudflare tunnel identifiers are UUIDs. Any bare UUID in a tracked file is
# reported: the point is that a tunnel id must never appear, and telling a
# tunnel id from another UUID by shape alone is impossible.
check_pattern 'Tunnel-identifier-shaped UUID' '\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b'

# --- node identity, which this script cannot express ------------------------
#
# Node hostnames are a banned class here, but writing them into a public script
# would publish exactly what the class forbids, and hashing them buys nothing:
# `<role>-NN` is a dozen guesses. So the literals are read from a PRIVATE
# pattern file when one is available, and every run says whether it was.
PATTERN_FILE="${MADFAM_HYGIENE_PATTERNS:-../internal-devops/security/public-hygiene-private-patterns.txt}"
if [[ -r "$PATTERN_FILE" ]]; then
  while IFS= read -r private_pattern; do
    [[ -n "$private_pattern" ]] || continue
    [[ "$private_pattern" == \#* ]] && continue
    check_pattern 'Private infrastructure identifier (private pattern file)' "$private_pattern"
  done < "$PATTERN_FILE"
else
  printf '[public-hygiene] node-identity class SKIPPED — private pattern file not available (%s)\n' \
    "$PATTERN_FILE" >&2
  classes_skipped=$((classes_skipped + 1))
fi

if [[ "$status" -ne 0 ]]; then
  cat >&2 <<'MSG'

Public hygiene check failed. Rotate first if any value may have been live, then
replace the public reference with a non-secret placeholder, or move the detail
to internal-devops and leave a pointer. See docs/PUBLIC_REPO_BOUNDARY.md.
MSG
fi

# READ-PROOF. A green run with classes_skipped>0 did NOT check every class.
printf 'Public hygiene check: files_scanned=%s classes_skipped=%s\n' "$file_count" "$classes_skipped"
exit "$status"
