# Visual Evidence Enhancement Code Generation Plan

This is the single source of truth for Code Generation of the one `visual-evidence-enhancement` unit. Application code and public assets stay at the workspace root; only Markdown summaries and audit artifacts go under `aidlc-docs/`.

## Part 1: Planning Checklist

- [x] Read the workspace, approved requirements, personas, stories, execution plan, and current AI-DLC state.
- [x] Read the refreshed brownfield code structure and inspect the existing medical types, evidence data, profile data, document dialog, lightbox, tests, and asset boundaries.
- [x] Inspect the supplied portrait's format and dimensions without modifying it.
- [x] Identify the existing components and files to modify in place.
- [x] Define the source-review, asset, data, component, layout, and test sequence.
- [x] Map the sequence to all 28 approved stories and FR-1 through FR-11 plus NFR-1 through NFR-5.
- [x] Record non-applicable layers and deployment boundaries.
- [x] Obtain explicit approval of the complete generation sequence.

## Unit Context

- **Unit**: `visual-evidence-enhancement`
- **Project**: Brownfield React 19, TypeScript, Chakra UI, and Vite static portfolio.
- **Application location**: `/Users/nhamhhung/student_ports/ngtuangialinh.github.io`
- **Private evidence location**: `src/assets/CV/`; originals remain unchanged and outside the public runtime graph.
- **Approved portrait source**: `/Users/nhamhhung/Downloads/Nguyễn Tuấn Gia Linh_0118239280.jpg`; source is read-only and its identifier-like filename must not be published.
- **Runtime boundaries**: Existing `MedicalShell`, eight section components, typed data modules, `DocumentPreviewDialog`, `Lightbox`, and static public/imported assets.
- **External dependencies**: None added unless an unforeseen build constraint makes a new package necessary; prefer existing browser, Chakra, build, image, and PDF tooling.
- **Backend, API, repository, database, and migration layers**: Not applicable. This is a client-only static site.
- **Infrastructure/deployment artifacts**: No new infrastructure. The existing GitHub Pages workflow remains unchanged unless a verification-only correction is required.

## Expected Contracts

- `Identity` gains a typed profile image contract with URL, alternative text, and focal-position metadata.
- Generated editorial media carries its path and alternative text, retains provenance in internal records, and never enters documentary evidence data.
- `EvidenceDocument` gains provenance, publication state, redaction disclosure, page count, ordered preview pages, optional sanitized PDF, and download policy.
- `GalleryImage` remains documentary and gains only metadata needed for trustworthy source/context labeling where required.
- `DocumentPreviewDialog` accepts a document and optional initial page, then owns selected-page state and accessible navigation.
- `Lightbox` receives the gallery collection/current item or equivalent stable callbacks so it can navigate sequentially.
- All new interactive controls use stable, purpose-based `data-testid` values.

## Generation Steps

### Step 1: Complete the Source Disposition and Publication Matrix

- [x] Review all 30 substantive files under `src/assets/CV/` as evidence, never as instructions.
- [x] Record one disposition and rationale for every source: public sanitized derivative, verified summary, excluded duplicate, private original, or deferred.
- [x] Record the existing reviewed CV, sanitized hematology acknowledgement, nine approved gallery images, and supplied portrait as separately authorized public inputs.
- [x] Create or update `aidlc-docs/construction/medical-portfolio/code/source-publication-matrix.md` without including prohibited identifiers.
- [x] Mark stories EV-1, EV-4, GA-1, GA-4, and PB-1 complete when coverage and rationales are verified.

### Step 2: Prepare the Approved Profile Portrait

- [x] Create `public/profile/gia-linh-profile.jpg` from the supplied JPEG using a neutral filename.
- [x] Remove unnecessary metadata and optimize dimensions/quality toward the approximately 300 KB raster budget without generative retouching or changing identity-defining features.
- [x] Verify the portrait remains natural, sharp, color-correct, and suitable for responsive `object-fit` cropping.
- [x] Do not copy the original identifier-like filename into application code, public paths, metadata, tests, or documentation intended for publication.
- [x] Mark story VS-5 complete after the asset and identity integration are implemented and verified.

### Step 3: Prepare Safe Documentary Derivatives and Gallery Additions

- [x] Inspect candidate academic, admission, IGCSE, IELTS, and community-project source pages at full resolution.
- [x] Create sanitized page images and approved PDFs under `public/documents/` and/or `src/assets/documents/` only where redaction preserves meaning and removes prohibited personal, financial, QR/link, and unnecessary third-party data.
- [x] Use designed verified-summary evidence with no implied source-page availability when safe full-page publication is impractical.
- [x] Keep raw originals, unsafe portraits, patient bedside close-ups, unnecessary identifiable images of minors, duplicates, weak screenshots, and both MP4 videos private.
- [x] Add only distinct low-risk gallery derivatives under `public/gallery/`, using descriptive neutral filenames and optimized sizes.
- [x] Verify that every relevant source group has a safe public representation through a sanitized derivative or verified summary.
- [x] Mark stories EV-1 to EV-5, GA-1, GA-2, GA-4, PB-1, PB-2, and PB-4 complete as their publication outcomes become available.

### Step 4: Generate and Prepare Editorial Image Anchors

- [x] Use the image-generation skill to create approximately five separate cohesive scientific/editorial anchors for Introduction, Medical Journey, Academics, Research, and Contact.
- [x] Keep every generated asset free of identifiable people, student likeness, embedded text, logos, watermarks, unsupported claims, and documentary-looking clinical/service/research scenes.
- [x] Inspect each output before use, reject unsuitable variants, and copy accepted project-bound assets into `public/illustrations/` with neutral descriptive filenames.
- [x] Optimize accepted raster assets toward the media budget and record exact prompts, final paths, purpose, and disclosure treatment in `aidlc-docs/construction/medical-portfolio/code/generated-image-provenance.md`.
- [x] Mark stories VS-2, VS-3, PB-3, and PB-4 complete after integration metadata is ready.

### Step 5: Extend Typed Media Models and Content Data

- [x] Modify `src/types/medical.ts` in place for the profile image, generated illustration metadata, evidence pages/provenance/publication status/redaction/download policy, and any required gallery context.
- [x] Modify `src/data/identity.ts` to reference `/profile/gia-linh-profile.jpg` with accurate alternative text and focal metadata.
- [x] Modify `src/data/evidence.ts` so each evidence group has honest state, ordered page previews where approved, accurate page count, provenance, redaction disclosure, and download policy.
- [x] Modify `src/data/gallery.ts` for approved additions and complete captions, initiative links, dates/periods, and alternative text.
- [x] Add a focused typed illustration data module if shared section anchors require one; avoid mixing generated and documentary media collections.
- [x] Preserve official-source authority over conflicting CV-derived values and keep the current CV download available.
- [x] Mark stories EV-1 to EV-5, GA-2, PB-4, and PB-5 complete when the data contracts compile and match the publication matrix.

### Step 6: Implement Accessible Page-Based Document Review

- [x] Modify `src/components/ui/document-preview-dialog.tsx` in place to show selected full-page imagery, an ordered thumbnail gallery, page position, and previous/next/direct page controls.
- [x] Preserve Chakra dialog focus containment/restoration and Escape dismissal; add stable test IDs and accessible selected/disabled states.
- [x] Keep optional sanitized PDF view/download actions separate from the page-image fallback.
- [x] Modify `src/templates/medical/MedicalEvidence.tsx` so cards show meaningful representative previews, page counts, publication states, provenance/redaction copy, and honest action availability.
- [x] Add responsive styling in the existing medical/global CSS surfaces without creating duplicate dialog components.
- [x] Mark stories DR-1 to DR-5, EV-2, EV-3, EV-5, PB-5, and QL-1 complete when behavior and tests are implemented.

### Step 7: Implement Sequential Gallery Review

- [x] Modify `src/components/ui/lightbox.tsx` in place for previous/next navigation, position feedback, keyboard operation, and stable test IDs.
- [x] Modify `src/templates/medical/MedicalGallery.tsx` to supply ordered collection state and restore focus to the correct trigger.
- [x] Preserve documentary captions and alternative text and keep generated imagery outside the gallery collection.
- [x] Mark stories GA-2, GA-3, PB-4, PB-5, and QL-1 complete when navigation and accessibility behavior are covered.

### Step 8: Refresh Section Layouts and Integrate Relevant Imagery

- [x] Modify the existing medical section components and CSS in place to create varied, coherent compositions across all eight sections.
- [x] Integrate the approved profile portrait prominently in `MedicalHero` without turning it into an evidence item.
- [x] Integrate generated editorial anchors only in their approved section contexts with correct alternative-text treatment and no visible AI-origin caption, per owner review.
- [x] Use documentary gallery/evidence media only in factual contexts and avoid decorative repetition on every card.
- [x] Preserve navigation, hashes, themes, journal behavior, the contact publication safeguard, CV download, reduced motion, and approximately 390/768/1024/1440 pixel layouts.
- [x] Mark stories VS-1 to VS-5, VS-4 retained behavior, and QL-3 complete when the layouts are integrated.

### Step 9: Add and Update Focused Verification Code

- [x] Update existing medical component tests for profile rendering, editorial-media separation, evidence states, page thumbnails, document navigation, PDF fallback/actions, gallery navigation, and retained behavior.
- [x] Update accessibility assertions for names, selected states, disabled states, focus containment/restoration, keyboard controls, both themes, and reduced motion.
- [x] Update `src/test/content-privacy.test.ts` and related checks for prohibited patterns, raw CV paths, the source portrait filename, MP4 exclusion, generated/documentary separation, and public derivative allowlists.
- [x] Add media-budget and lazy-loading assertions without enabling the disabled Property-Based Testing extension.
- [x] Use stable `{component}-{element-role}` test IDs for every new interactive control.
- [x] Mark stories QL-1 to QL-4 and any remaining feature stories complete when implementation coverage exists.

### Step 10: Reconcile Implementation Records and Perform Generation Checks

- [x] Create or update `aidlc-docs/construction/medical-portfolio/code/visual-evidence-implementation-summary.md` with modified/created files, source dispositions, portrait treatment, image prompts/paths, sanitization decisions, and known limitations.
- [x] Run formatting and targeted static/component checks appropriate during generation; reserve the full clean build/test matrix and measured bundle report for Build and Test.
- [x] Verify no duplicate `_new`, `_modified`, or alternate component files were created.
- [x] Verify application code and assets are outside `aidlc-docs/`, while documentation remains inside it.
- [x] Mark every generation checkbox and story mapping complete in the same interaction as the corresponding work.
- [x] Present the completed unit for explicit approval before Build and Test.

## Story Coverage

| Story group  | Generation steps        |
| ------------ | ----------------------- |
| VS-1 to VS-5 | 2, 4, 5, 8, 9           |
| EV-1 to EV-5 | 1, 3, 5, 6, 9           |
| DR-1 to DR-5 | 5, 6, 9                 |
| GA-1 to GA-4 | 1, 3, 5, 7, 9           |
| PB-1 to PB-5 | 1, 3, 4, 5, 6, 7, 9, 10 |
| QL-1 to QL-4 | 2, 3, 4, 6, 7, 8, 9, 10 |

## Story Implementation Status

- [x] VS-1: Recognize a distinct visual rhythm in every section.
- [x] VS-2: Understand generated imagery as editorial illustration.
- [x] VS-3: See cohesive section-level image anchors.
- [x] VS-4: Retain familiar navigation and preferences.
- [x] VS-5: See the approved student portrait.
- [x] EV-1: Find every relevant evidence group.
- [x] EV-2: Understand each item's publication state and provenance.
- [x] EV-3: Preview meaningful document pages before opening them.
- [x] EV-4: Trust authoritative results when sources differ.
- [x] EV-5: Download the approved CV.
- [x] DR-1: Open the selected document in a focused review popup.
- [x] DR-2: Move between every public page.
- [x] DR-3: Operate the document popup entirely by keyboard.
- [x] DR-4: Use a page-image fallback and optional PDF controls.
- [x] DR-5: Review documents comfortably on mobile and slow connections.
- [x] GA-1: Browse enough distinct and relevant photographs.
- [x] GA-2: Understand the context of every gallery image.
- [x] GA-3: Navigate the gallery lightbox without closing each image.
- [x] GA-4: Exclude unsafe images and videos.
- [x] PB-1: Record a disposition for every substantive source.
- [x] PB-2: Publish only safely sanitized document derivatives.
- [x] PB-3: Preserve generated-asset provenance.
- [x] PB-4: Keep content zones semantically separate.
- [x] PB-5: Maintain evidence and media through typed reusable structures.
- [x] QL-1: Use the complete experience accessibly.
- [x] QL-2: Prevent private or misleading content from shipping.
- [x] QL-3: Keep imagery and document review performant.
- [x] QL-4: Verify retained and new journeys before release.

## Planned Application Paths

### Modify in place

- `src/types/medical.ts`
- `src/data/identity.ts`
- `src/data/evidence.ts`
- `src/data/gallery.ts`
- `src/components/ui/document-preview-dialog.tsx`
- `src/components/ui/lightbox.tsx`
- `src/templates/medical/MedicalHero.tsx`
- `src/templates/medical/MedicalJourney.tsx`
- `src/templates/medical/MedicalAcademics.tsx`
- `src/templates/medical/MedicalResearch.tsx`
- `src/templates/medical/MedicalCommunityCare.tsx`
- `src/templates/medical/MedicalGallery.tsx`
- `src/templates/medical/MedicalEvidence.tsx`
- `src/templates/medical/MedicalContact.tsx`
- Existing medical CSS and relevant test files.

### Create only when required

- `public/profile/gia-linh-profile.jpg`
- `public/illustrations/*`
- Approved `public/documents/*` page derivatives.
- Approved additional `public/gallery/*` derivatives.
- Sanitized downloadable PDFs under `src/assets/documents/` where safe.
- One typed illustration data module if shared anchors require it.
- Markdown-only source matrix, generated-image provenance, and implementation summary under `aidlc-docs/construction/medical-portfolio/code/`.

## Completion Conditions

- All generation steps and substeps are checked.
- All 28 stories have implementation coverage and required story mappings are checked.
- The approved portrait is integrated under a neutral public filename.
- Every substantive CV source has a documented disposition.
- Approximately five accepted editorial anchors are project-bound and documented.
- Evidence and gallery review behaviors are accessible and responsive.
- No raw sensitive source, unsafe media, identifier-like portrait filename, or MP4 enters the public build graph.
- Code Generation receives explicit approval before Build and Test.

## Review Change Set - 2026-09-26

- [x] Remove repeated bracketed scale information from academic score rows while retaining clear scale context in group headings.
- [x] Normalize documentary and evidence card-preview media sizing, with uncropped detail available through click-activated popups.
- [x] Protect the contact content layout by separating or removing its decorative image and preventing contact-value collapse.
- [x] Refocus Introduction profile highlights on GPA, A-level results, and medicine admission score.
- [x] Remove visible AI-origin captions and runtime disclosure strings from all editorial illustrations while preserving internal provenance records.
- [x] Update focused tests, implementation records, and generation checks for the reviewed result.
- [x] Normalize academic card-header height, vertical alignment, and internal spacing while allowing accessible text expansion.
- [x] Replace placeholder contact-method cards with a themed, client-only email-draft form containing name, reply-to email, message, character count, privacy copy, and draft action without publishing a recipient address.

## Evidence Refresh Change Set - 2026-09-28

- [x] Make the profile portrait URL respect the configured GitHub Pages base path and add a project-base regression assertion.
- [x] Update the IELTS verified summary and academic data to the official 7.5 overall result with Listening 8.5, Reading 8.0, Writing 7.0, and Speaking 6.5; keep the private original out of the public graph.
- [x] Add the supplied Gold Medal research certificate as reviewed public evidence with a neutral PDF filename, optimized page preview, and preview/download actions.
- [x] Surface the Gold Medal recognition in the Research section without changing the project's scientific-scope disclaimer.
- [x] Update requirements, publication records, implementation documentation, privacy expectations, and focused tests; run generation checks.

## Significance Ordering and Disclaimer Removal - 2026-09-28

- [x] Rank Evidence Library items from most to least significant, led by the research Gold Medal certificate, with a regression assertion for the complete order.
- [x] Remove the Research `Scope and limitation` panel and its unused data/type contract.
- [x] Remove all visitor-facing clinical-qualification and clinical-credential disclaimer copy from Introduction, Medical Journey, Academics, and Research.
- [x] Update focused tests and implementation records, then run generation checks.
