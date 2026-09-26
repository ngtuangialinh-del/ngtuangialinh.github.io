import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalJourney } from "./MedicalJourney";

describe("MedicalJourney", () => {
  it("connects school, strengths, service, and admission in order", async () => {
    await renderAndCheckA11y(<MedicalJourney />);

    const labels = screen
      .getAllByText(
        /Nguyễn Siêu School|Strength in Science and English|Sustained Service Activities|Medicine Program Admission/,
      )
      .map((node) => node.textContent);

    expect(labels[0]).toContain("Nguyễn Siêu School");
    expect(labels[labels.length - 1]).toContain("Medicine Program Admission");
    expect(
      screen.getByTestId("editorial-figure-medical-journey-pathway"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/AI-generated/i)).not.toBeInTheDocument();
  });

  it("does not imply admission alone constitutes medical qualification", async () => {
    await renderAndCheckA11y(<MedicalJourney />);

    expect(
      screen.getByText(
        /is the beginning of medical training, not a clinical qualification/,
      ),
    ).toBeInTheDocument();
  });
});
