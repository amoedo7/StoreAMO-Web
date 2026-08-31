# StoreAMO-Web Recovery

## Scope

This procedure restores the repository and its static web surface only. It does not grant authority to sign, publish, verify, install, or relabel StoreAMO artifacts, and it does not replace StoreAMO-Catalog or StoreAMO-Verify as their respective sources of truth.

## Preconditions

- identify the last known good Git commit or release evidence for this repository;
- preserve any current failing state in a branch or issue before rollback when practical;
- confirm that no unrelated active PR or claim owns the files being changed;
- do not introduce secrets or private tokens into the static site.

## Recovery sequence

1. Restore the repository to a known-good commit using a reversible branch or PR.
2. Run `bash scripts/autocheck.sh` locally when an execution environment is available.
3. Open a PR and require the existing web CI to execute the canonical AutoCheck.
4. Merge only after the relevant checks produce real PASS evidence.
5. After merge, verify the same checks again on the exact `main` SHA when CI provides a post-merge run.
6. If deployment availability is being claimed, verify the deployed surface separately from repository CI; repository recovery alone is not evidence that production is healthy.

## Catalog and artifact boundaries

- A restored cache is only last-known-good web data; it cannot upgrade an artifact to `verified`.
- Missing or unreachable catalog data must remain UNKNOWN/degraded rather than being presented as PASS.
- Do not change StoreAMO, StoreAMO-Catalog, StoreAMO-Verify, signing material, release metadata, or APK assets as part of this recovery procedure.

## Rollback

If the recovery change causes a regression, revert the recovery PR/commit and rerun the canonical AutoCheck. Do not bypass CI or overwrite history to force a green state.

## Evidence

Record the branch/PR, exact commit SHA, CI run, and any independently verified deployment check in GitHub so the recovery state can be reconstructed without relying on chat history.
