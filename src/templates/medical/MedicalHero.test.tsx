import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalHero } from "./MedicalHero";

describe("MedicalHero", () => {
  it("identifies the student and presents the approved profile portrait", async () => {
    await renderAndCheckA11y(<MedicalHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Nguyễn Tuấn Gia Linh" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Incoming medical student, admitted to the Medicine program/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Portrait of Nguyễn Tuấn Gia Linh in Nguyễn Siêu School uniform",
      }),
    ).toHaveAttribute("src", "/profile/gia-linh-profile.jpg");
    expect(
      screen.getByTestId("editorial-figure-introduction-learning-collage"),
    ).toBeInTheDocument();
    expect(screen.getByText("Grade 12 GPA")).toBeInTheDocument();
    expect(screen.getByText("9.4 / 10")).toBeInTheDocument();
    expect(screen.getByText("A-level results")).toBeInTheDocument();
    expect(
      screen.getByText("Biology A · Mathematics A · Chemistry B"),
    ).toBeInTheDocument();
    expect(screen.getByText("Admission score")).toBeInTheDocument();
    expect(screen.getByText("27.20")).toBeInTheDocument();
    expect(screen.queryByText("IGCSE Mathematics")).not.toBeInTheDocument();
    expect(screen.queryByText(/AI-generated/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/clinical qualification/i),
    ).not.toBeInTheDocument();
  });

  it("provides primary CTAs into Medical Journey and Community Care", async () => {
    await renderAndCheckA11y(<MedicalHero />);

    expect(
      screen.getByRole("link", {
        name: /Scroll to the Medical Journey section/i,
      }),
    ).toHaveAttribute("href", "#medical-journey");
    expect(
      screen.getByRole("link", {
        name: /Scroll to the Community Care section/i,
      }),
    ).toHaveAttribute("href", "#community-care");
  });

  it("does not display restricted personal identifiers", async () => {
    await renderAndCheckA11y(<MedicalHero />);

    expect(
      screen.queryByText(/@gmail\.com|@|http:\/\/|https:\/\//),
    ).not.toBeInTheDocument();
  });

  it("offers CV preview and download actions", async () => {
    await renderAndCheckA11y(<MedicalHero />);

    expect(
      screen.getByRole("link", { name: "Download curriculum vitae" }),
    ).toHaveAttribute("download", "nguyen-tuan-gia-linh-cv.pdf");
    fireEvent.click(screen.getByTestId("hero-preview-cv"));

    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByTestId("document-page-position"),
    ).toHaveTextContent("Page 1 of 2");
    expect(
      within(dialog).getByRole("img", {
        name: "Page 1 of Nguyễn Tuấn Gia Linh's curriculum vitae",
      }),
    ).toBeInTheDocument();
    fireEvent.click(within(dialog).getByTestId("document-preview-close"));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
});
