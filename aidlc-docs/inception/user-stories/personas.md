# Visual Storytelling and Evidence Library Personas

The approved persona set covers public evaluation, general browsing, content ownership, and the repository/privacy function. Story identifiers refer to `stories.md`.

## P1: Academic Reviewer

- **Profile**: A university faculty member, scholarship reviewer, admissions stakeholder, or academic mentor evaluating Gia Linh's preparation and trajectory.
- **Goals**: Understand the medical journey quickly, verify academic and service claims, inspect supporting pages, and download the sanitized CV.
- **Motivations**: Needs credible, traceable evidence rather than promotional language.
- **Constraints**: Limited review time; may scan before reading; may use an institutional desktop, tablet, keyboard, or assistive technology.
- **Needs**: Clear hierarchy, accurate score context, visible evidence status, efficient page navigation, and dependable document fallbacks.
- **Primary stories**: VS-1 to VS-5, EV-1 to EV-5, DR-1 to DR-5, QL-1 to QL-4.

## P2: General Visitor

- **Profile**: A peer, community member, service-program stakeholder, or other visitor arriving through a shared link.
- **Goals**: Understand the portfolio's themes, explore community work, browse respectful imagery, and distinguish real activities from editorial illustration.
- **Motivations**: Wants an engaging, credible account without being exposed to sensitive personal or beneficiary information.
- **Constraints**: Often uses a narrow mobile viewport and may have a slower connection or limited knowledge of the institutions and qualifications shown.
- **Needs**: Concise captions, useful alternative text, clear disclosure labels, responsive layouts, and simple lightbox controls.
- **Primary stories**: VS-1 to VS-5, GA-1 to GA-4, DR-1 to DR-5, QL-1 and QL-3.

## P3: Student Portfolio Owner

- **Profile**: Nguyễn Tuấn Gia Linh, the subject of the portfolio and the person accountable for its public presentation.
- **Goals**: Present a polished and truthful medical-learning journey, make relevant evidence reviewable, protect personal and third-party privacy, and retain an easy path for future updates.
- **Motivations**: Wants a professional portfolio that reflects real work without publishing raw records or overstating individual contribution.
- **Constraints**: Is not expected to edit complex presentation code or repeatedly audit every implementation detail manually.
- **Needs**: Typed content, clear publication states, recorded source dispositions, retained placeholder contacts, and predictable download controls.
- **Primary stories**: EV-1 to EV-5, PB-1 to PB-5, QL-2 to QL-4.

## P4: Repository Contributor and Privacy Reviewer

- **Profile**: A trusted developer or maintainer responsible for code quality, asset preparation, evidence provenance, and publication review.
- **Goals**: Trace public items to sources, create safe derivatives, prevent raw-file leakage, maintain shared popup behavior, and keep automated checks passing.
- **Motivations**: Protects the owner and third parties while keeping the portfolio maintainable and verifiable.
- **Constraints**: Must distinguish relevance from publication permission and must audit filenames, page imagery, PDFs, metadata, captions, test fixtures, and build output.
- **Needs**: A complete disposition matrix, typed media models, explicit redaction notes, generated-image provenance, and focused privacy/accessibility/build tests.
- **Primary stories**: PB-1 to PB-5, GA-4, EV-2 to EV-4, QL-1 to QL-4.

## Persona-to-Journey Map

| Journey                                          | P1          | P2          | P3          | P4       |
| ------------------------------------------------ | ----------- | ----------- | ----------- | -------- |
| Browse the enhanced portfolio                    | Primary     | Primary     | Review      | Verify   |
| Inspect academic and service evidence            | Primary     | Secondary   | Review      | Verify   |
| Review full document pages                       | Primary     | Secondary   | Review      | Maintain |
| Browse documentary gallery media                 | Secondary   | Primary     | Review      | Verify   |
| Govern sources and public derivatives            | Informed    | Informed    | Accountable | Primary  |
| Validate accessibility, privacy, and performance | Beneficiary | Beneficiary | Accountable | Primary  |

## Accessibility and Inclusion Summary

- P1 may rely on keyboard navigation, focus visibility, screen-reader semantics, and concise evidence states.
- P2 benefits from mobile-first controls, alternative text, captions, efficient loading, and explicit AI-image disclosure.
- P3 needs language that protects dignity and does not exaggerate qualifications or collective service outcomes.
- P4 needs repeatable verification so privacy and accessibility do not depend on memory or visual inspection alone.
