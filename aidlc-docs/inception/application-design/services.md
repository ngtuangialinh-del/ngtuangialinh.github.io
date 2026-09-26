# Services — Medical Student Portfolio

## Content Data Modules (per Application Design Plan Q4)

Split by domain, mirroring the existing `src/data/` convention, for easy independent editing by the student owner (P3):

- `src/data/identity.ts` — name, status wording, value statement, hero CTAs.
- `src/data/academics.ts` — IGCSE/IELTS/Grade 12/admission-score data plus journey milestones consumed by both Academics and Medical Journey.
- `src/data/communityCare.ts` — the three initiative stories.
- `src/data/gallery.ts` — curated image metadata (references curated public asset files, never raw CV paths).
- `src/data/contact.ts` — the future-looking statement and optional future contact placeholder.
- `src/data/navigation.ts` (adapted from existing) — the six ordered `NavDestination` entries.

These modules are pure data with no orchestration logic; components import them directly (no repository/DAO layer needed for a static site).

## Navigation / Hash-Routing Service (reused, per Application Design Plan Q5)

- **Basis**: Adapt the existing `usePortfolioLayout` hook and related hash utilities rather than redesigning routing.
- **Responsibilities**:
  - Track the current hash and derive `activeSectionId` for `Navigation`/`MobileNav`.
  - Resolve direct-link hashes to the six approved sections on load (B6).
  - Fall back predictably to Introduction for unknown/malformed hashes (MSP-FR-17).
  - Provide a navigation intent handler used by both desktop and mobile nav to update the hash and scroll/focus the target section.
- **Scope note**: Functional Design specifies the exact fallback and focus-management logic and validates the PBT candidates (hash round-trip, navigation-to-section invariant, unknown-route fallback invariant) under MSP-NFR-09.

## Color Mode Service (reused, unmodified)

- Existing `color-mode.tsx`/`provider.tsx` mechanism continues to own light/dark toggling, persistence, and no-flash-on-load behavior (G1–G3). No new service required; Application Design confirms no redesign is needed.

## Gallery Lightbox Interaction (owned by the `Lightbox` shared primitive)

- Not a data/orchestration service — a self-contained UI interaction owned by the `Lightbox` component itself (see `components.md`). Documented here only to clarify it does not require a separate service layer.

## Content Validation Utility (per Application Design Plan Q6)

- **Purpose**: Give MSP-FR-11/MSP-NFR-02's privacy safeguards (K1–K3) and MSP-NFR-10's "focused privacy regression tests" a concrete implementation home.
- **Form**: A lightweight test-time utility (not a runtime service) that scans the public content data modules (`src/data/*.ts`) and the production `dist/` output for restricted-value patterns (e.g., known sensitive filename fragments, the two excluded video filenames, raw CV path references).
- **Responsibilities**:
  - Assert no reference to `src/assets/CV/` raw filenames appears in `src/data/*.ts` or built output.
  - Assert the two excluded MP4 filenames are absent from source and `dist/`.
  - Assert gallery image `src` values point only into the curated public asset directory.
- **Consumer**: Invoked from the Vitest suite (MSP-NFR-08/MSP-NFR-10), not from application runtime code.

## Orchestration Summary

There is no server-side orchestration layer (static site, MSP-NFR-06/MSP-NFR-07). "Services" in this application are: (1) typed content data modules, (2) the reused navigation/hash-routing hook, (3) the reused color-mode provider, and (4) a test-time content-validation utility. `MedicalShell` is the sole consumer that wires content modules and the navigation service into the composed section components.
