import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DockPanel from "../../../../../components/windows/settings/panels/DockPanel";

const mockSetDockPosition = vi.fn();
const mockSetDockIconMaxSize = vi.fn();
const mockSetDockIconScale = vi.fn();

vi.mock("../../stores/settingsStore", () => ({
  useDockPosition: () => "bottom",
  useDockIconMaxSize: () => 56,
  useDockIconScale: () => 1.5,
  useSettingsActions: () => ({
    setDockPosition: mockSetDockPosition,
    setDockIconMaxSize: mockSetDockIconMaxSize,
    setDockIconScale: mockSetDockIconScale,
  }),
}));

vi.mock("../../utils/dockSizing", () => ({
  getDockIconSizeLimits: () => ({ min: 32, max: 64 }),
  clampDockIconSize: (value: number) => value,
}));

describe("DockPanel", () => {
  it("updates dock position from dropdown", () => {
    render(<DockPanel />);

    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { value: "left" },
    });

    expect(mockSetDockPosition).toHaveBeenCalledWith("left");
  });

  it("updates icon scale from slider", () => {
    render(<DockPanel />);

    fireEvent.change(screen.getByLabelText(/icon scale/i), {
      target: { value: "1.7" },
    });

    expect(mockSetDockIconScale).toHaveBeenCalledWith(1.7);
  });
});
