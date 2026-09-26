# NFR Design Patterns — Medical Portfolio

## Resilience Pattern: Defensive Rendering (BR-9)

- **Pattern**: Optional-chaining/default-value rendering at the point of use, not a retry or circuit-breaker pattern (there is no network call to retry).
- **Applications**:
  - `Contact` renders its future-link slot only when `contact.futureLinkPlaceholder` is present (`contact.futureLinkPlaceholder?.href`).
  - `Gallery`/`CommunityCare` render optional `dateOrPeriod`/`period` fields only when present, with no placeholder text implying a missing value is an error.
  - Color-mode preference reads are wrapped in a try/catch; on failure (storage unavailable or blocked), the app falls back to a safe default (system preference or light mode) held in memory for that session, never throwing.

## Performance Pattern: Single-Bundle, Lazy-Media Static Site

- **Pattern**: No code-splitting/dynamic-import strategy — this is one page, not multiple routes, so route-based splitting adds complexity without benefit.
- **Applications**:
  - Rely on Vite's default production build (tree-shaking, minification) to meet the 300KB gzipped bundle budget.
  - All `<img>` elements outside the `Hero` section use `loading="lazy"`.
  - Gallery image assets are manually prepared web-sized derivatives (not full-resolution originals) placed in the curated public asset directory (U1) — this is an authoring-time step, not a runtime image-processing pipeline, per the NFR Requirements decision to avoid a new image-optimization dependency.

## Security Pattern: In-Suite Content Validation Gate (BR-8)

- **Pattern**: The privacy/evidence safeguard runs as an ordinary Vitest test, not a separate script or CI job — it is release-blocking by virtue of being part of the standard `npm run test` suite that MSP-NFR-10 already requires to pass.
- **Structure**:
  1. A dedicated test file statically imports each `src/data/*.ts` module and asserts none of its string values match a defined denylist of restricted-value regex patterns (identifiers, birth-date-like patterns, phone/bank-like patterns, raw CV path fragments, the two excluded video filenames).
  2. A second assertion set, run after `npm run build`, scans the `dist/` output directory for the same denylist.
  3. Any match produces a failing assertion naming the offending file and matched pattern (never a silent warning).

## Accessibility Verification Pattern

- **Pattern**: A single shared test helper wraps Testing Library's render output with an axe-core accessibility check, reused across every section's test file rather than duplicated per file.
- **Coverage**: Each of the six sections, `MedicalShell` as a whole, and both color modes are run through this helper.

## Property-Based Testing Pattern

- **Pattern**: A single shared generators module provides `fast-check` arbitraries for the domain types identified in Functional Design (`SectionId`, valid/malformed hash strings, `LabeledScore`/`ScoreGroup` shapes), reused by every PBT test file rather than redefined inline.
- **Properties covered**: hash round-trip (BR-1), navigation-to-section invariant (BR-1), unknown-route fallback invariant (BR-1), idempotent score/content normalization (BR-2).
- **CI behavior**: Shrinking enabled by default in `fast-check`; failing seeds logged; any discovered counterexample is added as a permanent example-based regression test per MSP-NFR-09.
