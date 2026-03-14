import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppearancePanel from "../../components/AppearancePanel";
import { colorOptions } from "../../data/colorOptions";

const mockSetGlassAlpha = vi.fn();
const mockSetBlur = vi.fn();
const mockSetGlassColor = vi.fn();

vi.mock("../../stores/settingsStore", () => ({
  useGlassAlpha: () => 0.4,
  useBlur: () => 12,
  useGlassColor: () => "#0A84FF",
  useSettingsActions: () => ({
    setGlassAlpha: mockSetGlassAlpha,
    setBlur: mockSetBlur,
    setGlassColor: mockSetGlassColor,
  }),
}));

describe("AppearancePanel", () => {
  it("renders color options and updates color on selection", () => {
    render(<AppearancePanel />);

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(colorOptions.length);

    const firstColor = colorOptions[0];
    const button = screen.getByRole("radio", {
      name: `Set glass color to ${firstColor}`,
    });

    fireEvent.click(button);
    expect(mockSetGlassColor).toHaveBeenCalledWith(firstColor.toLowerCase());
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
