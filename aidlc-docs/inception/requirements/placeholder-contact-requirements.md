# Placeholder Contact Section Requirements

## Intent Analysis

- **User request**: Add a contact section using placeholder information for now.
- **Request type**: Enhancement to an existing user-facing section.
- **Scope estimate**: Single component with a small typed-data and test update.
- **Complexity estimate**: Simple.
- **Requirements depth**: Minimal.

## Functional Requirements

1. Replace the current future-contact notice with a complete, professional contact presentation.
2. Show clearly labeled placeholder values for email, LinkedIn, and location.
3. Use unmistakably non-production values, including the reserved `example.com` domain and a generic LinkedIn profile path.
4. Mark the information as placeholder content and explain that it must be replaced before publication.
5. Keep placeholder email and social values non-interactive so visitors cannot mistake them for verified contact channels.
6. Preserve the existing `#contact` navigation destination and the established medical-portfolio visual language.

## Non-Functional Requirements

1. Maintain responsive layout behavior on mobile and desktop.
2. Preserve keyboard and screen-reader accessibility, sufficient contrast, and semantic text labels.
3. Keep contact content in the typed data layer rather than hard-coding all values in the component.
4. Add focused regression and accessibility coverage for the new presentation.
5. Do not publish real personal contact information or introduce a backend, form submission, analytics, or external integration.

## Assumptions

- The placeholder location will be `Hanoi, Vietnam`, consistent with the portfolio context but not presented as a precise address.
- The placeholder email will use `example.com`, a reserved documentation domain.
- The placeholder LinkedIn value will be displayed as example text without a live link.

## Extension Compliance

| Extension | Status | Rationale |
| --- | --- | --- |
| Security Baseline | Disabled | Existing project-level Requirements Analysis decision is retained. |
| Property-Based Testing | N/A | The change contains no pure transformation, serialization, or stateful business logic suitable for property testing. |

## Success Criteria

- The Contact section looks intentional rather than unfinished.
- Every displayed contact value is visibly identified as an example or placeholder.
- No placeholder value creates a working outbound contact action.
- Type checking, linting, relevant tests, accessibility checks, and production build pass.
