import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { navDestinations } from "../../data/navigation";
import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { renderWithProviders } from "../../test/render";
import { MedicalShell } from "./MedicalShell";

describe("MedicalShell navigation", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "#introduction");
  });

  afterEach(() => {
    window.history.replaceState(null, "", "#introduction");
  });

  it("exposes exactly the eight approved destinations in order with a skip link", async () => {
    await renderAndCheckA11y(<MedicalShell />);

    expect(navDestinations).toHaveLength(8);

    expect(screen.getByTestId("skip-link")).toHaveTextContent(
      "Skip to main content",
    );

    for (const destination of navDestinations) {
      expect(
        screen.getByTestId(`nav-link-${destination.id}`),
      ).toHaveAttribute("href", destination.hash);
    }
  }, 15000);

  it("falls back to Introduction for an unknown hash without a blank screen", () => {
    window.history.replaceState(null, "", "#not-a-real-section");

    renderWithProviders(<MedicalShell />);

    expect(window.location.hash).toBe("#introduction");
    expect(screen.getByTestId("introduction-section")).toBeInTheDocument();
  });

  it("updates the hash and focuses a destination selected from navigation", () => {
    renderWithProviders(<MedicalShell />);

    fireEvent.click(screen.getByTestId("nav-link-academics"));

    expect(window.location.hash).toBe("#academics");
    expect(screen.getByTestId("academics-section")).toHaveFocus();
  });

  it("responds to external hash and browser-history changes", async () => {
    renderWithProviders(<MedicalShell />);

    window.history.replaceState(null, "", "#gallery");
    fireEvent(window, new HashChangeEvent("hashchange"));
    await waitFor(() => expect(screen.getByTestId("gallery-section")).toHaveFocus());

    window.history.replaceState(null, "", "#medical-journey");
    fireEvent(window, new PopStateEvent("popstate"));
    await waitFor(() => expect(screen.getByTestId("medical-journey-section")).toHaveFocus());
  });
});

describe("MedicalShell mobile navigation", () => {
  it("opens, closes on Escape, and returns focus to the toggle", async () => {
    renderWithProviders(<MedicalShell />);

    const toggle = screen.getByTestId("mobile-nav-toggle");
    await waitFor(() => expect(screen.getByTestId("introduction-section")).toHaveFocus());

    fireEvent.click(toggle);
    const menu = await screen.findByTestId("mobile-nav-menu");
    expect(menu).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: "Escape" });
    await waitForElementToBeRemoved(
      () => screen.queryByTestId("mobile-nav-menu"),
      { timeout: 3000 },
    );
    await waitFor(() => expect(toggle).toHaveFocus(), { timeout: 3000 });
  });
});
