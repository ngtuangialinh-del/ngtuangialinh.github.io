# Application Design Plan — Medical Student Portfolio Revamp

## Purpose

Identify the high-level components, methods, services, and dependencies needed to replace the dual-presentation (Engineering/Business) template with the single medical presentation, per the approved requirements and stories. Detailed business logic is deferred to Functional Design (CONSTRUCTION).

## Context Reviewed

- `aidlc-docs/inception/requirements/requirements.md`
- `aidlc-docs/inception/user-stories/stories.md` and `personas.md`
- Existing structure: `src/templates/{engineering,business}`, `src/components/shared`, `src/components/ui`, `src/data`, `src/hooks`, `src/types`

## Plan Steps

- [ ] Generate `components.md` — one `MedicalTemplate` shell plus one component per navigation destination (Introduction/Hero, Medical Journey, Academics, Community Care, Gallery, Contact), plus shared primitives reused or introduced (Navigation, MobileNav, ColorModeToggle, GalleryLightbox).
- [ ] Generate `component-methods.md` — method/prop signatures for each component (high-level only).
- [ ] Generate `services.md` — content-provider/orchestration layer (typed data access, hash-routing/navigation service, color-mode service, gallery-lightbox service).
- [ ] Generate `component-dependency.md` — dependency matrix and data flow from typed data → components → shell.
- [ ] Generate `application-design.md` consolidating the above.
- [ ] Validate design completeness/consistency against MSP-FR-01 through MSP-FR-18 and the approved stories.

## Questions

### Question 1 — Component Organization

Should the six sections be organized as one new `src/templates/medical/` directory (mirroring the existing `business`/`engineering` pattern), or moved up as top-level `src/components/sections/` since there is now only one presentation?

A) Keep `src/templates/medical/` mirroring the existing pattern, for minimal structural churn and easy diffing against the retired templates (recommended)
B) Flatten into `src/components/sections/` since a single-presentation architecture no longer needs a `templates/` abstraction layer
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 2 — Shell/Selector Replacement

The existing `PortfolioStyleSelector` and per-template `Shell` components (`BusinessShell`, `EngineeringShell`) must be retired. Should the new single shell be a thin `MedicalShell` that composes the six sections directly, or should the app root render sections without any shell wrapper at all?

A) A thin `MedicalShell` component that composes the six sections in order, owns the skip link and top-level landmarks, and is the only template the app ever renders (recommended)
B) No shell component — the app root renders the six sections directly with no intermediate composition layer
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 3 — Gallery Lightbox Ownership

MSP-FR-10/F4 require an accessible gallery lightbox with focus trap. Should this be a new shared UI primitive reusable beyond the Gallery section, or a Gallery-local component?

A) New shared primitive in `src/components/ui/` (e.g., `lightbox.tsx`) so any future section could reuse accessible dialog behavior (recommended)
B) Gallery-local component colocated with the Gallery section, since it is the only current consumer
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 4 — Content Data Module Granularity

Should the new typed content (identity, academics, community-care stories, gallery metadata, contact placeholder) live in one consolidated `src/data/medical.ts`, or be split into one file per content domain (mirroring the existing `about.ts`/`education.ts`/`awards.ts` split)?

A) Split into one file per domain: `identity.ts`, `academics.ts`, `communityCare.ts`, `gallery.ts`, `contact.ts` — consistent with the existing per-domain data file convention and easiest for the non-developer student owner (P3) to edit in isolation (recommended)
B) One consolidated `medical.ts` file for all content, minimizing file count
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 5 — Navigation/Hash-Routing Service Reuse

The existing `usePortfolioLayout` hook and hash-routing/scroll logic currently serve a multi-template app. Should Application Design treat navigation/hash-routing as a reused existing service (adapted, not redesigned), or as a new service to be designed fresh for the single-presentation model?

A) Treat it as a reused existing service — adapt `usePortfolioLayout` (and related hash utilities) to the six fixed medical sections rather than redesigning routing from scratch; Functional Design will detail the specific hash/fallback behavior changes (recommended)
B) Design a new navigation service from scratch, replacing `usePortfolioLayout` entirely
X) Other (describe after [Answer]: tag)

[Answer]: A

### Question 6 — Service Layer Boundary for Privacy/Evidence Safeguards

MSP-FR-11/K1-K3 require verifiable absence of sensitive data from the build. Should this be modeled as an explicit "content validation" service/utility invoked at build or test time, or treated purely as a manual review/process concern with no dedicated service?

A) Model it as a lightweight content-validation utility (e.g., a test-time check that scans public data modules for restricted-value patterns) documented in `services.md`, since MSP-NFR-10 requires focused privacy regression tests anyway (recommended)
B) Treat it purely as manual review/process; no dedicated service or utility documented in Application Design
X) Other (describe after [Answer]: tag)

[Answer]: A

## Analysis of Answers

All six questions were answered with the recommended option (A). No vagueness, contradiction, or missing guidance was found:
- Q1/Q2 keep structural churn minimal by mirroring the existing template pattern with one thin shell.
- Q3 makes the lightbox a reusable shared primitive, consistent with existing `src/components/ui/` conventions (tooltip, toaster, color-mode already live there).
- Q4 keeps content edit-friendly for the non-developer student owner (P3), consistent with `[[personas.md]]` and MSP-NFR-05.
- Q5 avoids redesigning working hash-routing logic prematurely — deferred detail to Functional Design, consistent with the Application Design purpose statement (high-level only).
- Q6 gives MSP-NFR-10's required privacy regression tests a concrete home without over-engineering a full validation framework.

No follow-up questions required.

## Approval

Approved by user on 2026-09-17. Proceeding to generate the mandatory design artifacts.
