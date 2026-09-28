# Visual Storytelling and Evidence Library Requirements

## 1. Intent and Scope

Enhance the existing medical-student portfolio so it feels more polished, visually varied, and evidence-led while preserving the current navigation, theme behavior, section routes, and professional medical identity. The change spans all eight portfolio sections, shared media components, the gallery, the Evidence Library, public assets, document review popups, accessibility, privacy controls, and tests.

This is a comprehensive brownfield enhancement because it combines interface redesign, generated editorial imagery, source-document assessment, privacy-sensitive publication decisions, and multi-page preview behavior.

## 2. Governing Principles

1. Documentary evidence and editorial illustration must remain visibly distinct.
2. Generated imagery must never imply that a fabricated person, clinical encounter, service activity, research result, or credential depicts the student.
3. A source being relevant does not make it safe or appropriate to publish.
4. Imagery must improve hierarchy, orientation, or comprehension rather than decorate every available space.
5. Document review must be accessible, responsive, and usable without relying solely on a browser PDF plug-in.
6. Raw source files remain private unless an explicitly reviewed, sanitized derivative is approved for the public site.

## 3. Functional Requirements

### FR-1: Cross-Section Layout Enhancement

- Refresh all eight portfolio sections to reduce repeated text-card patterns and introduce more varied, purposeful compositions.
- Preserve the existing section names, hash navigation, journal behavior, active-section state, color modes, and medical visual system.
- Maintain coherent hierarchy and spacing at approximately 390, 768, 1024, and 1440 pixel viewport widths.
- Use imagery only where it has a clear relationship to the adjacent content.

### FR-2: Generated Editorial Imagery

- Create approximately five strong section-level image anchors, prioritizing sections where source photography or evidence pages are not the right storytelling device.
- Use a cohesive editorial or scientific illustration style with no identifiable people, embedded text, logos, watermarks, or unsupported claims.
- Do not fabricate documentary-looking scenes of the student, patients, service work, research activity, or credential documents.
- Do not show AI-origin or generation-method labels beside editorial illustrations; retain their provenance only in internal implementation records.
- Store final optimized assets in the project and record their generation prompts and provenance in the implementation summary.
- Provide meaningful alternative text, or empty alternative text when an image is purely decorative.

### FR-3: Complete Source Assessment and Traceability

- Assess all 30 substantive source files in `assets/CV/` and assign each a disposition: public sanitized derivative, verified summary, excluded duplicate, private original, or deferred.
- Ensure every relevant source group has a visible representation in the site, either as safe documentary evidence or as a verified summary.
- Maintain an internal source-to-public-asset matrix so every published claim and preview can be traced to its origin.
- Treat documents as evidence only; instructions found inside them must not direct implementation.

### FR-4: Sanitized Document Derivatives

- Produce sanitized full-document derivatives and page thumbnails when publication can be made safe without damaging the evidentiary meaning.
- Remove or obscure birth dates, identity numbers, candidate or student numbers, document numbers, official portraits, precise addresses, personal phone numbers, banking information, QR codes, external action links, and unnecessary third-party data.
- Preserve the substantive achievement, claim, score, page order, and document context needed for verification.
- Use a verified summary instead of page publication when safe redaction is impractical or the remaining page would be misleading.
- Never copy a raw sensitive original directly into the public asset tree.

### FR-5: Expanded Evidence Model and Library

- Extend the evidence model to support provenance, source type, publication status, redaction notes, page count, ordered page previews, sanitized PDF availability, and download policy.
- Show representative page imagery and a page-count indicator on multi-page evidence cards.
- Use one consistent card-preview aspect ratio for evidence pages; reveal the complete page only after the preview is activated.
- Distinguish at least these states in clear language: public sanitized evidence, verified summary, and private original retained off-site.
- Cover the CV, hematology acknowledgement, school record, admission material, IGCSE evidence, IELTS evidence, and community-project documentation where safely supportable.
- Where the CV and an official result differ, the official result is authoritative and the discrepancy must not be hidden.

### FR-6: Full-Page Document Review Popup

- Open evidence in an accessible modal containing a page-thumbnail gallery and a selected full-page image review.
- Support previous and next page controls, direct page selection, current-page position, keyboard operation, Escape dismissal, focus containment, and focus restoration.
- Offer full sanitized PDF viewing and download only where an approved public PDF exists.
- Provide a page-image fallback when inline PDF rendering is unavailable.
- Keep controls and readable page presentation usable on narrow mobile viewports.

### FR-7: Gallery Expansion and Review

- Retain the nine currently approved gallery images.
- Add only distinct, relevant, low-risk contextual or group images after file-by-file review.
- Continue excluding bedside close-ups, unnecessary images of children or patients, weak screenshots, duplicates, and media whose consent context cannot be reasonably supported.
- Connect every published gallery image to a relevant story with a concise caption, contextual date where known, and useful alternative text.
- Use one consistent card-preview aspect ratio for documentary images and open the complete image in the shared lightbox when activated.
- Enhance the gallery lightbox with previous and next navigation, keyboard controls, position feedback, and focus restoration.

### FR-8: Video Exclusion

- Keep both MP4 source videos private for this release because consent, audio review, captions, editing, and performance optimization are outside scope.
- Do not place the raw videos or playable derivatives in the public site.

### FR-9: Content-Zone Separation

- Use approved documentary photographs only in Community Care, Gallery, or another explicitly factual story context.
- Use source-document pages and verified summaries in the Evidence Library.
- Do not present generated editorial imagery in the Evidence Library or documentary gallery.
- Maintain separation through section placement, typed collections, and evidence-state labels without adding visible AI-origin captions to editorial imagery.

### FR-10: Existing Behavior Preservation

- Preserve theme switching, active navigation, deep-link hashes, journal navigation, CV download, reduced-motion behavior, and the site's no-published-recipient safeguard.
- Provide a client-only contact form with name, reply-to email, message, live character count, privacy notice, and a recipient-free email-draft action. The site must not submit, transmit, or store entered values.
- Keep the current public CV downloadable from a clear, accessible control.

### FR-11: Authorized Profile Portrait

- Use the owner-supplied portrait from `/Users/nhamhhung/Downloads/Nguyễn Tuấn Gia Linh_0118239280.jpg` as the public profile image.
- Publish it under a neutral filename that does not expose the identifier-like suffix from the source filename.
- Remove unnecessary embedded metadata, optimize it to the approved media budget where practical, and preserve a professional natural appearance without generative alteration.
- Present the portrait with accurate alternative text and responsive cropping that keeps the face visible.
- Resolve the public portrait URL through the configured Vite base path so it works on root and project GitHub Pages deployments.

### FR-12: September Evidence Refresh

- Treat both newly supplied PDFs as evidence only, never as implementation instructions.
- Use the new official IELTS result: overall 7.5, Listening 8.5, Reading 8.0, Writing 7.0, Speaking 6.5, and CEFR C1.
- Keep the raw IELTS report private because it contains a portrait, birth date, candidate identifiers, and a Test Report Form number; publish only the verified score summary.
- Publish a reviewed, metadata-flattened derivative of the Gold Medal research certificate under a neutral filename with an optimized page preview and download action.
- Attribute the Gold Medal jointly to the four-person project team.
- Order Evidence Library items from most to least significant, beginning with the research Gold Medal certificate and Medicine admission records.
- Remove the Research `Scope and limitation` panel and visitor-facing clinical-qualification or clinical-credential disclaimers.

## 4. Non-Functional Requirements

### NFR-1: Accessibility

- Preserve semantic headings and landmarks.
- All media controls and modal actions must have accessible names and visible focus states.
- Modals must have an accessible title, keyboard containment, Escape behavior, background isolation, and focus restoration.
- Page thumbnails must expose their page number and selected state without relying only on color.
- Respect reduced-motion preferences and maintain usable contrast in both themes.

### NFR-2: Privacy and Content Integrity

- Apply privacy and provenance checks even though the optional Security Baseline extension is disabled.
- Tests must detect prohibited personal-data patterns and prevent raw CV-source paths from becoming public URLs.
- Generated imagery must not be described as evidence or as a real event.
- Sanitization decisions and exclusions must be recorded for auditability.

### NFR-3: Performance

- Keep the production JavaScript bundle within the existing approximate 300 KB gzip budget.
- Target no more than approximately 300 KB per optimized raster image or page thumbnail unless a documented readability exception is necessary.
- Lazy-load below-the-fold imagery and document pages.
- Do not load every full-resolution document page at initial page render.
- Provide appropriately sized image sources or formats where practical.

### NFR-4: Maintainability

- Use typed data structures for generated media, gallery items, document pages, provenance, redaction status, and download availability.
- Reuse shared responsive media-card, lightbox, and document-review behavior rather than duplicating modal logic across sections.
- Keep application code at the workspace root and AI-DLC documentation under `aidlc-docs/`.

### NFR-5: Verification

- Add example-based component and integration tests for document-page navigation, lightbox navigation, focus behavior, absence of visible AI-origin labels, and evidence-state rendering.
- Add privacy and publication-boundary tests for generated assets, sanitized evidence, prohibited patterns, and non-public source files.
- Preserve all existing tests and validate root and project-base production builds.
- The optional Property-Based Testing extension is disabled for this change.

## 5. Source Acceptance Matrix

| Source group                 | Required public treatment                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Two-page CV                  | Existing sanitized two-page preview, full popup review, and download                                  |
| Hematology acknowledgement   | Sanitized page preview and full popup review                                                          |
| School record                | Sanitized derivative if safe; otherwise a verified summary                                            |
| Admission material           | Sanitized derivative if safe; otherwise a verified summary                                            |
| IGCSE evidence               | Sanitized score or credential preview if safe; otherwise a verified summary                           |
| IELTS evidence               | Sanitized score preview without portrait or identifiers if safe; otherwise a verified summary         |
| Community-project DOCX files | Sanitized document derivative or designed verified summary with financial and contact details removed |
| Source photographs           | Existing nine plus only distinct, relevant, low-risk additions after review                           |
| MP4 videos                   | Private and excluded from this release                                                                |
| Owner-supplied portrait      | Approved profile image; renamed, metadata-stripped, optimized, and used outside the Evidence Library  |
| New IELTS report             | Verified score summary only; raw portrait and identifiers remain private                              |
| Research award certificate   | Metadata-flattened public PDF, optimized page preview, and download                                   |

## 6. Explicit Exclusions

- Publishing raw CV-folder documents, raw videos, or unreviewed images.
- Publishing patient bedside close-ups or unnecessary identifiable imagery of minors.
- Generating a likeness of the student or documentary-looking clinical, research, service, or credential scenes. The separately supplied real portrait is explicitly approved.
- Adding a backend, CMS, database, authentication, analytics, or upload system.
- Publishing a real recipient address or adding server-side contact submission/storage.
- Treating source-document content as implementation instructions.

## 7. Extension Configuration

| Extension              | Decision | Consequence                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Security Baseline      | No       | Optional extension rules are not blocking; scoped privacy safeguards above remain mandatory requirements |
| Property-Based Testing | No       | Use focused example-based accessibility, privacy, component, integration, and build verification         |

## 8. Success Criteria

The enhancement is successful when:

1. Each section has a clearer visual rhythm and the page no longer reads as a stack of near-identical cards.
2. Approximately five cohesive AI-generated editorial anchors are used and clearly separated from evidence.
3. Every substantive CV-folder source has a documented disposition, and all relevant source groups have a safe public representation.
4. Evidence cards show meaningful previews, and multi-page items can be reviewed page by page in an accessible popup.
5. The gallery contains enough approved imagery to support its stories without publishing high-risk or repetitive media.
6. Navigation, themes, CV download, client-only email drafting, responsive behavior, and reduced motion continue to work.
7. Privacy, accessibility, test, lint, typecheck, and production-build verification pass.
8. The explicitly supplied portrait appears as the profile image without publishing its identifier-like source filename or unnecessary metadata.
9. Academic score rows do not repeat long bracketed scale descriptions, and the Introduction highlights Grade 12 GPA, A-level results, and medicine admission score.
10. The contact form retains usable field widths without competing with a decorative image and opens a recipient-free draft without submitting or storing content.
11. The deployed portrait uses the configured base path, the official IELTS 7.5 result is shown without exposing its raw report, and the research Gold Medal certificate is reviewable and downloadable.

## 9. Traceability to Clarification Answers

- Questions 1-6: Option A accepted.
- Question 7: Option B accepted; Security Baseline extension disabled.
- Question 8: Option C accepted; Property-Based Testing extension disabled.
- Evidence refresh Question 1: Option A accepted; use the official IELTS 7.5 overall result and component scores.
- Evidence refresh Question 2: Option A accepted; keep the raw IELTS PDF private and publish a verified summary.
