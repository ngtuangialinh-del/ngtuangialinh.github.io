import type { ReactElement } from "react";
import { expect } from "vitest";
import { axe } from "vitest-axe";

import { renderWithProviders } from "./render";

/**
 * Shared helper: render a component and assert it has no axe-core
 * accessibility violations. Reused across every section's test file
 * instead of duplicating axe setup per file (NFR Design).
 */
export async function renderAndCheckA11y(ui: ReactElement) {
  const view = renderWithProviders(ui);
  // jsdom has no canvas implementation, so axe's browser-only color-contrast
  // rule is covered separately by deterministic token-pair tests.
  const results = await axe(view.container, {
    rules: { "color-contrast": { enabled: false } },
  });

  expect(results).toHaveNoViolations();

  return view;
}
