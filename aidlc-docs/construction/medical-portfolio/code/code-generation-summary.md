# Code Generation Summary — medical-portfolio (Units U1–U11)

Executed against `aidlc-docs/construction/plans/medical-portfolio-code-generation-plan.md`. Brownfield modification of the existing React/Vite application at the workspace root.

**Revision note (2026-09-17, pass 1)**: The first pass under-used the existing codebase's shared patterns (plain `Box`/`Container` sections, a duplicate CSS token system, a hand-rolled focus-trap dialog). Per user feedback, this was reworked to build directly on the pre-existing conventions instead: the app's real `:root`/`.light` CSS-variable token mechanism in `src/index.css` (updated in place to the clinical-editorial palette, not replaced with a parallel system); the restored, adapted `SectionShell`/`ContentCard`/`ExternalAction` shared components (same structural pattern as the retired `Business*` templates — chapter heading, reveal-up animation, next-section pulse-line arrow); a `BusinessHero`-style cover layout for the Introduction; ledger/register-style layouts for Academics and Community Care; and a `Lightbox` rebuilt on Chakra's own `Dialog` primitive.

**Revision note (2026-09-17, pass 2 — UI/UX polish)**: A visual review (screenshots taken via a temporary Playwright driver against the live dev server, compared directly against the original site rendered from a `git stash` of HEAD) found the actual default-rendered original ("Engineering" template) uses a visibly richer visual language than pass 1's editorial-ledger styling: rounded pill status badges, a highlighted word within body copy, rounded bordered stat tiles, and a shadowed "snapshot" side panel with an icon avatar, tag pills, and a panel header bar. `MedicalHero.tsx` was rebuilt to match this pattern directly. Both light and dark mode were re-verified visually via screenshots.

**Revision note (2026-09-17, pass 3 — per-section distinct design)**: Per explicit user request, each section was given a genuinely distinct layout/background/UI rather than reusing one card pattern everywhere, while keeping the same underlying code structure (Chakra, `SectionShell`/`ContentCard` shared components, per-domain data files):
- **Navigation**: replaced the top bar (`MedicalNavigation`, deleted) with `MedicalSidebar.tsx` — a fixed vertical wayfinding-directory rail with per-destination icons (desktop). `MedicalMobileNav.tsx` was rebuilt as a full-screen overlay kiosk menu instead of a small dropdown.
- **Introduction**: kept the Student Record panel, added a decorative SVG heartbeat/pulse-line graphic along the bottom edge (`hero-bg` class).
- **Medical Journey**: rebuilt as a vertical timeline with icon nodes (book/activity/heart/stethoscope per milestone) connected by a line, on a diagonal-wash background (`journey-bg`).
- **Academics**: rebuilt as a "vitals monitor" dashboard — always-dark instrument-panel cards (fixed `--monitor-bg`/`--monitor-text` tokens, deliberately theme-invariant) with a decorative readout bar per score, on a graph-paper grid background (`academics-bg`).
- **Community Care**: rebuilt as an alternating left/right "case file" dossier with numbered case tabs and a rotated "Collective Effort" ink-stamp badge, on a warm dotted background (`community-bg`).
- **Gallery**: rebuilt as rotated polaroid-style photo cards on a dark "light-table" backdrop (`gallery-bg`), replacing the flat grid.
- **Contact**: rebuilt as a "prescription note" card with a dashed perforated top edge and a faint cross watermark, on a lined-paper background (`contact-bg`).

**Bugs found and fixed during this pass's own visual verification** (not caught by the automated test suite, since jsdom/axe-core do not reliably evaluate real computed contrast): two sections used a *fixed* light or dark card background paired with a *theme-following* text color variable, producing illegible near-invisible text in one color mode — `gallery-bg` used the theme-flipping `--bg-900`/`--bg-700` instead of a fixed dark token (white heading text vanished in light mode), and the Community Care and Contact cards used fixed white/cream card backgrounds with the theme-following `--text-100`/`--text-300` (titles vanished in dark mode). Fixed by giving `gallery-bg` a fixed dark value and by CSS-variable-scope-overriding `--text-100`/`--text-300` (and `--accent-300` where needed) to fixed, contrast-appropriate values within each fixed-background card, verified by screenshot in both modes afterward.

**Revision note (2026-09-17, pass 4 — reference-driven typographic/graphic discipline)**: Per user request, reviewed a separate, more mature sibling project (`TranGiaMinhTam.github.io`, a similarly AI-DLC-built portfolio) to understand the quality bar expected. That project uses a restrained, editorial "scientific specimen record" design language: a small deliberate token set, monospace uppercase micro-labels for field codes, hard (non-blurred, offset) card shadows, `border-inline-start` accent bars on major content panels, big condensed display type with negative letter-spacing, and semantic HTML where the content is genuinely tabular — built with plain CSS Modules rather than Chakra. Given this repository's earlier explicit instruction to keep the *same code structure* (Chakra UI, not a CSS Modules rewrite), the typographic/graphic discipline was adopted without the architectural rewrite:
- Added `--font-mono` (JetBrains Mono), a `.field-code` utility class (monospace, uppercase, wide letter-spacing) for every micro-label across all six sections, replacing ad hoc sans-serif uppercase labels.
- Added a theme-invariant `--hard-shadow` token (a flat offset shadow, no blur) applied to the Hero's Student Record panel and the Academics monitor cards, alongside `border-inline-start` accent bars now applied to `SectionShell`'s heading block and to the Journey/Academics card panels.
- Enlarged and tightened the Hero name and `SectionShell` chapter headings (bigger, `letterSpacing: -0.02em` to `-0.03em`, tighter line-height) for a bolder editorial presence.
- Attempted converting the Academics score groups to a semantic `<table>` (mirroring the reference project's `relationshipSummary` table pattern); this was reverted after visual verification found Chakra's `Table.*` components break the CSS-custom-property scoping used to keep the always-dark "monitor" cards legible in light mode (text rendered at very low, page-theme-following contrast instead of the intended fixed light-on-dark). Reverted to the previously-verified plain `Box`/`VStack` structure, keeping the field-code labels, hard shadow, and accent bar. This is documented as a known limitation, not a silent workaround: a real semantic-table upgrade for Academics would need either a from-scratch (non-Chakra) table or an explicit investigation into Chakra Table's CSS-variable-scoping behavior before being attempted again.
- Re-verified every change in both light and dark mode via screenshots; full suite (tsc/eslint/vitest 29 tests/build 192.10kB gzip/post-build privacy scan/git diff --check) re-passed.

## Created — Types and Data (U1)

- `src/types/medical.ts`
- `src/data/identity.ts`, `academics.ts`, `communityCare.ts`, `contact.ts`, `gallery.ts`
- Modified: `src/data/navigation.ts` (rewritten to the six canonical destinations)

## Created — Public Gallery Assets (U1, U7)

- `public/gallery/` — 5 curated, resized (≤900px, quality 60) contextual photographs, manually reviewed to exclude patient/beneficiary close-ups and raw documents. **Flagged for the student's (P3) final review before publication** per the code generation plan's Scope Note.

## Created — Shared UI Primitive (U7)

- `src/components/ui/lightbox.tsx` — built on Chakra's `Dialog` primitive (focus trap/restore and Escape handling come from Chakra/Ark UI, not custom code)

## Restored/Adapted — Shared Components (reused from the pre-existing pattern)

- `src/components/shared/SectionShell.tsx` — recreated, retyped against `ContentSectionId` from `src/types/medical.ts`, using a `medical-grid` background motif in place of the retired `engineering-grid`; still provides the chapter-heading/eyebrow/intro structure, `reveal-up` entrance animation, and next-section pulse-line arrow.
- `src/components/shared/ContentCard.tsx` — unchanged, now consumed by `MedicalJourney`, `MedicalAcademics`, `MedicalCommunityCare`, `MedicalGallery`, and `MedicalContact`.
- `src/components/shared/ExternalAction.tsx` — unchanged, consumed by `MedicalContact` for the (currently absent) future contact link.
- `src/data/sectionCopy.ts` (new) — per-section eyebrow/title/intro copy, mirroring the retired `sectionContent.ts` pattern, feeding `SectionShell`.

## Created — Navigation Logic (U2)

- `src/hooks/useSectionNavigation.ts` (+ `useSectionNavigation.pbt.test.ts`)
- Modified: `src/utils/scroll.ts` (retargeted to the new `SectionId` type; removed the old `NavigationItem`-based helpers no longer needed by a single-presentation architecture)

## Created — Navigation and Shell Components (U2)

- `src/templates/medical/SkipLink.tsx`, `MedicalNavigation.tsx`, `MedicalMobileNav.tsx`, `MedicalShell.tsx`, `medical-theme.css`

## Created — Section Components (U3–U6, U8)

- `src/templates/medical/MedicalHero.tsx`, `MedicalJourney.tsx`, `MedicalAcademics.tsx`, `MedicalCommunityCare.tsx`, `MedicalContact.tsx`
- `src/templates/medical/ScoreDisplay.tsx` + `resolveScoreDisplay.ts` (shared BR-2 score-display rule)

## Created — Gallery Component (U7)

- `src/templates/medical/MedicalGallery.tsx`

## Modified — App Wiring, Metadata, and Design Tokens (U2, N2)

- `src/App.tsx` (renders `MedicalShell` directly; template-selection logic removed)
- `index.html` (title/description updated to identify the medical portfolio)
- `src/App.css` — kept the app's real animation/motif classes (`reveal-up`, `pulse-line`, delays) instead of deleting them; replaced the Engineering grid motif with a `medical-grid` line pattern
- `src/index.css` — **the single, real theme-token source** (`:root` = dark defaults, `.light` class = light overrides, matching `next-themes`'s `attribute="class"` mechanism already in use). Updated every existing token's color value to the deep-teal/surgical-blue/warm-ivory/restrained-red medical palette rather than introducing a second, parallel token file that the app's actual dark/light mechanism would never apply.

## Deleted — Legacy Removal (U10)

- `src/templates/business/`, `src/templates/engineering/`, `src/templates/index.ts`, `types.ts`, `options.ts`, `templateRegistry.test.ts`, `journalPostPages.test.tsx`
- `src/components/shared/PortfolioStyleSelector.tsx`, `SectionShell.tsx`
- `src/components/{About,Awards,Contact,Education,Experience,Gallery,Hero,Journal,JournalPostPage,Navbar,Projects,Skills}.tsx` (retired Engineering presentation)
- `src/utils/templateSelection.ts` (+ test), `src/data/template.ts`
- `src/content/journal/`, `src/utils/journal.ts`
- `src/hooks/usePortfolioLayout.ts` (+ test)
- `src/data/{about,awards,blog,certificates,education,experience,journalPosts,portfolio,profile,projects,sectionContent,skills,videos}.ts`
- `src/types/portfolio.ts`
- `src/assets/{certificates,documents,projects}/` and inherited previous-owner images (`profile.jpeg`, `photo_*.jpg/HEIC`, `nus.*`, `sa.png`, `ut.png`, `zhonghua.jpg`, `react.svg`)
- Obsolete tests: `src/App.test.tsx` (replaced), `src/themeAccessibility.test.ts`, `src/test/data/{navigation,portfolio}.test.ts`

## Created — Test Suite (U11)

- `src/test/generators.ts` (shared `fast-check` arbitraries)
- `src/test/a11y-helpers.ts` (shared axe-core + Testing Library helper)
- `src/test/render.tsx` (shared `ChakraProvider`-wrapped render helper)
- `src/test/vitest-axe.d.ts` (local type augmentation for a broken upstream `.d.ts` in `vitest-axe@0.1.0`)
- `src/test/content-privacy.test.ts` (BR-8 release-blocking privacy gate)
- Example-based tests: `App.test.tsx` (rewritten), `metadata.test.ts`, and one test file per medical section/component (`MedicalHero`, `MedicalJourney`, `MedicalAcademics`, `MedicalCommunityCare`, `MedicalGallery`, `MedicalContact`, `MedicalNavigation`, `MedicalShell`, `medical-theme`)
- PBT tests: `useSectionNavigation.pbt.test.ts`, `ScoreDisplay.pbt.test.ts`

## Dependencies Added

- `fast-check` (PBT framework, per NFR Requirements/Design)
- `vitest-axe` (accessibility assertions, per NFR Requirements/Design) — note: v0.1.0's `matchers` type declarations are broken upstream; worked around locally in `src/test/setup.ts` and `src/test/vitest-axe.d.ts` rather than blocking on an upstream fix.

## Verification Results

- `npx tsc -b --noEmit`: passes.
- `npm run lint`: passes.
- `npx vitest run`: 14 test files, 33 tests, all passing.
- `npm run build`: succeeds; `dist/assets/*.js` gzip 176.89 kB (budget: 300 kB); the pre-existing "chunk larger than 500kB" warning (raw, non-gzipped) is a known Chakra UI bundle characteristic, non-blocking, consistent with prior project history.
- Post-build `content-privacy.test.ts` run against `dist/`: passes — no raw CV path fragments, restricted patterns, or excluded video filenames found.
- `git diff --check`: passes.
- `src/assets/CV/` is now listed in `.gitignore` (was previously untracked but unprotected).

## Known Follow-Up (not a defect, a flagged decision point)

- The 5 starter gallery images are an AI-reviewed but student-unapproved starter set (rejected 2 of the 3 hematology photos for patient close-ups, and 2 lunar-new-year "photos" that were actually raw documents containing a bank account number and a personal name). The student (P3) should review `src/data/gallery.ts` and `public/gallery/` before this goes live, per MSP-FR-10/MSP-NFR-02.

## Corrective Professional UI Recovery (2026-09-19)

This section supersedes the visual and verification descriptions in the earlier revision notes above. It records the user-approved corrective pass based on the initial repository presentation and the interaction patterns in `../TranGiaMinhTam.github.io/`.

### Presentation and Navigation

- Replaced the permanent clinical sidebar and full-screen custom overlay with a fixed horizontal header, inline desktop navigation, and an accessible Chakra Drawer on smaller screens.
- Added a restrained section label/count/progress strip, focusable registered sections, header-safe anchors, reduced-motion-aware scrolling, hash and history listeners, IntersectionObserver tracking, and a geometry fallback.
- Rebuilt the Introduction as a polished two-column hero with restrained badges, accurate evidence stats, clear actions, and one elevated portrait-free profile panel.
- Replaced the monitor, dossier, polaroid, and prescription metaphors with one consistent clinical-editorial system using shared tokens, surfaces, radii, borders, shadows, spacing, and section framing.
- Kept purposeful content variation: chronological Journey timeline, semantic academic evidence, editorial service cards, aligned gallery grid, and compact closing section/footer.

### Correctness, Privacy, and Deployment

- Removed the misleading academic readout bars; the medicine admission score remains `27.20` with its source context and is never encoded as a percentage.
- Added base-path-safe gallery URLs and verified `/` plus `/portfolio-test/` production builds.
- Removed EXIF metadata from all five public JPEG derivatives. Each remains under the 300KB image budget; the largest is 212,194 bytes.
- Expanded the privacy gate to scan mandatory built output, named excluded videos, labeled identity/contact/banking patterns, gallery directory boundaries, EXIF markers, and image size budgets.
- Replaced the Vite favicon with a medical mark and added description, theme, and Open Graph metadata.

### Accessibility and Testing

- The skip link is hidden until focus; `main` and section destinations are programmatically focusable without drawing a full-section outline.
- Mobile navigation uses Chakra's focus containment, Escape dismissal, inert backdrop behavior, and verified trigger focus return.
- Axe structural checks disable only the jsdom-incompatible canvas contrast rule. Deterministic WCAG contrast-ratio tests now cover the approved light/dark semantic token pairs, eliminating the previous canvas warnings while retaining a real contrast gate.
- PBT now includes canonical hash codec round-trip coverage and a documented component/stateful-model applicability disposition. Fast-check uses stable seed `20260919` in local and CI runs.
- CI now blocks deployment on lint, type checking, root and GitHub Pages builds, all example/accessibility/privacy/property tests, and the derived deployment base.

### Corrective Verification Results

- `npm run lint`: passes.
- `npm run typecheck`: passes as part of both production builds.
- `npm test`: 14 files, 39 tests, all passing with no canvas warnings.
- Root production build: succeeds; JavaScript 666.50KB raw / 192.67KB gzip and CSS 13.75KB raw / 4.02KB gzip.
- Project-path production build (`VITE_BASE_PATH=/portfolio-test/`): succeeds; JavaScript 666.51KB raw / 192.68KB gzip, with the favicon and runtime gallery base verified under `/portfolio-test/`.
- The raw JavaScript chunk still triggers Vite's 500KB advisory, but the approved 300KB compressed bundle budget passes by more than 100KB. No additional runtime dependency was added by this pass.
- `git diff --check`: passes.
- Visual acceptance: inspected light and dark captures at 390px, 768px, and 1440px, including full-page desktop captures covering every section and the footer.

### Remaining Release Decision

The gallery files are technically sanitized and presentation-ready, but public-photo consent remains pending in `aidlc-docs/construction/plans/gallery-publication-approval-questions.md`. Code Generation cannot be marked complete until the owner selects publication or the non-photographic fallback.

## CV and Evidence Expansion (2026-09-19)

This amendment supersedes the remaining release decision above: the owner approved the initial gallery and approved the safe CV/evidence expansion plan.

### Content and Information Architecture

- Expanded the canonical navigation from six to eight destinations: Introduction, Medical Journey, Academics, Research, Community Care, Gallery, Evidence, and Contact.
- Added Grade 10–12 GPA summaries and CV-listed A Level results while retaining source labels.
- Preserved the official IELTS report as the higher-authority source: overall `7.0`, not the conflicting `7.5` in the CV; a regression assertion enforces this decision.
- Added the CV-reported 2026 *Cordyceps militaris* nanoformulation research project with methods, reported measurements, and an explicit in-vitro/non-clinical limitation.
- Added the 2023 “The Will & The Way” performance and event-operations contribution.

### Public Documents and Privacy

- Added the unchanged two-page CV at `src/assets/documents/nguyen-tuan-gia-linh-cv.pdf`, exposed through accessible Preview and Download actions in both the hero and Evidence Library.
- Added a rasterized, external-link-free public copy of the hematology volunteering acknowledgement at `src/assets/documents/hematology-volunteering-acknowledgement.pdf`.
- Added `MedicalEvidence.tsx` and a shared Chakra document-preview dialog with descriptive iframe titles, browser fallback, Escape dismissal, focus containment/return, and explicit downloads only for approved public documents.
- Represented the transcript, IGCSE statement, IELTS report, diploma, and admission notice through verified summary cards. Their raw files remain private because they contain portraits, birth details, candidate/student/document identifiers, contact/financial details, or QR codes.
- Both MP4 files and raw DOCX files remain excluded. Source folders are not referenced by production data or copied into the build.

### Gallery Expansion

- Expanded the approved gallery from five to nine contextual photographs.
- Added four human-readable, EXIF-free derivatives covering classroom preparation, supply sorting, prepared Lunar New Year gifts, and venue-level distribution.
- Continued to exclude document screenshots, bedside patient images, unnecessary close-ups, and near-duplicates. Every public image is below the 300KB budget; the largest new derivative is 252,489 bytes.

### Verification Results

- `npm run typecheck`: passes.
- `npm run lint`: passes.
- `npm test -- --run`: 16 files and 44 tests pass, including accessibility, privacy, hash PBT, CV actions, official-source precedence, Research, Evidence, and dialog focus restoration.
- Root and `/portfolio-test/` production builds pass. Final JavaScript is 681.44KB raw / 195.98KB gzip; CSS is 13.90KB raw / 4.07KB gzip. The approved 300KB compressed JavaScript budget passes; Vite's raw 500KB advisory remains non-blocking.
- The emitted CV is 86.70KB and the public-safe acknowledgement is 332.21KB.
- Active-content scanning finds no JavaScript, OpenAction, embedded-file, launch, or URI markers in the two public PDFs.
- `git diff --check` passes.
- Visual review passes for a full light 1440px page, exact 390px light/dark emulation (`innerWidth`, `clientWidth`, and `scrollWidth` all 390), and dark 1440px Gallery/Evidence views. No horizontal overflow, clipping, contrast failure, or section-density regression was observed.

## Inline PDF Preview Cards (2026-09-19)

- Added optimized, metadata-free first-page thumbnails for the CV and hematology acknowledgement under `public/documents/`; both are below the 300KB image budget.
- Public PDF cards now show the document itself before the title and supporting copy. The preview is a semantic button with descriptive alternative text, visible keyboard focus, zoom affordance, lazy loading, and a responsive 4:3 crop anchored to the page top.
- Selecting the document image or the explicit Preview button opens the existing accessible PDF dialog. Download remains an independent link, and closing the dialog restores focus to the control that opened it.
- Sensitive evidence records remain text-only and expose no thumbnail, raw-file URL, or popup action.
- The CV card explicitly discloses that its visible IELTS 7.5 entry conflicts with the official 7.0 report and that the website follows the official record.
- Verification passes: type checking, lint, 16 test files/46 tests, root and `/portfolio-test/` builds, metadata/asset/privacy checks, and `git diff --check`. Final JavaScript is 682.87KB raw / 196.29KB gzip; the compressed budget remains within 300KB.
- Visual review covers the preview cards and live browser PDF popup at 1440px in light/dark modes plus exact 390px rendering with `scrollWidth` equal to `innerWidth`.
