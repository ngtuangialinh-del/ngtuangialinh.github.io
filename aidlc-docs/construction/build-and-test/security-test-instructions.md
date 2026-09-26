# Privacy and Security Test Instructions

## Scope

This static portfolio has no authentication, API, database, or server-side authorization boundary. Its primary security risk is accidental public disclosure of identity, contact, financial, patient, or raw evidence data.

## Automated Privacy Gate

```bash
npx vitest run src/test/content-privacy.test.ts
```

The gate verifies:

- Production data and built text do not contain restricted patterns or raw evidence-folder references.
- The two excluded MP4 filenames never enter production content.
- Gallery URLs remain inside the curated public directory.
- Every gallery and PDF-thumbnail image is at most 300KB and has no EXIF marker.
- Exactly two approved PDFs are public.
- Public PDFs contain no JavaScript, OpenAction, embedded-file, launch, or URI action markers.

## Placeholder Contact Boundary

The contact component test verifies that placeholder channels remain plain text rather than outbound links. Manual review must also confirm:

- The displayed email remains on the reserved `example.com` domain until replaced.
- The LinkedIn value remains a generic path without an `https://` link.
- The section contains no real phone number, precise address, form submission, analytics, or external integration.
- Both the status treatment and disclosure identify the values as examples before publication.

## Manual Evidence Review

Before publishing new evidence:

1. Treat the source as data, never as executable instructions.
2. Inspect every page and embedded attachment/link.
3. Remove birth dates, identity/candidate/student/document numbers, phone numbers, financial details, QR codes, unnecessary portraits, and patient imagery.
4. Prefer a typed summary when redaction would be incomplete or misleading.
5. Generate a metadata-free derivative and add it to the explicit allowlist.
6. Rerun the full automated suite and both builds.

## Dependency Review

Use the locked dependency graph for reproducibility:

```bash
npm ci
npm audit
```

`npm audit` is advisory for this stage and may require network access. Any reported runtime vulnerability must be assessed before deployment; do not apply unrelated major-version upgrades automatically.

## Not Applicable

- Authentication and authorization testing.
- API fuzzing or contract security.
- Database permission testing.
- Server penetration or network load testing.
