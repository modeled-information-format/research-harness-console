# Security Policy

## Reporting a Vulnerability

Please do **not** open a public GitHub issue for security vulnerabilities.

Report security issues by emailing the maintainer directly or using the
[GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)
feature for this repository.

We will respond within 72 hours and coordinate a fix and disclosure timeline.

---

## Verifying Release Artifacts

Every release artifact (`research-harness-console-<version>-<platform>.<ext>`
for macOS/Linux/Windows) is signed with GitHub's Sigstore-backed attestation
infrastructure and carries:

1. **SLSA build provenance** — proves the artifact was produced by this
   repository's CI workflow on the runner that built it, not tampered with
   post-build.
2. A **checksums manifest** (`research-harness-console-<version>-checksums.txt`)
   listing every platform artifact's sha256 digest. Because the source-level
   quality gates below scan the same code regardless of target platform, they
   are attested once, bound to this manifest rather than to each binary
   individually. The manifest itself carries its own build provenance + SBOM
   attestation.
3. **Quality-gate verdicts bound to the manifest** — SAST (CodeQL), SCA (OSV),
   and IaC/license (Trivy) scan results, each signed as a digest-bound
   attestation by the org's central `reusable-attest-scan.yml` workflow.
4. **VEX disposition** (OpenVEX) — self-signed by `reusable-vex.yml`.

> **Note:** no code-signing certificates exist yet for this repo (macOS
> notarization / Windows Authenticode). Artifacts are OS-unsigned — macOS
> Gatekeeper and Windows SmartScreen will flag them on first launch — but
> every artifact is still fully SLSA-attested and cosign-signed per above.
> Verify with the commands below before running an unsigned binary.

### Prerequisites

- [GitHub CLI](https://cli.github.com/) `gh` ≥ 2.49.0
- Authenticated: `gh auth login`

### Verify a downloaded platform artifact (build provenance)

```bash
gh attestation verify <artifact-file> \
  --repo modeled-information-format/research-harness-console \
  --predicate-type "https://slsa.dev/provenance/v1"
```

Replace `<artifact-file>` with the downloaded release file, e.g.:

```bash
gh attestation verify research-harness-console-1.0.0-macos-arm64.dmg \
  --repo modeled-information-format/research-harness-console \
  --predicate-type "https://slsa.dev/provenance/v1"
```

### Verify the checksums manifest

Download `research-harness-console-<version>-checksums.txt` from the same
release, then verify every attestation bound to it:

```bash
MANIFEST=research-harness-console-1.0.0-checksums.txt
OWNER=modeled-information-format
SEAM=modeled-information-format/.github/.github/workflows/reusable-attest-scan.yml
VEX_SIGNER=modeled-information-format/.github/.github/workflows/reusable-vex.yml

# Build provenance
gh attestation verify "$MANIFEST" \
  --repo "$OWNER/research-harness-console" \
  --predicate-type "https://slsa.dev/provenance/v1"

# SBOM
gh attestation verify "$MANIFEST" \
  --repo "$OWNER/research-harness-console" \
  --predicate-type "https://cyclonedx.org/bom"

# Quality-gate verdicts (SLSA L3: signer is the central seam workflow, so
# --signer-workflow is required — --repo alone is not sufficient here)
for pt in sast sca iac-license; do
  gh attestation verify "$MANIFEST" \
    --owner "$OWNER" \
    --signer-workflow "$SEAM" \
    --predicate-type "https://modeled-information-format.github.io/attestations/${pt}/v1"
done

# VEX disposition (self-signed by reusable-vex.yml, a different signer identity)
gh attestation verify "$MANIFEST" \
  --owner "$OWNER" \
  --signer-workflow "$VEX_SIGNER" \
  --predicate-type "https://openvex.dev/ns/v0.2.0"
```

### Verify the checksums themselves

After verifying the manifest's attestations, confirm the artifact you
downloaded actually matches the digest the manifest claims:

```bash
sha256sum -c research-harness-console-1.0.0-checksums.txt --ignore-missing
```

The release process itself — the audit-gated, attested cutover this repository follows — is the
org [release runbook](https://github.com/modeled-information-format/.github/blob/main/docs/runbooks/release-runbook.md);
see [org governance & release runbooks](docs/reference/org-governance.md) for that plus the
related branch-protection, Dependabot auto-merge, and labels runbooks, and
[quality gates and workflows](docs/reference/gates.md) for the exact job list behind the
verification commands above. If a gate goes red before a release ships, the
[CI or release gate failure runbook](docs/runbooks/ci-release-gate-failure.md) has the triage.
