# Unit of Work Definitions — Medical Student Portfolio Revamp

Single monolithic static application; units are logical development groupings for planning/tracking, not independently deployable services (Unit of Work Plan Q1, Q3, Q4).

## U1: Content & Data Foundation

- **Responsibility**: Create the per-domain typed content data modules (`identity.ts`, `academics.ts`, `communityCare.ts`, `gallery.ts`, `contact.ts`, adapted `navigation.ts`) and curate/copy the approved public gallery assets into a descriptively named public asset directory.
- **Blocking**: Yes — every section unit depends on this landing first.

## U2: Navigation & Shell

- **Responsibility**: Build `MedicalShell`, adapt the existing hash-routing/`usePortfolioLayout` hook to the six fixed sections, implement `Navigation` and `MobileNav`, the skip link, and top-level landmarks.
- **Blocking**: Yes — section units mount inside `MedicalShell` and rely on its navigation wiring.

## U3: Introduction (Hero)

- **Responsibility**: Implement the portrait-free hero with identity/status/value statement and primary CTAs.
- **Depends on**: U1, U2. **Independent of**: U4–U7.

## U4: Medical Journey

- **Responsibility**: Implement the chronological narrative connecting school, strengths, service, and admission.
- **Depends on**: U1, U2. **Independent of**: U3, U5–U7.

## U5: Academics

- **Responsibility**: Implement the IGCSE/IELTS/Grade 12/recognition/admission-score summaries with score-type labeling.
- **Depends on**: U1, U2. **Independent of**: U3, U4, U6, U7.

## U6: Community Care

- **Responsibility**: Implement the three initiative stories with collective attribution.
- **Depends on**: U1, U2. **Independent of**: U3–U5, U7.

## U7: Gallery

- **Responsibility**: Implement the curated image grid, lazy loading, and the new shared `Lightbox` primitive with focus trap/restore.
- **Depends on**: U1, U2. **Independent of**: U3–U6.

## U8: Contact

- **Responsibility**: Implement the future-looking placeholder statement and structured future-contact slot.
- **Depends on**: U1, U2. **Independent of**: U3–U7.

## U9: Color Mode Verification

- **Responsibility**: Confirm the reused color-mode provider meets equivalent-experience and no-flash requirements across all new sections; no new mechanism is built (per Application Design, reused unmodified).
- **Depends on**: U2 (shell must exist to verify site-wide behavior) and benefits from U3–U8 being present for full-page verification, but can begin as soon as U2 lands.

## U10: Legacy Removal

- **Responsibility**: Remove `PortfolioStyleSelector`, template-selection persistence, `BusinessShell`/`EngineeringShell` and all `Business*`/`Engineering*` components, journal routes/content, and the inherited data-engineering identity/content.
- **Depends on**: U2 (the new shell must exist before the old ones are removed, to avoid a broken interim state). Can proceed in parallel with U3–U9 once U2 lands, since it touches a disjoint set of files.

## U11: Cross-Cutting Quality (Privacy, Accessibility, Responsive, Testing)

- **Responsibility**: Implement the test-time content-validation utility (MSP-FR-11/MSP-NFR-02 safeguards), reduced-motion/heading-structure accessibility checks, responsive-overflow checks, replace obsolete tests with medical-portfolio tests, and add the PBT suite for hash-routing/content-normalization properties identified in Application Design.
- **Depends on**: All of U1–U10 existing in at least draft form to have something to verify against; in practice this unit's test-writing can start alongside each other unit but its full-suite verification is the final gate before Build and Test.

## Code Organization Note (Brownfield)

This is a brownfield change to an existing single-package repository — no new package/repository structure is introduced. New code lives under the existing conventions: `src/templates/medical/` (U2–U8 components), `src/data/` (U1), `src/components/ui/lightbox.tsx` (U7's shared primitive), and `src/test/` (U11).
