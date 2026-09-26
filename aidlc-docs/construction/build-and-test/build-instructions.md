# Build Instructions

## Prerequisites

| Requirement                   | Project value                                                        |
| ----------------------------- | -------------------------------------------------------------------- |
| Runtime                       | Node.js 20.19+ or 22.12+; verified with Node.js 24.0.0               |
| Package manager               | npm with the committed `package-lock.json`; verified with npm 11.3.0 |
| Build tools                   | TypeScript 5.9 and Vite 7 through package scripts                    |
| Required secrets              | None                                                                 |
| Optional environment variable | `VITE_BASE_PATH` for a non-root static deployment                    |
| Output directory              | `dist/`                                                              |

## Build Steps

### 1. Install Locked Dependencies

```bash
npm ci
```

Use `npm install` only when intentionally changing dependencies or the lockfile.

### 2. Run Blocking Quality Gates

```bash
npm run typecheck
npm run lint
npm test -- --run
```

Expected result: TypeScript and ESLint exit successfully; 16 test files and 46 tests pass.

The contact-specific regression can be run independently with:

```bash
npx vitest run src/templates/medical/MedicalContact.test.tsx
```

### 3. Build for a Root Deployment

```bash
npm run build
```

This runs the TypeScript project build and creates the production bundle with `/` as the base.

### 4. Build for a Project-Site Deployment

```bash
VITE_BASE_PATH=/portfolio-test/ npm run build
```

This verifies imported PDFs, public document thumbnails, gallery media, navigation, and metadata below a non-root base path. The second command replaces the prior contents of `dist/`.

### 5. Verify Build Success

Expected artifacts include:

- `dist/index.html`
- `dist/assets/index-*.js` and `dist/assets/index-*.css`
- Two hashed PDF files under `dist/assets/`
- Nine curated images under `dist/gallery/`
- Two first-page thumbnails under `dist/documents/`
- `dist/medical-mark.svg`

The verified project-base build contains 18 files and is approximately 3.2MB. Vite reports a non-blocking warning because the raw JavaScript chunk exceeds 500KB; the compressed JavaScript remains within the approved 300KB budget.

## Optional Local Preview

```bash
npm run preview
```

Open the URL printed by Vite. When validating a project-base build, request pages and assets below the same configured base.

## Troubleshooting

### Dependency or Native SWC Failure

Confirm the Node.js version and platform, remove only the repository's `node_modules` directory if it is stale, then rerun `npm ci`.

### TypeScript Failure

Run `npm run typecheck` and fix the first reported mismatch. Evidence records must satisfy `EvidenceDocument`; navigation destinations must satisfy `SectionId`; contact methods must satisfy `ContactContent` and its constrained identifiers.

### Missing Images or PDFs

Confirm that public media lives under `public/gallery/` or `public/documents/`, imported PDFs live under `src/assets/documents/`, and public URLs are passed through the base-path helper.

### Privacy Gate Failure

Do not weaken or delete the failing assertion. Remove the restricted public value or asset, regenerate the sanitized derivative, and rerun the full suite.
