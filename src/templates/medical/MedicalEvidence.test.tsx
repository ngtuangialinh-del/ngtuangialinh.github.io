import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { evidenceDocuments } from "../../data/evidence";
import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalEvidence } from "./MedicalEvidence";

describe("MedicalEvidence", () => {
  it("renders every evidence group with honest publication states and page previews", async () => {
    await renderAndCheckA11y(<MedicalEvidence />);

    expect(evidenceDocuments).toHaveLength(7);
    expect(
      evidenceDocuments.filter(
        (document) => document.publicationState === "public-sanitized-evidence",
      ),
    ).toHaveLength(2);
    expect(
      evidenceDocuments.filter(
        (document) => document.publicationState === "verified-summary",
      ),
    ).toHaveLength(5);
    expect(screen.getAllByText("Verified summary")).toHaveLength(5);
    expect(screen.getAllByTestId(/^preview-thumbnail-/)).toHaveLength(7);
    expect(
      screen.getByRole("link", { name: "Download Curriculum Vitae" }),
    ).toHaveAttribute("download", "nguyen-tuan-gia-linh-cv.pdf");
  });

  it("reviews every CV page in the popup and restores focus when closed", async () => {
    await renderAndCheckA11y(<MedicalEvidence />);
    const trigger = screen.getByTestId("preview-curriculum-vitae");
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByTestId("document-page-position"),
    ).toHaveTextContent("Page 1 of 2");
    expect(
      within(dialog).getByRole("img", {
        name: "Page 1 of Nguyễn Tuấn Gia Linh's curriculum vitae",
      }),
    ).toBeInTheDocument();
    expect(within(dialog).getByTestId("document-page-previous")).toBeDisabled();
    expect(
      within(dialog).getByTestId("document-page-thumbnail-cv-page-1"),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(within(dialog).getByTestId("document-page-next"));
    expect(
      within(dialog).getByTestId("document-page-position"),
    ).toHaveTextContent("Page 2 of 2");
    expect(
      within(dialog).getByRole("img", {
        name: "Page 2 of Nguyễn Tuấn Gia Linh's curriculum vitae",
      }),
    ).toBeInTheDocument();
    expect(within(dialog).getByTestId("document-page-next")).toBeDisabled();
    expect(
      within(dialog).getByTestId("document-page-thumbnail-cv-page-2"),
    ).toHaveAttribute("aria-pressed", "true");
    expect(within(dialog).getByTestId("document-open-pdf")).toBeInTheDocument();
    expect(
      within(dialog).getByTestId("document-download-pdf"),
    ).toBeInTheDocument();

    fireEvent.click(within(dialog).getByTestId("document-preview-close"));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("opens verified-summary pages without exposing a raw PDF", async () => {
    await renderAndCheckA11y(<MedicalEvidence />);
    fireEvent.click(screen.getByTestId("preview-school-record"));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByText(/private original retained/i),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByTestId("document-page-position"),
    ).toHaveTextContent("Page 1 of 2");
    expect(
      within(dialog).queryByTestId("document-open-pdf"),
    ).not.toBeInTheDocument();
    expect(
      within(dialog).queryByTestId("document-download-pdf"),
    ).not.toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole("button", {
        name: "View Summary 2 of Upper-secondary academic record",
      }),
    );
    expect(
      within(dialog).getByTestId("document-page-position"),
    ).toHaveTextContent("Page 2 of 2");
  });
});
