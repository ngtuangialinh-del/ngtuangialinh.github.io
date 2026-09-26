# Code Quality Assessment

## 2026-09-26 Current Assessment (Authoritative)

### Verified Baseline

- Sixteen test files and 46 tests passed in the most recent completed workflow.
- Type checking, ESLint, root build, and GitHub project-base build passed.
- Axe assertions cover every visitor-facing section; fast-check covers navigation and score-display properties.
- Privacy tests enforce a public PDF allowlist, reject active PDF content, constrain media paths, reject EXIF markers, and cap public images at 300KB.
- Main JavaScript measured approximately 196KB gzip, inside the existing 300KB gzip budget.

### Strengths

- Claims are separated into typed data and include explicit scale/limitation context.
- Dialogs use accessible focus trapping, Escape handling, and focus restoration through Chakra primitives.
- Public/private evidence boundaries are already enforced by tests.
- Root and non-root GitHub Pages paths are covered.

### Current Debt and Risks

1. **Visual repetition** - many sections rely on the same bordered text-card pattern and icon block.
2. **Uneven image distribution** - only Gallery and two Evidence cards contain imagery.
3. **Single-thumbnail evidence model** - multi-page documents cannot show page coverage before opening.
4. **Browser-dependent PDF review** - iframe rendering can fail or provide inconsistent mobile controls.
5. **No provenance field** - documentary, generated, and derived/redacted assets are not explicitly differentiated in the data model.
6. **Source publication risk** - raw academic records contain identifiers; DOCX content contains financial/contact details; some images contain minors or patients.
7. **Gallery scale** - no filters, grouping, or next/previous lightbox controls as the collection grows.
8. **Dense component markup** - several section files use long single-line JSX that increases maintenance cost.
9. **External font dependency** - Google Fonts remains a runtime third-party request.

### Enhancement Guardrails

- Do not use generated imagery as proof of an event, person, institution, result, or research outcome.
- Do not expose a raw CV-folder document merely to satisfy a completeness goal; represent unsafe sources with verified summaries or sanitized derivatives.
- Add responsive image sizing, lazy loading below the fold, explicit dimensions/aspect ratios, and asset budgets.
- Expand regression tests before increasing evidence and popup complexity.

> The earlier assessment below is historical and superseded where it reports missing dependencies, nine tests, absent CI gates, or inherited identities.

## Test Coverage

- **Automated suite**: Nine Vitest files cover App behavior, routing, layout, template persistence, template registry, Business presentation ownership, journal pages, navigation/data quality, and theme accessibility.
- **Current execution status**: Not executable in this checkout because `node_modules` is absent and `vitest` is therefore unavailable.
- **Coverage percentage**: No coverage configuration or current percentage was found.
- **CI test gap**: The GitHub Pages workflow runs the TypeScript/Vite build but does not run `npm test` or `npm run lint` before deployment.

## Code Quality Indicators

- **Strict typing**: Enabled with unused-code, fallthrough, and unchecked-side-effect safeguards.
- **Linting**: Configured with ESLint, React rules, TypeScript rules, and Prettier compatibility.
- **Data separation**: Strong; most visible content lives in typed `src/data/` modules.
- **Accessibility intent**: Visible in semantic tests, focus styles, skip links, reduced-motion rules, accessible names, and responsive navigation.
- **Documentation**: Extensive AI-DLC artifacts and contributor guidance exist, although some reverse-engineering documents were stale before this refresh.
- **Source consistency**: Formatting varies between single and double quotes, and two ESLint config files remain.

## Strengths

- Typed content contracts and template completeness tests reduce silent content drift.
- Hash routing is compatible with static GitHub Pages hosting.
- Browser storage access is guarded against invalid values and exceptions.
- Business owns all canonical sections, demonstrating that a full-presentation redesign is technically supported.
- Existing tests protect routing and visitor state during presentation changes.

## Technical Debt and Change Risks

1. **Inherited identity throughout runtime data**: All major data modules and assets describe a different person and career.
2. **Overbuilt presentation choice for the requested outcome**: Two visitor-selectable themes and two layout modes increase complexity when the request calls for one complete medical identity.
3. **Content-model mismatch**: Employment, technical projects, skills, journal, and certificates do not naturally express academic results and sustained service initiatives.
4. **Large theme stylesheet**: `business.css` contains 921 lines and many selectors that would become dead code if Business is retired.
5. **Privacy exposure risk**: Academic scans and service documents contain sensitive personal, financial, and third-party data.
6. **No dependency install in checkout**: Current automated verification is blocked until `npm ci` or `npm install` is run.
7. **No test/lint CI gate**: Production deployment can proceed without the repository's local quality checks.
8. **Asset weight risk**: Two source videos total about 45 MB; direct bundling would significantly increase deployment and transfer size.
9. **Consent and clinical-context risk**: Hospital and child-centered photos require careful selection, contextual captions, and confirmation that public use is appropriate.

## Recommended Design Boundaries

- Create one primary medicine-themed presentation rather than reskinning both inherited themes.
- Redesign section semantics around introduction, medical pathway, academics, service, evidence, and contact.
- Preserve hash-safe navigation, responsive behavior, reduced-motion support, and typed data.
- Retire unused identity assets, selector state, and tests only through a coordinated approved plan.
- Keep raw CV records private by default; import only consent-approved public media or redacted derivatives.
- Add focused tests for public-safe content, navigation, responsive semantics, accessibility, and absence of inherited identity.
