import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Dock from "../../components/Dock";

const mockUseLogin = vi.fn();
const mockUseWindowActions = vi.fn();
const mockMotionSet = vi.fn();

vi.mock("../../stores/loginStore", () => ({
  useLogin: () => mockUseLogin(),
}));

vi.mock("../../stores/windowStore", () => ({
  useWindowActions: () => mockUseWindowActions(),
}));

vi.mock("framer-motion", () => ({
  useMotionValue: () => ({
    set: mockMotionSet,
  }),
}));

vi.mock("../../components/DockIcon", () => ({
  default: ({ id, onClick }: { id: string; onClick: () => void }) => (
    <button type="button" data-testid={`dock-icon-${id}`} onClick={onClick}>
      {id}
    </button>
  ),
}));

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
};

describe("Dock", () => {
  const openWindow = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    setViewportWidth(1280);
    mockUseLogin.mockReturnValue(true);
    mockUseWindowActions.mockReturnValue({ openWindow });
  });

  it("renders all dock icons", () => {
    render(<Dock />);

    expect(screen.getByTestId("dock-icon-finder")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-about")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-calculator")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-settings")).toBeInTheDocument();
  });

  it("hides dock when user is not logged in", () => {
    mockUseLogin.mockReturnValue(false);

    const { container } = render(<Dock />);
    const dock = container.querySelector(".c-dock");

    expect(dock).toHaveClass("hidden");
  });

  it("opens windows for clickable dock icons", async () => {
    const user = userEvent.setup();
    render(<Dock />);

    await user.click(screen.getByTestId("dock-icon-finder"));
    await user.click(screen.getByTestId("dock-icon-about"));
    await user.click(screen.getByTestId("dock-icon-calculator"));
    await user.click(screen.getByTestId("dock-icon-settings"));

    expect(openWindow).toHaveBeenCalledTimes(3);
    expect(openWindow).toHaveBeenNthCalledWith(1, "about");
    expect(openWindow).toHaveBeenNthCalledWith(2, "calculator");
    expect(openWindow).toHaveBeenNthCalledWith(3, "settings");
  });

  it("updates motion value on mouse move on desktop", () => {
    const { container } = render(<Dock />);
    const dock = container.querySelector(".c-dock");

    if (!dock) throw new Error("Dock root not found");

    fireEvent.mouseMove(dock, { clientX: 250 });
    expect(mockMotionSet).toHaveBeenCalledWith(250);

    fireEvent.mouseLeave(dock);
    expect(mockMotionSet).toHaveBeenCalledWith(Number.NEGATIVE_INFINITY);
  });

  it("does not update motion value on mouse move on mobile", () => {
    setViewportWidth(600);
    const { container } = render(<Dock />);
    const dock = container.querySelector(".c-dock");

    if (!dock) throw new Error("Dock root not found");

    fireEvent.mouseMove(dock, { clientX: 400 });
    expect(mockMotionSet).not.toHaveBeenCalled();
  });
});
