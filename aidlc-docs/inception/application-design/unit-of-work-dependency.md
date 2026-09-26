# Unit of Work Dependency Matrix — Medical Student Portfolio Revamp

| Unit | Depends on | Enables / Depended on by | Can run in parallel with |
| --- | --- | --- | --- |
| U1: Content & Data Foundation | none | U3, U4, U5, U6, U7, U8, U9 (indirectly), U11 | U2 (both are foundational and touch disjoint files) |
| U2: Navigation & Shell | none (structurally independent of U1, though both should land before section units) | U3, U4, U5, U6, U7, U8, U9, U10, U11 | U1 |
| U3: Introduction (Hero) | U1, U2 | U11 (verification) | U4, U5, U6, U7, U8, U9, U10 |
| U4: Medical Journey | U1, U2 | U11 | U3, U5, U6, U7, U8, U9, U10 |
| U5: Academics | U1, U2 | U11 | U3, U4, U6, U7, U8, U9, U10 |
| U6: Community Care | U1, U2 | U11 | U3, U4, U5, U7, U8, U9, U10 |
| U7: Gallery | U1, U2 | U11 | U3, U4, U5, U6, U8, U9, U10 |
| U8: Contact | U1, U2 | U11 | U3, U4, U5, U6, U7, U9, U10 |
| U9: Color Mode Verification | U2 (structural minimum); full confidence needs U3–U8 | U11 | U3–U8, U10 |
| U10: Legacy Removal | U2 | U11 (nothing to verify as removed until this runs) | U3–U9 |
| U11: Cross-Cutting Quality | U1–U10 (full verification gate) | Build and Test (CONSTRUCTION) | none — this is the closing unit |

## Recommended Sequencing (per Unit of Work Plan Q2)

1. **U1 and U2** — foundational, run in parallel with each other (disjoint files: data modules vs. shell/navigation).
2. **U3, U4, U5, U6, U7, U8, U9, U10** — once U1 and U2 land, all eight of these proceed in parallel; they are mutually independent per `application-design/component-dependency.md` (each section depends only on its own content module, and Legacy Removal touches a disjoint file set from the new sections).
3. **U11** — closing verification unit; requires the rest to exist so there is a complete surface to test, validate for privacy, and check for accessibility/responsiveness.

## Rationale

This sequencing directly reflects the "no cross-section coupling" finding already documented in `application-design/component-dependency.md` — the dependency matrix here is not a new discovery, it is the same independence carried forward into a construction-planning view.
