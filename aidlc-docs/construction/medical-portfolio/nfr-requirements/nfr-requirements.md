# NFR Requirements — Medical Portfolio

Scoped per `nfr-requirements-plan.md`. This is a static, backend-free client site; requirements below are scoped honestly to what applies, per the approved answers.

## Scalability

- **Requirement**: The typed content model (per-domain data modules) and image asset pipeline must not degrade in maintainability or performance as additional gallery images or community-care stories are added in the future.
- **Not applicable**: Concurrent-user capacity, request throughput, auto-scaling — there is no server to scale.

## Performance

- **Requirement**: Initial JS+CSS bundle (excluding images) stays under 300KB gzipped.
- **Requirement**: Each gallery image derivative stays under 300KB.
- **Requirement**: Both supplied MP4 files (≈45MB total) are excluded from the build (MSP-NFR-03, BR-6).
- **Requirement**: Images outside the hero use lazy loading (F3); the hero itself is not lazy-loaded.
- **Verification**: Build and Test reports actual `dist/` artifact sizes and any Vite build warnings.

## Availability / Disaster Recovery

- **Requirement**: None beyond what GitHub Pages already provides. Recovery mechanism is a version-control revert of the change's commits (per the execution plan's risk assessment), not a custom uptime/DR plan.

## Security

- **Threat model**: Data exposure of sensitive CV evidence or restricted values into the public repository or build — not network intrusion, authentication, or authorization (there is none).
- **Requirement**: BR-8's content-validation utility (release-blocking) is the primary security control, verifying `src/data/*.ts` and `dist/` contain no raw CV path fragments, restricted-value patterns, or references to the two excluded MP4 files.
- **Not applicable**: CSP headers, XSS/CSRF threat modeling, dependency-vulnerability scanning beyond standard `npm audit` hygiene already implied by MSP-NFR-10's dependency installation step.

## Reliability

- **Requirement**: Graceful degradation for all optional content (BR-9) — no thrown errors from missing optional fields or unavailable browser storage.
- **Requirement**: The build-time example-based and property-based test suite is the reliability verification mechanism; no runtime error-tracking/monitoring dependency is introduced (consistent with MSP-NFR-06's no-external-dependency requirement).

## Maintainability

- **Requirement**: Content lives in per-domain typed data modules (U1), reviewable and editable independently of presentation code (MSP-NFR-05).
- **Requirement**: Design tokens (colors, spacing, motion) are centralized, not duplicated as literals across components (N2).
- **Requirement**: The obsolete dual-presentation architecture is fully removed, not hidden behind dead branches (MSP-NFR-05, I1–I3).

## Usability / Accessibility

- **Requirement**: WCAG 2.2 AA targets for contrast, keyboard access, visible focus, structure, and responsive reflow (MSP-NFR-01).
- **Requirement**: `prefers-reduced-motion` respected; no essential information conveyed only through motion or color.
- **Requirement**: One logical page heading with ordered subheadings inside semantic landmarks.
- **Requirement**: Gallery `Lightbox` traps and restores focus and closes by keyboard (F4).
- **Verification method**: Automated axe-core-based accessibility assertions added to the Vitest suite, alongside manual review and existing Testing Library role/label queries (per approved Question 7).

## Tests Required for NFR Verification (feeds MSP-NFR-10)

- Bundle-size and asset-size checks against the performance budgets above.
- The BR-8 content-validation test (privacy/security gate).
- Axe-core accessibility assertions per rendered section.
- Reduced-motion and responsive-overflow checks (M1, M2, L1).
- The four accepted PBT properties from Functional Design (hash round-trip, nav-to-section invariant, unknown-route fallback, idempotent score normalization), implemented per `tech-stack-decisions.md`.
