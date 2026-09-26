# Component Dependency — Medical Student Portfolio

## Dependency Matrix

| Component | Depends on | Depended on by |
| --- | --- | --- |
| `MedicalShell` | Navigation, MobileNav, Hero, MedicalJourney, Academics, CommunityCare, Gallery, Contact, navigation/hash service, color-mode provider | App root only |
| `Navigation` | `data/navigation.ts`, navigation/hash service | `MedicalShell` |
| `MobileNav` | `data/navigation.ts`, navigation/hash service | `MedicalShell` |
| `Hero` | `data/identity.ts` | `MedicalShell` |
| `MedicalJourney` | `data/academics.ts` (admission fact + milestones) | `MedicalShell` |
| `Academics` | `data/academics.ts` | `MedicalShell` |
| `CommunityCare` | `data/communityCare.ts` | `MedicalShell` |
| `Gallery` | `data/gallery.ts`, `Lightbox` | `MedicalShell` |
| `Contact` | `data/contact.ts` | `MedicalShell` |
| `Lightbox` | none (pure UI primitive) | `Gallery` |
| navigation/hash service (`usePortfolioLayout`, adapted) | browser hash/history APIs | `MedicalShell`, `Navigation`, `MobileNav` |
| color-mode provider (reused) | browser storage APIs | `MedicalShell` (wraps app), any component using color tokens |
| Content-validation utility | `src/data/*.ts`, `dist/` build output | Vitest suite only (test-time, not runtime) |

## Communication Patterns

- **Top-down props**: `MedicalShell` reads all content data modules and passes typed props down to each section component. Sections do not import data modules directly from within deeply nested children — only the top-level section component per epic (Hero, Academics, etc.) reads its domain module.
- **Navigation intent flow**: `Navigation`/`MobileNav` → navigation/hash service (updates hash + active section) → `MedicalShell` re-renders active-state props → `Navigation`/`MobileNav` reflect `aria-current`.
- **Gallery/Lightbox**: `Gallery` owns which image (if any) is active and passes it to `Lightbox`; `Lightbox` has no upward data dependency, only an `onClose` callback.
- **No cross-section coupling**: `Academics`, `CommunityCare`, `Gallery`, and `Contact` do not depend on each other; each depends only on its own content module, satisfying the Independent criterion of the approved INVEST story set.

## Data Flow Diagram (textual)

```
data/identity.ts        -> Hero
data/academics.ts       -> Academics, MedicalJourney
data/communityCare.ts   -> CommunityCare
data/gallery.ts         -> Gallery -> Lightbox
data/contact.ts         -> Contact
data/navigation.ts       -> Navigation, MobileNav
                                   ^
                                   |
                     navigation/hash service (active section, fallback)
                                   |
                              MedicalShell (composes all sections + nav)
```

## Removed Dependencies

- `PortfolioStyleSelector` → template registry/persistence: removed entirely; no successor component reads or writes the old template-selection storage key.
- `BusinessShell`/`EngineeringShell` → their respective section trees: removed entirely, replaced by the single `MedicalShell` → six-section dependency graph above.
- Journal routes/content → `BusinessJournal`/`BusinessJournalPostPage`: removed entirely; no route in the new architecture resolves to journal content.
