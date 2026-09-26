# Tech Stack Decisions — Medical Portfolio

## Property-Based Testing Framework

- **Decision**: `fast-check`, integrated with the existing Vitest test runner.
- **Rationale**: Named as the preferred candidate in MSP-NFR-09; TypeScript-native, Vitest-compatible, supports shrinking and seeded reproducibility out of the box.
- **Scope of use**: The four accepted PBT candidates from Functional Design — section hash creation/parsing round trip, navigation-to-section invariant, unknown-route fallback invariant, idempotent score/content normalization (BR-1, BR-2).
- **Generators**: Reusable domain generators for `SectionId`/hash values and `LabeledScore`/`ScoreGroup` shapes, per MSP-NFR-09's "reusable domain generators rather than unconstrained primitives" requirement — not ad hoc per-test generators.
- **CI requirement**: Shrinking enabled; failing seeds logged and reproducible; any discovered minimal counterexample converted into a permanent example-based regression test (MSP-NFR-09).

## Accessibility Assertion Library

- **Decision**: Add an axe-core-based Vitest integration (e.g., `vitest-axe` or equivalent axe-core wrapper compatible with the existing jsdom/Testing Library setup).
- **Rationale**: MSP-NFR-10 requires "focused accessibility... regression tests"; automated axe checks catch contrast/structure/landmark regressions that manual review alone would miss over time.
- **Scope of use**: Run against each rendered section (`Hero`, `MedicalJourney`, `Academics`, `CommunityCare`, `Gallery`, `Contact`) and the composed `MedicalShell` in both light and dark color modes.

## Image Asset Pipeline

- **Decision**: No new image-optimization library. Use Vite's existing built-in static asset handling for the curated gallery images.
- **Rationale**: MSP-NFR-03 explicitly discourages adding a large dependency for decorative/media effects; the curated image set is small (a "carefully selected subset," not a bulk media library), so Vite's default asset pipeline plus manually-prepared web-compatible derivatives is sufficient.

## Content Validation Utility

- **Decision**: Implemented as plain Vitest test code (no new dependency) — Node's built-in `fs`/`path` APIs to scan `src/data/*.ts` source and the built `dist/` output for restricted patterns (BR-8).
- **Rationale**: This is a narrowly scoped, project-specific check; a general-purpose secret-scanning dependency is unnecessary overhead for the small, well-defined pattern set involved (raw CV path fragments, restricted-value patterns, two known video filenames).

## No Other New Dependencies

- No new routing library, state-management library, animation library, or CSS framework is introduced. The existing hash-routing hook, React state, and current styling approach (per Application Design/Functional Design) are reused and adapted, consistent with MSP-NFR-05 and MSP-NFR-07's compatibility requirements.
