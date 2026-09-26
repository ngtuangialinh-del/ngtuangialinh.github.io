# API Documentation

## 2026-09-26 Current Internal APIs (Authoritative)

### External APIs

No REST API, backend, database, authentication service, or runtime content service exists. Google Fonts is fetched by CSS; approved PDFs and images are static build assets.

### Navigation

- `useSectionNavigation()` returns `activeSectionId`, canonical destinations, and `navigateToSection(sectionId)`.
- `withBasePath(path)` resolves root and GitHub project-site public URLs.
- The eight valid `SectionId` values form the hash-routing contract.

### Content Models

- `Identity`, `JourneyMilestone`, `AcademicsContent`, `ResearchProject`, and `CommunityStory` describe public narrative data.
- `GalleryImage` describes one approved documentary image with caption, alternate text, initiative link, and optional date.
- `EvidenceDocument` describes a public PDF or private summary with one optional thumbnail.
- `ContactContent` describes clearly disclosed placeholder contact methods.

### Dialog Contracts

- `Lightbox({ item, onClose })` opens one gallery image using Chakra Dialog focus management.
- `DocumentPreviewDialog({ document, onClose })` embeds one approved PDF with `#view=FitH` and provides an external-tab fallback.

### Identified Contract Gaps

- No `DocumentPage` or preview-image array for multi-page cards and page-specific popup review.
- No explicit evidence sensitivity, redaction, provenance, source type, or verification-date fields.
- No generated-image provenance or decorative/documentary distinction.
- No gallery collection cursor for previous/next navigation.
- No browser-PDF failure state beyond a text fallback link.

> The registry, layout, journal, and template APIs below are historical and no longer exist in the runtime application.

## REST APIs

No REST APIs, backend services, or databases are implemented. The portfolio is a static client-side application.

## Internal APIs

### Template Registry

- **`getPortfolioTemplate(templateId)`**: Returns the matching Engineering or Business presentation and falls back to Engineering.
- **`portfolioTemplates`**: Registered presentation definitions.
- **`activePortfolioTemplate`**: Compatibility export resolved from the source default.

### `PortfolioTemplate`

- **Fields**: `id`, `label`, `description`, `ShellComponent`, `JournalPostComponent`, `chapterLabels`, `sectionComponents`, and optional `isSectionVisible`.
- **Current IDs**: `engineering` and `business`.
- **Section contract**: Every template supplies a complete `Record<SectionId, ComponentType>`.

### Application Shell

- **`PortfolioApp({ initialTemplate? })`**: Owns active template state, current browser hash, enabled sections, and rendering.
- **`App()`**: Renders `PortfolioApp` using the configured default or a valid saved visitor preference.

### Layout Hook

- **`usePortfolioLayout(enabledSectionIds, scrollActiveSection)`**: Coordinates layout mode, active section, hash routing, and navigation.
- **Hash helpers**: Create and parse single-page anchors and multi-page section routes.
- **Persistence helpers**: Read and write the layout preference with guarded local-storage access.

### Template Selection

- **`getInitialPortfolioTemplateId(defaultTemplateId, storage?)`**: Restores a valid choice or returns a safe fallback.
- **`persistPortfolioTemplateId(templateId, storage?)`**: Persists a valid choice without surfacing storage failures.
- **`PortfolioStyleSelector`**: Emits typed template choices from shell headers.

### Shared UI

- **`ExternalAction`**: Renders accessible internal, external, mail, and download actions.
- **`SectionShell`**: Frames baseline sections and next-section navigation.
- **`ContentCard`**: Supplies a reusable content surface.
- **`LogoMark`**: Maps configured keys to icon marks.

## Data Models

### Portfolio Root

- **Fields**: `profile`, `hero`, `navigation`, `sectionContent`, `about`, `education`, `experience`, `awards`, `projects`, `gallery`, `videos`, `blog`, `journalPosts`, `writing`, `skills`, and `certificates`.
- **Validation**: TypeScript structural checks and runtime-oriented Vitest assertions.

### Navigation

- **`SectionId`**: `home`, `about`, `education`, `experience`, `awards`, `projects`, `gallery`, `journal`, `skills`, or `contact`.
- **`NavigationItem`**: Section ID, visible label, and global enabled flag.

### Evidence-Oriented Content

- **Existing reusable models**: `EducationEntry`, `ExperienceEntry`, `AwardEntry`, `ProjectEntry`, `GalleryItem`, `VideoEntry`, `SkillCategory`, and `CertificateEntry`.
- **Model gap**: There is no explicit community-service initiative, academic-result set, evidence source, privacy classification, or consent-status model. The medical redesign will likely require these semantics instead of forcing them into inherited employment and project types.

## External Browser APIs

- History and hash events for static routing.
- Local storage for layout and presentation preferences.
- DOM scrolling and viewport geometry for section navigation.
- Dialog, image, iframe, PDF, and video rendering for media.
- `mailto:` navigation for contact submission.
