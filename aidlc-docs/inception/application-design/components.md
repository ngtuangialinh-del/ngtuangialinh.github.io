# Components — Medical Student Portfolio

Location convention: `src/templates/medical/` (Application Design Plan Q1/Q2). Exactly one presentation is rendered by the app; no selector exists.

## MedicalShell

- **Purpose**: The single root composition component. Replaces `BusinessShell`/`EngineeringShell` and the retired `PortfolioStyleSelector`.
- **Responsibilities**:
  - Render the skip link (B5) and top-level semantic landmarks (header/nav, main, footer).
  - Compose the six sections in the approved order: Introduction, Medical Journey, Academics, Community Care, Gallery, Contact.
  - Host the sticky `Navigation` and `MobileNav`.
  - Delegate active-section tracking and hash-routing to the reused navigation service (see `services.md`).
- **Interfaces**: No external props — reads from typed content data modules directly; owns no local business state beyond what the navigation service exposes.

## Navigation

- **Purpose**: Sticky desktop navigation bar listing the six destinations (B1, B2).
- **Responsibilities**: Render ordered links to the six section hashes; mark the active destination (`aria-current`); remain visible while scrolling.
- **Interfaces**: Consumes `activeSectionId` and the ordered destination list from the navigation service; emits navigation intents through anchor hash links.

## MobileNav

- **Purpose**: Compact mobile navigation control (B3).
- **Responsibilities**: Toggle open/closed state with accessible labeling; close on destination selection, Escape, or outside close action; return focus to the toggle on close.
- **Interfaces**: Consumes the same ordered destination list as `Navigation`; owns local open/closed UI state; emits the same navigation intents.

## Hero (Introduction)

- **Purpose**: Portrait-free opening section (A1, A2, A3; MSP-FR-01, MSP-FR-06).
- **Responsibilities**: Present name, approved medical-status wording, concise value statement, and medical-motif editorial composition; provide primary calls to action into Medical Journey and Community Care.
- **Interfaces**: Consumes the `identity` content data module.

## MedicalJourney

- **Purpose**: Chronological narrative section (C1; MSP-FR-07).
- **Responsibilities**: Render the connected chronology (school → strengths → service → admission) without implying admission equals qualification.
- **Interfaces**: Consumes the `academics` content data module (admission fact) and a journey-narrative content structure (see `services.md`/data note).

## Academics

- **Purpose**: Designed academic evidence summaries (D1–D5; MSP-FR-08).
- **Responsibilities**: Render IGCSE, IELTS, Grade 12, excellent-student recognition, and admission-score summaries, each labeled with its score type/scale to prevent misreading.
- **Interfaces**: Consumes the `academics` content data module.

## CommunityCare

- **Purpose**: Three dedicated initiative stories (E1–E4; MSP-FR-09).
- **Responsibilities**: Render each story with collective-attribution framing; avoid self-congratulatory language.
- **Interfaces**: Consumes the `communityCare` content data module.

## Gallery

- **Purpose**: Curated image subset with accessible expanded view (F1–F4; MSP-FR-10).
- **Responsibilities**: Render the curated image grid with alt text/captions/initiative mapping; lazy-load below-the-fold images; open images via the shared `Lightbox` primitive.
- **Interfaces**: Consumes the `gallery` content data module; delegates expanded-view behavior to `Lightbox`.

## Contact

- **Purpose**: Future-looking placeholder destination (H1; MSP-FR-13).
- **Responsibilities**: Render the concise statement; expose a structured slot for a future typed contact link with no current inherited email/social behavior.
- **Interfaces**: Consumes the `contact` content data module.

## Lightbox (shared primitive)

- **Purpose**: Reusable accessible dialog for expanded gallery media (F4; MSP-NFR-01; Application Design Plan Q3).
- **Location**: `src/components/ui/lightbox.tsx`.
- **Responsibilities**: Trap and restore focus; close on Escape or explicit close control; expose an accessible name/description for the open item.
- **Interfaces**: Accepts the active gallery item and open/close handlers; has no dependency on Gallery-specific data shape beyond image/alt/caption.

## Reused Shared Components (unchanged ownership)

- `ContentCard`, `SectionShell`, `ExternalAction`, `LogoMark` (`src/components/shared/`) — reused by the medical sections where their existing contract fits; `PortfolioStyleSelector` is retired (I1).
- Color mode primitives (`src/components/ui/color-mode.tsx`, `provider.tsx`) — reused unmodified (G1–G4).
- Tooltip/toaster primitives — reused only if a medical section needs them; not mandatory.

## Retired Components

- `PortfolioStyleSelector`
- `BusinessShell`, `EngineeringShell`, and all `Business*`/`Engineering*` section components
- Journal-related components and routes (`src/content/journal/`, `BusinessJournal`, `BusinessJournalPostPage`)
