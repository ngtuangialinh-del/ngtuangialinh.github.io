# Code Generation Plan — medical-portfolio (Units U1–U11)

Brownfield modification of the existing single-package React/Vite app at the workspace root. This plan is the single source of truth for Code Generation; steps below are executed in order in Part 2.

Read from `aidlc-docs/aidlc-state.md`: workspace root `/Users/nhamhhung/student_ports/ngtuangialinh.github.io`; existing structure per `code-structure.md` (`src/templates/{business,engineering}`, `src/data`, `src/components/{shared,ui}`, `src/hooks`, `src/utils`, `src/types`, `src/test`).

## Scope Note — Gallery Image Curation

Selecting which of the 19 supplied service photographs are respectful, non-close-up, and safe to publish is a judgment call about real photographs of children and patients that requires the student owner's (P3) explicit sign-off, not an automated or unilateral AI selection (MSP-FR-10, MSP-NFR-02). Step 5 below implements the full `gallery.ts` data structure and `Gallery`/`Lightbox` components against a small starter set of contextual, non-close-up photos already flagged as "strong public-story candidates" in `cv-evidence-inventory.md` (group/distribution-event shots, not individual close-ups), copied into a new public asset directory with descriptive names. This starter set is explicitly flagged for the student's review/approval/replacement before final publication — it is not a final editorial decision.

## Steps

### Step 1 — Domain Types (Unit: U1)

- [x] Create `src/types/medical.ts` with the domain types from `functional-design/domain-entities.md`: `SectionId`, `Cta`, `Identity`, `NavDestination`, `LabeledScore`, `ScoreGroup`, `AcademicsContent`, `JourneyMilestone`, `CommunityStory`, `GalleryImage`, `ContactContent`.
- Stories: N1.

### Step 2 — Content Data Modules (Unit: U1)

- [x] Create `src/data/identity.ts` (name, status statement, value statement, hero CTAs) — values from `requirements.md` MSP-FR-01/06 and `cv-evidence-inventory.md`.
- [x] Create `src/data/academics.ts` (IGCSE/IELTS/Grade 12/recognitions/admission score `ScoreGroup`s, plus journey milestones) — values manually cross-checked against `cv-evidence-inventory.md` (D5).
- [x] Create `src/data/communityCare.ts` (three `CommunityStory` entries with collective attribution) — values from `cv-evidence-inventory.md`.
- [x] Create `src/data/contact.ts` (future-looking statement, no link placeholder).
- [x] Rewrite `src/data/navigation.ts` to the six canonical `NavDestination` entries (Introduction, Medical Journey, Academics, Community Care, Gallery, Contact).
- Stories: A1, A2, C1, D1–D4, E1–E3, H1, N1.

### Step 3 — Curated Public Gallery Assets and Data (Unit: U1, U7)

- [x] Create `public/gallery/` (descriptive filenames) and copy a starter set of 6 non-close-up, contextual photos (2 per initiative) from `src/assets/CV/Hoạt động ngoại khóa/*` into it, per the Scope Note above.
- [x] Create `src/data/gallery.ts` mapping each copied image to a `GalleryImage` entry (alt text, caption, `initiativeId` matching a `communityCare.ts` story id, date/period).
- Stories: F1, F2, K1, K2.

### Step 4 — Shared Lightbox Primitive (Unit: U7)

- [x] Create `src/components/ui/lightbox.tsx` implementing focus trap/restore and Escape/close-control handling per `functional-design/frontend-components.md`.
- Stories: F4.

### Step 5 — Navigation/Hash Logic (Unit: U2)

- [x] Create `src/hooks/useSectionNavigation.ts`: resolves the initial hash against the six canonical sections, rewrites unknown/malformed hashes to the canonical Introduction hash (BR-1), and exposes `activeSectionId` (reusing existing `useActiveSection`/`scrollToSection` from `src/utils/scroll.ts`, adapted to the new `SectionId` type in `src/types/medical.ts`).
- Stories: B1, B2, B6, N4 (PBT candidates specified here).

### Step 6 — Navigation Components (Unit: U2)

- [x] Create `src/templates/medical/MedicalNavigation.tsx` (sticky desktop nav, `aria-current` on active destination).
- [x] Create `src/templates/medical/MedicalMobileNav.tsx` (toggle, open/close, focus return).
- [x] Create `src/templates/medical/SkipLink.tsx`.
- Stories: B1–B5.

### Step 7 — Section Components (Units: U3–U6, U8)

- [x] Create `src/templates/medical/MedicalHero.tsx` (Introduction).
- [x] Create `src/templates/medical/MedicalJourney.tsx`.
- [x] Create `src/templates/medical/MedicalAcademics.tsx` (shared score-display rule, BR-2).
- [x] Create `src/templates/medical/MedicalCommunityCare.tsx` (collective-attribution disclosure, BR-3).
- [x] Create `src/templates/medical/MedicalContact.tsx`.
- Stories: A1–A3, C1, D1–D5, E1–E4, H1.

### Step 8 — Gallery Section Component (Unit: U7)

- [x] Create `src/templates/medical/MedicalGallery.tsx` using `Lightbox`, lazy-loaded images, `activeImageId` state per `frontend-components.md`.
- Stories: F1–F4.

### Step 9 — Shell and Design Tokens (Unit: U2, N2)

- [x] Create `src/templates/medical/MedicalShell.tsx` composing all sections + navigation + skip link + landmarks.
- [x] Create `src/templates/medical/medical-theme.css` with deep teal/surgical blue/warm ivory/restrained red tokens, spacing/radii/motion tokens (MSP-FR-15, N2), imported by the shell.
- Stories: B1–B6, G4, MSP-FR-15/N2.

### Step 10 — App Wiring (Unit: U2)

- [x] Modify `src/App.tsx`: remove template-selection state/logic; render `MedicalShell` directly; remove journal-hash parsing.
- [x] Modify `src/main.tsx` only if the `Provider` wrapper needs adjustment (verify color-mode provider still wraps `App`).
- Stories: I1, G1–G3 (reused, verified).

### Step 11 — Metadata (Unit: U2)

- [x] Modify `index.html` title/meta description to identify the medical portfolio (MSP-FR-18).
- Stories: J1.

### Step 12 — Legacy Removal (Unit: U10)

- [x] Delete `src/templates/business/`, `src/templates/engineering/`, `src/templates/options.ts`, `src/templates/templateRegistry.test.ts`, `src/templates/journalPostPages.test.tsx`.
- [x] Delete `src/components/shared/PortfolioStyleSelector.tsx`.
- [x] Delete `src/utils/templateSelection.ts`, `src/data/template.ts`.
- [x] Delete `src/content/journal/` and `src/utils/journal.ts` (journal parsing) and any journal-only types.
- [x] Delete obsolete data files no longer referenced: `src/data/about.ts`, `awards.ts`, `blog.ts`, `certificates.ts`, `education.ts`, `experience.ts`, `journalPosts.ts`, `portfolio.ts`, `profile.ts`, `projects.ts`, `sectionContent.ts`, `skills.ts`, `videos.ts` (superseded by Step 2's modules) — verified unreferenced after Step 10.
- [x] Update `src/templates/index.ts` and `src/templates/types.ts` to the single medical template (or remove if `MedicalShell` is imported directly, per Application Design's "no selector" decision).
- [x] Rewrite `src/types/portfolio.ts`: remove obsolete types superseded by `src/types/medical.ts`.
- Stories: I1–I3.

### Step 13 — Test Replacement and New Tests (Unit: U11)

- [x] Delete/replace obsolete test files asserting retired behavior (`templateRegistry.test.ts`, `businessTemplate.test.tsx`, `journalPostPages.test.tsx`, and any test in `src/test/` asserting Engineering/Business/journal/style-selector behavior).
- [x] Create `src/test/generators.ts` (shared `fast-check` arbitraries per NFR Design).
- [x] Create `src/test/a11y-helpers.ts` (shared axe-core + Testing Library helper per NFR Design).
- [x] Create `src/test/content-privacy.test.ts` (BR-8 gate: scans `src/data/*.ts` always; `dist/` scan runs when `dist/` exists, i.e., after build).
- [x] Create per-section example-based tests: identity/hero, navigation (hash fallback + mobile), academics (score display), community care (attribution), gallery (lazy-load + lightbox a11y), contact (no inherited links), color mode (reused, no-flash).
- [x] Create PBT test files using `src/test/generators.ts`: hash round-trip / nav-to-section invariant / unknown-route fallback, and score-display idempotence.
- Stories: I3, K3, K4, L1, L2, M1, M2, N3, N4, N5, D5, F2.

### Step 14 — Documentation Summary (Unit: all)

- [x] Create `aidlc-docs/construction/medical-portfolio/code/code-generation-summary.md` listing created/modified/deleted files.

## Story Traceability

All 45 stories from `stories.md` are covered across Steps 1–13 per the unit mapping in `unit-of-work-story-map.md`.

## Dependencies

Step 1 → Step 2 → Steps 3–9 (parallel-safe once 1–2 land) → Step 10 (needs 5–9) → Step 11 (independent) → Step 12 (needs Step 10 complete so nothing still imports retired code) → Step 13 (needs 1–12 complete to have a full surface to test).

## Corrective Pass — Professional UI Recovery (2026-09-19)

The user rejected the prior visual result and selected repair in place. The checked steps above remain the historical record of the prior generation pass; they do not constitute approval. The following unchecked steps are the active corrective plan and must all be completed before Code Generation can be offered for approval.

Design authority for this pass is documented in `aidlc-docs/construction/medical-portfolio/code/ui-reference-analysis.md`. The initial repository design provides the primary visual baseline. `../TranGiaMinhTam.github.io/` provides a secondary interaction and wayfinding reference. Student-specific content must not be copied from the sibling repository.

### Corrective Step 1 — Freeze Acceptance Baseline

- [x] Record reference sources and an implementation acceptance matrix for 390 px, 768 px, and 1440 px in light and dark modes under `aidlc-docs/construction/medical-portfolio/code/`.
- [x] Reconcile the current file inventory, approved requirements, component names, image count, and deleted/reused foundations in `ui-acceptance-baseline.md` before implementation begins.
- Stories/requirements: A1–A3, B1–B6, G1–G4, MSP-FR-15, MSP-NFR-01–07.

### Corrective Step 2 — Rebuild Shared Visual Foundations

- [x] Refactor the medical theme in `src/index.css` and `src/App.css` into a restrained clinical-editorial token system: warm ivory, deep teal, surgical blue, restrained red, shared typography, spacing, radii, borders, shadows, focus indicators, and reduced motion. (`src/theme.ts` does not exist; Step 1 confirmed global CSS is the active theme layer.)
- [x] Remove section-local token overrides that cause inconsistent contrast or make theme behavior unpredictable.
- [x] Preserve a subtle shared grid/line texture only where it improves hierarchy; remove novelty-led backgrounds.
- Stories/requirements: G1–G4, H1, MSP-FR-15, MSP-NFR-02, MSP-NFR-04.

### Corrective Step 3 — Restore the Professional Shell and Navigation

- [x] Replace the fixed sidebar composition in `src/templates/medical/MedicalShell.tsx` and `MedicalSidebar.tsx` with a sticky horizontal header, compact identity lockup, inline desktop destinations, and a slim section-progress band.
- [x] Rebuild `src/templates/medical/MedicalMobileNav.tsx` using the established accessible Chakra drawer behavior, including focus containment, Escape dismissal, body interaction protection, and trigger focus return.
- [x] Update `src/templates/medical/SkipLink.tsx` so it is hidden until focused and targets a focusable main landmark.
- [x] Refactor `src/hooks/useSectionNavigation.ts` and related utilities to support initial hashes, `hashchange`, `popstate`, canonical fallback, registered targets, direct-link focus/scroll, reduced motion, IntersectionObserver, and a geometry fallback.
- [x] Add header-offset-safe anchors and retain native-link semantics.
- Stories/requirements: B1–B6, G4, H1, N4, MSP-NFR-04.

### Corrective Step 4 — Restore the Two-Column Introduction

- [x] Refactor `src/templates/medical/MedicalHero.tsx` to use the initial template's balanced two-column hierarchy, restrained status badges, verified evidence stats, clear actions, and one elevated portrait-free profile panel.
- [x] Remove patient-record theatrics and unsupported authority cues while preserving the verified medical identity content in `src/data/identity.ts` and `src/data/sectionCopy.ts`.
- [x] Verify first-viewport density and wrapping at all acceptance widths.
- Stories/requirements: A1–A3, G1–G4, MSP-FR-01–03, MSP-FR-15.

### Corrective Step 5 — Unify Journey and Section Framing

- [x] Introduce a shared section-frame component or style contract used by all six sections, with consistent label, heading, supporting copy, container width, gutters, and stable anchor registration.
- [x] Refactor `src/templates/medical/MedicalJourney.tsx` into a restrained chronological timeline inside that frame; remove the diagonal-wash composition.
- [x] Keep layout variation subordinate to the common page system.
- Stories/requirements: C1, G1–G4, MSP-FR-04, MSP-FR-15.

### Corrective Step 6 — Make Academic Evidence Semantic and Accurate

- [x] Refactor `src/templates/medical/MedicalAcademics.tsx`, `ScoreDisplay.tsx`, and `resolveScoreDisplay.ts` into semantic evidence cards and/or a real table where comparison is tabular.
- [x] Correct score-unit and scale handling so `27.2` is never presented as `27.2%` and each configured scoring branch is reachable and tested.
- [x] Remove decorative vitals bars and monitor styling that falsely imply percentage magnitude.
- Stories/requirements: D1–D5, MSP-FR-05–09, MSP-NFR-03.

### Corrective Step 7 — Present Community Care as Editorial Evidence

- [x] Refactor `src/templates/medical/MedicalCommunityCare.tsx` into consistent editorial story cards with clear role, period, action, outcome, attribution, and evidence relationships.
- [x] Remove case-file tabs, stamp effects, and other theatrical dossier treatments.
- [x] Preserve collective-attribution and uncertainty disclosures from `src/data/communityCare.ts`.
- Stories/requirements: E1–E4, MSP-FR-10–12, MSP-NFR-03.

### Corrective Step 8 — Professionalize Gallery and Media Handling

- [x] Refactor `src/templates/medical/MedicalGallery.tsx` into an aligned responsive grid with consistent crops and captions; remove arbitrary rotations.
- [x] Keep `src/components/ui/lightbox.tsx` keyboard-operable with trapped/restored focus, semantic controls, Escape handling, and reduced motion.
- [x] Make all gallery URLs deployment-base-safe and add appropriate `loading`, `decoding`, `sizes`, and responsive source behavior.
- [x] Expand the privacy gate to cover approved sensitive patterns, image metadata/EXIF checks, mandatory built-output scanning, and an explicit owner-approval record for `src/data/gallery.ts` and `public/gallery/`.
- Stories/requirements: F1–F4, K3, K4, L1, L2, MSP-FR-13–14, MSP-NFR-01, MSP-NFR-03.

### Corrective Step 9 — Compact Contact, Footer, and Metadata

- [x] Refactor `src/templates/medical/MedicalContact.tsx` into a compact closing section with verified actions and no artificial viewport-height whitespace or prescription metaphor.
- [x] Add a restrained footer to `MedicalShell.tsx` and verify keyboard order through the page ending.
- [x] Reconcile `index.html`, favicon assets, page title, description, and social metadata with the medical portfolio identity and deployment base.
- Stories/requirements: H1, J1, MSP-FR-16–18.

### Corrective Step 10 — Repair Test and Property-Based-Test Coverage

- [x] Update shell, navigation, section, score, gallery, lightbox, privacy, and color-mode tests to assert the corrected requirements rather than retired visual behavior.
- [x] Complete property-based-test applicability records per component and add the missing documented round-trip property, stateful navigation model coverage or an explicit justified N/A, reproducible failure seeds, and edge-case generators.
- [x] Add direct tests for hash changes, browser history, destination focus, skip-link visibility, mobile drawer behavior, accurate academic units, base-path media URLs, and light/dark contrast/token structure.
- [x] Ensure accessibility checks fail on real violations instead of relying on canvas-warning-limited contrast coverage.
- Stories/requirements: I3, K3, K4, L1, L2, M1, M2, N3–N5, PBT-01–PBT-08.

### Corrective Step 11 — CI, Build, and Deployment Verification

- [x] Update `.github/workflows/deploy.yml` so lint, type checking, unit tests, property-based tests with replayable seed output, production build, privacy checks, and deployment-base verification are blocking before deployment.
- [x] Verify the application with both `/` and a non-root `VITE_BASE_PATH`; no gallery or metadata asset may resolve outside the configured base.
- [x] Confirm JavaScript, CSS, and image budgets; document any intentional exception before approval.
- Stories/requirements: K3, K4, L1, L2, M1, M2, N3–N5, MSP-NFR-01–07, PBT-08.

### Corrective Step 12 — Visual Acceptance and Documentation Closure

- [x] Run lint, type checking, the full test/PBT suite, production builds for root and project paths, privacy/metadata checks, and `git diff --check`.
- [x] Capture and review light/dark screenshots at 390 px, 768 px, and 1440 px against the UI reference analysis; verify content, contrast, overflow, focus, navigation, section rhythm, and footer density.
- [x] Update `aidlc-docs/construction/medical-portfolio/code/code-generation-summary.md`, the active plan checkboxes, `aidlc-state.md`, and append-only `audit.md` with exact results and any approved deviations.
- [x] Present the standardized Code Generation completion decision only after every blocking finding is resolved.
- Stories/requirements: all approved stories and requirements; PBT-01–PBT-08.

### Corrective Dependencies

Corrective Step 1 precedes implementation. Step 2 precedes Steps 3–9. Step 3 supplies the shared shell and registered section contract required by Steps 4–9. Steps 4–9 may then proceed independently where files do not overlap. Step 10 follows the relevant implementation steps, Step 11 follows Steps 8 and 10, and Step 12 is the final verification and documentation gate.

## Scope Amendment — CV and Evidence Library Expansion (2026-09-19)

The user approved the existing five-image gallery and requested a new content/evidence scope: use the attached CV to structure the website, add a downloadable CV asset, curate the full `src/assets/CV/` evidence collection, expand the gallery, and provide safe PDF previews similar to the original template. The evidence assessment is authoritative for privacy boundaries: `aidlc-docs/construction/medical-portfolio/code/cv-evidence-assessment.md`.

### Amendment Step 1 — Ingest and Register the Public CV

- [x] Copy `/Users/nhamhhung/ASEAN/nguyen_tuan_gia_linh_cv.pdf` to `src/assets/documents/nguyen-tuan-gia-linh-cv.pdf` without altering its content, then import the emitted Vite URL through typed document data.
- [x] Add accessible Preview and Download CV actions to the Introduction and Evidence sections, using a base-safe asset URL and an explicit download filename.
- [x] Verify the public CV contains no embedded instructions, active scripts, attachments, contact details, identity numbers, or other restricted values before release.

### Amendment Step 2 — Reconcile the CV Content Model

- [x] Extend `src/types/medical.ts` and typed data modules for education summaries, research work, extracurricular activity, and evidence documents.
- [x] Update education to reflect the CV's Grade 10–12 GPA summary and listed qualifications while retaining source labels.
- [x] Resolve the IELTS conflict in favor of the official supplied test report (`7.0`, not the CV's `7.5`) and add a regression assertion.
- [x] Add the CV-reported 2026 Cordyceps militaris nanoformulation research project with careful, non-clinical wording and its reported methods/results.
- [x] Add the 2023 “The Will & The Way” performance/operations activity and enrich the three existing service narratives with CV and project-document context while preserving collective attribution.

### Amendment Step 3 — Expand Information Architecture

- [x] Add a canonical `research` destination between Academics and Community Care and an `evidence` destination before Contact; update hash typing, navigation data, progress, tests, and responsive navigation for eight total destinations.
- [x] Create `MedicalResearch.tsx` with an accessible research-summary layout covering question, method, reported measurements, scope, and limitations.
- [x] Create `MedicalEvidence.tsx` with accessible document cards and a shared preview dialog for only public-safe PDF assets.
- [x] Preserve the approved horizontal shell and clinical-editorial design system; do not reintroduce a sidebar or unrelated section metaphors.

### Amendment Step 4 — Curate the Full Evidence Library Safely

- [x] Inventory every file under `src/assets/CV/` with a publish/extract-only/exclude disposition and rationale.
- [x] Select additional contextual photographs from all three activity folders, excluding document screenshots, unnecessary beneficiary close-ups, bedside patient images, and near-duplicates.
- [x] Generate descriptive, EXIF-free, appropriately cropped/resized public derivatives under `public/gallery/`; update typed captions, dates, initiative mappings, and image tests.
- [x] Exclude both MP4 files from the public build and use the DOCX files only as fact sources because one contains a bank account and donor contact instructions.
- [x] Keep the admission letter, transcript, diploma, IGCSE statement, and IELTS scans out of public assets because they expose birth dates, national/candidate/student/document identifiers, portrait data, phone numbers, financial details, or QR codes.

### Amendment Step 5 — Add Safe Document Preview

- [x] Publish the hematology institute thank-you letter as a metadata-stripped, base-safe PDF preview after confirming it contains only the student's name, school/class, public activity facts, and institutional signatory information.
- [x] Use typed summary/evidence cards for excluded academic documents rather than embedding or copying the raw records.
- [x] Extend the Chakra dialog-based media primitive or add a dedicated document preview dialog with focus containment/return, Escape close, a descriptive title, browser fallback, and download only where explicitly permitted.

### Amendment Step 6 — Verification and Closure

- [x] Extend privacy scanning to public PDFs and generated media, including PDF text extraction checks for identifiers, phone/bank patterns, active content, and raw `src/assets/CV/` references.
- [x] Add example tests for Research, Evidence, CV Preview/Download, official-source precedence, eight-destination navigation, expanded gallery, and document-dialog accessibility.
- [x] Update PBT applicability for the expanded section hash codec and evidence URL normalization; preserve stable CI seed behavior.
- [x] Run lint, type checking, 39+ tests/PBT, root and project-base builds, asset budgets, privacy validation, `git diff --check`, and light/dark responsive visual review.
- [x] Update the code summary, plan checkboxes, state, and append-only audit before presenting the standardized Code Generation completion decision.

### Amendment Dependencies

Amendment Step 1 and the evidence dispositions in Step 4 precede public rendering. Step 2 precedes the new section components in Step 3. Step 5 depends on the public-safe document decisions from Step 4. Step 6 follows all implementation work. No application or public-asset mutation for this amendment begins before explicit approval.

## Scope Amendment — Inline PDF Preview Cards (2026-09-19)

The user requested visible PDF previews directly on the website, with each preview opening a popup when selected. This amendment applies only to the two already-approved public PDFs; identity-bearing summary-only records remain non-interactive and private.

### Preview Step 1 — Generate Safe First-Page Thumbnails

- [x] Render the first page of the public CV and hematology acknowledgement into optimized, metadata-free preview images under `public/documents/`.
- [x] Add typed thumbnail URLs and descriptive preview alternative text to the two public evidence records.

### Preview Step 2 — Make the Evidence Cards Visual and Interactive

- [x] Display each first-page image at the top of its Evidence card with a consistent document aspect ratio, border, and hover/focus affordance.
- [x] Make the preview image and its explicit Preview control open the existing accessible PDF dialog; keep Download as an independent action.
- [x] Preserve the non-public evidence cards as text-only verified summaries with no raw-file preview.

### Preview Step 3 — Verify and Close

- [x] Add tests for thumbnail rendering, popup activation from the thumbnail, focus return, and public-document-only preview behavior.
- [x] Run type checking, lint, tests, both base-path builds, image/PDF privacy checks, `git diff --check`, and responsive light/dark visual review.
- [x] Update the plan, summary, state, and append-only audit before presenting the standardized completion decision again.

Implementation begins only after explicit approval of this amendment.
