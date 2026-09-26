# UI Reference Analysis — Professional Recovery

## Purpose

This analysis defines the visual and interaction baseline for the corrective Code Generation pass. It compares the current medical portfolio with two user-mandated references:

1. The initial presentation at repository `HEAD` (`2c8193c`).
2. The portfolio implementation in `../TranGiaMinhTam.github.io/`.

The references are design inputs, not content sources. The medical student's evidence, wording, and identity remain local to this repository.

## Assessment Outcome

The current implementation should be repaired in place, but its six unrelated medical metaphors should not remain the organizing design system. The fixed clinical sidebar, monitor dashboard, case-file dossier, rotated polaroids, and prescription sheet compete with the student's evidence and create an uneven, novelty-led experience.

The corrective direction is a coherent clinical-editorial portfolio: calm, precise, evidence-led, and recognizably related to the original template. Section layouts may vary where the content benefits, but they must share one navigation model, page frame, spacing system, surface language, and accessibility contract.

## Reference Findings

| Area | Initial repository design | `TranGiaMinhTam.github.io` | Corrective decision |
| --- | --- | --- | --- |
| Identity | Compact brand lockup in a fixed horizontal header | Clear masthead with identity and status | Use a compact medical identity lockup in a sticky horizontal header |
| Navigation | Familiar inline desktop navigation and accessible mobile drawer | Sticky horizontal section rail with active location | Use inline desktop links, an accessible mobile drawer, and resilient active-section state |
| Hero | Balanced two-column composition, strong headline, restrained badges and stat cards | Formal editorial introduction with clear hierarchy | Restore a spacious two-column hero and a single elevated medical-profile panel |
| Page structure | Consistent container and card vocabulary | Registered section targets and a consistent section frame | Establish one reusable section frame with stable anchors and predictable spacing |
| Wayfinding | Active navigation state | Section ordinal, label, and progress rule | Add a slim progress indicator beneath the header without overwhelming the page |
| Visual language | Warm, polished surfaces; rounded cards; subtle grid; measured shadows | Restrained scientific palette, strong typography, disciplined borders | Use warm ivory, deep teal, surgical blue, and restrained red through centralized tokens |
| Behavior | Responsive header and accessible Chakra drawer | Hash, history, IntersectionObserver, fallback, and reduced-motion handling | Combine the original shell pattern with the sibling's robust navigation algorithm |
| Accessibility | Landmarks, focusable main content, established drawer behavior | Hidden-until-focused skip link, focus styling, reduced motion | Restore all of these behaviors and verify them in tests |
| Responsive design | Hero and navigation collapse cleanly | Section frames collapse without a permanent sidebar | Remove the fixed sidebar; support deliberate 390 px, 768 px, and 1440 px layouts |

## Section Direction

### Introduction

- Retain the portrait-free medical identity and verified evidence.
- Restore the original template's two-column rhythm, concise status badges, evidence stats, CTA hierarchy, and elevated profile panel.
- Remove decorative elements that imply a patient record or clinical authority the student does not hold.

### Medical Journey

- Use an elegant chronological timeline inside the shared page frame.
- Keep line, marker, and date treatments restrained and readable rather than using a large diagonal background device.

### Academics

- Replace the simulated patient monitor with semantic academic evidence: a compact table where tabular comparison is useful and score cards where it is not.
- Show values with truthful units and scales. Do not encode percentages or progress bars unless a percentage is actually supported by the source.

### Community Care

- Use editorial story cards with clear role, period, action, and evidence relationships.
- Remove case-file tabs and stamp treatments that make volunteer evidence feel theatrical.

### Gallery

- Use an aligned responsive grid with consistent crops, captions, and an accessible lightbox.
- Remove arbitrary image rotation. Treat every image as supporting evidence, not decoration.
- Require explicit owner approval, metadata/privacy checks, base-path-safe URLs, responsive image hints, and lazy loading for below-the-fold media.

### Contact

- Use a compact closing statement, contact actions, and footer within the shared page frame.
- Remove the oversized prescription metaphor and unnecessary viewport-height whitespace.

## Interaction Contract

- Canonical section hashes work on first load, link activation, browser back/forward, and external hash changes.
- Direct navigation scrolls and focuses the destination using reduced-motion preferences.
- The active section is derived from registered section targets with IntersectionObserver and a geometry fallback.
- Desktop navigation remains visible and familiar; mobile navigation uses the established accessible drawer primitive with focus containment and return.
- The skip link is visually hidden until focused and moves focus to the main landmark.
- Header offset and `scroll-margin-top` prevent anchored headings from being obscured.
- Theme controls have an explicit accessible name and all light/dark combinations meet the approved contrast requirements.

## Visual Acceptance Baseline

The corrective pass must be reviewed at 390 px, 768 px, and 1440 px in both light and dark modes. Acceptance requires:

- no permanent sidebar or full-screen custom navigation overlay;
- no stray visible skip-link text when it is not focused;
- no clipped navigation, content, or focus indicators;
- consistent section gutters, typography, surfaces, and vertical rhythm;
- a professional first viewport comparable in balance and density to the initial template;
- accurate academic encoding and respectful presentation of service evidence;
- compact contact/footer treatment without artificial empty space;
- stable direct-link and back/forward behavior.

## Reuse Boundaries

- Reuse the current Chakra UI application structure and verified medical content model.
- Selectively port interaction ideas from the sibling implementation; do not copy its student-specific content or wholesale CSS architecture.
- Reintroduce original repository patterns where they remain stronger, particularly the horizontal shell, two-column hero, mobile drawer, and focusable main landmark.
- Treat the previous completed checkboxes as historical execution records. The corrective steps appended to the active Code Generation plan govern approval of the repaired result.

