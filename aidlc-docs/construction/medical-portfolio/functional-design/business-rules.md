# Business Rules — Medical Portfolio

Each rule references its owning unit (U1–U11) and requirement/story IDs. Rules are technology-agnostic; implementation mechanics belong to Code Generation.

## BR-1: Canonical Hash Fallback (U2, MSP-FR-17, B6)

- Every load resolves the current URL hash against the six canonical `SectionId` hashes.
- If the hash matches a canonical `SectionId`, that section is shown and receives scroll/focus.
- If the hash is unknown, empty, or malformed, the Introduction section is shown **and** the URL hash is rewritten to the canonical Introduction hash (Functional Design Plan Q1) — the address bar never silently disagrees with the displayed section.
- This rule must hold idempotently: reapplying it to an already-canonical hash is a no-op (PBT candidate — idempotent normalization).

## BR-2: Score Display Pairing (U4, U5, MSP-FR-08, D1–D4)

- A `LabeledScore.value` is never rendered without its `scaleNote` (or its parent `ScoreGroup.scaleDescription`) appearing adjacent to it.
- This is a single shared rendering rule applied uniformly across IGCSE, IELTS, Grade 12, and the admission score — not bespoke per score type (Functional Design Plan Q2).
- Rationale: prevents a reviewer (P1) from misreading, e.g., an IELTS band "7.0" as a percentage or a Grade 12 decimal score as an IGCSE grade.

## BR-3: Collective Attribution Disclosure (U6, MSP-FR-09, E1–E4)

- Whenever `CommunityStory.attribution === "collective"`, the rendered story must include a visible acknowledgment that the outcome was collective/group work (e.g., "achieved together with classmates/the class project").
- When `attribution === "individual"`, no such disclosure is required, but the copy must still avoid self-congratulatory framing (E4).
- This rule is enforced structurally (via the `attribution` field), not left to prose review alone (Functional Design Plan Q3).

## BR-4: Gallery-to-Story Referential Integrity (U7, MSP-FR-10, F1)

- Every `GalleryImage.initiativeId` must reference an existing `CommunityStory.id`.
- A `GalleryImage` with no matching `CommunityStory` is a data-authoring error caught by the content-validation utility (U11) before release, not silently rendered as an orphaned image.

## BR-5: Curated Subset Only (U1, U7, MSP-FR-10, MSP-FR-11, F1, F2, K1, K2)

- Only images explicitly present in the `gallery.ts` data module may render in the Gallery; no directory-scan or bulk-import mechanism may pull in unselected images.
- Every `GalleryImage.src` must resolve inside the curated public asset directory established by U1; it must never reference `src/assets/CV/` or any raw source path.

## BR-6: Video Exclusion (U1, MSP-FR-12, K4)

- No content data module, component, or build configuration may import, reference, or link either of the two supplied MP4 files, by filename or otherwise.

## BR-7: Contact Placeholder Safety (U8, MSP-FR-13, H1)

- `ContactContent.futureLinkPlaceholder` is `undefined`/absent in the initial release.
- `Contact` must render correctly with this field absent (no broken link, no empty anchor) — see also Business Rule BR-9 (graceful degradation).
- No form submission target, mailto link, or social link may be rendered until an approved value is supplied to this field in a future content update.

## BR-8: Privacy Validation Gate (U11, MSP-FR-11, MSP-NFR-02, K1–K3)

- The content-validation utility scans `src/data/*.ts` and the built `dist/` output for: raw CV path fragments, restricted-value patterns (identifiers, birth date, address, phone, bank info), and the two excluded video filenames.
- Any match **fails the Vitest run** with an assertion naming the offending file/pattern (Functional Design Plan Q5) — this is a release-blocking rule, not an advisory warning.

## BR-9: Graceful Degradation for Optional Content (U2, U7, U8, MSP-NFR-06, N5)

- A missing optional `GalleryImage` field, an absent `ContactContent.futureLinkPlaceholder`, or unavailable browser storage (color-mode persistence) must each degrade to a safe rendered state, never a thrown error or blank page.

## BR-10: Section Independence (U3–U8, component-dependency.md)

- No section component (`Hero`, `MedicalJourney`, `Academics`, `CommunityCare`, `Gallery`, `Contact`) may import another section's content data module or component. Cross-references (e.g., `CommunityStory.relatedImageIds` → `GalleryImage.id`) happen through shared `id` values only, never direct imports, preserving the independence documented in Application Design.

## PBT Candidate Disposition (Functional Design Plan Q6)

| Candidate | Disposition | Business rule it validates |
| --- | --- | --- |
| Section hash creation/parsing round trip | **Accepted** — specified by BR-1 | BR-1 |
| Navigation-to-section invariant | **Accepted** — every canonical hash always maps to exactly one `SectionId` | BR-1, NavDestination relationship |
| Unknown-route fallback invariant | **Accepted** — specified by BR-1 (idempotent canonicalization) | BR-1 |
| Idempotent content normalization | **Accepted** — specified by BR-2 (score display pairing is stable under repeated application) | BR-2 |

NFR Design owns the `fast-check` implementation mechanics (generators, shrinking, CI seed reproducibility) for all four accepted candidates.
