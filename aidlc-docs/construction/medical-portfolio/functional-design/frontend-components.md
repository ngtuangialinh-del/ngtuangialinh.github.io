# Frontend Components — Medical Portfolio

Expands `application-design/components.md` and `component-methods.md` with interaction flows, state, and validation. Component hierarchy unchanged from Application Design.

## Component Hierarchy

```
MedicalShell
├── SkipLink
├── Navigation (desktop)
├── MobileNav (mobile)
└── main
    ├── Hero               (#introduction)
    ├── MedicalJourney      (#medical-journey)
    ├── Academics           (#academics)
    ├── CommunityCare       (#community-care)
    ├── Gallery             (#gallery)
    │   └── Lightbox (conditionally rendered)
    └── Contact             (#contact)
```

## MedicalShell

- **State**: `activeSectionId: SectionId` (derived from the navigation/hash-routing logic in `business-logic-model.md`, U2).
- **Interaction flow**: On mount, resolves the initial hash (BR-1); subscribes to hash-change and scroll events to keep `activeSectionId` current; passes `activeSectionId` down to `Navigation`/`MobileNav`.
- **Validation**: None (pure composition + routing state).

## Navigation

- **Props**: `{ destinations: NavDestination[]; activeSectionId: SectionId }`.
- **State**: None (fully controlled by props).
- **Interaction flow**: Clicking/activating a link sets the URL hash to the destination's hash, triggering `MedicalShell`'s hash-resolution workflow.
- **Validation**: None — `destinations` is fixed, build-time data (BR-1's six canonical values).

## MobileNav

- **Props**: `{ destinations: NavDestination[]; activeSectionId: SectionId }`.
- **State**: `isOpen: boolean`.
- **Interaction flow**: Toggle opens/closes the menu; selecting a destination navigates (same hash-set behavior as `Navigation`) and closes the menu; Escape key or explicit close control closes the menu and returns focus to the toggle (B3).
- **Validation**: None.

## Hero

- **Props**: `{ identity: Identity }`.
- **State**: None.
- **Interaction flow**: Activating a `Cta` sets the URL hash to `cta.targetSectionId`'s canonical hash (same navigation path as `Navigation`).
- **Validation**: None — identity content is static, author-time data.

## MedicalJourney

- **Props**: `{ milestones: JourneyMilestone[]; admissionScore: LabeledScore }`.
- **State**: None.
- **Interaction flow**: Purely presentational; renders milestones in order, admission score via the shared score-display logic (BR-2).
- **Validation**: None at runtime; content-authoring correctness is covered by U11's cross-check workflow (D5).

## Academics

- **Props**: `{ academics: AcademicsContent }`.
- **State**: None.
- **Interaction flow**: Purely presentational; renders each `ScoreGroup` via the shared score-display logic (BR-2).
- **Validation**: None at runtime; see D5 cross-check (manual + U11 test-time verification).

## CommunityCare

- **Props**: `{ stories: CommunityStory[] }`.
- **State**: None.
- **Interaction flow**: Purely presentational; renders the collective-effort disclosure per BR-3.
- **Validation**: None at runtime; BR-4 (initiativeId referential integrity) is checked by U11, not by this component.

## Gallery

- **Props**: `{ images: GalleryImage[] }`.
- **State**: `activeImageId: string | null` (Functional Design Plan Q4).
- **Interaction flow**: Activating an image sets `activeImageId`; renders `Lightbox` with the resolved `GalleryImage` when `activeImageId` is non-null; `Lightbox`'s close callback resets `activeImageId` to `null`.
- **Validation**: None at runtime; BR-4/BR-5 are content-authoring-time checks via U11.

## Contact

- **Props**: `{ contact: ContactContent }`.
- **State**: None.
- **Interaction flow**: Purely presentational; conditionally renders the future-link slot only when `futureLinkPlaceholder` is present (BR-7, BR-9).
- **Validation**: None.

## Lightbox (shared primitive, `src/components/ui/lightbox.tsx`)

- **Props**: `{ item: GalleryImage | null; onClose: () => void }`.
- **State**: Internal focus-trap bookkeeping (element to restore focus to on close).
- **Interaction flow**: On open (item becomes non-null), move focus into the dialog and trap it; on Escape or close-control activation, call `onClose` and restore focus to the triggering element (F4).
- **Validation**: None — this is a generic, content-agnostic dialog.

## API/Integration Points

None — this is a static site with no backend API. Every component's "integration point" is a typed content data module import (U1), not a network call, consistent with MSP-NFR-06 and MSP-NFR-07.

## Form Validation Rules

None — the only form-like surface (Contact) intentionally has no submission mechanism in this release (BR-7); no client-side form validation logic is required until a future typed contact channel is approved.
