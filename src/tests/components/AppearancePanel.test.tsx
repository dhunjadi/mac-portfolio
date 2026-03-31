import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppearancePanel from "../../components/AppearancePanel";
import { colorOptions } from "../../data/colorOptions";
import i18n from "../../i18n";

const mockSetGlassAlpha = vi.fn();
const mockSetBlur = vi.fn();
const mockSetThemePreference = vi.fn();
const mockSetAccentColor = vi.fn();
const mockSetHighlightColor = vi.fn();

vi.mock("../../stores/settingsStore", () => ({
  useGlassAlpha: () => 0.4,
  useBlur: () => 12,
  useAccentColor: () => "#AF52DE",
  useHighlightColor: () => "#FF9F0A",
  useThemePreference: () => "auto",
  useSettingsActions: () => ({
    setGlassAlpha: mockSetGlassAlpha,
    setBlur: mockSetBlur,
    setThemePreference: mockSetThemePreference,
    setAccentColor: mockSetAccentColor,
    setHighlightColor: mockSetHighlightColor,
  }),
}));

describe("AppearancePanel", () => {
  it("updates theme preference on selection", () => {
    render(<AppearancePanel />);

    const themeLabel = i18n.t(
      "windows.settings.categories.appearance.themeLabel",
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

    const firstColor = colorOptions[2].value;
    const accentLabel = i18n.t(
      "windows.settings.categories.appearance.accentColorLabel",
    );
    const accentGroup = screen.getByRole("radiogroup", {
      name: accentLabel,
    });
    const button = within(accentGroup).getByRole("radio", {
      name: `${accentLabel}: ${firstColor}`,
    });

    fireEvent.click(button);
    expect(mockSetAccentColor).toHaveBeenCalledWith(firstColor.toLowerCase());
  });

  it("updates highlight color on selection", () => {
    render(<AppearancePanel />);

    const firstColor = colorOptions[1].value;
    const highlightLabel = i18n.t(
      "windows.settings.categories.appearance.highlightColorLabel",
    );
    const highlightGroup = screen.getByRole("radiogroup", {
      name: highlightLabel,
    });
    const button = within(highlightGroup).getByRole("radio", {
      name: `${highlightLabel}: ${firstColor}`,
    });

    fireEvent.click(button);
    expect(mockSetHighlightColor).toHaveBeenCalledWith(
      firstColor.toLowerCase(),
    );
  });

  it("updates alpha and blur from sliders", () => {
    render(<AppearancePanel />);

    fireEvent.change(screen.getByLabelText(/Color fill/i), {
      target: { value: "0.7" },
    });
    fireEvent.change(screen.getByLabelText(/Blur/i), {
      target: { value: "42" },
    });

    expect(mockSetGlassAlpha).toHaveBeenCalledWith(0.7);
    expect(mockSetBlur).toHaveBeenCalledWith(42);
  });
});
