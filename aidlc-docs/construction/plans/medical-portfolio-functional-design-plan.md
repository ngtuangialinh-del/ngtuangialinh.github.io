# Functional Design Plan — Medical Portfolio (Units U1–U11)

## Scoping Decision

Units U1–U11 (`unit-of-work.md`) implement one tightly coupled, small static application (a single `MedicalShell` over per-domain content modules — see `application-design/component-dependency.md`, which found no cross-section coupling but a shared integration point). Rather than producing 11 near-duplicate functional-design folders, this plan treats them as one Functional Design unit named `medical-portfolio`, with each artifact internally organized by unit/section so traceability back to U1–U11 and the story map is preserved. This mirrors the same "single monolith, logical groupings" reasoning already approved in Units Planning (Question 1/3).

## Plan Steps

- [x] Generate `aidlc-docs/construction/medical-portfolio/functional-design/business-logic-model.md` — hash-routing/navigation logic, score-labeling/normalization logic, gallery lazy-load/lightbox logic, color-mode logic (reused), content-validation logic.
- [x] Generate `aidlc-docs/construction/medical-portfolio/functional-design/business-rules.md` — validation and constraint rules per section (score display rules, collective-attribution rules, privacy/asset rules, fallback rules).
- [x] Generate `aidlc-docs/construction/medical-portfolio/functional-design/domain-entities.md` — entities/relationships for identity, academic score, journey milestone, community story, gallery image, contact placeholder, nav destination.
- [x] Generate `aidlc-docs/construction/medical-portfolio/functional-design/frontend-components.md` — component hierarchy, state, interaction flows, and validation for all U2–U8 components plus `Lightbox`.
- [x] Validate every applicable PBT candidate flagged in Application Design (`services.md`) is either specified here or explicitly deferred to NFR Design with rationale.

## Questions

### Question 1 — Hash Fallback Behavior (Business Logic Modeling / Business Scenarios)

MSP-FR-17 requires unknown/malformed hashes to fall back "predictably." What exactly should the fallback target and mechanism be?

A) Fall back to the Introduction section and rewrite the URL hash to the canonical `#introduction` (or empty) value, so the address bar reflects the actual displayed section (recommended)
B) Fall back to Introduction but leave the invalid hash in the URL unchanged, only visually scrolling to Introduction
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 2 — Score Normalization/Display Rule (Business Rules)

Academic scores come from different scales (IGCSE grades/percentages, IELTS bands, Grade 12 decimal scores, one admission score). Should score rendering be driven by one shared `LabeledScore`/`ScoreGroup` rule set (a single normalization rule: always render value + scale/label together, never a bare number), or should each score type have bespoke, one-off rendering rules per section?

A) One shared display rule: every score is always rendered as `{value}` immediately paired with its `{scaleNote}`/group label, enforced by a single `Academics`/`MedicalJourney` rendering rule rather than per-score bespoke logic — directly satisfies MSP-FR-08's "explain the type of score where a number could otherwise be misread" (recommended)
B) Bespoke per-score-type rendering logic with no shared rule
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 3 — Collective-Attribution Rule Enforcement (Business Rules / Domain Model)

MSP-FR-09 requires community-care copy to avoid attributing group outcomes solely to the student. Should `CommunityStory.attribution` be a first-class field the component renders as an explicit disclosure (e.g., a "collective effort" note), or should collective framing be purely a copywriting convention with no structural field?

A) Keep `attribution: "collective" | "individual"` as a first-class field (already defined in Application Design's `component-methods.md`) and require `CommunityCare` to render a visible collective-effort acknowledgment whenever `attribution === "collective"` — makes the business rule testable rather than relying solely on prose review (recommended)
B) Drop the structural field; rely entirely on manually reviewed copywriting with no enforced rendering rule
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 4 — Gallery Lightbox State Model (Frontend Components / Data Flow)

Should the active lightbox image be modeled as an id reference looked up against the gallery data (`activeImageId: string | null`), or as the full image object held directly in state (`activeImage: GalleryImage | null`)?

A) Store `activeImageId: string | null` in `Gallery` and look up the full `GalleryImage` before passing it to `Lightbox` — keeps a single source of truth in the `gallery.ts` data module and avoids state/data drift (recommended)
B) Store the full `GalleryImage` object directly in state
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 5 — Content-Validation Utility Failure Mode (Error Handling)

When the U11 content-validation utility (from `application-design/services.md`) finds a restricted-value pattern in `src/data/*.ts` or `dist/`, how should it fail?

A) Fail the Vitest test run with a clear assertion message naming the offending file/pattern — treated as a release-blocking test failure, consistent with MSP-NFR-10's mandatory verification commands (recommended)
B) Log a warning only, without failing the test suite
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 6 — PBT Candidate Disposition (per MSP-NFR-09 and Application Design's flagged candidates)

Application Design flagged four PBT candidates: (1) section hash creation/parsing round trip, (2) navigation-to-section invariant, (3) unknown-route fallback invariant, (4) idempotent content normalization. Should Functional Design validate/reject all four now, or defer the accept/reject decision to NFR Design (which owns PBT framework selection)?

A) Functional Design validates all four candidates now as applicable (each maps to concrete business logic already specified in this plan: hash routing in Q1, and content normalization in Q2's shared score-display rule), and NFR Design then owns HOW they are implemented with `fast-check` (framework mechanics, generators, shrinking, CI seeds) — keeps business-logic validation and NFR/tooling concerns cleanly separated (recommended)
B) Defer all four candidates' validate/reject decision entirely to NFR Design
X) Other (describe after [Answer]: tag)

[Answer]: A

## Analysis of Answers

All six questions answered with the recommended option (A). No vagueness, contradiction, or missing detail:
- Q1 gives the hash-fallback business rule a concrete, testable definition (canonical URL rewrite) satisfying MSP-FR-17.
- Q2 establishes one shared score-display rule rather than N bespoke rules, directly serving MSP-FR-08's misreading-prevention requirement and reducing implementation surface.
- Q3 makes the collective-attribution requirement (MSP-FR-09) structurally enforceable rather than only reviewable.
- Q4 avoids a state/data duplication bug class by keeping the gallery data module the single source of truth.
- Q5 makes the privacy safeguard release-blocking, consistent with MSP-NFR-10's "must pass" verification list.
- Q6 cleanly separates business-logic validation (this stage) from PBT tooling mechanics (NFR Design), consistent with the Functional Design purpose statement ("technology-agnostic design").

No follow-up questions required.

## Approval

Approved by user on 2026-09-17. Proceeding to generate functional design artifacts.
