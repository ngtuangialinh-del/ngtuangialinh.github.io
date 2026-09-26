# Property-Based Testing Disposition

## Applied Properties

| Component or boundary | Property | Coverage |
| --- | --- | --- |
| Section hash codec | `parse(create(id)) = id` for every canonical section | `useSectionNavigation.pbt.test.ts` |
| Hash normalization | Idempotence, canonical preservation, invalid-input fallback, canonical output membership | `useSectionNavigation.pbt.test.ts` |
| Score display resolver | Value preservation, available-scale preservation, idempotence | `ScoreDisplay.pbt.test.ts` |

All suites use bounded generators. The hash codec suite includes stable seed `20260919`; CI retains the fast-check failure output so a failing seed and path can be replayed.

## Stateful Model Decision

The mobile drawer and browser-history controller were evaluated for stateful model-based testing. A separate fast-check command model is N/A for this pass because the state transitions are delegated to browser History and Chakra Drawer primitives, while the application-owned contracts are covered through DOM integration tests: open/close/focus return, canonical fallback, hash-change focus, native-link navigation, and `popstate` response. The pure application-owned encode/decode boundary remains property-tested.

## Component Disposition

- Hero, Journey, Community Care, Gallery, Contact: presentational rendering over finite approved fixtures; example and accessibility tests are the appropriate boundary.
- Academics: its reusable score normalization boundary is property-tested; layout rendering is example-tested.
- Shell/navigation: pure hash transformations are property-tested; stateful browser and drawer integration is example-tested for the reason above.
- Lightbox and color mode: third-party state primitives with application configuration; interaction and theme-contract tests are used.
- Privacy gate: deterministic filesystem assertions are used because random inputs do not improve confidence in repository content scanning.
