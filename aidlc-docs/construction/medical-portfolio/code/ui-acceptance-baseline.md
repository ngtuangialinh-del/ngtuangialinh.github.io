# UI Acceptance Baseline

## Reference Set

- Primary visual reference: repository `HEAD` (`2c8193c`), especially the original `Navbar.tsx`, `Hero.tsx`, `App.css`, and `index.css`.
- Secondary interaction reference: `../TranGiaMinhTam.github.io/src/portfolio/`, especially its shell, horizontal navigator, section progress, registered section slots, and section-progress hook.
- Current implementation baseline: the unapproved medical portfolio working tree assessed in `change-assessment.md`.

## Viewport Matrix

| Width | Light mode | Dark mode | Required behavior |
| --- | --- | --- | --- |
| 390 px | Required | Required | Compact header, accessible drawer, single-column content, no horizontal overflow |
| 768 px | Required | Required | Intentional tablet composition; use two columns only where content remains readable |
| 1440 px | Required | Required | Inline navigation, balanced two-column hero, controlled line length and section density |

## Acceptance Checks

- One consistent clinical-editorial system across every section.
- Sticky horizontal header; no permanent sidebar.
- Familiar inline desktop navigation and accessible mobile drawer.
- Hidden-until-focused skip link and focusable main landmark.
- Correct first-load, hash-change, and browser-history navigation.
- Header-safe section anchors and a restrained section-progress indicator.
- Accurate academic units with no decorative percentage inference.
- Aligned gallery grid, deployment-base-safe media, and accessible lightbox.
- Compact contact section and footer without artificial viewport-height whitespace.
- No clipped content, focus indicators, or unintended horizontal scrolling.

## Reconciled Implementation Inventory

- Active shell components: `MedicalShell`, `MedicalSidebar` (to become the desktop header/navigation), `MedicalMobileNav`, and `SkipLink`.
- Active content sections: `MedicalHero`, `MedicalJourney`, `MedicalAcademics`, `MedicalCommunityCare`, `MedicalGallery`, and `MedicalContact`.
- Shared presentation primitives: `SectionShell`, `ExternalAction`, Chakra UI color-mode and dialog primitives.
- Current gallery inventory: five image records. The stale `hematology-2` relationship must be removed or backed by an approved image; no sixth asset may be invented.
- Theme tokens currently live in `src/index.css`; there is no `src/theme.ts`. The corrective plan therefore targets `src/index.css` and `src/App.css` rather than creating an unnecessary theme module.
- The previous plan named `MedicalNavigation.tsx` and `medical-theme.css`, but the implementation contains `MedicalSidebar.tsx` and global CSS. The corrective pass updates the existing files to avoid parallel abstractions.

