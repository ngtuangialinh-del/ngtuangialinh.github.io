# Unit of Work Story Map — Medical Student Portfolio Revamp

Every story from `aidlc-docs/inception/user-stories/stories.md` mapped to exactly one primary unit of work. See `unit-of-work.md` for unit definitions.

| Story | Epic | Unit |
| --- | --- | --- |
| A1 | Arrival and Identity | U3: Introduction (Hero) |
| A2 | Arrival and Identity | U3: Introduction (Hero) |
| A3 | Arrival and Identity | U3: Introduction (Hero) |
| B1 | Navigation and Wayfinding | U2: Navigation & Shell |
| B2 | Navigation and Wayfinding | U2: Navigation & Shell |
| B3 | Navigation and Wayfinding | U2: Navigation & Shell |
| B4 | Navigation and Wayfinding | U2: Navigation & Shell |
| B5 | Navigation and Wayfinding | U2: Navigation & Shell |
| B6 | Navigation and Wayfinding | U2: Navigation & Shell |
| C1 | Medical Journey | U4: Medical Journey |
| D1 | Academic Evidence | U5: Academics |
| D2 | Academic Evidence | U5: Academics |
| D3 | Academic Evidence | U5: Academics |
| D4 | Academic Evidence | U5: Academics |
| D5 | Academic Evidence | U5: Academics (verification cross-cut into U11: Cross-Cutting Quality) |
| E1 | Community Care Stories | U6: Community Care |
| E2 | Community Care Stories | U6: Community Care |
| E3 | Community Care Stories | U6: Community Care |
| E4 | Community Care Stories | U6: Community Care |
| F1 | Curated Gallery | U7: Gallery |
| F2 | Curated Gallery | U7: Gallery (privacy verification cross-cut into U11) |
| F3 | Curated Gallery | U7: Gallery |
| F4 | Curated Gallery | U7: Gallery |
| G1 | Color Mode | U9: Color Mode Verification |
| G2 | Color Mode | U9: Color Mode Verification |
| G3 | Color Mode | U9: Color Mode Verification |
| G4 | Color Mode | U9: Color Mode Verification |
| H1 | Contact and Future Connection | U8: Contact |
| I1 | Legacy Removal and Single Presentation | U10: Legacy Removal |
| I2 | Legacy Removal and Single Presentation | U10: Legacy Removal |
| I3 | Legacy Removal and Single Presentation | U10: Legacy Removal (test replacement also touches U11) |
| J1 | Metadata and Document Identity | U2: Navigation & Shell (document-level metadata owned alongside the shell) |
| K1 | Evidence Privacy and Repository Boundary | U1: Content & Data Foundation (asset curation) + U11: Cross-Cutting Quality (verification) |
| K2 | Evidence Privacy and Repository Boundary | U1: Content & Data Foundation |
| K3 | Evidence Privacy and Repository Boundary | U11: Cross-Cutting Quality |
| K4 | Evidence Privacy and Repository Boundary | U11: Cross-Cutting Quality |
| L1 | Accessibility | U11: Cross-Cutting Quality |
| L2 | Accessibility | U11: Cross-Cutting Quality |
| M1 | Responsive Quality | U11: Cross-Cutting Quality |
| M2 | Responsive Quality | U11: Cross-Cutting Quality |
| N1 | Maintainability and Verification | U1: Content & Data Foundation (typed data structure) |
| N2 | Maintainability and Verification | U2: Navigation & Shell (theme tokens owned alongside shell/design system) |
| N3 | Maintainability and Verification | U11: Cross-Cutting Quality |
| N4 | Maintainability and Verification | U11: Cross-Cutting Quality |
| N5 | Maintainability and Verification | U2: Navigation & Shell (shell-level resilience) + U11 (verification) |

## Coverage Check

- All 45 stories (A1–N5) are assigned to at least one primary unit; no story is unassigned.
- Stories with both an implementation aspect and a verification aspect (D5, F2, I3, K1, N5) list both units, consistent with the approved "dedicated + relevant repeats" answer for cross-cutting concerns (story-generation-plan.md, Question 5).
- Unit boundaries match the component boundaries defined in `application-design/components.md`, satisfying Unit of Work Plan Question 5.
