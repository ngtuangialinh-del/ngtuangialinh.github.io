# Component Inventory

## 2026-09-26 Current Inventory (Authoritative)

### Application Package

- One React/Vite static portfolio rooted at `src/`.
- One medical presentation shell with eight visitor-facing sections.
- Desktop fixed navigation, mobile drawer navigation, section progress, color mode, skip link, and footer.

### Shared Components and Utilities

- `SectionShell`, existing legacy shared cards/actions, Chakra provider/color mode, tooltip, toaster, gallery lightbox, and PDF dialog.
- Section-navigation hook, scrolling utilities, media/base-path resolver, contact helper, and animation helper.

### Content and Assets

- Nine typed data modules and one medical type contract.
- Nine public documentary gallery images.
- Two public document thumbnails and two approved public PDFs.
- Thirty substantive raw CV-source files: 19 JPEGs, two PNGs, five PDFs, two DOCX files, and two MP4 files.

### Test Package

- Sixteen Vitest files: eight section/shell files, two property-based files, metadata, privacy, theme contract, App, and media utility coverage.
- Testing Library, jsdom, axe assertions, and fast-check.

### Infrastructure

- No infrastructure-as-code, container, backend, or database package.
- One GitHub Actions workflow for lint, typecheck, root/project-base builds, tests, and GitHub Pages deployment.

> Counts and package descriptions below are historical and superseded where they refer to multiple presentations, ten sections, or nine tests.

## Application Packages

- **Portfolio application** - One React/Vite application rooted at `src/`.
- **Engineering presentation** - Baseline shell plus ten shared sections.
- **Business presentation** - Dedicated editorial shell, ten sections, journal page, and scoped CSS.

## Infrastructure Packages

- No CDK, Terraform, CloudFormation, container, backend, or database package.
- One GitHub Actions workflow builds and deploys the static application to GitHub Pages.

## Shared Packages

- **Typed data modules** - Student-editable content configuration.
- **Shared UI** - Cards, actions, logo marks, section shells, style selector, color mode, tooltip, and toaster helpers.
- **Hooks and utilities** - Layout, scrolling, journal routes, contact links, media helpers, animation, and template persistence.
- **CV evidence collection** - 30 source files not yet connected to runtime data.

## Test Packages

- **Nine test files** - App behavior, content rules, navigation, layout, registry, persistence, presentation ownership, journal rendering, and theme accessibility.
- **Test framework** - Vitest with jsdom and Testing Library.

## Total Count

- **Workspace files discovered**: 347 excluding `node_modules` and `dist`.
- **Source files**: 141.
- **TypeScript and TSX source files**: 79.
- **Test files**: 9.
- **Application packages**: 1.
- **Infrastructure packages**: 0.
- **Presentation strategies**: 2.
- **Canonical sections**: 10.
- **CV evidence files**: 30.
