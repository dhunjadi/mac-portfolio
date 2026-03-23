import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import ShutDownOverlay from "../../components/ShutDownOverlay";
import { appRoutes } from "../../data/appRoutes";
import i18n from "../../i18n";

const mockNavigate = vi.fn();
const mockSetIsSleeping = vi.fn();
const mockUseShutDown = vi.fn();
const mockUseRestart = vi.fn();
const mockUseSleep = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../stores/powerStore", () => ({
  useShutDown: () => mockUseShutDown(),
  useRestart: () => mockUseRestart(),
  useSleep: () => mockUseSleep(),
  usePowerActions: () => ({
    setIsSleeping: mockSetIsSleeping,
  }),
}));

describe("ShutDownOverlay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseShutDown.mockReturnValue(false);
    mockUseRestart.mockReturnValue(false);
    mockUseSleep.mockReturnValue(false);
  });

  it("hides when no power state is active", () => {
    const { container } = render(<ShutDownOverlay />);
    const overlay = container.querySelector(".c-shutDownOverlay");

    expect(overlay).toHaveClass("hidden");
  });

  it("navigates to turn off after shutdown", () => {
    vi.useFakeTimers();
    mockUseShutDown.mockReturnValue(true);

    render(<ShutDownOverlay />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(mockNavigate).toHaveBeenCalledWith(appRoutes.turnOff);

    vi.useRealTimers();
  });

  it("wakes up from sleep on double click", () => {
    mockUseSleep.mockReturnValue(true);
    render(<ShutDownOverlay />);

    expect(
      screen.getByText(i18n.t("shutdownOverlay.wakeUp")),
    ).toBeInTheDocument();

    fireEvent.dblClick(document);

    expect(mockSetIsSleeping).toHaveBeenCalledWith(false);
  });

  it("wakes up from sleep on double tap", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 0, 0, 0, 0));
    mockUseSleep.mockReturnValue(true);

    render(<ShutDownOverlay />);

    document.dispatchEvent(new Event("touchend"));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    document.dispatchEvent(new Event("touchend"));

    expect(mockSetIsSleeping).toHaveBeenCalledWith(false);

    vi.useRealTimers();
  });
});
