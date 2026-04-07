import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppearancePanel from "../../../../../components/windows/settings/panels/AppearancePanel";
import { colorOptions } from "../../../../../data/colorOptions";
import i18n from "../../../../../i18n";

const mockSetThemePreference = vi.fn();
const mockSetAccentColor = vi.fn();
const mockSetHighlightColor = vi.fn();
const mockSetSidebarIconSize = vi.fn();

vi.mock("../../../../../stores/settingsStore", () => ({
  useAccentColor: () => "#AF52DE",
  useHighlightColor: () => "#FF9F0A",
  useThemePreference: () => "auto",
  useSidebarIconSize: () => "medium",
  useSettingsActions: () => ({
    setThemePreference: mockSetThemePreference,
    setAccentColor: mockSetAccentColor,
    setHighlightColor: mockSetHighlightColor,
    setSidebarIconSize: mockSetSidebarIconSize,
  }),
}));

describe("AppearancePanel", () => {
  it("updates theme preference on selection", () => {
    render(<AppearancePanel />);

    const themeLabel = i18n.t(
      "windows.settings.categories.appearance.appearance",
    );
    const themeGroup = screen.getByRole("radiogroup", {
      name: themeLabel,
    });
    const button = within(themeGroup).getByRole("radio", {
      name: i18n.t("windows.settings.categories.appearance.themeDarkLabel"),
    });

    fireEvent.click(button);
    expect(mockSetThemePreference).toHaveBeenCalledWith("dark");
  });

  it("updates accent color on selection", () => {
    render(<AppearancePanel />);

    const firstColor = colorOptions[2];
    const groups = screen.getAllByRole("radiogroup");
    const accentGroup = groups[1];
    const button = within(accentGroup)
      .getAllByRole("radio")
      .find((node) => node.getAttribute("data-color") === firstColor.label);

    if (!button) {
      throw new Error("Accent color button not found");
    }

    fireEvent.click(button);
    expect(mockSetAccentColor).toHaveBeenCalledWith(
      firstColor.value.toLowerCase(),
    );
  });

  it("updates highlight color on selection", () => {
    render(<AppearancePanel />);

    const firstColor = colorOptions[1];
    const groups = screen.getAllByRole("radiogroup");
    const highlightGroup = groups[2];
    const button = within(highlightGroup)
      .getAllByRole("radio")
      .find((node) => node.getAttribute("data-color") === firstColor.label);

    if (!button) {
      throw new Error("Highlight color button not found");
    }

    fireEvent.click(button);
    expect(mockSetHighlightColor).toHaveBeenCalledWith(
      firstColor.value.toLowerCase(),
    );
  });

  it("updates sidebar icon size from dropdown", () => {
    render(<AppearancePanel />);

    fireEvent.change(screen.getByLabelText(/sidebar icon size/i), {
      target: { value: "large" },
    });

    expect(mockSetSidebarIconSize).toHaveBeenCalledWith("large");
  });
});
