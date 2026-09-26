# Integration Test Instructions

## Purpose

Verify that typed content, the medical shell, navigation, responsive components, public media, document dialogs, and deployment-base handling work together as one static application.

## Automated Integration Run

```bash
npx vitest run src/App.test.tsx src/templates/medical
```

Follow with the complete release suite:

```bash
npm test -- --run
```

## Integration Scenarios

### 1. Shell, Hash, and Section Navigation

- Render the application at Introduction and at a canonical hash.
- Confirm all eight destinations are present in order.
- Select desktop and mobile destinations and verify hash, scroll target, focus, drawer dismissal, and focus return.
- Confirm malformed hashes fall back to Introduction.

### 2. Evidence Data to Academic and Research Presentation

- Confirm GPA, A Level, IGCSE, official IELTS 7.0, Grade 12, and admission values render with source/scale context.
- Confirm Research renders its question, method, measurements, and non-clinical limitation.
- Confirm service and extracurricular records retain collective attribution where applicable.

### 3. Public Document Workflow

- Confirm the CV and hematology acknowledgement show first-page thumbnails.
- Activate a thumbnail and explicit Preview button; verify the matching PDF opens in the modal.
- Close with the button and Escape; verify focus returns to the activating control.
- Confirm independent Download links use explicit filenames.
- Confirm private academic records expose summaries only.

### 4. Gallery Workflow

- Confirm all nine approved public images render with lazy loading, alternative text, captions, and base-safe URLs.
- Open and close the image lightbox by keyboard and pointer.
- Confirm no raw evidence-folder or video URL is rendered.

### 5. Contact Data to Presentation

- Confirm the `ContactContent` data renders as three cards for email, LinkedIn, and location.
- Confirm example-only language appears in both the status treatment and disclosure panel.
- Confirm the email and LinkedIn placeholders are plain text with no outbound link.
- Confirm the cards use one column at the base breakpoint and three columns at the medium breakpoint.
- Confirm long placeholder values wrap inside their cards without horizontal overflow.

### 6. Deployment-Base Integration

```bash
npm run build
VITE_BASE_PATH=/portfolio-test/ npm run build
```

Inspect `dist/index.html` and bundled URLs. No gallery, document thumbnail, PDF, favicon, or script URL may escape the configured base.

## Manual Responsive Acceptance

Run `npm run dev` and inspect at 390px, 768px, and 1440px in light and dark modes. Check navigation, overflow, card rhythm, image crops, PDF preview cards, popup sizing, keyboard focus, the Contact cards, placeholder disclosure, and the footer. At 390px the contact methods must stack; at 768px and 1440px they must form a balanced three-column row without clipped text. The prior verified 390px portfolio run reported `innerWidth`, `clientWidth`, and `scrollWidth` as 390.

## Environment and Cleanup

No database, container, API, or external service is required. Stop the local Vite process after manual testing; generated `dist/` output may remain for deployment validation.
