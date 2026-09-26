# Visual Evidence Enhancement Implementation Summary

## Outcome

The medical-student portfolio now uses a more varied editorial layout, the owner-approved portrait, five section illustrations, ten documentary gallery images, and a seven-group Evidence Library with twelve in-site review pages. Documents and gallery images open in accessible popups with ordered navigation while sensitive originals remain outside the public runtime graph.

## Application Changes

- Extended `src/types/medical.ts` with typed profile, editorial-illustration, evidence-page, provenance, publication-state, and download-policy contracts.
- Added `src/data/illustrations.ts`; updated identity, evidence, and gallery data without mixing editorial and documentary collections.
- Added the shared `EditorialFigure`; enhanced the existing `DocumentPreviewDialog` and `Lightbox` rather than introducing alternate components.
- Refreshed Introduction, Medical Journey, Academics, Research, Community Care, Gallery, Evidence, and Contact compositions while preserving established navigation, theme, hash, journal, contact-publication safeguards, and CV-download behavior.
- Expanded focused component and privacy tests for media separation, navigation, focus, selected/disabled states, lazy loading, asset budgets, and public-path restrictions.

## Public Media Added

- Profile: `public/profile/gia-linh-profile.jpg`, a metadata-free 1000 by 1500 pixel derivative of the separately supplied portrait. The original identifier-like filename is not used publicly.
- Editorial illustrations: five metadata-free 1400 by 933 pixel WebP assets under `public/illustrations/`. At the owner's request, the interface shows no AI-origin or generation-method captions; internal provenance remains documented.
- Document review: three sanitized documentary page images and nine designed verified-summary pages under `public/documents/pages/`.
- Gallery: `public/gallery/cung-em-project-donated-clothing.jpg`, a low-risk no-face documentary derivative, bringing the curated gallery to ten images.

All newly prepared raster assets are within the approximately 300 KB per-image budget. Existing reviewed CV and hematology PDFs remain the only public downloadable evidence files.

## Evidence Publication Result

Every one of the 30 substantive files in `src/assets/CV/` has exactly one recorded disposition in `source-publication-matrix.md`. Safe publication uses either a sanitized derivative or a clearly labeled verified summary. Raw academic records, candidate identifiers, personal portraits embedded in official records, financial details, unsafe or unnecessary third-party imagery, duplicates, and both MP4 files remain private.

The Evidence Library represents:

1. Curriculum Vitae - two public sanitized pages plus approved PDF actions.
2. Hematology volunteering acknowledgement - one public sanitized page plus approved PDF actions.
3. Upper-secondary academic record - two verified-summary pages.
4. Cambridge IGCSE statement - one verified-summary page.
5. IELTS Academic result - one verified-summary page, with the official 7.0 result authoritative over the conflicting CV entry.
6. Medicine admission and graduation record - two verified-summary pages.
7. Community project records - three verified-summary pages.

## Generated Image Provenance

The exact accepted prompt text, final project paths, intended section purposes, disclosure treatment, shared visual direction, and visual-review result are recorded in `generated-image-provenance.md`. Generation used the built-in image-generation mode. Generated images contain no identifiable people, student likeness, readable text, logos, certificates, result claims, or documentary-looking service or clinical scenes.

## Interaction and Accessibility

- The document popup displays full-page imagery, an ordered thumbnail rail, direct page selection, previous/next controls, live page position, optional PDF actions, Escape dismissal, and dialog focus containment/restoration.
- The gallery popup displays the ordered documentary collection with previous/next buttons, Left/Right Arrow operation, position feedback, Escape dismissal, and trigger-focus restoration.
- New controls use purpose-based stable test IDs. Existing semantic theme tokens, light/dark behavior, reduced-motion handling, and responsive layout conventions remain in use.

## Verification Completed During Generation

- Focused Vitest result: eight files and 25 tests passed.
- Coverage includes the portrait, absence of visible AI-origin labels, evidence states and page controls, gallery keyboard navigation, focus restoration, lazy loading, restricted content patterns, media collection separation, approved PDF allowlist, neutral profile filename, and raster budgets.
- The disabled Security Baseline and Property-Based Testing extensions were not enabled or expanded for this change.

The full clean build, complete test matrix, and measured release report are intentionally reserved for the mandatory Build and Test stage after Code Generation approval.

## Owner Review Revisions

- Academic rows no longer repeat long scale descriptions in parentheses. Concise row-specific context uses a separator, while each group header retains the authoritative scale description.
- Gallery, Community Care, and Evidence Library card previews now use a consistent 4:3 crop. Gallery, evidence, and Community Care documentary previews open the shared full-detail popup when activated.
- The Contact illustration was removed from the visible layout. The full-width themed panel now provides name, reply-to email, and message fields, a 5,000-character counter, privacy/helper copy, and a recipient-free email-draft action.
- Introduction highlights now prioritize Grade 12 GPA, A-level Biology/Mathematics/Chemistry results, and the medicine admission score.
- All visible AI-origin captions and runtime disclosure fields were removed. Generation provenance remains only in internal AI-DLC documentation.
- Revised verification passes TypeScript, ESLint, diff validation, and 33 focused tests across ten files.
- Academic result cards now share a seven-rem minimum header height with centered content and a uniform internal gap; longer or enlarged text can still expand the header safely.

## Known Limitations

- Five sensitive evidence groups intentionally use designed verified summaries rather than exposing raw scans.
- The contact form intentionally publishes no recipient address. It prepares a local email draft without submitting, transmitting, or storing the entered content; the visitor adds a recipient in their email application.
- Video playback is not included; both supplied MP4 sources remain private.
- Editorial illustrations are contextual visuals and must not be interpreted as documentary evidence or depictions of actual activities.
