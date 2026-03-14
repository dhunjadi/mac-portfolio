import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem } from "../../components/Accordion";

describe("Accordion", () => {
  it("toggles open state when clicking the trigger", async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        <AccordionItem title="Profile">
          <p>Details</p>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "Profile" });
    const item = trigger.closest(".c-accordion__item");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(item).not.toHaveClass("c-accordion__item--open");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(item).toHaveClass("c-accordion__item--open");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(item).not.toHaveClass("c-accordion__item--open");
  });
});
