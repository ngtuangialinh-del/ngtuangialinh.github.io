import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalAcademics } from "./MedicalAcademics";

describe("MedicalAcademics", () => {
  it("renders GPA, A Level, IGCSE, IELTS, Grade 12, and admission summaries", async () => {
    await renderAndCheckA11y(<MedicalAcademics />);

    const igcseGroup = within(
      screen.getByTestId("score-group-Cambridge IGCSE — June 2024"),
    );
    const ieltsGroup = within(screen.getByTestId("score-group-IELTS Academic"));
    const gpaGroup = within(
      screen.getByTestId("score-group-Upper-secondary GPA"),
    );
    const aLevelGroup = within(
      screen.getByTestId("score-group-A Level Results — CV-listed"),
    );

    expect(igcseGroup.getByTestId("score-Mathematics")).toHaveTextContent("A*");
    expect(igcseGroup.getByTestId("score-Mathematics")).toHaveTextContent(
      "92%",
    );
    expect(ieltsGroup.getByTestId("score-Overall")).toHaveTextContent("7.0");
    expect(ieltsGroup.getByTestId("score-Overall")).not.toHaveTextContent(
      "7.5",
    );
    expect(ieltsGroup.getByTestId("score-Overall")).toHaveTextContent(
      "CEFR C1",
    );
    expect(gpaGroup.getByTestId("score-Grade 12")).toHaveTextContent("9.4");
    expect(aLevelGroup.getByTestId("score-Biology")).toHaveTextContent("A");
    expect(
      screen.getByTestId("score-Medicine program admission score"),
    ).toHaveTextContent("27.20");
    expect(
      screen.getByTestId("score-Medicine program admission score"),
    ).toHaveTextContent(/admission notice/i);
    expect(
      screen.getByTestId("score-Medicine program admission score"),
    ).not.toHaveTextContent("27.20%");
    expect(
      screen.getByTestId("editorial-figure-academics-study-collage"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("score-group-Grade 12 Results")).queryByText(
        /\(Annual average/i,
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/AI-generated/i)).not.toBeInTheDocument();

    const headers = screen.getAllByTestId(/^score-group-header-/);
    expect(headers).toHaveLength(5);
    for (const header of headers) {
      expect(header).toHaveStyle({ minHeight: "7rem" });
    }
  });

  it("states excellent-student recognition across Grades 10-12", async () => {
    await renderAndCheckA11y(<MedicalAcademics />);

    expect(
      screen.getByText(/Excellent Student in Grade 10/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Excellent Student in Grade 11/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Excellent Student in Grade 12/),
    ).toBeInTheDocument();
  });
});
