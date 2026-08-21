import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

const faqs = [
  { question: "Question one?", answer: "Answer one." },
  { question: "Question two?", answer: "Answer two." },
];

describe("FAQAccordion", () => {
  it("renders the first item expanded and others collapsed", () => {
    render(<FAQAccordion faqs={faqs} />);
    expect(screen.getByText("Question one?")).toBeInTheDocument();
    const firstButton = screen.getByRole("button", { name: /Question one/ });
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    const secondButton = screen.getByRole("button", { name: /Question two/ });
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles a panel via keyboard-accessible button", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion faqs={faqs} />);
    const secondButton = screen.getByRole("button", { name: /Question two/ });
    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Answer two.")).toBeVisible();
  });
});
