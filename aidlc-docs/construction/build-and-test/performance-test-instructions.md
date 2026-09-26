# Performance Test Instructions

## Purpose

Validate static-delivery budgets appropriate to a GitHub Pages portfolio. Server load, throughput, concurrent-user, database, and autoscaling tests are not applicable because the project has no application server or API.

## Approved Budgets

- Main JavaScript: no more than 300KB gzip.
- Each public gallery or document-thumbnail image: no more than 300KB.
- Below-the-fold images: lazy loading and async decoding.
- Both root and non-root production builds must complete successfully.

## Execute the Static Performance Check

```bash
npm run build
VITE_BASE_PATH=/portfolio-test/ npm run build
```

Record the Vite gzip results and compare them with this baseline:

| Measure                        | Verified result                |
| ------------------------------ | ------------------------------ |
| Main JavaScript                | 684.09KB raw / 196.33KB gzip   |
| Main CSS                       | 13.92KB raw / 4.08KB gzip      |
| CV PDF                         | 86.70KB                        |
| Hematology acknowledgement PDF | 332.21KB                       |
| Largest public image           | 252,489 bytes                  |
| Complete project-base `dist/`  | Approximately 3.2MB / 18 files |

The raw JavaScript triggers Vite's 500KB advisory. It is tracked but non-blocking because the approved budget is compressed transfer size and the result is about 104KB below that limit. The placeholder contact enhancement remains inside the existing bundle budget and adds no media or runtime dependency.

## Verify Media Budgets

```bash
npx vitest run src/test/content-privacy.test.ts
```

This checks every gallery image and PDF thumbnail against the 300KB cap and rejects EXIF markers.

## Optional Browser Profiling

For a future performance-specific change, run Lighthouse against a production preview on a controlled machine/network and record mobile performance, accessibility, and largest-contentful-paint results. No Lighthouse score is claimed by this stage.

## Optimization Candidates

If the gzip budget regresses, consider route/section code splitting, narrower icon imports, and dialog/PDF-viewer lazy loading. If media grows, resize and strip derivatives rather than lowering the privacy or accessibility requirements.

## Not Applicable

- Server response-time objectives under load.
- Requests per second or concurrent-user targets.
- API, database, queue, or cache throughput.
- Stress testing or autoscaling validation.
