import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SituationSelector } from "@/components/sections/SituationSelector";
import { situations } from "@/content/situations";

describe("SituationSelector", () => {
  it("renders a tablist with one tab per situation", () => {
    render(<SituationSelector />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(situations.length);
  });

  it("selects the first situation by default and exposes it to assistive tech", () => {
    render(<SituationSelector />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    // Roving tabindex: only the selected tab is in the tab order.
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
  });

  it("changes the selected panel on click", async () => {
    const user = userEvent.setup();
    render(<SituationSelector />);
    const tabs = screen.getAllByRole("tab");
    await user.click(tabs[2]!);
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
  });

  it("supports arrow-key navigation between tabs", async () => {
    const user = userEvent.setup();
    render(<SituationSelector />);
    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();
    await user.keyboard("{ArrowDown}");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowUp}");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    // End/Home jump to the ends of the list.
    await user.keyboard("{End}");
    expect(tabs[tabs.length - 1]).toHaveAttribute("aria-selected", "true");
  });

  it("keeps every situation reachable as a mobile disclosure too", () => {
    render(<SituationSelector />);
    // Each situation appears once as a tab and once as a mobile disclosure
    // button, so its label resolves to two controls.
    for (const situation of situations) {
      expect(screen.getAllByText(situation.label).length).toBeGreaterThanOrEqual(2);
    }
  });
});
