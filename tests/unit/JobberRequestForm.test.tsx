import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { JobberRequestForm } from "@/components/JobberRequestForm";

describe("JobberRequestForm", () => {
  it("shows an honest fallback and a real phone number when unconfigured", () => {
    render(<JobberRequestForm />);
    expect(screen.getByText(/isn't configured yet/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "(248) 321-9609" })).toHaveAttribute(
      "href",
      "tel:+12483219609",
    );
    expect(screen.queryByTitle(/Request a Property Walkthrough/i)).not.toBeInTheDocument();
  });
});
