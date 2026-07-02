---
id: reference-gates
type: semantic
created: '2026-07-01T00:00:00Z'
modified: '2026-07-01T00:00:00Z'
namespace: reference/research-harness-console
title: Quality gates and workflows
diataxis_type: reference
description: Reference listing for every workflow this repo runs — triggers, jobs, gate verdicts, predicate types, and attestation subjects.
tags:
  - reference
  - governance
  - release
  - ci
  - security
temporal:
  '@type': TemporalMetadata
  validFrom: '2026-07-01T00:00:00Z'
  recordedAt: '2026-07-01T00:00:00Z'
  ttl: P1Y
provenance:
  '@type': Provenance
  sourceType: agent_inferred
  trustLevel: high_confidence
  agent: anthropic/claude-code
  wasAttributedTo:
    '@id': https://github.com/modeled-information-format
relationships:
  - type: relates-to
    target: ./org-governance.md
  - type: relates-to
    target: ../runbooks/ci-release-gate-failure.md
---

# Quality gates and workflows

This page lists every workflow in `.github/workflows/` exactly as shipped. Predicate types, job
names, and signing identities are normative. Each gate job is a **thin SHA-pinned caller** of a
central reusable in the org [`.github`](https://github.com/modeled-information-format/.github)
repo — the architecture is [ADR-002](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-002-reusable-quality-gate-architecture.md);
see [org governance & release runbooks](org-governance.md) for the rest of the ADR set.

---

## `ci.yml` — Continuous integration

Trigger: push and pull request to `main`; `workflow_dispatch`.

| Job | Purpose |
| --- | --- |
| `pin-check` | Thin caller of `pin-check.yml`; fails closed if any `uses:` references an action by tag or branch instead of a full 40-char SHA |
| `validate-workflows` | Thin caller of `reusable-actionlint.yml`; validates workflow YAML syntax |
| `sanity` | No bundler exists for this app yet (renderer is plain scripts + in-browser Babel) — parse-checks every JS/JSX entry point (`main.js`, `preload.js`, `server/**`, `renderer/**`) via `@babel/standalone` so a syntax error fails CI instead of shipping |

## `quality-gates.yml` — Merge-time gates

Trigger: push and pull request to `main`; weekly schedule (`22 7 * * 3`); `workflow_dispatch`.

Each job is a thin caller of the corresponding central reusable. All gates normalize on SARIF and
surface in the repository Security tab.

| Job | Central reusable | Gate type | With |
| --- | --- | --- | --- |
| `sast` | `reusable-sast-codeql.yml` | SAST (CodeQL) | `languages: javascript-typescript`, `build-mode: none` |
| `sca` | `reusable-sca-osv.yml` | SCA (OSV-Scanner); fails on severity `high` or above | `fail-on-severity: high` |
| `posture` | `reusable-scorecard.yml` | OpenSSF Scorecard posture; push/schedule only | `publish-results: false`, CI app key for real Branch-Protection scoring |
| `trivy` | `reusable-trivy.yml` | IaC/license (Trivy filesystem scan) | `scan-iac: true` |

`posture` is a repo-level signal; it does not produce an artifact-bound attestation, and is not
re-attested per release.

## `release.yml` — Attested release pipeline

Trigger: push (tag-gated `publish`); `workflow_dispatch` (dry-run).

The invariant: `build (per platform) → collect+manifest → attest each gate → fail-closed verify →
[tag-gated] publish`. Unlike a single-artifact release, this repo builds three platform artifacts
(`macos`, `linux`, `windows` via `electron-builder`) and attests **once** against a checksums
manifest, not per binary — the source-level gates scan the same code regardless of target
platform. See [`SECURITY.md`](https://github.com/modeled-information-format/research-harness-console/blob/main/SECURITY.md)
for the consumer verification walkthrough.

| Job | Needs | What it produces |
| --- | --- | --- |
| `meta` | — | Artifact name and version outputs |
| `build` (matrix: mac/linux/win) | `meta` | Per-platform `dist/` artifact via `electron-builder`; SLSA build provenance attestation per platform |
| `collect` | `meta`, `build` | Downloads all platform artifacts, generates the checksums manifest, attests build provenance + a CycloneDX SBOM **for the manifest** |
| `gate-sast` | `meta` | CodeQL SARIF |
| `attest-sast` | `meta`, `collect`, `gate-sast` | Seam-signed attestation, predicate `sast/v1`, bound to the manifest's subject digest |
| `gate-sca` | `meta` | OSV-Scanner SARIF |
| `attest-sca` | `meta`, `collect`, `gate-sca` | Seam-signed attestation, predicate `sca/v1` |
| `gate-trivy` | `meta` | Trivy IaC/license SARIF |
| `attest-iac-license` | `meta`, `collect`, `gate-trivy` | Seam-signed attestation, predicate `iac-license/v1` |
| `vex` | `meta`, `collect` | OpenVEX disposition from `.vex/openvex.json`, self-signed by `reusable-vex.yml`, predicate `openvex.dev/ns/v0.2.0` |
| `verify` | `meta`, `build`, `collect`, `attest-sast`, `attest-sca`, `attest-iac-license`, `vex` | Fail-closed `gh attestation verify` for all predicates on every platform artifact **and** the manifest; job failure blocks `publish` |
| `publish` | `meta`, `verify` (tag-gated) | GitHub Release with all platform artifacts + the signed checksums manifest |

### Predicate types produced by `release.yml`

| Predicate | Signing identity | URI |
| --- | --- | --- |
| SLSA build provenance | This repo's `release.yml` (per platform, and for the manifest) | `https://slsa.dev/provenance/v1` |
| CycloneDX SBOM | This repo's `release.yml` (manifest only) | `https://cyclonedx.org/bom` |
| SAST verdict | `reusable-attest-scan.yml` (seam) | `https://modeled-information-format.github.io/attestations/sast/v1` |
| SCA verdict | `reusable-attest-scan.yml` (seam) | `https://modeled-information-format.github.io/attestations/sca/v1` |
| IaC/license verdict | `reusable-attest-scan.yml` (seam) | `https://modeled-information-format.github.io/attestations/iac-license/v1` |
| VEX disposition | `reusable-vex.yml` (self-signed) | `https://openvex.dev/ns/v0.2.0` |

`verify` checks all six predicate families before `publish` is allowed to execute — see
[`SECURITY.md`](https://github.com/modeled-information-format/research-harness-console/blob/main/SECURITY.md#verifying-release-artifacts)
for the exact `gh attestation verify` commands a downloader runs.

There is no `dast.yml` in this repo — this app has no hosted, network-reachable target for DAST
to scan (it binds `127.0.0.1` only; see [Known gaps](https://github.com/modeled-information-format/research-harness-console/blob/main/README.md#known-gaps-v1)
in the README).

## Related

- [Org governance & release runbooks](org-governance.md): the org-central runbooks and ADRs these
  gates implement.
- [CI or release gate failure](../runbooks/ci-release-gate-failure.md): what to do when one of
  these jobs goes red.
