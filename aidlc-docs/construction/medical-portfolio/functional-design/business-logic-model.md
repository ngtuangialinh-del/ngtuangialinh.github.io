# Business Logic Model — Medical Portfolio

Technology-agnostic algorithms/workflows underlying the business rules in `business-rules.md`. Organized by unit.

## U2: Navigation & Hash-Routing Logic

**Workflow: Resolve section from URL hash (on load and on hash change)**
1. Read the current URL hash.
2. Normalize it (strip leading `#`, trim whitespace).
3. Compare against the six canonical `SectionId` hash values.
4. If a match is found → set `activeSectionId` to the match; do not modify the URL.
5. If no match is found → set `activeSectionId` to `"introduction"`; rewrite the URL hash to the canonical Introduction hash (BR-1).
6. Scroll/focus the section corresponding to `activeSectionId`.

**Workflow: Track active section while scrolling**
1. Observe section boundaries against the viewport.
2. When a section crosses the "active" threshold, update `activeSectionId` without rewriting the URL hash (this is a display-only concern distinct from step 4/5 above, which only fires on explicit navigation or initial load).

**Workflow: Navigate via link/toggle activation**
1. User activates a `NavDestination` link (desktop) or selects a destination in `MobileNav`.
2. Set the URL hash to the destination's canonical hash.
3. Re-run "Resolve section from URL hash" (this is the same code path as initial load, ensuring the round-trip property holds).
4. If invoked from `MobileNav`, close the mobile menu and, on Escape/close, return focus to the toggle control.

## U4/U5: Score Normalization and Display Logic

**Workflow: Render any `LabeledScore`**
1. Retrieve `value` and `scaleNote` (or the parent `ScoreGroup.scaleDescription` if the individual entry has no override).
2. Render both together as one visual unit — never `value` alone (BR-2).
3. This same rendering logic is reused for IGCSE entries, IELTS entries, Grade 12 entries, and the single admission score — one function, four data sets, not four bespoke renderers (Functional Design Plan Q2).

**Workflow: Build the Medical Journey chronology**
1. Order `JourneyMilestone` entries by their intended sequence (school → strengths → service → admission).
2. Render the admission milestone using the same score-display logic as `AcademicsContent.admissionScore` (single source of truth — no duplicated admission-score literal).

## U6: Community Story Attribution Logic

**Workflow: Render a `CommunityStory`**
1. Render `title`, `date`, `summary`.
2. If `attribution === "collective"`, render the collective-effort acknowledgment (BR-3).
3. If `relatedImageIds` is present, this story becomes a valid `initiativeId` target for gallery cross-referencing (BR-4) — no direct rendering coupling, just an id relationship.

## U7: Gallery and Lightbox Logic

**Workflow: Render the gallery grid**
1. Iterate over the `gallery.ts` module only (BR-5) — no filesystem/directory scan.
2. For each `GalleryImage`, resolve its display order/position; apply lazy loading if it is below the initial viewport (F3).
3. Validate at data-authoring time (via U11's content-validation utility) that each `initiativeId` resolves and each `src` is within the curated public asset directory.

**Workflow: Open/close the Lightbox (Functional Design Plan Q4)**
1. `Gallery` holds `activeImageId: string | null` in local state.
2. On image activation, set `activeImageId` to that image's `id`.
3. Look up the full `GalleryImage` from the `gallery.ts` module using `activeImageId` and pass it to `Lightbox`.
4. `Lightbox` traps focus on open and restores focus to the triggering element on close (Escape or explicit close control).
5. On close, set `activeImageId` back to `null` — the single source of truth for "what's open" is always the id, never a duplicated copy of the image object (avoids state/data drift).

## U9: Color Mode Logic (reused, unmodified)

- No new algorithm — confirms the existing color-mode provider's read-preference → apply-theme → persist-on-change workflow continues to run before first paint (no-flash requirement, G3) across all new sections.

## U11: Content Validation Logic

**Workflow: Validate public content and build output**
1. Load all `src/data/*.ts` modules (as test fixtures/imports) and the built `dist/` output.
2. Scan for: raw CV path fragments, restricted-value patterns (identifiers/birth date/address/phone/bank info), and the two excluded video filenames (BR-6, BR-8).
3. Cross-check every `GalleryImage.initiativeId` against `CommunityStory.id` values (BR-4) and every `GalleryImage.src` against the curated asset directory (BR-5).
4. If any check fails, fail the Vitest run with an assertion identifying the offending file/pattern (BR-8) — this workflow is the concrete implementation home for K1–K3, D5's cross-check note, and N3's "focused privacy regression tests" requirement.

## Cross-Cutting: Graceful Degradation Logic (U2, U7, U8)

- Before rendering any optional field (gallery caption/date, contact future-link, stored color-mode preference), check for presence/availability; if absent or inaccessible, render the safe default path rather than throwing (BR-9).
