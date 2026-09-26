# Change Assessment — Medical Student Portfolio

**Assessment date**: 2026-09-19  
**Scope**: Uncommitted application, test, asset, and AI-DLC documentation changes relative to `HEAD` (`2c8193c`)  
**Decision**: **Do not approve Code Generation yet. Corrective work is required.**

## Executive Assessment

The current changes contain a credible medical-content foundation and a visually stronger hero, but they are not release-ready. The worktree changes 132 tracked files, removes roughly 11,300 lines, and replaces most of the original runtime architecture. Local TypeScript, ESLint, Vitest, Vite build, and whitespace checks pass, but several tests encode the current implementation instead of the approved requirements. The enabled Property-Based Testing extension also has blocking non-compliance.

No application code was changed during this assessment.

## What Is Working

- The application now presents one medical-student identity with typed content modules.
- The six approved destinations render in the intended order.
- Inherited Engineering/Business identity is absent from the current runtime.
- The visual palette and typography are cohesive in both captured light and dark desktop views; the hero is the strongest section.
- The current local checks pass: 12 test files and 29 tests, ESLint, TypeScript/Vite build, and `git diff --check`.
- The default production build is 192.10 KB gzipped for JavaScript and 4.04 KB gzipped for CSS, within the documented 300 KB compressed bundle budget.
- The five gallery JPEGs are each below the documented 300 KB per-image limit.

## Blocking Findings

### B1 — Enabled PBT rules are not satisfied

The full Property-Based Testing extension is enabled, making non-compliance blocking.

- The deploy workflow runs `npm run build` only; it does not run Vitest, ESLint, the PBT files, or the post-build privacy test.
- No fixed seed or per-run seed logging is configured in CI, contrary to PBT-08.
- The claimed hash round-trip test only applies `resolveCanonicalHash` to a valid hash. It does not test a create/parse inverse pair as documented.
- Stateful UI behavior exists in the mobile menu and lightbox, but PBT-06 was neither implemented nor explicitly marked N/A with rationale.
- The Code Generation summary contains no mandatory PBT compliance table and was presented as complete despite these findings.

### B2 — The privacy gate is materially weaker than its specification

`src/test/content-privacy.test.ts` claims to detect identifiers, birth dates, addresses, phone numbers, and banking information, but its denylist contains only five narrow patterns: CV paths, MP4 references, IELTS scan/report wording, candidate-number wording, and identification-photo wording.

- It does not scan the whole public source surface described by MSP-NFR-02.
- It does not inspect image metadata. At least the curated JPEGs retain EXIF timestamps; metadata stripping was not demonstrated.
- The `dist/` check silently returns when `dist/` is absent. On a clean checkout, `npm test` alone therefore does not exercise the built artifact.
- CI never runs this test after building.
- The five public gallery photos remain a starter selection requiring explicit student approval; photographs of children and beneficiaries must not be treated as final merely because tests pass.

### B3 — Hash navigation does not implement the approved business workflow

`useSectionNavigation` canonicalizes the hash only once on mount. It does not listen for `hashchange` or `popstate`, does not explicitly scroll to the resolved section after React renders, and does not move focus to the section heading.

This conflicts with BR-1 and the Functional Design workflow, which require the same resolution path on initial load and hash change, followed by scroll/focus. The current tests only assert that an invalid initial hash is rewritten; they do not test direct-link scroll/focus or later invalid hash changes.

### B4 — GitHub Pages project-base-path support is broken for gallery media

Gallery URLs are hard-coded as `/gallery/...`. A verified build with `VITE_BASE_PATH=/portfolio-test/` rewrote the application assets under `/portfolio-test/` but left gallery URLs rooted at `/gallery/`. The images therefore break when deployed as a project site, despite MSP-NFR-07 and the existing deploy workflow explicitly supporting both user sites and project sites.

### B5 — Accessibility claims are not supported by the implementation or tests

- The skip-link class has no CSS definition, so the skip link is permanently visible; the captured mobile view shows it as stray text above the navigation.
- `#main-content` is not focusable, so the skip interaction does not reliably move keyboard focus.
- The mobile full-screen menu is a generic `Box`, not a dialog/navigation disclosure with focus containment, initial-focus placement, background inertness, or body-scroll locking.
- The implementation does not move focus to headings after section navigation as required.
- No test exercises dark mode, even though the design artifact says every section and the shell are checked in both modes.
- The test run emits repeated `HTMLCanvasElement.getContext()` not-implemented warnings. In jsdom this prevents the axe integration from proving real rendered color contrast, so a passing axe assertion is not evidence of WCAG 2.2 AA contrast.

## High-Priority Findings

### H1 — Gallery loading behavior contradicts the approved NFR

The Gallery is well below the initial viewport, but its first image is explicitly `loading="eager"`. The corresponding test requires that behavior. This contradicts MSP-FR-10 and the NFR design statement that all images outside the hero are lazy-loaded.

### H2 — Academic readout bars can visually misrepresent scores

`estimateReadoutPercent` divides every numeric value at or below 10 by 10. Its later `/9` IELTS branch is unreachable. IELTS bands are therefore plotted against 10 rather than the stated 0–9 scale, while the 27.20 admission score is rendered as 27.2% without a documented maximum. The text values are correct, but the decorative bars imply inaccurate comparisons.

### H3 — Planned and generated artifacts do not match

The Code Generation plan marks several nonexistent or incomplete outputs as complete:

- Six gallery images and two per initiative were planned; five exist, and `hematology-2` is still referenced by `communityCare.ts` without a matching gallery item.
- `MedicalNavigation.tsx` was planned; the implementation uses `MedicalSidebar.tsx`.
- `medical-theme.css` was planned; it does not exist because tokens were moved into `index.css`.
- A color-mode/no-flash test was marked complete; no such test exists in the current suite.
- The approved Application Design said the existing hash/layout service would be adapted; it was deleted and replaced with a new hook.

These changes may be defensible, but the plan was not updated and re-approved as required by the Code Generation rules.

### H4 — AI-DLC tracking is internally inconsistent

- Before this assessment, `aidlc-state.md` said the current phase was INCEPTION while the current stage was CONSTRUCTION. The active phase/status fields were corrected as part of session-continuity tracking; the stale foundation description remains evidence of broader drift.
- Its “Reused Foundation” section still says App owns journal routes, runtime template selection, and layout state, all of which were removed.
- The Application Design plan still has all six generation steps unchecked even though the stage is marked complete.
- The execution plan leaves completed later stages unchecked.
- Multiple audit entries share the placeholder timestamp `2026-09-17T00:00:00Z`, and three distinct user messages were combined into one “User Input” instead of being logged separately and verbatim.

This prevents the AI-DLC artifacts from serving as a dependable audit trail.

### H5 — The visual system is uneven beyond the hero

The hero is polished and comparable to the original site's level of finish. The remaining sections feel closer to themed prototypes:

- Academics is information-dense and uses visually misleading bars.
- Community Care mixes raw ISO dates with a human-readable date range.
- Gallery has an uneven five-card composition and still awaits ethical-photo approval.
- Contact uses a full viewport for a small placeholder card, leaving a large empty final screen.
- The switch between monitor, dossier, polaroid, and prescription metaphors creates variety but weakens the approved “cohesive, calm clinical editorial” direction.
- Tablet behavior is unverified; at the `md` breakpoint the fixed 232 px sidebar and three-column academic grid activate simultaneously, leaving narrow content columns.

## Other Findings

- The starter Vite favicon remains in `index.html`, which conflicts with the requirement to remove starter identity where practical.
- Gallery images do not provide responsive `srcset`/`sizes`, despite the responsive-image requirement.
- The production build emits Vite's warning for a 662.49 KB minified JavaScript chunk. It remains under the compressed budget but should be acknowledged rather than omitted.
- The next-section control uses `role="button"` on a `div` instead of a native button or link and scrolls without updating the hash.

## PBT Extension Compliance

| Rule | Status | Assessment |
| --- | --- | --- |
| PBT-01 | Non-compliant | Properties were listed globally, but stateful components and components with no properties were not evaluated individually or marked N/A. |
| PBT-02 | Non-compliant | The documented create/parse hash round trip is not implemented; the test checks identity normalization only. |
| PBT-03 | Partially compliant | Canonical-output and score-note invariants have generated checks, but navigation behavior is not tested end-to-end. |
| PBT-04 | Compliant | Canonical hash and score-resolution idempotence are tested with generated inputs. |
| PBT-05 | N/A | No optimized/reference algorithm pair requires an oracle. |
| PBT-06 | Non-compliant | Stateful menu/lightbox/navigation behavior was not evaluated with a model or explicitly ruled out with rationale. |
| PBT-07 | Compliant | Reusable typed generators exist in `src/test/generators.ts`. |
| PBT-08 | Non-compliant | PBT is absent from CI and no CI seed strategy is configured. |
| PBT-09 | Compliant | `fast-check` is selected, documented, and installed. |
| PBT-10 | Partially compliant | Example tests exist, but important direct-link, focus, color-mode, and responsive scenarios are missing. |

Because PBT-01, PBT-02, PBT-06, and PBT-08 are non-compliant, Code Generation cannot offer “Continue to Next Stage.”

## Recommended Recovery Sequence

1. Reconcile the AI-DLC plan and state with the actual intended architecture; keep Code Generation unapproved.
2. Fix privacy, CI/PBT, base-path, routing/focus, skip-link, mobile-menu, and gallery-loading blockers.
3. Correct or remove misleading academic bars and add relational-integrity tests for gallery/story IDs.
4. Rework visual hierarchy and responsive behavior section by section, preserving the strong hero while bringing the other sections to the same standard.
5. Obtain explicit approval for every public gallery photo after reviewing consent, dignity, cropping, and metadata.
6. Run build first, then the full test/privacy suite, lint, base-path verification, responsive visual checks, keyboard checks, dark/light checks, and `git diff --check`.
7. Update every plan checkbox, PBT compliance summary, state record, and audit entry before requesting Code Generation approval again.

## Verification Performed

- `npm test` — passed: 12 files, 29 tests; repeated canvas/contrast warnings observed.
- `npm run lint` — passed.
- `npm run build` — passed; 192.10 KB gzipped JS, 4.04 KB gzipped CSS; large-chunk warning observed.
- `git diff --check` — passed.
- `VITE_BASE_PATH=/portfolio-test/ npm run build` — passed, but demonstrated broken root-relative gallery URLs.
- Repository diff, source, tests, AI-DLC state/plans/audit, gallery dimensions/sizes, EXIF presence, and prior captured desktop/mobile screenshots were reviewed.
