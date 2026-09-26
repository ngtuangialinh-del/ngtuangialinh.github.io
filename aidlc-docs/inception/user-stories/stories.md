# Visual Storytelling and Evidence Library User Stories

Approach: journey-based epics containing small feature stories, with dedicated cross-cutting quality stories. Every story uses Given/When/Then acceptance criteria and traces to the approved requirements in `visual-evidence-requirements.md`.

Personas: P1 Academic Reviewer, P2 General Visitor, P3 Student Portfolio Owner, and P4 Repository Contributor and Privacy Reviewer. See `personas.md`.

## Epic 1: Browse a Richer Visual Journey

### VS-1: Recognize a distinct visual rhythm in every section

**As** P1 or P2, **I want** each section to use a purposeful composition suited to its content **so that** the portfolio does not feel like a stack of identical cards.

**Requirements**: FR-1

**Acceptance criteria**:

- Given the eight portfolio sections, when a visitor moves through the page, then the layouts use varied but coherent hierarchy, media placement, grouping, and whitespace.
- Given a composition is viewed at approximately 390, 768, 1024, or 1440 pixels wide, when content reflows, then reading order and controls remain understandable without horizontal page scrolling.

### VS-2: Keep editorial imagery separate from evidence

**As** P2, **I want** editorial visuals to remain outside documentary and evidence collections **so that** they support the layout without being presented as proof of a real event or achievement.

**Requirements**: FR-2, FR-9, NFR-2

**Acceptance criteria**:

- Given an editorial visual is presented, when a visitor views its section, then no visible AI-origin or generation-method caption is shown.
- Given the Evidence Library or documentary gallery is displayed, when its media is reviewed, then no generated image is presented as a source document or real activity photograph.

### VS-3: See cohesive section-level image anchors

**As** P1 or P2, **I want** a small set of cohesive scientific/editorial images at meaningful points **so that** imagery supports orientation without overwhelming the evidence and written story.

**Requirements**: FR-2

**Acceptance criteria**:

- Given the full portfolio, when its generated media is inventoried, then approximately five section-level visual anchors use a consistent editorial/scientific language.
- Given any generated anchor, when reviewed, then it contains no identifiable person, embedded text, logo, watermark, unsupported claim, or fabricated documentary scene.

### VS-4: Retain familiar navigation and preferences

**As** any returning visitor, **I want** existing navigation, hashes, themes, journal behavior, and reduced-motion preferences to keep working **so that** the richer presentation does not break familiar interactions.

**Requirements**: FR-10

**Acceptance criteria**:

- Given an existing section hash or navigation control, when it is activated, then the expected destination and active-state behavior remain available.
- Given a visitor changes theme or requests reduced motion, when the interface updates, then the preference is respected without losing content or functionality.

### VS-5: See the approved student portrait

**As** P1 or P2, **I want** a clear professional profile portrait in the introduction **so that** I can connect the portfolio's identity with the student it represents.

**Requirements**: FR-11, NFR-2, NFR-3

**Acceptance criteria**:

- Given the Introduction section, when it renders, then the explicitly supplied real portrait is shown with accurate alternative text and responsive cropping that keeps the face visible.
- Given the public asset and build output, when inspected, then the identifier-like source filename and unnecessary embedded metadata are not published, and the optimized asset meets the media budget where practical.

## Epic 2: Discover and Trust Portfolio Evidence

### EV-1: Find every relevant evidence group

**As** P1, **I want** relevant academic, admission, service, and CV evidence represented in one library **so that** I can evaluate the portfolio without guessing what supports each claim.

**Requirements**: FR-3, FR-5

**Acceptance criteria**:

- Given the Evidence Library, when its items are reviewed, then it covers the CV, hematology acknowledgement, school record, admission material, IGCSE evidence, IELTS evidence, and community-project documentation wherever safe evidence or a verified summary is available.
- Given a substantive CV-folder source is not publicly previewed, when its disposition is checked, then a recorded reason identifies it as a duplicate, private original, verified-summary source, or deferred item.

### EV-2: Understand each item's publication state and provenance

**As** P1, **I want** evidence cards to explain what I am seeing **so that** I can distinguish sanitized evidence from summaries and private originals.

**Requirements**: FR-5, FR-9

**Acceptance criteria**:

- Given an evidence card, when it renders, then it identifies the source type, publication state, page count where applicable, and whether a sanitized PDF or download is available.
- Given an item is summary-only, when a visitor reads it, then the interface does not imply that a public source page is available.

### EV-3: Preview meaningful document pages before opening them

**As** P1, **I want** representative page imagery and page counts on evidence cards **so that** I can decide which document to review in depth.

**Requirements**: FR-5

**Acceptance criteria**:

- Given a multi-page public document, when its card renders, then it shows a representative sanitized preview and the total page count.
- Given a document has no safe public page image, when its card renders, then it presents a verified summary state instead of a broken or misleading preview.

### EV-4: Trust authoritative results when sources differ

**As** P1, **I want** official results to take precedence over derived CV text **so that** academic information is not silently misrepresented.

**Requirements**: FR-5, NFR-2

**Acceptance criteria**:

- Given the CV and an official result contain different values, when the public content is prepared, then the official source is treated as authoritative.
- Given a material discrepancy affects a displayed claim, when the evidence item is reviewed, then the resolution is documented rather than hidden.

### EV-5: Download the approved CV

**As** P1, **I want** a clear control for the sanitized CV **so that** I can retain the approved document for later review.

**Requirements**: FR-6, FR-10

**Acceptance criteria**:

- Given the approved CV evidence item or relevant call to action, when the download control is activated, then the sanitized CV opens or downloads with a meaningful filename.
- Given a document is not approved for download, when its card renders, then no download control is offered.

## Epic 3: Review Documents Page by Page

### DR-1: Open the selected document in a focused review popup

**As** P1, **I want** a document card to open an accessible review dialog **so that** I can inspect the evidence without losing my place on the portfolio.

**Requirements**: FR-6, NFR-1

**Acceptance criteria**:

- Given a reviewable evidence card, when its preview action is activated, then a titled modal opens with the first selected page and page thumbnails.
- Given the modal closes, when focus returns, then it returns to the control that opened it.

### DR-2: Move between every public page

**As** P1, **I want** previous, next, and direct page-selection controls **so that** I can review a multi-page document efficiently.

**Requirements**: FR-6

**Acceptance criteria**:

- Given a multi-page document is open, when previous, next, or a thumbnail is activated, then the selected full-page image and current-page position update together.
- Given the first or last page is selected, when navigation controls render, then unavailable movement is clearly disabled or omitted.

### DR-3: Operate the document popup entirely by keyboard

**As** P1 using a keyboard or assistive technology, **I want** predictable focus and dismissal behavior **so that** the popup never traps me or sends me to an unknown location.

**Requirements**: FR-6, NFR-1

**Acceptance criteria**:

- Given the modal is open, when Tab or Shift+Tab is used, then focus remains within the modal and every interactive control is reachable with visible focus.
- Given the modal is open, when Escape is pressed, then it closes and focus returns to its trigger.

### DR-4: Use a page-image fallback and optional PDF controls

**As** P1, **I want** readable page images even when inline PDF support is unavailable **so that** evidence review does not depend on a browser plug-in.

**Requirements**: FR-6

**Acceptance criteria**:

- Given inline PDF rendering is unavailable or blocked, when the popup opens, then sanitized page images and navigation remain usable.
- Given an approved sanitized PDF exists, when the popup renders, then an optional full-PDF view or download is available without replacing the page-image fallback.

### DR-5: Review documents comfortably on mobile and slow connections

**As** P2 on a phone, **I want** page controls and readable previews without loading every full-resolution page initially **so that** document review remains practical.

**Requirements**: FR-6, NFR-3

**Acceptance criteria**:

- Given a narrow viewport, when the popup opens, then the selected page, thumbnails, and close/navigation controls remain reachable without horizontal page overflow.
- Given a multi-page document is available, when the main page first renders, then non-selected full-resolution pages are not all eagerly loaded.

## Epic 4: Explore Documentary Gallery Media

### GA-1: Browse enough distinct and relevant photographs

**As** P2, **I want** a gallery that retains the approved photographs and adds only useful, low-risk context **so that** the portfolio feels visual without becoming repetitive or invasive.

**Requirements**: FR-7

**Acceptance criteria**:

- Given the Gallery, when its public items are inventoried, then all nine approved images remain unless a documented quality or privacy issue requires removal.
- Given an additional source photograph is considered, when publication review occurs, then it is added only if it is distinct, relevant, low-risk, and not a bedside close-up, weak screenshot, or duplicate.

### GA-2: Understand the context of every gallery image

**As** P2, **I want** captions, dates or periods, and useful alternative text **so that** each image contributes to a real story rather than acting as decoration.

**Requirements**: FR-7

**Acceptance criteria**:

- Given a documentary gallery item, when it renders, then it has a concise caption, mapped initiative or story, contextual date or period when known, and useful alternative text.
- Given an image is decorative rather than documentary, when rendered, then it is not placed in the evidence or documentary gallery zones.

### GA-3: Navigate the gallery lightbox without closing each image

**As** P2, **I want** previous and next controls with position feedback **so that** I can review the gallery as a sequence.

**Requirements**: FR-7, NFR-1

**Acceptance criteria**:

- Given a gallery item is open, when previous or next is activated by pointer or keyboard, then the adjacent image, caption, and position indicator update.
- Given the lightbox closes by Escape or its close control, when dismissal completes, then focus returns to the triggering gallery item.

### GA-4: Exclude unsafe images and videos

**As** P3 or P4, **I want** consent-sensitive media and both videos kept private **so that** visual expansion does not weaken dignity, privacy, captioning, or performance boundaries.

**Requirements**: FR-7, FR-8, NFR-2

**Acceptance criteria**:

- Given source images show patients, minors, identifiers, or intimate bedside contexts, when reviewed, then they are excluded unless the approved low-risk criteria are clearly satisfied.
- Given the public source tree and production build, when inspected, then neither source MP4 is imported, linked, or copied.

## Epic 5: Govern Sources and Public Derivatives

### PB-1: Record a disposition for every substantive source

**As** P4, **I want** a source-to-public disposition matrix **so that** no CV-folder file is silently omitted or published without review.

**Requirements**: FR-3, NFR-2

**Acceptance criteria**:

- Given the 30 substantive CV-folder files, when the matrix is complete, then each has exactly one disposition and a concise rationale.
- Given a public derivative or summary exists, when its matrix row is reviewed, then it links the derivative to its private source without exposing a raw public URL.

### PB-2: Publish only safely sanitized document derivatives

**As** P3, **I want** document previews and PDFs stripped of unnecessary sensitive data **so that** evidence can be reviewed without exposing identity, contact, financial, or third-party details.

**Requirements**: FR-4, NFR-2

**Acceptance criteria**:

- Given a document derivative is public, when reviewed, then prohibited identifiers, portraits, addresses, phone numbers, financial data, QR codes, action links, and unnecessary third-party data are absent or irreversibly obscured.
- Given safe redaction would make a document misleading or unusable, when publication treatment is selected, then a verified summary is used instead.

### PB-3: Preserve generated-asset provenance

**As** P4, **I want** final image paths, generation prompts, and disclosure intent recorded **so that** the editorial assets are maintainable and auditable.

**Requirements**: FR-2, NFR-4

**Acceptance criteria**:

- Given a generated image is committed to the project, when implementation documentation is reviewed, then its final path, prompt, purpose, and disclosure treatment are recorded.
- Given a generated image is exported, when its optimized asset is reviewed, then it contains no unintended text, logo, watermark, or recognizable person.

### PB-4: Keep content zones semantically separate

**As** P3, **I want** illustrations, documentary photographs, document pages, and summaries presented in their correct zones **so that** visitors understand the evidentiary weight of each item.

**Requirements**: FR-9

**Acceptance criteria**:

- Given Community Care or Gallery media, when displayed, then approved photographs are described as real contextual imagery rather than credentials.
- Given an editorial illustration, evidence page, or verified summary, when displayed, then its type is clear from semantics and visible context rather than color alone.

### PB-5: Maintain evidence and media through typed reusable structures

**As** P4, **I want** shared typed models and modal components **so that** future additions do not duplicate behavior or bypass publication metadata.

**Requirements**: FR-5, NFR-4

**Acceptance criteria**:

- Given evidence and gallery data, when a new item is added, then required provenance, status, pages, redaction, captions, and download properties are enforced by typed structures where applicable.
- Given document and gallery overlays are maintained, when their behavior is inspected, then shared accessibility and navigation logic is reused rather than independently reimplemented in sections.

## Epic 6: Cross-Cutting Quality

### QL-1: Use the complete experience accessibly

**As** P1 or P2 with access needs, **I want** semantic structure, contrast, alternative text, named controls, focus management, and reduced motion **so that** every major journey remains available.

**Requirements**: NFR-1

**Acceptance criteria**:

- Given either theme and a supported viewport, when automated and manual checks are performed, then headings, landmarks, contrast, alternative text, visible focus, accessible names, and selected states meet the approved accessibility expectations.
- Given a popup opens and closes, when keyboard-only operation is used, then focus containment, Escape dismissal, background isolation, and restoration work consistently.

### QL-2: Prevent private or misleading content from shipping

**As** P3 or P4, **I want** publication-boundary tests **so that** raw source paths, prohibited identifiers, editorial/documentary mixing, and misleading evidence states cannot enter the public build unnoticed.

**Requirements**: NFR-2, NFR-5

**Acceptance criteria**:

- Given source, fixtures, public assets, and build output, when privacy checks run, then prohibited personal-data patterns and raw CV-source public URLs are not found.
- Given editorial and documentary items render, when separation tests run, then editorial media stays out of evidence/gallery collections and no visible AI-origin label is emitted.

### QL-3: Keep imagery and document review performant

**As** P2 on a constrained connection, **I want** optimized and lazy-loaded media **so that** the portfolio remains responsive despite richer visuals.

**Requirements**: NFR-3

**Acceptance criteria**:

- Given a production build, when bundles and public media are measured, then JavaScript remains within the approximate 300 KB gzip budget and raster assets meet the approximate 300 KB target unless an exception is documented.
- Given below-the-fold imagery and unselected document pages, when the initial page loads, then they are lazy-loaded or deferred rather than all fetched at full resolution.

### QL-4: Verify retained and new journeys before release

**As** P4, **I want** focused component, integration, accessibility, privacy, lint, type, and production-build checks **so that** the enhancement can be released without regressing the established portfolio.

**Requirements**: FR-10, NFR-5

**Acceptance criteria**:

- Given the completed implementation, when the full verification suite runs, then existing tests and new document-popup, lightbox, media-separation, evidence-state, privacy, and accessibility tests pass.
- Given root and project-base production builds, when both are generated and inspected, then navigation, themes, CV download, client-only recipient-free email drafting, responsive behavior, and reduced-motion behavior remain functional.

## Requirement Traceability

| Requirement | Stories                            |
| ----------- | ---------------------------------- |
| FR-1        | VS-1                               |
| FR-2        | VS-2, VS-3, PB-3                   |
| FR-3        | EV-1, PB-1                         |
| FR-4        | PB-2                               |
| FR-5        | EV-1, EV-2, EV-3, EV-4, PB-5       |
| FR-6        | EV-5, DR-1, DR-2, DR-3, DR-4, DR-5 |
| FR-7        | GA-1, GA-2, GA-3, GA-4             |
| FR-8        | GA-4                               |
| FR-9        | VS-2, EV-2, PB-4                   |
| FR-10       | VS-4, EV-5, QL-4                   |
| FR-11       | VS-5                               |
| NFR-1       | DR-1, DR-3, GA-3, QL-1             |
| NFR-2       | VS-2, EV-4, GA-4, PB-1, PB-2, QL-2 |
| NFR-3       | DR-5, QL-3                         |
| NFR-4       | PB-3, PB-5                         |
| NFR-5       | QL-2, QL-4                         |

## INVEST Review

| Check       | Result                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Independent | Stories describe separable visitor or contributor outcomes; cross-cutting stories hold shared quality gates.        |
| Negotiable  | Acceptance criteria specify outcomes and constraints without prescribing component internals or scheduling.         |
| Valuable    | Every story serves a named persona and maps to an approved requirement.                                             |
| Estimable   | Each story has a bounded interaction, content-governance outcome, or verification result.                           |
| Small       | Stories are split by section behavior, evidence behavior, popup behavior, gallery behavior, or one quality concern. |
| Testable    | Every story includes observable Given/When/Then acceptance criteria.                                                |

## Extension Status

- Security Baseline: disabled by owner decision; scoped privacy requirements remain part of these stories.
- Property-Based Testing: disabled by owner decision; verification uses focused example-based tests.
