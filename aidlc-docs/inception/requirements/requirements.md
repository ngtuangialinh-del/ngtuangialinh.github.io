# Medical Student Portfolio Revamp Requirements

## Intent Analysis Summary

- **User request**: "using ai-dlc, help me customise this portfolio site to the student profile inside src/assets/CV. Please make sure to completely revamp the design, theme, color, layout, navigation, ... to fit the theme of medicine instead of the current design"
- **Request type**: System-wide user-facing enhancement, content migration, presentation replacement, and focused architectural simplification.
- **Scope estimate**: System-wide frontend change spanning content models, sections, navigation, theme architecture, asset curation, accessibility, tests, and GitHub Pages output.
- **Complexity estimate**: Complex because the work replaces the visible product identity, restructures the information architecture, incorporates sensitive evidence, and retires cross-cutting template behavior.
- **Requirements depth**: Comprehensive.

## Product Goal

Create a cohesive, credible, and accessible public portfolio for Nguyễn Tuấn Gia Linh that presents his transition into medical education through verified academic preparation and sustained community care. The result must feel purpose-built for medicine rather than like a technology or business template with new colors.

## Approved Product Decisions

1. The primary audience is university faculty, scholarship reviewers, and academic mentors, with community visitors as a secondary audience.
2. Public copy is English-first while preserving Vietnamese personal and place names accurately.
3. The evidence-supported role is "Incoming medical student, admitted to the Medicine program at the University of Medicine and Pharmacy, Thai Nguyen University."
4. The site is one cohesive scrolling story with sticky navigation and direct hash links.
5. Top-level navigation is Introduction, Medical Journey, Academics, Community Care, Gallery, and Contact.
6. The visual direction is calm clinical editorial: deep teal, surgical blue, warm ivory, restrained red accents, generous whitespace, and precise typography.
7. The design is light-first with an equally accessible dark mode.
8. The hero is portrait-free and uses medical motifs plus service imagery; it must not extract the identification portrait from an official record.
9. Only verified facts and designed summaries may be public. Raw records remain outside the public build.
10. A carefully selected subset of contextual service images may be used with respectful captions and limited close-ups.
11. The two large activity videos are excluded from the initial public site.
12. Direct contact information is omitted until an approved student-owned channel is supplied; the final section uses a future-looking statement.
13. Engineering and Business are replaced by one medical presentation. The style selector, template persistence, journal, technical projects, technical skills, and inherited identity are removed from the runtime experience.
14. Copy uses a sincere first-person voice with evidence-based language and no unsupported medical claims.
15. The Security Baseline extension is disabled after the user chose to retain direct GitHub Pages hosting.
16. Full Property-Based Testing rules are enabled.

## Stakeholders and User Scenarios

### Primary Stakeholders

- **Student**: Needs a truthful, dignified portfolio that can grow with future medical education.
- **Academic reviewer or mentor**: Needs to understand preparation, trajectory, evidence, and values quickly.
- **Community visitor**: Needs accessible context for the student's service work without exposure to sensitive data.
- **Repository contributor**: Needs typed, maintainable content structures and dependable verification.

### Core Scenarios

1. A reviewer opens the homepage and understands the student's medical trajectory within the first viewport.
2. A reviewer follows the academic story from Nguyễn Siêu School through IGCSE, IELTS, Grade 12 results, and documented medical-program admission.
3. A visitor explores three community-care initiatives and understands scope, beneficiaries, dates, and outcomes through concise stories and selected images.
4. A keyboard or mobile user reaches every section, changes color mode, opens gallery media, and follows direct section links without losing context.
5. A contributor updates a fact or image through typed content without editing complex presentation code.
6. A privacy reviewer can confirm that raw identity, academic, financial, contact, and third-party records are absent from the public artifact and repository history created by this change.

## Functional Requirements

### MSP-FR-01: Public Identity

The portfolio must identify the student as Nguyễn Tuấn Gia Linh and use the approved evidence-supported incoming-medical-student wording. It must not display a birth date, government identifier, candidate number, private address, private phone number, bank information, or unapproved email/social account.

### MSP-FR-02: Audience, Language, and Voice

The portfolio must:

- Use English for primary interface and narrative copy.
- Preserve Vietnamese names and place names with correct diacritics where supported by the source evidence.
- Use a reflective first-person voice for student narrative.
- Distinguish verified facts from reflective motivation.
- Avoid claiming clinical expertise, patient care responsibility, medical qualifications, or institutional endorsement beyond the evidence.

### MSP-FR-03: Single Medical Presentation

The application must expose exactly one medicine-themed presentation. Visitors must not see Engineering, Business, style selection, or presentation descriptions. Obsolete template-selection persistence must no longer influence rendering.

### MSP-FR-04: Information Architecture

The runtime navigation must contain these ordered destinations:

1. Introduction
2. Medical Journey
3. Academics
4. Community Care
5. Gallery
6. Contact

Every navigation destination must map to one unique semantic section and a stable direct hash link.

### MSP-FR-05: Responsive Navigation

The site must provide:

- A sticky desktop navigation treatment that clearly identifies the active section.
- A compact mobile navigation control with accessible open, close, and destination labels.
- Keyboard-operable links and controls.
- A skip link to main content.
- Predictable focus placement after navigation where appropriate.

### MSP-FR-06: Portrait-Free Introduction

The opening section must:

- Present the student's name, approved medical status, and concise value statement.
- Use a distinctive editorial composition without relying on an official-document portrait.
- Use medicine-relevant graphic language that does not imitate a hospital logo or imply professional licensure.
- Provide primary navigation into Medical Journey or Community Care.

### MSP-FR-07: Medical Journey

The Medical Journey section must connect:

- Secondary education at Nguyễn Siêu School.
- Strength in science and English.
- Sustained service activities.
- Documented 2026 admission to the Medicine program at the University of Medicine and Pharmacy, Thai Nguyen University.

The section must present chronology without implying that admission alone constitutes medical qualification.

### MSP-FR-08: Academic Evidence

The Academics section must present designed summaries of:

- Cambridge IGCSE June 2024: Mathematics A* at 92%, English as a Second Language A at 88%, Physics A at 88%, Biology A at 83%, and Chemistry A at 83%.
- IELTS Academic: overall 7.0, CEFR C1, Listening 8.0, Reading 7.5, Writing 6.5, and Speaking 6.0 after One Skill Retake.
- Grade 12 highlights: English, Biology, History, and Computer Science at 9.8; Chemistry at 9.4; Mathematics at 8.6; and Literature at 7.8.
- Excellent-student recognition documented across Grades 10, 11, and 12.
- The documented medical-program admission score of 27.20.

Every numerical value must be manually cross-checked against its source before final release. The site must explain the type of score where a number could otherwise be misread.

### MSP-FR-09: Community Care Stories

The Community Care section must provide dedicated, respectful summaries for:

1. The 30 July 2026 pediatric hematology support activity, including the documented delivery of 100 gifts to pediatric patients at the National Institute of Hematology and Blood Transfusion.
2. The multi-year “Cùng em vững bước tới trường” class project, including support for 50 children, school supplies and facilities, warm clothing, meals, and related community infrastructure contributions.
3. The 5 January 2025 Lunar New Year support program for visually impaired people in Ý Yên and Agent Orange-affected families in Thái Bình, including the thank-you record for 165 gifts.

Copy must describe class or group accomplishments as collective work and must not attribute every group outcome solely to the student.

### MSP-FR-10: Curated Gallery

The Gallery must use only a selected subset of supplied service images. Each published image must have:

- A descriptive, respectful alternative text.
- A concise contextual caption.
- A mapped initiative and date or period when known.
- An intentional crop that does not misrepresent the activity.
- Lazy loading when it is below the initial viewport.

The gallery must avoid unnecessary close-ups of patients, children, or beneficiaries and must not expose information visible in screenshots or documents that is unrelated to the public story.

### MSP-FR-11: Evidence Privacy and Repository Boundary

Raw CV evidence must remain outside the public Vite artifact and must not be newly committed into the public repository by this implementation. Specifically:

- The untracked `src/assets/CV/` source collection must be ignored or otherwise protected from accidental bulk commit.
- Selected approved photographs must be copied into a clearly named public asset directory with descriptive filenames.
- Academic records, admission notices, IELTS scans, thank-you letters, and DOCX files must not be imported or linked.
- No raw screenshot containing private contact, banking, identity, or third-party information may be published.
- If document previews are added in the future, they require separately reviewed redacted derivatives.

### MSP-FR-12: Video Exclusion

The two supplied MP4 files must not be imported, copied into the public asset set, embedded, or linked in the initial release.

### MSP-FR-13: Contact Destination

The final navigation destination may be labeled Contact, but until a student-owned public channel is approved it must:

- Contain no form that sends to the current repository owner's email.
- Contain no inherited social links.
- Present a concise statement about continued learning, service, and future connection.
- Be structured so an approved contact link can be added later through typed content.

### MSP-FR-14: Color Mode

The site must provide light and dark modes with:

- A visible, accessible mode control.
- Persistent visitor preference using the existing safe color-mode mechanism.
- Equivalent information, hierarchy, focus visibility, and contrast in both modes.
- No flash of an incompatible inherited theme during startup.

### MSP-FR-15: Medical Design System

The presentation must establish a new design system with:

- Deep teal and surgical blue as primary anchors.
- Warm ivory or a comparable low-glare neutral for light surfaces.
- Restrained red reserved for meaningful accent or status use, not large backgrounds.
- Editorial typography with a clear hierarchy and readable body copy.
- Subtle medical motifs such as pulse lines, clinical annotations, or anatomical geometry without stock-template clichés.
- Consistent spacing, borders, radii, motion, iconography, and image treatment.

### MSP-FR-16: Legacy Runtime Removal

The implementation must remove or retire from runtime:

- Engineering and Business presentation selection.
- `PortfolioStyleSelector` and template-selection persistence.
- Multi-presentation labels and descriptions.
- The inherited data-engineering identity, resume, education, employment, projects, gallery, writing, skills, certificates, email, and social links.
- Journal routes and content.
- Technical-project and technical-credential presentation sections.
- Tests that assert obsolete behavior, replacing them with medical-portfolio tests.

Reusable routing, color mode, UI primitives, accessibility behavior, and deployment logic may remain where they fit the approved experience.

### MSP-FR-17: Direct-Link Behavior

Every approved section hash must resolve safely on GitHub Pages. Unknown hashes must fall back predictably without a blank screen, uncaught error, or inherited route.

### MSP-FR-18: Metadata and Document Identity

The browser document title, description, icons where available, social-preview metadata where practical, and accessible landmark labels must identify the medical student portfolio rather than the starter template or previous owner.

## Non-Functional Requirements

### MSP-NFR-01: Accessibility

- Target WCAG 2.2 AA for contrast, keyboard access, visible focus, structure, names, and responsive reflow.
- Respect `prefers-reduced-motion` and avoid essential information conveyed only through motion or color.
- Use semantic landmarks, one logical page heading, ordered subheadings, and meaningful link text.
- Gallery dialogs or expanded media must trap and restore focus correctly and close by keyboard.

### MSP-NFR-02: Privacy and Ethical Presentation

- Public content must follow the approved privacy boundary even though the Security Baseline extension is disabled.
- Service content must preserve dignity, acknowledge collective work, and avoid exploitative or self-congratulatory framing.
- Patient and child imagery must be limited to the approved contextual subset.
- No sensitive value may appear in source-controlled public data, rendered HTML, generated asset names, alternative text, metadata, test fixtures, logs, or snapshots.

### MSP-NFR-03: Performance

- Exclude the approximately 45 MB of supplied video from the build.
- Generate appropriately sized, web-compatible derivatives for selected photos while preserving originals outside the public set.
- Use responsive image sizing and lazy loading outside the hero.
- Avoid adding a large animation or visualization dependency for decorative effects.
- Preserve a fast initial render on typical mobile connections; final Build and Test must report the production artifact sizes and any Vite warnings.

### MSP-NFR-04: Responsive Quality

- The experience must remain usable at narrow mobile widths, tablets, laptops, and wide desktops.
- No navigation label, score, Vietnamese name, or caption may overflow its container.
- Content order must remain coherent when editorial layouts collapse to one column.

### MSP-NFR-05: Maintainability

- Student facts, section copy, academic results, service stories, gallery metadata, and future contact details must live in typed data structures.
- Public assets must use descriptive filenames and explicit imports.
- The single-presentation architecture must eliminate dead selector branches rather than hiding them with CSS.
- Complex visual constants must be centralized as theme tokens.

### MSP-NFR-06: Reliability

- Rendering must tolerate a missing optional image or contact channel without crashing.
- Invalid hashes and unavailable browser storage must fail safely.
- There must be no dependency on a backend, runtime secret, database, or external content API.

### MSP-NFR-07: Browser and Hosting Compatibility

- The production build must remain compatible with current evergreen browsers.
- `npm run build` must produce a static `dist/` artifact.
- Direct GitHub Pages deployment and repository-base-path handling must remain supported.
- Migration to another host or edge proxy is out of scope for this change.

### MSP-NFR-08: Example-Based Testing

Example-based tests must cover at least:

- Rendering of the approved identity and six navigation destinations.
- Absence of inherited identity, templates, contact channels, and obsolete sections.
- Academic values and community-care story summaries.
- Hash navigation, invalid-hash fallback, light/dark behavior, mobile navigation semantics, and gallery accessibility.
- Public-asset and privacy safeguards, including a check that raw CV documents are not imported.

### MSP-NFR-09: Property-Based Testing

Full PBT enforcement is enabled. Later design and construction stages must:

- Identify applicable round-trip, invariant, idempotence, oracle, and stateful properties per component under PBT-01.
- Select and configure a TypeScript property-testing framework compatible with Vitest; `fast-check` is the preferred candidate under PBT-09.
- Use reusable domain generators rather than unconstrained primitives under PBT-07.
- Preserve shrinking and log reproducible seeds in CI under PBT-08.
- Keep example-based tests for critical scenarios under PBT-10.
- Convert any discovered minimal counterexample into a permanent regression test.

Likely property candidates include section hash creation/parsing round trips, navigation-to-section invariants, unknown-route fallback invariants, and idempotent normalization of public content configuration. Functional Design must validate or reject each candidate with rationale.

### MSP-NFR-10: Verification Commands

The completed implementation must pass:

- Dependency installation from the committed lock file.
- TypeScript/Vite production build.
- ESLint.
- The complete example-based and property-based Vitest suite.
- Focused accessibility and privacy regression tests.
- `git diff --check`.

## Data Requirements

### Public Data

Only these categories may enter the typed runtime content model:

- Approved name and medical-status wording.
- Verified academic summaries listed in MSP-FR-08.
- Verified service summaries listed in MSP-FR-09.
- Curated image imports and public-safe captions.
- Non-sensitive design metadata and future contact placeholders represented as absent values.

### Restricted Source Data

The following remain source evidence only and outside Git history/public build for this change:

- Government and candidate identifiers.
- Birth date and home address.
- Personal, institutional, or staff phone numbers.
- Bank-account and transfer information.
- Unredacted academic documents, admission records, thank-you letters, and IELTS scans.
- Unselected photos, raw screenshots, DOCX files, and both MP4 files.

## Content Traceability

| Public claim category | Authoritative local evidence | Publication form |
| --- | --- | --- |
| Medical admission | 2026 university admission notice | Designed summary only |
| IGCSE results | Cambridge statement of results | Designed score cards or table |
| IELTS results | IELTS Test Report Form | Designed score summary |
| Grade 10-12 record | Nguyễn Siêu School record | Selected result summary |
| Pediatric hematology activity | Institute thank-you letter and three photographs | Story plus selected contextual images |
| Rural-school project | Two DOCX descriptions and supporting images | Collective-impact story plus selected images |
| Lunar New Year program | Plan, thank-you letter, and event media | Collective-impact story plus selected still images |

## Acceptance Criteria

1. The first viewport identifies Nguyễn Tuấn Gia Linh and the approved incoming-medical-student status without displaying an official-document portrait.
2. The visible experience uses one medical presentation and contains no Engineering or Business selector.
3. Navigation exposes exactly the six approved destinations in the approved order and works by keyboard, mobile control, and direct hash.
4. Light and dark modes both meet the approved medical design direction and accessibility targets.
5. Academic summaries match the verified values in MSP-FR-08 after manual source cross-check.
6. Community Care presents all three approved initiatives, uses collective attribution, and avoids unsupported claims.
7. Only an approved subset of respectful contextual images is published with meaningful alternative text and captions.
8. Raw CV documents, screenshots with sensitive data, unselected media, and videos are absent from Git history introduced by this change and absent from `dist/`.
9. No previous-owner identity, resume, email, social account, education, employment, project, journal, technical skill, certificate, or gallery content is visible or referenced by runtime code.
10. The Contact destination contains no inherited or placeholder-send behavior and remains ready for a future typed student-owned channel.
11. The production application is responsive, reduced-motion aware, and free of keyboard traps or inaccessible navigation.
12. The static GitHub Pages build succeeds with correct base-path behavior.
13. Example-based tests cover the approved content and critical visitor flows.
14. Property-based tests cover every applicable property identified during Functional Design, use quality generators, retain shrinking, and provide reproducible seeds.
15. Lint, build, complete tests, focused privacy/accessibility checks, and `git diff --check` pass before final handoff.

## Out of Scope

- Backend services, databases, authentication, CMS integration, analytics, or a server-side contact form.
- Migration away from direct GitHub Pages hosting.
- Security Baseline extension enforcement.
- Publishing unredacted source evidence or extracting the IELTS identification portrait.
- Publishing the supplied MP4 files.
- Claiming medical practice, licensure, clinical responsibility, or qualifications not documented in the evidence.
- Full Vietnamese localization or a language switcher.
- Reintroducing multiple portfolio presentations or the old multi-layout selector.

## Extension Compliance

| Extension | Status at Requirements Analysis | Rationale |
| --- | --- | --- |
| Security Baseline | Disabled | The user explicitly disabled enforcement after choosing to retain direct GitHub Pages hosting. The skip is recorded in the audit trail. |
| Property-Based Testing | Compliant | Full enforcement is recorded. Requirements capture PBT design analysis, framework selection, generator quality, shrinking, reproducibility, CI execution, and complementary example tests. Stage-specific enforcement begins in Functional Design and NFR Requirements. |

## Requirements Summary

This change replaces the inherited multi-theme data-engineering portfolio with one evidence-led medical-student story. The product centers a portrait-free clinical-editorial introduction, an academic and admission trajectory, three community-care stories, and a carefully curated gallery. Sensitive source records remain private and uncommitted, while the public site preserves accessible hash navigation, light/dark modes, responsive behavior, typed maintainability, GitHub Pages delivery, and both example-based and property-based verification.
