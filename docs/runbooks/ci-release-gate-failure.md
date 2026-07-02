---
id: runbook-ci-release-gate-failure
type: procedural
created: '2026-07-01T00:00:00Z'
modified: '2026-07-01T00:00:00Z'
namespace: runbook/research-harness-console
title: CI or Release Gate Failure
tags:
  - runbook
  - ci
  - release
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
    target: ../reference/gates.md
  - type: relates-to
    target: ../reference/org-governance.md
---

# CI or release gate failure

A gate just went red on Research Harness Console. This runbook takes you from the red check to a
fix. Every gate here is a **thin caller** of an org-central reusable workflow; see
[Quality gates and workflows](../reference/gates.md) for the full job list and
[org governance & release runbooks](../reference/org-governance.md) for the ADRs behind them.

Scope: one red gate, one path to green. Set the repo once:

```bash
REPO=modeled-information-format/research-harness-console
```

## Symptom & where it shows

| You see | Where | What it is |
| --- | --- | --- |
| A red ✗ on a PR or commit | **Checks** tab / `gh pr checks` | A job in `ci.yml`, `quality-gates.yml`, or `release.yml` exited non-zero |
| A new code-scanning alert | **Security** tab → Code scanning | A SARIF gate (`sast`, `sca`, `trivy`, `posture`) recorded a finding |
| A failed workflow run | **Actions** tab / `gh run view` | The run log, including which job in the `needs:` graph stopped the pipeline |

First triage. Find the failing job and read its log:

```bash
gh pr checks <PR> --repo "$REPO"                    # which check is red
gh run view <run-id> --repo "$REPO" --log-failed    # the failing job's log only
```

For a SARIF gate, list the open alerts instead of scrolling the log:

```bash
gh api "/repos/$REPO/code-scanning/alerts?state=open" \
  --jq '.[] | {tool: .tool.name, rule: .rule.id, sev: .rule.security_severity_level, path: .most_recent_instance.location.path}'
```

Filter by `.tool.name`: `CodeQL`, `OSV-Scanner`, or `Trivy`.

## Triage table

| Gate (job) | Workflow | What red means | First command to inspect |
| --- | --- | --- | --- |
| `pin-check` | `ci.yml` | A `uses:` references an action by tag/branch, not a 40-char SHA | `gh run view <run-id> --repo "$REPO" --log-failed` |
| `validate-workflows` | `ci.yml` | `actionlint` found a workflow-YAML error | `gh run view <run-id> --repo "$REPO" --log-failed` |
| `sanity` | `ci.yml` | A JS/JSX entry point (`main.js`, `preload.js`, `server/**`, `renderer/**`) fails to parse | `gh run view <run-id> --repo "$REPO" --log-failed` — the log names the file and the Babel error |
| `sast` (CodeQL) | `quality-gates.yml`, `gate-sast` in `release.yml` | SAST finding, `languages: javascript-typescript` | Security tab → Code scanning → `tool=CodeQL`; or the `gh api` query above |
| `sca` (OSV-Scanner) | `quality-gates.yml`, `gate-sca` in `release.yml` | A dependency advisory at severity `high` or above (Node deps, `npm`) | Security tab → `tool=OSV-Scanner` |
| `trivy` (IaC/license) | `quality-gates.yml`, `gate-trivy` in `release.yml` | Trivy filesystem scan flagged IaC misconfig or a license | Security tab → `tool=Trivy` |
| `posture` (Scorecard) | `quality-gates.yml` | OpenSSF Scorecard regressed a repo-posture check (push/schedule only) | Security tab → `tool=Scorecard` |
| `build` (per platform) | `release.yml` | `electron-builder` failed for `mac`/`linux`/`win` | `gh run view <run-id> --repo "$REPO" --log-failed`, check the matrix leg |
| `verify` (fail-closed) | `release.yml` | An attestation is missing or doesn't bind to a platform artifact's or the manifest's subject digest; **blocks publish** | `gh run view <run-id> --repo "$REPO" --log-failed` |

## Per-gate remediation

### `pin-check`: unpinned action

The log names the offending `uses:`. Pin it to a full 40-char commit SHA with a trailing version
comment. Resolve the SHA from the action's repo:

```bash
gh api /repos/<owner>/<action-repo>/commits/<tag> --jq '.sha'
```

Then edit the `uses:` line:

```yaml
uses: owner/action@<40-char-sha>   # vX.Y.Z
```

Any new third-party action must also be on the org Actions allow-list
(`repos/.github/README.md`) or the workflow startup-fails. Push the fix; `pin-check` re-runs on
the PR.

### `validate-workflows`: actionlint error

The log points at the file and line. Fix the YAML/expression, push, re-run.

### `sanity`: parse failure

The log names the failing file and the Babel error message. Fix the syntax; there is no bundler
step to hide behind — `main.js`, `preload.js`, everything under `server/`, and every `.jsx` under
`renderer/` must parse standalone.

### `sast` (CodeQL) / `sca` (OSV) / `trivy` (IaC/license): SARIF gates

1. Open the alert in the **Security** tab (or the `gh api` query above). Read the rule, severity,
   and file/line.
2. **True positive** → fix the code, dependency, or IaC config in the PR. For `sca`, bump the
   dependency in `package.json`/`package-lock.json` to a fixed version.
3. **No fix available or not exploitable** → record a disposition, do not silently suppress:
   - `sca`/`trivy` CVE with no fixed version → add an OpenVEX statement to `.vex/openvex.json`
     (the `vex` job signs it at release time; see the sample entry already in that file).
   - `sast`/`trivy` false positive → dismiss the alert in the Security tab with a written reason.
4. Push; the gate re-runs and the alert clears or carries its disposition.

### `posture` (Scorecard)

A repo-level signal, not a per-PR blocker (`publish-results: false`, runs on push/schedule). A
regression usually means branch protection, token permissions, or a workflow-permission scope
changed. These need repo admin to fix; escalate to a maintainer (below).

### `build`: `electron-builder` failure on one platform

Read the matrix leg's log — `electron-builder` failures are almost always a missing native
dependency for that target or a `package.json` `build` config typo. Reproduce locally with the
matching script (`npm run build:mac` / `build:linux` / `build:win`) before pushing a fix; a fix
that only compiles in CI wastes the next full matrix run.

### `verify` (fail-closed): attestation/subject mismatch

`verify` fails because an upstream gate it depends on didn't produce its attestation, or a subject
digest it checks (a platform artifact, or the checksums manifest) no longer matches. It does not
have a fix of its own; **fix the gate that failed first**:

- Read the log for which predicate failed: build provenance (per platform or the manifest), SBOM
  (`cyclonedx.org/bom`, manifest only), a seam verdict (`sast/v1`, `sca/v1`, `iac-license/v1`), or
  VEX (`openvex.dev/ns/v0.2.0`).
- Resolve that upstream job (`build`, `collect`, `attest-sast`, `attest-sca`,
  `attest-iac-license`, or `vex`), then re-run:

```bash
gh run rerun <run-id> --repo "$REPO" --failed
```

A release is published **only** if `verify` is green; a tag publishes nothing unattested. Never
bypass `verify` to ship.

## Re-run after a fix

```bash
gh run rerun <run-id> --repo "$REPO" --failed   # re-run only failed jobs
gh run watch <run-id> --repo "$REPO"            # follow to green
```

## Escalation

Page a repo maintainer (`modeled-information-format` org owners) when:

- A `posture` regression needs branch-protection, token, or workflow-permission changes; these
  require **org/repo admin** you may not hold.
- A `sast`/`sca`/`trivy` alert is a true positive in central reusable workflow logic (the
  `.github` repo), not in this repo's thin caller; the fix lands upstream.
- A new third-party action needs an **allow-list** entry (`repos/.github/README.md`).
- `verify` fails with every upstream gate green and digests matching: a seam or signing-identity
  problem in the central `reusable-attest-scan.yml`, which this repo cannot fix.

Do not `--no-verify`, dismiss an alert without a written reason, or relax a gate to get a merge
through. A gate exists to fail; route the real fix instead.

## Related

- [Quality gates and workflows](../reference/gates.md): every job in `ci.yml`, `quality-gates.yml`,
  and `release.yml`, with predicate types.
- [Org governance & release runbooks](../reference/org-governance.md): the org-central runbooks
  and ADRs this repo's gates implement.
