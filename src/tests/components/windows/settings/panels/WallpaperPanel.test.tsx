import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WallpaperPanel from "../../../../../components/windows/settings/panels/WallpaperPanel";

const mockSetWallpaper = vi.fn();

vi.mock("../../stores/settingsStore", () => ({
  useWallpaper: () => "/wall-1.jpg",
  useWallpaperPreviews: () => ["/previews/wall-1.jpg", "/previews/wall-2.jpg"],
  useSettingsActions: () => ({
    setWallpaper: mockSetWallpaper,
  }),
}));

describe("WallpaperPanel", () => {
  it("marks the active wallpaper and updates on click", () => {
    const { container } = render(<WallpaperPanel />);

    const buttons = Array.from(
      container.querySelectorAll(".c-wallpaperPanel__grid button"),
    );

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveClass("active");

    (buttons[1] as HTMLButtonElement).click();
    expect(mockSetWallpaper).toHaveBeenCalledWith("/wall-2.jpg");
  });
});
