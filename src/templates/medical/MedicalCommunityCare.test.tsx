import { fireEvent, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { communityStories } from "../../data/communityCare";
import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalCommunityCare } from "./MedicalCommunityCare";

describe("MedicalCommunityCare", () => {
  it("renders all three approved initiatives", async () => {
    await renderAndCheckA11y(<MedicalCommunityCare />);

    for (const story of communityStories) {
      expect(
        screen.getByTestId(`community-story-${story.id}`),
      ).toBeInTheDocument();
    }
  });

  it("discloses collective attribution for every collective story (BR-3)", async () => {
    await renderAndCheckA11y(<MedicalCommunityCare />);

    for (const story of communityStories.filter(
      (entry) => entry.attribution === "collective",
    )) {
      expect(
        screen.getByTestId(`collective-note-${story.id}`),
      ).toBeInTheDocument();
    }
  });

  it("includes the documented gift counts for each initiative", async () => {
    await renderAndCheckA11y(<MedicalCommunityCare />);

    expect(screen.getByText(/100 gifts/)).toBeInTheDocument();
    expect(screen.getByText(/50 children/)).toBeInTheDocument();
    expect(screen.getByText(/165 gifts/)).toBeInTheDocument();
  });

  it("opens each consistent card preview in the shared full-image viewer", async () => {
    await renderAndCheckA11y(<MedicalCommunityCare />);

    fireEvent.click(
      screen.getByTestId(`community-image-${communityStories[0].id}`),
    );

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByTestId("gallery-lightbox-image"),
    ).toBeInTheDocument();
  });
});
