# Technology Stack

## 2026-09-26 Current Stack (Authoritative)

- **React / React DOM 19.2** - single-page UI and dialogs.
- **TypeScript 5.9** - strict content contracts, components, utilities, and tests.
- **Chakra UI 3.30 and Emotion 11.14** - responsive component styling and accessible primitives.
- **Vite 7.3 runtime in the current lockfile/build output** - development and static production bundling.
- **next-themes 0.4** - persisted light/dark mode.
- **React Icons 5.5** - interface iconography.
- **Vitest 4.1, Testing Library 16.3, jsdom 29.1, vitest-axe, and fast-check 3.23** - regression, accessibility, and property testing.
- **ESLint 9.39 and Prettier 3.7** - static quality and formatting.
- **GitHub Actions and GitHub Pages** - CI and static hosting.
- **Image-generation path for the requested enhancement** - built-in image generation, with final optimized assets copied into the workspace and recorded as decorative illustrations.

No runtime backend, content-management system, analytics service, database, object store, or secret-bearing API is present.

> Historical notes below are superseded where they describe the retired Business presentation or journal rendering.

## Programming Languages

- **TypeScript 5.9** - Application, data models, utilities, and tests.
- **TSX / React JSX** - UI composition.
- **CSS** - Global tokens, animations, responsive rules, and Business presentation styling.
- **Markdown** - Local journal content and project documentation.
- **YAML** - GitHub Actions workflow.

## Frameworks and Libraries

- **React 19.2** - Component rendering and state.
- **React DOM 19.2** - Browser renderer.
- **Chakra UI 3.30** - Accessible UI primitives and responsive styling props.
- **Emotion 11.14** - Chakra styling runtime.
- **Tailwind CSS 4.1** - Vite-integrated CSS tooling; no significant utility-class architecture was observed.
- **next-themes 0.4** - Light and dark color-mode persistence.
- **React Icons 5.5** - Interface and brand icons.
- **React Markdown 10.1** - Local journal rendering.

## Build Tools

- **Node.js 20 in CI** - GitHub Actions runtime.
- **npm** - Dependency and script runner.
- **Vite 7.2** - Development server and production bundler.
- **TypeScript compiler** - Strict type validation before build.
- **SWC React plugin** - JSX transformation and refresh support.
- **vite-tsconfig-paths 6.0** - TypeScript path resolution.

## Testing and Quality Tools

- **Vitest 4.1** - Unit and DOM test runner.
- **Testing Library React 16.3** - User-oriented component testing.
- **jest-dom 6.9** - DOM assertions.
- **jsdom 29.1** - Browser simulation.
- **ESLint 9.39** - Static analysis.
- **typescript-eslint 8.51** - TypeScript lint integration.
- **Prettier 3.7** and `eslint-config-prettier` - Formatting compatibility.

## Infrastructure

- **GitHub Actions** - Continuous build and deployment.
- **GitHub Pages** - Static hosting.
- **No runtime backend or data service** - All content is built into the client artifact.

## Evidence Tooling Used for Analysis

- **Ghostscript** - Rendered scanned PDF pages for review.
- **Tesseract OCR** - Extracted reviewable text from scanned evidence.
- **ImageMagick and macOS image metadata tools** - Inspected dimensions and contact sheets without changing source assets.
