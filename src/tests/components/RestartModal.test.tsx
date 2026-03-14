import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { ReactNode } from "react";
import RestartModal from "../../components/RestartModal";

const mockCloseAllWindows = vi.fn();
const mockCloseWindow = vi.fn();
const mockSetIsRestarting = vi.fn();
const mockLogout = vi.fn();

vi.mock("react-rnd", () => ({
  Rnd: ({ children }: { children: ReactNode }) => (
    <div data-testid="rnd">{children}</div>
  ),
}));

vi.mock("/icons/restart.svg", () => ({
  default: "restart.svg",
}));

vi.mock("../../stores/windowStore", () => ({
  useWindowActions: () => ({
    closeAllWindows: mockCloseAllWindows,
    closeWindow: mockCloseWindow,
  }),
}));

vi.mock("../../stores/powerStore", () => ({
  usePowerActions: () => ({
    setIsRestarting: mockSetIsRestarting,
  }),
}));

vi.mock("../../stores/loginStore", () => ({
  useLoginActions: () => ({
    logout: mockLogout,
  }),
}));

describe("RestartModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("closes the restart window on cancel", () => {
    render(<RestartModal />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockCloseWindow).toHaveBeenCalledWith("restart");
  });

  it("restarts immediately when clicking restart", () => {
    render(<RestartModal />);

    fireEvent.click(screen.getByRole("button", { name: "Restart" }));

    expect(mockCloseAllWindows).toHaveBeenCalledTimes(1);
    expect(mockLogout).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSetIsRestarting).toHaveBeenCalledWith(true);
  });

  it("auto-restarts after the countdown", () => {
    render(<RestartModal />);

    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(mockCloseAllWindows).toHaveBeenCalledTimes(1);
    expect(mockLogout).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSetIsRestarting).toHaveBeenCalledWith(true);
  });
});
