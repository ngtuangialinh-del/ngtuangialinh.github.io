# NFR Design Plan — Medical Portfolio (medical-portfolio, U1–U11)

## Context Reviewed

- `aidlc-docs/construction/medical-portfolio/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/medical-portfolio/nfr-requirements/tech-stack-decisions.md`

## Plan Steps

- [x] Generate `aidlc-docs/construction/medical-portfolio/nfr-design/nfr-design-patterns.md` covering resilience, performance, and security implementation patterns.
- [x] Generate `aidlc-docs/construction/medical-portfolio/nfr-design/logical-components.md` covering the concrete build-time/test-time components implementing the NFRs.

## Questions

### Question 1 — Resilience Pattern (Graceful Degradation Mechanics)

BR-9 requires graceful degradation for missing optional content and unavailable storage. What concrete pattern should implement this?

A) Defensive optional-chaining/default-value rendering at the point of use (e.g., `contact.futureLinkPlaceholder?.href`, a try/catch around color-mode storage reads with an in-memory fallback) — no retry logic, no circuit breaker, since there is no network call to retry against (recommended)
B) Introduce a retry/circuit-breaker pattern for storage access
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 2 — Performance Pattern (Bundle/Asset Optimization Strategy)

To meet the 300KB budgets from NFR Requirements, what optimization strategy should the design specify?

A) Route-free single-bundle app (no code-splitting needed — it's one page, not multiple routes) relying on: Vite's default tree-shaking/minification, `loading="lazy"` on all below-the-fold `<img>` elements, and manually prepared web-sized image derivatives (not full-resolution originals) placed in the public asset directory (recommended)
B) Introduce route-based code-splitting and a dynamic-import strategy
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 3 — Security Pattern (Content Validation Implementation Shape)

How should the BR-8 content-validation gate be structured as a concrete pattern?

A) A dedicated Vitest test file (e.g., `src/test/content-privacy.test.ts`) that: (1) statically imports each `src/data/*.ts` module and asserts none of its string values match a defined denylist of restricted-pattern regexes, and (2) after `npm run build`, greps the `dist/` directory for the same denylist plus the two excluded video filenames — run as part of the standard test suite, not a separate CI job (recommended)
B) A separate custom CLI/script run outside the Vitest suite as an additional manual step
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 4 — Logical Component for Accessibility Verification

How should the axe-core accessibility checks (from NFR Requirements) be structured?

A) A shared test helper (e.g., `renderAndCheckA11y(component)`) used across each section's test file, wrapping Testing Library's render + an axe-core assertion — one shared helper rather than duplicated axe setup per test file (recommended)
B) Inline axe-core calls duplicated in every individual test file with no shared helper
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 5 — Logical Component for PBT Generators

Functional Design specified reusable domain generators for `SectionId`/hash values and score shapes. Where should these live?

A) A dedicated `src/test/generators.ts` (or similar) module exporting `fast-check` arbitraries for `SectionId`, hash strings (valid and malformed), and `LabeledScore`/`ScoreGroup` shapes, imported by every PBT test file — a single reusable location, per MSP-NFR-09's "reusable domain generators" requirement (recommended)
B) Redefine ad hoc arbitraries inline in each individual PBT test file
X) Other (describe after [Answer]: tag)

[Answer]: A

## Analysis of Answers

All five questions answered with the recommended option (A). No vagueness, contradiction, or missing detail:
- Q1 correctly avoids over-engineering resilience patterns (retry/circuit-breaker) that make no sense without a network call to retry.
- Q2 avoids introducing code-splitting complexity for a single-page static site with no multiple routes to split.
- Q3 keeps the privacy gate inside the standard test suite (as already decided in NFR Requirements: "run as part of the standard test suite, not a separate CI job"), avoiding a parallel, easy-to-forget manual process.
- Q4/Q5 both establish single shared, reusable locations (a11y helper, PBT generators) rather than duplicated logic per test file — directly satisfying MSP-NFR-05 (maintainability) and MSP-NFR-09 (reusable generators) respectively.

No follow-up questions required.

## Approval

Approved by user on 2026-09-17. Proceeding to generate NFR design artifacts.
