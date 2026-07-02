---
id: docs-index
type: semantic
created: '2026-07-01T00:00:00Z'
modified: '2026-07-01T00:00:00Z'
namespace: reference/research-harness-console
title: Documentation
tags:
  - reference
  - index
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
    target: ./reference/org-governance.md
  - type: relates-to
    target: ./reference/gates.md
  - type: relates-to
    target: ./runbooks/ci-release-gate-failure.md
---

# Documentation

Architecture, data flow, and how to run the app live in the top-level
[`README.md`](https://github.com/modeled-information-format/research-harness-console/blob/main/README.md).
This directory holds the operational documentation: how this repo's release and CI process fits
the org's shared governance, and what to do when a gate fails.

| Page | For |
| --- | --- |
| [Org governance & release runbooks](reference/org-governance.md) | The org-central runbooks and ADRs this repo's release process follows |
| [Quality gates and workflows](reference/gates.md) | Every job in `ci.yml`, `quality-gates.yml`, and `release.yml`, with predicate types |
| [CI or release gate failure](runbooks/ci-release-gate-failure.md) | Triage and fix a red check, one gate at a time |

For verifying a downloaded release artifact, see
[`SECURITY.md`](https://github.com/modeled-information-format/research-harness-console/blob/main/SECURITY.md).
