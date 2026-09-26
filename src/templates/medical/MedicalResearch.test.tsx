import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalResearch } from "./MedicalResearch";

describe("MedicalResearch", () => {
  it("presents methods, reported measurements, and an explicit in-vitro limitation", async () => {
    await renderAndCheckA11y(<MedicalResearch />);

    expect(
      screen.getByRole("heading", { name: "Research" }),
    ).toBeInTheDocument();
    expect(screen.getByText("325 nm")).toBeInTheDocument();
    expect(screen.getByText("119.85 µg/mL")).toBeInTheDocument();
    expect(
      screen.getByText(/do not establish clinical efficacy/i),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("editorial-figure-research-nanoformulation-collage"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/AI-generated/i)).not.toBeInTheDocument();
  });
});
