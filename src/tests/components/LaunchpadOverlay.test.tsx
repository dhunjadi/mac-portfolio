import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import LaunchpadOverlay from "../../components/LaunchpadOverlay";
import type { WindowId } from "../../types";

type MockApp = { id: WindowId; label: string; icon: string };

const mockUseLaunchpadOpen = vi.fn();
const mockUseLaunchpadActions = vi.fn();
const mockUseWindowActions = vi.fn();
const mockUseKeyPress = vi.fn();

const mockApps: MockApp[] = [
  { id: "finder", label: "Finder", icon: "/finder.png" },
  { id: "calculator", label: "Calculator", icon: "/calculator.png" },
];

vi.mock("../../stores/launchpadStore", () => ({
  useLaunchpadOpen: () => mockUseLaunchpadOpen(),
  useLaunchpadActions: () => mockUseLaunchpadActions(),
}));

vi.mock("../../stores/windowStore", () => ({
  useWindowActions: () => mockUseWindowActions(),
}));

vi.mock("../../data/windowData", () => ({
  getLaunchpadApps: () => mockApps,
}));

vi.mock("../../hooks/useKeyPress", () => ({
  useKeyPress: () => mockUseKeyPress(),
}));

describe("LaunchpadOverlay", () => {
  const closeLaunchpad = vi.fn();
  const openWindow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLaunchpadOpen.mockReturnValue(true);
    mockUseLaunchpadActions.mockReturnValue({ closeLaunchpad });
    mockUseWindowActions.mockReturnValue({ openWindow });
    mockUseKeyPress.mockReturnValue(false);
  });

  it("renders launchpad apps when open", () => {
    render(<LaunchpadOverlay />);

    expect(screen.getByRole("button", { name: "Finder" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Calculator" }),
    ).toBeInTheDocument();
  });

  it("hides the overlay when closed", () => {
    mockUseLaunchpadOpen.mockReturnValue(false);

    const { container } = render(<LaunchpadOverlay />);
    const root = container.querySelector(".c-launchpad");

    expect(root).toHaveClass("hidden");
  });

  it("opens a window and closes launchpad when an app is clicked", async () => {
    const user = userEvent.setup();
    render(<LaunchpadOverlay />);

    await user.click(screen.getByRole("button", { name: "Calculator" }));

    expect(openWindow).toHaveBeenCalledWith("calculator");
    expect(closeLaunchpad).toHaveBeenCalledTimes(1);
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<LaunchpadOverlay />);

    await user.click(screen.getByRole("button", { name: /close launchpad/i }));

    expect(closeLaunchpad).toHaveBeenCalledTimes(1);
  });

  it("closes when escape is pressed", () => {
    mockUseKeyPress.mockReturnValue(true);

    render(<LaunchpadOverlay />);

    expect(closeLaunchpad).toHaveBeenCalledTimes(1);
  });
});
