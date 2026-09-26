# Unit of Work Plan — Medical Student Portfolio Revamp

## Context

Single-package static React/Vite application (no microservices, no independently deployable backend). Per `application-design.md`, the design is one `MedicalShell` composing six section components over per-domain typed data modules. Units of work here represent logical development groupings within this one monolith, not separately deployable services.

## Plan Steps

- [x] Generate `aidlc-docs/inception/application-design/unit-of-work.md` with unit definitions and responsibilities.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md` with the dependency matrix between units.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md` mapping every story from `stories.md` to a unit.
- [x] Validate that every story (Epics A–N) is assigned to exactly one unit and that unit boundaries match the component boundaries in `application-design/components.md`.

## Questions

### Question 1 — Story Grouping Strategy

How should the ~45 approved stories be grouped into units of work for this single monolith?

A) One unit per section/epic group (Content & Data, Navigation & Shell, Introduction, Medical Journey, Academics, Community Care, Gallery, Contact, Color Mode, Legacy Removal, Cross-Cutting Quality) — mirrors the component boundaries from Application Design and keeps each unit independently completable and testable (recommended)
B) Two coarse units only: "New Medical Presentation" and "Legacy Removal" — minimizes documentation overhead for a small static site
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 2 — Dependency/Integration Approach

Since this is one deployable monolith, how should inter-unit dependencies be handled during construction?

A) Sequential-with-parallelism: the Content & Data unit and Navigation & Shell unit must land first (everything else depends on them); the five section units (Introduction, Medical Journey, Academics, Community Care, Gallery, Contact) can then proceed in parallel since they are mutually independent per `component-dependency.md`; Legacy Removal and Cross-Cutting Quality follow last (recommended)
B) Fully sequential — complete every unit strictly one at a time in an arbitrary fixed order
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 3 — Team/Ownership Alignment

Is there more than one contributor/team working on this construction effort, requiring unit boundaries to reflect ownership handoffs?

A) Single contributor (the AI-DLC construction flow acting alone or with the student owner reviewing) — no team-boundary constraints needed; units are purely for planning/tracking clarity, not parallel-team assignment (recommended)
B) Multiple contributors/teams — unit boundaries must be assignable to different owners
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 4 — Technical/Deployment Considerations Across Units

Do any units have different scalability, deployment, or runtime requirements from the others?

A) No — every unit ships as part of the same static `dist/` artifact via the same existing GitHub Pages build; no unit has independent deployment or scaling needs (recommended)
B) Yes — one or more units require separate build/deploy handling
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 5 — Business Domain / Bounded Context Alignment

Should unit boundaries follow the visitor-facing domain boundaries (identity, academics, service, evidence) established in Requirements and Application Design, or a different technical grouping (e.g., by file type)?

A) Follow the visitor-facing domain/component boundaries already established in `requirements.md` and `application-design/components.md` (recommended) — keeps traceability direct from requirement → story → unit → component
B) Group instead by technical file type (e.g., "all data files," "all components," "all tests") regardless of domain
X) Other (describe after [Answer]: tag)

[Answer]: A

## Analysis of Answers

All five questions answered with the recommended option (A). No vagueness, contradiction, or missing detail:
- Q1 gives 11 units matching the component/epic boundaries already established, keeping traceability tight without introducing a decomposition scheme disconnected from prior stages.
- Q2 correctly identifies that Content & Data and Navigation & Shell are the only true blocking dependencies (per `component-dependency.md`'s "MedicalShell is the sole integration point" finding); the five section units are confirmed independent and parallelizable.
- Q3 avoids inventing team-ownership constraints that don't exist for this project.
- Q4 confirms the existing single static-build/deploy model is unaffected — consistent with the execution plan's SKIP decision for Infrastructure Design.
- Q5 keeps unit boundaries aligned with the requirement IDs and stories rather than an arbitrary technical split, supporting full traceability per the approved story-generation answers (Question 6: full mapping).

No follow-up questions required.

## Approval

Approved by user on 2026-09-17. Proceeding to Units Generation (Part 2).
