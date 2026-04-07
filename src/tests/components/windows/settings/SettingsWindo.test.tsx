import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SettingsWindow from "../../../../components/windows/settings/SettingsWindow";
import { settingsCategories } from "../../../../data/settingsCategories";
import i18n from "../../../../i18n";

describe("SettingsWindow", () => {
  const mockOnClose = vi.fn();
  const user = userEvent.setup();

  it("renders settings window correctly", () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const searchBar = screen.getByRole("textbox");
    const img = screen.getByRole("img", { name: "user" });
    const categories = screen.getAllByRole("img", { name: "item icon" });

    expect(searchBar).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(categories.length === settingsCategories.length);
  });

  it("puts focus on searchBar when clicked and types correct text", async () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const searchBar = screen.getByRole("textbox");

    await user.click(searchBar);
    await user.type(searchBar, "abc");

    expect(searchBar).toHaveFocus();
    expect(searchBar).toHaveValue("abc");
  });

  it("renders appearance panel and changes theme", async () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const appearanceTab = screen.getAllByRole("button")[0];

    await user.click(appearanceTab);

    const panelTitle = screen.getByText(/appearance/i, { selector: "h3" });
    expect(panelTitle).toBeInTheDocument();

    const themeGroup = screen.getByRole("radiogroup", {
      name: i18n.t("windows.settings.categories.appearance.appearance"),
    });
    const themeButtons = within(themeGroup).getAllByRole("radio");
    expect(themeButtons.length).toBe(3);

    await user.click(themeButtons[1]);

    expect(themeButtons[1]).toHaveAttribute("aria-checked", "true");

    expect(screen.getByLabelText(/sidebar icon size/i)).toBeInTheDocument();
  });
});
