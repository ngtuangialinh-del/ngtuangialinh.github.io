import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderAndCheckA11y } from "../../test/a11y-helpers";
import { MedicalContact } from "./MedicalContact";

describe("MedicalContact", () => {
  it("renders the themed client-only email-draft form", async () => {
    await renderAndCheckA11y(<MedicalContact />);

    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Reply-to email")).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "maxlength",
      "5000",
    );
    expect(
      screen.getByText(/nothing is submitted to or stored/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("contact-character-count")).toHaveTextContent(
      "0 / 5000",
    );
  });

  it("updates the counter and prepares a recipient-free email draft", async () => {
    await renderAndCheckA11y(<MedicalContact />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Gia Linh" },
    });
    fireEvent.change(screen.getByLabelText("Reply-to email"), {
      target: { value: "visitor@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    expect(screen.getByTestId("contact-character-count")).toHaveTextContent(
      "5 / 5000",
    );
    const draftLink = screen.getByTestId("contact-open-draft");
    expect(draftLink).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:\?/),
    );
    expect(draftLink.getAttribute("href")).toContain("Name%3A%20Gia%20Linh");
    expect(draftLink.getAttribute("href")).toContain("visitor%40example.com");
    expect(draftLink.getAttribute("href")).toContain("Hello");
    expect(draftLink.getAttribute("href")).not.toMatch(/^mailto:[^?]+@/);
  });
});
