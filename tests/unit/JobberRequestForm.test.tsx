import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { JobberRequestForm } from "@/components/JobberRequestForm";

// NEXT_PUBLIC_JOBBER_EMBED_URL is unset in the test environment, so this
// exercises the unconfigured path.
describe("JobberRequestForm (embed not configured)", () => {
  it("does not render an iframe that looks like a working form", () => {
    render(<JobberRequestForm />);
    expect(screen.queryByTitle(/request a property walkthrough/i)).not.toBeInTheDocument();
  });

  it("says plainly that the online form is being connected", () => {
    render(<JobberRequestForm />);
    expect(screen.getByText(/online form being connected/i)).toBeInTheDocument();
  });

  it("offers working call and text alternatives", () => {
    render(<JobberRequestForm />);
    expect(screen.getByRole("link", { name: /^Call \(248\) 321-9609/ })).toHaveAttribute(
      "href",
      "tel:+12483219609",
    );
    expect(screen.getByRole("link", { name: /^Text \(248\) 321-9609/ })).toHaveAttribute(
      "href",
      "sms:+12483219609",
    );
  });
});
