# Placeholder Contact Section Code Generation Plan

This document is the single source of truth for implementing the placeholder contact section.

## Unit Context

- **Unit**: Placeholder Contact Section.
- **Requirements source**: `aidlc-docs/inception/requirements/placeholder-contact-requirements.md`.
- **Stories**: None; User Stories was intentionally skipped for this small, fully specified change.
- **Dependencies**: Existing Chakra UI primitives, React Icons, `SectionShell`, typed contact data, and the shared accessibility test helper.
- **Interfaces**: `ContactContent` supplies structured display-only entries to `MedicalContact`.
- **Owned database entities**: None.
- **Service boundary**: None; this is a static client-side presentation component.

## Implementation Steps

### Step 1 - Extend the typed contact content contract

- [x] Add a constrained identifier type for the supported contact methods in `src/types/medical.ts`.
- [x] Replace the obsolete future-link field with structured placeholder methods and disclosure copy.
- [x] Keep the model presentation-agnostic and free of React elements.

### Step 2 - Populate safe placeholder content

- [x] Update `src/data/contact.ts` with example email, LinkedIn, and location values.
- [x] Use the reserved `example.com` domain and a generic LinkedIn path.
- [x] Add explicit example-only language and keep all values non-interactive.
- [x] Refresh `src/data/sectionCopy.ts` so the section introduction describes the contact presentation rather than an unfinished future state.

### Step 3 - Build the responsive contact presentation

- [x] Refactor `src/templates/medical/MedicalContact.tsx` within its existing component boundary.
- [x] Preserve the existing dark medical-theme card while improving hierarchy and spacing.
- [x] Add responsive method cards with semantic labels, stable test IDs, and icons mapped in the component.
- [x] Add a prominent placeholder-status disclosure so example details cannot be mistaken for verified contact information.
- [x] Preserve the existing `#contact` section integration and avoid live placeholder links.

### Step 4 - Update focused tests

- [x] Update `src/templates/medical/MedicalContact.test.tsx` to assert all placeholder values and disclosure text.
- [x] Assert that no outbound link is rendered while placeholder content is active.
- [x] Retain the shared automated accessibility assertion.

### Step 5 - Create the implementation summary

- [x] Create `aidlc-docs/construction/placeholder-contact/code/code-generation-summary.md`.
- [x] Record modified files, behavior, privacy safeguards, and verification scope.
- [x] Confirm no duplicate application files were created.

### Step 6 - Verify the generated code

- [x] Run the focused contact test.
- [x] Run TypeScript type checking.
- [x] Run ESLint.
- [x] Run the complete test suite.
- [x] Run the production build.
- [x] Record all results in the implementation summary and AI-DLC state.

## Expected File Changes

- `src/types/medical.ts`
- `src/data/contact.ts`
- `src/data/sectionCopy.ts`
- `src/templates/medical/MedicalContact.tsx`
- `src/templates/medical/MedicalContact.test.tsx`
- `aidlc-docs/construction/placeholder-contact/code/code-generation-summary.md`

## Traceability

| Requirement area                             | Plan steps |
| -------------------------------------------- | ---------- |
| Structured professional contact presentation | 1, 2, 3    |
| Clearly labeled safe placeholders            | 2, 3, 4    |
| Non-interactive example data                 | 2, 3, 4    |
| Existing navigation and visual language      | 3, 6       |
| Responsive and accessible behavior           | 3, 4, 6    |
| Typed data and regression coverage           | 1, 2, 4, 6 |

## Extension Compliance

| Extension              | Status   | Rationale                                                                        |
| ---------------------- | -------- | -------------------------------------------------------------------------------- |
| Security Baseline      | Disabled | Existing project-level decision retained.                                        |
| Property-Based Testing | N/A      | No suitable pure transformation, serialization, or stateful logic is introduced. |
