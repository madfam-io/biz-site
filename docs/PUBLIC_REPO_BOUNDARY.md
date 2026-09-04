# Public Repository Boundary

**Last verified: 2026-09-04** — the automation section was checked by reading
`scripts/` and `.github/workflows/` on that date.

`madfam-site` is public. It is the MADFAM corporate website: marketing copy,
the public platform map, the blog and case-study surfaces, and the code that
renders them. It is the public **corporate-site** lane (Lane C) of the MADFAM
repository set — not an operations repo, and not the ecosystem contract repo.

## Canonical lane map

| Lane | Repository                     | Contents                                                                               |
| ---- | ------------------------------ | -------------------------------------------------------------------------------------- |
| A    | `internal-devops` _(private)_  | Operational facts, secrets, costs, provider details, node identity, incident internals |
| B    | `solarpunk-foundry` _(public)_ | Ecosystem narrative, shared contracts, sanitized runbook links                         |
| C    | `madfam-site` _(public)_       | This repo: the corporate site, its content and its deployment glue                     |
| C    | `enclii` _(public)_            | Service platform implementation and safe operational patterns                          |
| D    | `tulana` _(private)_           | Private service implementation, business and market data workflows                     |

The governing policy is `internal-devops/docs/repo-boundary-contract.md`
(private repository — referenced by name only; the URL 404s without
organisation access).

## Belongs here

- Marketing and product copy, in all three shipped locales
- The public platform map: product name, role, public surface
- Application code, tests, and the manifests that deploy this site
- Architecture and integration notes scoped to _this_ site
- Public-safe deployment shape — the fact that a pipeline exists, not its
  credentials
- Links to private operational sources, without duplicating the detail

## Does not belong here

Everything in this list has appeared in this repository at some point. It is a
record of real defects, not a hypothetical.

- Live secrets, tokens, passwords, JWT signing material, OAuth client secrets,
  kubeconfigs, SSH keys, private keys, or `.env` values
- **Node hostnames**
- **Public IP addresses**
- **Hardware model numbers or capacity figures**
- **Cloudflare tunnel identifiers**
- Private IPs, non-public hostnames, node topology detail, provider account
  details
- Vault paths or secret names with retrieval detail
- **Cost ledgers, internal hourly rates, per-phase build budgets, and revenue or
  ROI projections** — scope and sequencing stay here; economics do not
- **Incident diagnoses, console action logs, and incident evidence trails** — a
  three-sentence public summary plus a pointer to the private record is the
  sanctioned public form
- Customer and client identities, client engagement detail, third-party PII
- Sensitive audit findings
- Exact production break-glass commands
- SSH access rosters
- **Operator local paths** — a home directory carries an account name; use
  repo-relative paths in scripts and guides

## What _is_ public about the infrastructure

Stated positively, so the boundary is a line rather than a fog. The following
shape is already public and stays public:

> A 4-node bare-metal k3s cluster — one control-plane node, one worker, and two
> CI builder nodes reserved for GitHub Actions runners — with ingress through a
> single Cloudflare Tunnel and zero exposed node ports for application traffic.
> Block storage is Longhorn CSI; object storage is Cloudflare R2. GitOps is
> ArgoCD in an App-of-Apps pattern, with a dated Application count.

Anything more specific than that paragraph needs a deliberate decision, not a
default. Node _names_, models and capacity figures are never more specific — they
are simply out.

## Correct destinations

| Content                                                       | Destination                              |
| ------------------------------------------------------------- | ---------------------------------------- |
| Private operational docs, incidents, cost and revenue records | `internal-devops`                        |
| Runtime secrets                                               | Vault / the active external secret store |
| Enclii platform implementation                                | `enclii`                                 |
| The canonical cross-repo ecosystem map                        | `solarpunk-foundry`                      |
| Public summaries of any of the above                          | this repository                          |

## Example value rules

Use placeholders that cannot be mistaken for live values:

```text
<GENERATE_AT_RUNTIME>
<SECRET_FROM_VAULT>
<CLOUDFLARE_TOKEN_FROM_SECRET_STORE>
```

Do not use realistic-looking passwords or tokens in public docs. If the hygiene
guard blocks a legitimate non-secret example, prefer a placeholder over a
realistic-looking value.

## If a live value appears here

Rotate it first, then replace the public reference. **Treat repository history
as public exposure unless proven otherwise** — deleting the line from `HEAD`
does not remove it from git history, so the rotation is still owed.

## Automation — what it does and does not catch

_Verified 2026-09-04 by reading the scripts and the workflow directory._

| Guard                          | Location                                                               | Coverage                                                                                                                                                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public-hygiene-check.sh`      | `scripts/`, run by `.github/workflows/public-hygiene.yml`              | Every **tracked text file**. Stripe key shapes, GitHub token shapes, AWS access keys, PEM private-key markers, concrete admin-bootstrap password assignment, concrete JWT secret assignment, kubeconfig markers, npm registry `_auth`/`_authToken` with a concrete value, public IPv4 literals, tunnel-identifier-shaped UUIDs         |
| `boundary-checkpoint-check.sh` | `scripts/`, run by the same workflow                                   | Requires a boundary checkpoint in edited high-risk surfaces: `README.md`, `AGENTS.md`, `ECOSYSTEM.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, this file, `apps/*/README.md`, `packages/*/README.md`, `k8s/*`, `scripts/*`, `docs/*STATUS*.md`, `docs/deployment/*`, `docs/infrastructure/*`, `docs/planning/*` |
| `test-public-hygiene.sh`       | `scripts/tests/`, run by the same workflow                             | Ten cases including planted-violation controls, so the guard is never a guard nobody has watched fail                                                                                                                                                                                                                                  |
| DocGuard                       | `.github/workflows/doc-lint.yml`, pinned by SHA to `solarpunk-foundry` | Env-var documentation and terminology. `strict: false`, so **its warnings never fail the job**                                                                                                                                                                                                                                         |

### Coverage — as of 2026-09-04

Stated plainly, because a guard is routinely read as broader than it is.

- **Cloudflare tunnel identifiers — covered.** Any tracked file carrying a
  UUID-shaped literal is reported. Telling a tunnel id from another UUID by
  shape alone is impossible, so all of them are reported.
- **Public IPv4 — covered.** Octets are range-checked; private (RFC1918),
  loopback, link-local, documentation (TEST-NET-1/2/3), unspecified and
  broadcast ranges are excluded because they are not identities. One documented
  narrowing: lines carrying SVG path data are skipped, because icon paths are
  long decimal runs and were the only measured false positives.
- **Node hostnames — not covered here, by design.** Writing the literals into a
  public script would publish exactly the class the script exists to prevent,
  and hashing them buys obfuscation while implying secrecy. They are enforced
  from `internal-devops`, and locally through the
  `MADFAM_HYGIENE_PATTERNS` private pattern file. **Every run prints
  `classes_skipped=`** — a green run with `classes_skipped=1` did _not_ check
  this class.
- **File scope — every tracked text file.** The previous generation of this
  guard, in the repo it was ported from, scanned only doc extensions, which is
  how a credential in a `.npmrc` survived every green run for months.
- **Fail-closed.** An empty tracked-file set exits **2 (UNDETERMINED)**, never 0.
  "I could not look" and "I looked and it was clean" are different results.
- **Suppression carries a reason.** A line may be exempted with
  `public-hygiene-allow: <reason>`; the regex requires the reason, so a bare
  pragma cannot be pasted onto a real finding. Today it is used only on the
  guard's own pattern definitions and its synthetic test fixtures — which are,
  by construction, the shapes the guard looks for. Exempting those two _files_
  wholesale would have created exactly the blind spot an attacker would pick.

**Consequence:** passing CI is not evidence that a change is boundary-clean.
Human review against the "does not belong here" list above is still the control
that matters.

## Checklist when editing a public doc

- [ ] No secrets, tokens, or bootstrap-like credentials
- [ ] No node hostnames, IP addresses, hardware, capacity, costs, or tunnel IDs
- [ ] No revenue, ROI, internal rate or build-budget figures
- [ ] No incident evidence, console actions, or client identities
- [ ] No raw break-glass commands
- [ ] Over-specific private detail replaced with a pointer by path
- [ ] Every factual claim carries a source and a verification date
- [ ] Aspirational or superseded content is **labelled in place**, not deleted
- [ ] Boundary note present for newly added context
