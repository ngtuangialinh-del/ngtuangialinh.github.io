import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "./test/render";
import App from "./App";

describe("App (single medical presentation)", () => {
  it("renders only the medical shell with no style selector or template labels", () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId("medical-shell")).toBeInTheDocument();
    expect(screen.queryByText(/Engineering/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Business/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /template/i }),
    ).not.toBeInTheDocument();
  });

  it("does not render any inherited data-engineering identity content", () => {
    renderWithProviders(<App />);

    expect(screen.queryByText(/Nham Quoc Hung/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Torilab/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Engineer/)).not.toBeInTheDocument();
  });
});
