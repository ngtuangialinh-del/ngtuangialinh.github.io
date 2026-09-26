# Interaction Diagrams

## Section Navigation

```mermaid
sequenceDiagram
    participant Visitor
    participant Navigation
    participant Hook as useSectionNavigation
    participant Section

    Visitor->>Navigation: Activate destination
    Navigation->>Hook: navigateToSection(sectionId)
    Hook->>Hook: Update hash and active state
    Hook->>Section: Scroll and focus target
    Section-->>Visitor: Render active section context
```

### Text Alternative

A visitor activates a desktop or mobile destination. The navigation hook validates the section, updates the URL hash and active state, then scrolls and focuses the target section.

## Current Document Preview

```mermaid
sequenceDiagram
    participant Visitor
    participant Evidence as Evidence Card
    participant Dialog as DocumentPreviewDialog
    participant Browser as Browser PDF Renderer

    Visitor->>Evidence: Activate thumbnail or Preview
    Evidence->>Dialog: Set active EvidenceDocument
    Dialog->>Browser: Load approved PDF URL
    Browser-->>Visitor: Render full PDF when supported
    Visitor->>Dialog: Close with control or Escape
    Dialog-->>Evidence: Restore trigger focus
```

### Text Alternative

A visitor activates a public Evidence thumbnail or Preview button. The card supplies one approved document to the dialog, which asks the browser to render the complete PDF. Closing the dialog restores focus. There is no page gallery or image fallback today.

## Evidence Publication Boundary

```mermaid
flowchart LR
    Raw["Raw CV-folder source"] --> Relevance["Relevance review"]
    Relevance --> Privacy["Privacy and consent review"]
    Privacy --> Decision{"Publication-safe?"}
    Decision -->|No| Summary["Verified summary only"]
    Decision -->|Needs redaction| Derivative["Sanitized derivative"]
    Decision -->|Yes| Curated["Optimized curated asset"]
    Derivative --> Tests["Privacy, metadata, and budget tests"]
    Curated --> Tests
    Tests --> Public["Public Evidence or Gallery"]
    Summary --> Public
```

### Text Alternative

Every raw source passes relevance review and then privacy/consent review. Unsafe originals become verified summaries. Sources needing redaction become sanitized derivatives. Safe sources become optimized curated assets. Derivatives and curated assets must pass privacy, metadata, and performance tests before public inclusion.

## Validation Notes

- Mermaid node identifiers are alphanumeric.
- Labels containing spaces or punctuation are quoted.
- Every diagram has a prose alternative.
