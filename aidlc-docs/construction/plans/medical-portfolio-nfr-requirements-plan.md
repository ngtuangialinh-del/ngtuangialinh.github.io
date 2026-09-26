# NFR Requirements Plan — Medical Portfolio (medical-portfolio, U1–U11)

## Context Reviewed

- `aidlc-docs/construction/medical-portfolio/functional-design/` (business logic, rules, entities, frontend components)
- `aidlc-docs/inception/requirements/requirements.md` (MSP-NFR-01 through MSP-NFR-10)

This is a static, backend-free, single-visitor-at-a-time client-rendered site. Most classic backend NFR categories (scalability under concurrent load, availability/failover, throughput) are not applicable in their usual sense; the plan below scopes each category honestly rather than forcing irrelevant answers.

## Plan Steps

- [x] Generate `aidlc-docs/construction/medical-portfolio/nfr-requirements/nfr-requirements.md` covering accessibility, privacy/security, performance, reliability, and maintainability targets.
- [x] Generate `aidlc-docs/construction/medical-portfolio/nfr-requirements/tech-stack-decisions.md` covering the PBT framework choice and any new libraries (or explicit "no new dependency" decisions).

## Questions

### Question 1 — Scalability (N/A scoping check)

This is a static site with no backend and no concurrent-user capacity concern. Is there any scalability dimension that still applies (e.g., asset/bundle size growth as more gallery images or future content are added)?

A) Only asset/content growth matters — treat "scalability" here as "the typed content model and image pipeline must not degrade as more gallery images or stories are added later," not user-concurrency scaling (recommended)
B) No scalability NFR applies at all; skip this category entirely
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 2 — Performance Benchmarks

MSP-NFR-03 requires excluding ~45MB of video and using responsive/lazy-loaded images, but sets no numeric target. Should NFR Requirements set a concrete performance budget?

A) Set concrete budgets: initial JS+CSS bundle under 300KB gzipped (excluding images), each gallery image derivative under 300KB, and report actual `dist/` sizes plus any Vite build warnings at Build and Test time (recommended) — gives MSP-NFR-03's "fast initial render on typical mobile connections" a measurable target
B) No numeric budget — rely only on qualitative review ("looks fast enough")
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 3 — Availability / Disaster Recovery

GitHub Pages hosting has no custom uptime SLA. Should this NFR stage define any availability/DR requirement?

A) No dedicated availability/DR requirement beyond what GitHub Pages already provides; the only "recovery" mechanism relevant here is version-control revert, already covered by the execution plan's risk assessment (recommended)
B) Define a custom uptime/DR requirement and monitoring plan
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 4 — Security / Threat Model

There is no backend, database, or authentication. What is the actual security-relevant threat model for this change?

A) The threat model is data exposure, not intrusion: the only security-relevant risk is sensitive CV evidence or restricted values leaking into the public repository/build (already covered by MSP-FR-11, MSP-NFR-02, and BR-8's release-blocking content-validation gate). No authentication, authorization, or network-security NFRs apply (recommended)
B) Treat this as a full web-security review scope (CSP headers, XSS/CSRF threat modeling, dependency vulnerability scanning, etc.)
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 5 — Reliability / Monitoring

Should any runtime error monitoring/alerting (e.g., a client-side error tracker) be introduced for this static site?

A) No new monitoring/alerting dependency — reliability is achieved through BR-9's graceful-degradation rules and the build-time test suite (example-based + PBT), not runtime observability tooling, consistent with MSP-NFR-06's "no dependency on... external content API" and avoiding scope creep (recommended)
B) Introduce a client-side error-tracking service/library
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 6 — PBT Framework and Tech Stack Selection

MSP-NFR-09 names `fast-check` as the preferred PBT framework candidate. Should NFR Requirements confirm this choice now, and are any other new libraries needed (e.g., an image-optimization tool for gallery derivatives)?

A) Confirm `fast-check` as the PBT framework (Vitest-compatible, well-maintained, satisfies MSP-NFR-09's shrinking/reproducible-seed requirements) and use only build-time asset handling already available via Vite's built-in asset pipeline for image derivatives — no new image-optimization library added, keeping the dependency surface unchanged, consistent with MSP-NFR-03's "avoid adding a large... dependency" (recommended)
B) Add `fast-check` plus a dedicated image-optimization library (e.g., `sharp` or a Vite image plugin) for generating responsive derivatives
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 7 — Accessibility Verification Method

MSP-NFR-01 targets WCAG 2.2 AA. Should this be verified only through manual review plus the existing Testing Library assertions, or should an automated accessibility-assertion library (e.g., `jest-axe`/`vitest-axe` equivalent) be added?

A) Add an automated accessibility-assertion check (e.g., an axe-core-based Vitest integration) alongside manual review, since WCAG 2.2 AA contrast/structure checks are otherwise easy to regress silently and MSP-NFR-10 requires "focused accessibility... regression tests" (recommended)
B) Rely on manual review and existing Testing Library role/label queries only, no new automated a11y-assertion dependency
X) Other (describe after [Answer]: tag)

[Answer]: A

## Analysis of Answers

All seven questions answered with the recommended option (A). No vagueness, contradiction, or missing detail:
- Q1/Q3/Q5 correctly scope classic backend NFR categories (scalability-under-load, availability/DR, runtime monitoring) as not applicable to a static site, rather than forcing an artificial answer.
- Q2 gives MSP-NFR-03's qualitative performance language a measurable budget.
- Q4 correctly reframes "security" around the actual risk (data exposure via BR-8), not an irrelevant network-security scope.
- Q6 confirms `fast-check` per MSP-NFR-09's own stated preference and avoids adding an unnecessary image-optimization dependency, consistent with MSP-NFR-03.
- Q7 adds one new, narrowly scoped test dependency (an axe-based accessibility assertion) directly justified by MSP-NFR-10's mandatory "focused accessibility... regression tests."

No follow-up questions required.

## Approval

Approved by user on 2026-09-17. Proceeding to generate NFR requirements artifacts.
