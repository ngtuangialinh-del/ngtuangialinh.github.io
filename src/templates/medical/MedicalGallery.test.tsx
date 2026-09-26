import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { galleryImages } from "../../data/gallery";
import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalGallery } from "./MedicalGallery";

describe("MedicalGallery", () => {
  it("renders only the curated image set with alt text and captions", async () => {
    await renderAndCheckA11y(<MedicalGallery />);

    for (const image of galleryImages) {
      expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    }
  });

  it("lazy-loads every below-the-fold thumbnail", async () => {
    await renderAndCheckA11y(<MedicalGallery />);

    const images = screen.getAllByRole("img");

    for (const image of images) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image).toHaveAttribute("decoding", "async");
      expect(image).toHaveAttribute("sizes");
    }
  });

  it("navigates an accessible lightbox and restores focus on close", async () => {
    await renderAndCheckA11y(<MedicalGallery />);

    const firstThumbnail = screen.getByTestId(
      `gallery-thumbnail-${galleryImages[0].id}`,
    );

    firstThumbnail.focus();
    fireEvent.click(firstThumbnail);

    const dialog = await screen.findByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByTestId("gallery-lightbox-position"),
    ).toHaveTextContent(`Image 1 of ${galleryImages.length}`);
    expect(
      within(dialog).getByRole("img", { name: galleryImages[0].alt }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByTestId("gallery-lightbox-previous"),
    ).toBeDisabled();

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(
      within(dialog).getByTestId("gallery-lightbox-position"),
    ).toHaveTextContent(`Image 2 of ${galleryImages.length}`);
    expect(
      within(dialog).getByRole("img", { name: galleryImages[1].alt }),
    ).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(
      within(dialog).getByTestId("gallery-lightbox-position"),
    ).toHaveTextContent(`Image 1 of ${galleryImages.length}`);

    const closeButton = within(dialog).getByTestId("gallery-lightbox-close");

    fireEvent.click(closeButton);

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    await waitFor(() => expect(firstThumbnail).toHaveFocus());
  });
});
