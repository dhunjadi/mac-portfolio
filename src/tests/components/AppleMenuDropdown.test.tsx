import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AppleMenuDropdown from "../../components/AppleMenuDropdown";
import i18n from "../../i18n";

describe("AppleMenuDropdown", () => {
  it("renders menu items and separators", () => {
    const onSelect = vi.fn();
    render(<AppleMenuDropdown onSelect={onSelect} />);

    expect(screen.getAllByRole("menuitem")).toHaveLength(8);
    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });

  it("calls onSelect with the chosen item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<AppleMenuDropdown onSelect={onSelect} />);

    await user.click(
      screen.getByRole("menuitem", { name: i18n.t("appleMenu.items.restart") }),
    );
    expect(onSelect).toHaveBeenCalledWith("restart");
  });
});
