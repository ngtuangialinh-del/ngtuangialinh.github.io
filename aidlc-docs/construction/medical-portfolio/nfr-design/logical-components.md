# Logical Components — Medical Portfolio (NFR Design)

Concrete build-time/test-time components that implement the patterns in `nfr-design-patterns.md`. None of these are runtime services — all are development-time/test-time constructs consistent with this being a static, backend-free site (MSP-NFR-06, MSP-NFR-07).

## `src/test/content-privacy.test.ts` (Security Pattern)

- **Role**: Implements the BR-8 content-validation gate.
- **Inputs**: All `src/data/*.ts` modules; the built `dist/` directory (present only after `npm run build`, so this suite's dist-scanning assertions run in the Build and Test stage).
- **Behavior**: Denylist-pattern scan (see `nfr-design-patterns.md`); fails the Vitest run on any match.
- **Owning unit**: U11 (Cross-Cutting Quality).

## `src/test/a11y-helpers.ts` (Accessibility Pattern)

- **Role**: Exports `renderAndCheckA11y(ui: ReactElement)` — a shared helper combining Testing Library's `render` with an axe-core accessibility assertion.
- **Consumers**: Test files for `Hero`, `MedicalJourney`, `Academics`, `CommunityCare`, `Gallery`, `Contact`, `MedicalShell`.
- **Owning unit**: U11, invoked from each section's own test file (U3–U8).

## `src/test/generators.ts` (Property-Based Testing Pattern)

- **Role**: Exports `fast-check` arbitraries: `sectionIdArbitrary`, `validHashArbitrary`, `malformedHashArbitrary`, `labeledScoreArbitrary`, `scoreGroupArbitrary`.
- **Consumers**: PBT test files covering hash-routing (U2) and score-display normalization (U4/U5).
- **Owning unit**: U11, consumed by U2/U4/U5 test files.

## Defensive Rendering Helpers (Resilience Pattern)

- **Role**: Not a shared utility module — this pattern is applied inline at each point of use (optional chaining, try/catch around storage reads) within `Contact`, `Gallery`, `CommunityCare`, and the color-mode provider, per the NFR Design Plan's Question 1 answer (no shared abstraction needed for simple defensive checks).
- **Owning units**: U8 (Contact), U7 (Gallery), U6 (CommunityCare), U9 (Color Mode Verification).

## Build-Time Asset Preparation (Performance Pattern)

- **Role**: Not a runtime component — a documented authoring step: selected service photographs are manually resized/compressed into web-sized derivatives before being placed in the curated public asset directory.
- **Owning unit**: U1 (Content & Data Foundation).

## Component Interaction Summary

```
npm run test
 ├── content-privacy.test.ts   → scans src/data/*.ts (always) and dist/ (post-build)
 ├── <section>.test.tsx        → uses a11y-helpers.ts for axe checks
 └── hash-routing.pbt.test.ts,
     score-display.pbt.test.ts → uses generators.ts for fast-check arbitraries
```

No logical component here introduces a queue, cache, circuit breaker, or other runtime infrastructure element — none are applicable to a static site with no backend (per NFR Requirements' scoping of resilience/scalability/availability as largely not-applicable categories).
