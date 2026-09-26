# Domain Entities — Medical Portfolio

Technology-agnostic domain model. TypeScript shapes shown for precision; these are conceptual entities, not implementation.

## Identity

- `Identity { name: string; statusStatement: string; valueStatement: string; primaryCtas: Cta[] }`
- `Cta { label: string; targetSectionId: SectionId }`

## SectionId (shared enum-like domain value)

- `SectionId = "introduction" | "medical-journey" | "academics" | "community-care" | "gallery" | "contact"`
- Exactly six values, ordered — the canonical navigation order (MSP-FR-04).

## NavDestination

- `NavDestination { id: SectionId; label: string; hash: string }`
- Relationship: exactly one `NavDestination` per `SectionId`, in canonical order; consumed by `Navigation`/`MobileNav` (U2).

## LabeledScore

- `LabeledScore { subjectOrLabel: string; value: string; scaleNote: string }`
- Invariant (Business Rule BR-2, see `business-rules.md`): `value` is never rendered without an accompanying `scaleNote`/group label.

## ScoreGroup

- `ScoreGroup { label: string; scaleDescription: string; entries: LabeledScore[] }`
- Relationship: one `ScoreGroup` per exam/record type (IGCSE, IELTS, Grade 12); each contains multiple `LabeledScore` entries.

## AcademicsContent

- `AcademicsContent { igcse: ScoreGroup; ielts: ScoreGroup; grade12: ScoreGroup; recognitions: string[]; admissionScore: LabeledScore }`
- Relationship: aggregates the three `ScoreGroup`s plus recognitions and the single admission score; consumed by both `Academics` (U5) and `MedicalJourney` (U4, admission fact only).

## JourneyMilestone

- `JourneyMilestone { id: string; label: string; description: string; period?: string }`
- Relationship: ordered sequence forming the `MedicalJourney` chronology (school → strengths → service → admission); the final milestone references `AcademicsContent.admissionScore`.

## CommunityStory

- `CommunityStory { id: string; title: string; date: string; summary: string; attribution: "collective" | "individual"; relatedImageIds?: string[] }`
- Invariant (Business Rule BR-3): when `attribution === "collective"`, the rendered story must include a visible collective-effort acknowledgment.
- Relationship: `relatedImageIds` optionally reference `GalleryImage.id` values, connecting a story to its gallery evidence.

## GalleryImage

- `GalleryImage { id: string; src: string; alt: string; caption: string; initiativeId: string; dateOrPeriod?: string }`
- Invariant (Business Rule BR-4): `initiativeId` must reference an existing `CommunityStory.id`.
- Invariant (Business Rule BR-6): `src` must resolve within the curated public asset directory, never a raw CV source path.

## ContactContent

- `ContactContent { statement: string; futureLinkPlaceholder?: { label: string; href: string } }`
- Relationship: standalone; `futureLinkPlaceholder` is absent in the initial release (MSP-FR-13) and structurally optional for later addition.

## Entity Relationship Summary

```
Identity --(primaryCtas)--> SectionId
NavDestination --(1:1)--> SectionId
AcademicsContent --(admissionScore)--> JourneyMilestone (final milestone)
CommunityStory --(relatedImageIds)--> GalleryImage
GalleryImage --(initiativeId)--> CommunityStory
ContactContent (standalone)
```

No entity has a create/update/delete lifecycle at runtime — all entities are read-only, build-time-authored content (MSP-NFR-05, MSP-NFR-06). There is no persistence layer beyond the typed source files themselves.
