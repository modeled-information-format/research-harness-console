---
id: reference-org-governance
type: semantic
created: '2026-07-01T00:00:00Z'
modified: '2026-07-01T00:00:00Z'
namespace: reference/research-harness-console
title: "Reference: org governance & release runbooks"
diataxis_type: reference
tags:
  - reference
  - governance
  - release
  - ci
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
    target: ./gates.md
  - type: relates-to
    target: ../runbooks/ci-release-gate-failure.md
---

# Reference: org governance & release runbooks

This repository follows the shared governance, CI, and release process of the
[`modeled-information-format`](https://github.com/modeled-information-format) organization. Those
processes are maintained once, centrally, in the org
[`.github`](https://github.com/modeled-information-format/.github) repository and apply to every
repo that adopts the attested-delivery backbone — including this one. The runbooks below are the
authoritative, governing process; this page makes them reachable from here.

## Runbooks

| Runbook | What it governs |
| --- | --- |
| [Release runbook](https://github.com/modeled-information-format/.github/blob/main/docs/runbooks/release-runbook.md) | The required, audit-gated **attested release process**: punch-list audit, epics + sub-issues, a decision log, a release workplan issue, one PR per epic under GitHub Flow, and the attested cutover. |
| [Branch-protection runbook](https://github.com/modeled-information-format/.github/blob/main/docs/runbooks/branch-protection-runbook.md) | The required-checks, single-review, and linear-history rules applied to protected branches. |
| [Dependabot auto-merge runbook](https://github.com/modeled-information-format/.github/blob/main/docs/runbooks/dependabot-automerge-runbook.md) | The policy and rollout for auto-merging **patch** Dependabot updates via the org CI app — minor/major and non-semver bumps stay manual for review. |
| [Labels runbook](https://github.com/modeled-information-format/.github/blob/main/docs/runbooks/labels-runbook.md) | The org-wide label taxonomy and the reusable label-sync that keeps every repo consistent. |

## Reusable CI/release workflows

This repo's CI and release gates are **thin SHA-pinned callers** of the org's reusable workflows
in [`.github/.github/workflows/`](https://github.com/modeled-information-format/.github/tree/main/.github/workflows)
— SAST (CodeQL), SCA (OSV-Scanner), Trivy (IaC/license), Scorecard posture, VEX, pin-check,
actionlint, and the seam-signed attest workflow. The architecture is recorded in the org
[ADR-002: reusable quality-gate architecture](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-002-reusable-quality-gate-architecture.md),
with the individual gate suites detailed in
[ADR-003: SAST gate suite](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-003-sast-gate-suite.md),
[ADR-004: supply-chain scanning](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-004-supply-chain-scanning.md),
[ADR-005: signing, attestation, and verification](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-005-signing-attestation-verification.md),
and [ADR-007: Scorecard posture](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-007-scorecard-posture.md).
Workflow identity uses the org's five least-privilege GitHub Apps, per
[ADR-008: GitHub App CI identity](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-008-github-app-ci-identity.md)
and [ADR-011: least-privilege app fleet](https://github.com/modeled-information-format/.github/blob/main/docs/adr/ADR-011-least-privilege-app-fleet.md).

The exact jobs this repo's `ci.yml`, `quality-gates.yml`, and `release.yml` run — and which
predicate each one attests — is listed in [Quality gates and workflows](gates.md).

The consumer side of the release policy — verifying a downloaded artifact's attestation — is in
[`SECURITY.md`](https://github.com/modeled-information-format/research-harness-console/blob/main/SECURITY.md).
When a gate goes red, the local
[CI or release gate failure runbook](../runbooks/ci-release-gate-failure.md) walks the triage and
fix; it defers to the runbooks above for anything that needs org/repo admin.
