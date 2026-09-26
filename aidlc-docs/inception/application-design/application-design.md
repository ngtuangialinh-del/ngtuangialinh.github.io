# Application Design — Medical Student Portfolio Revamp

Consolidated summary. See `components.md`, `component-methods.md`, `services.md`, and `component-dependency.md` for full detail. Approved decisions are recorded in `aidlc-docs/inception/plans/application-design-plan.md`.

## Architecture Summary

The dual-presentation (`Engineering`/`Business`) template architecture and its `PortfolioStyleSelector` are retired. A single `MedicalShell` composes six section components — `Hero` (Introduction), `MedicalJourney`, `Academics`, `CommunityCare`, `Gallery`, `Contact` — under `src/templates/medical/`, mirroring the existing per-template directory convention for minimal structural churn.

## Components (see `components.md`)

`MedicalShell`, `Navigation`, `MobileNav`, `Hero`, `MedicalJourney`, `Academics`, `CommunityCare`, `Gallery`, `Contact`, and a new shared `Lightbox` primitive (`src/components/ui/lightbox.tsx`) for accessible gallery expansion. Existing shared primitives (`ContentCard`, `SectionShell`, color mode) are reused; `PortfolioStyleSelector` and all `Business*`/`Engineering*`/journal components are retired.

## Component Methods (see `component-methods.md`)

Each section component takes one typed content prop matching its domain data module. `Navigation`/`MobileNav` take the shared ordered destination list plus the active section id. `Lightbox` is a generic dialog taking the active gallery item and a close handler.

## Services (see `services.md`)

- Five per-domain typed content data modules (`identity.ts`, `academics.ts`, `communityCare.ts`, `gallery.ts`, `contact.ts`) plus a reused `navigation.ts`.
- The existing `usePortfolioLayout` hash-routing hook is adapted (not redesigned) to the six fixed sections; Functional Design will detail fallback/focus behavior and validate PBT candidates.
- The existing color-mode provider is reused unmodified.
- A new test-time content-validation utility gives the privacy/evidence safeguards (MSP-FR-11, MSP-NFR-02) a concrete home in the Vitest suite.

## Dependencies (see `component-dependency.md`)

Strict top-down data flow: each section depends only on its own content module and is otherwise independent of sibling sections, consistent with the INVEST story set. `MedicalShell` is the sole integration point. All dependencies on the retired style-selector/template-persistence mechanism are removed.

## Requirement Coverage

This design addresses: MSP-FR-01 through MSP-FR-18 (single presentation, navigation, hero, journey, academics, community care, gallery, evidence privacy, video exclusion, contact, color mode, design system, legacy removal, direct-link behavior, metadata) and lays the structural groundwork for MSP-NFR-01 (accessibility, via `Lightbox` and skip link ownership in `MedicalShell`), MSP-NFR-02 (privacy, via the content-validation utility), MSP-NFR-05 (maintainability, via per-domain typed data), and MSP-NFR-09 (PBT candidates flagged for Functional Design).

## Deferred to Later Stages

- Detailed business rules/validation logic for each component (Functional Design).
- Exact hash-fallback and focus-management algorithm (Functional Design).
- NFR-specific acceptance thresholds and test design (NFR Requirements/NFR Design).
- Concrete theme token values and asset pipeline steps (Units Planning/Units Generation, Code Generation).
