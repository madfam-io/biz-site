# Contributing to madfam-site

Thanks for your interest in the MADFAM corporate website.

- **Human contributors:** the full guide is
  [`docs/development/CONTRIBUTING.md`](docs/development/CONTRIBUTING.md) — setup,
  branch and commit conventions, review expectations.
- **LLM agents (Claude, Codex, Cursor, and any other):** read
  [`AGENTS.md`](AGENTS.md) first. It is canonical. `CLAUDE.md` is a
  compatibility redirect and carries no policy.

## Before you open a pull request

This is a **public** repository. Read the
[public repository boundary](docs/PUBLIC_REPO_BOUNDARY.md) before adding
documentation or examples: node hostnames, IP addresses, hardware and capacity
figures, tunnel identifiers, secrets, cost or revenue figures, incident evidence
and client identities do not belong here. The PR template carries a boundary
checkpoint; two CI guards check part of it, and a green run is not proof.

Run locally what CI will run: `pnpm typecheck`, `pnpm lint`, `pnpm test`, and
`pnpm check:translations` if you touched `packages/i18n`.
