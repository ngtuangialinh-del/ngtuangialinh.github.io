# Unit Test Execution Instructions

## Run All Automated Tests

```bash
npm test -- --run
```

Verified result:

- 16 test files pass.
- 46 tests pass.
- 0 tests fail.

Vitest reports results in the terminal. Coverage reporting is not configured, so no percentage or report directory is claimed.

## Focused Test Groups

### Navigation and Property-Based Tests

```bash
npx vitest run src/hooks/useSectionNavigation.pbt.test.ts src/templates/medical/ScoreDisplay.pbt.test.ts
```

These tests protect canonical eight-section hash round trips, malformed-hash fallback, score rendering, and stable property-test behavior.

### Privacy and Media Tests

```bash
npx vitest run src/test/content-privacy.test.ts src/utils/media.test.ts
```

These tests protect base-path URL resolution, restricted-value scanning, the public PDF allowlist, active-content markers, gallery/document-thumbnail metadata, initiative mappings, and 300KB image budgets.

### Evidence and PDF Interaction Tests

```bash
npx vitest run src/templates/medical/MedicalEvidence.test.tsx src/templates/medical/MedicalHero.test.tsx
```

These tests cover CV preview/download actions, first-page thumbnails, click-to-popup behavior, PDF iframe titles, sensitive summary-only evidence, dialog closure, and trigger focus restoration.

### Placeholder Contact Presentation

```bash
npx vitest run src/templates/medical/MedicalContact.test.tsx
```

This test checks the example email, LinkedIn, and location values; the visible placeholder disclosure; the absence of live outbound links; and the shared axe accessibility gate.

## Test Inventory

The suite includes:

- Application and eight-destination shell/navigation integration.
- Hero, Journey, Academics, Research, Community Care, Gallery, Evidence, and Contact component behavior.
- Contact placeholder disclosure, typed display values, and non-interactive example channels.
- Axe-based accessibility assertions for rendered components.
- Official IELTS 7.0 precedence and academic scale labels.
- Gallery lightbox and PDF dialog focus behavior.
- Theme-token contrast/structure and page metadata.
- Deterministic fast-check properties for navigation and score display.
- Release-blocking privacy and public-asset boundary checks.

## Fixing a Failure

1. Read the first failing assertion and its source path.
2. Rerun only that test file with `npx vitest run path/to/file.test.ts`.
3. Correct production code unless the approved requirement intentionally changed.
4. Rerun `npm test -- --run` before considering the failure resolved.
