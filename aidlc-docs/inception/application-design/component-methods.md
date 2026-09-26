# Component Methods — Medical Student Portfolio

High-level method/prop signatures only. Detailed business rules and validation logic are deferred to Functional Design (CONSTRUCTION).

## MedicalShell

- `MedicalShell(): JSX.Element` — no props; composes sections and navigation; renders the skip link as the first focusable element.

## Navigation

- `Navigation(props: { destinations: NavDestination[]; activeSectionId: string }): JSX.Element`
- `NavDestination = { id: string; label: string; hash: string }`

## MobileNav

- `MobileNav(props: { destinations: NavDestination[]; activeSectionId: string }): JSX.Element`
- Internal: `onToggle(): void`, `onSelectDestination(hash: string): void`, `onClose(): void`

## Hero

- `Hero(props: { identity: IdentityContent }): JSX.Element`
- `IdentityContent = { name: string; statusStatement: string; valueStatement: string; primaryCtas: { label: string; targetHash: string }[] }`

## MedicalJourney

- `MedicalJourney(props: { journey: JourneyContent }): JSX.Element`
- `JourneyContent = { milestones: JourneyMilestone[] }`
- `JourneyMilestone = { id: string; label: string; description: string; period?: string }`

## Academics

- `Academics(props: { academics: AcademicsContent }): JSX.Element`
- `AcademicsContent = { igcse: ScoreGroup; ielts: ScoreGroup; grade12: ScoreGroup; recognitions: string[]; admissionScore: LabeledScore }`
- `ScoreGroup = { label: string; scaleDescription: string; entries: LabeledScore[] }`
- `LabeledScore = { subjectOrLabel: string; value: string; scaleNote?: string }`

## CommunityCare

- `CommunityCare(props: { stories: CommunityStory[] }): JSX.Element`
- `CommunityStory = { id: string; title: string; date: string; summary: string; attribution: "collective" | "individual"; relatedImageIds?: string[] }`

## Gallery

- `Gallery(props: { images: GalleryImage[] }): JSX.Element`
- `GalleryImage = { id: string; src: string; alt: string; caption: string; initiativeId: string; dateOrPeriod?: string }`
- Internal: `onOpenImage(id: string): void`

## Contact

- `Contact(props: { contact: ContactContent }): JSX.Element`
- `ContactContent = { statement: string; futureLinkPlaceholder?: { label: string; href: string } }`

## Lightbox (shared primitive)

- `Lightbox(props: { item: GalleryImage | null; onClose: () => void }): JSX.Element | null`
- Internal: `trapFocus(): void`, `restoreFocus(): void`, `onKeyDown(event: KeyboardEvent): void`
