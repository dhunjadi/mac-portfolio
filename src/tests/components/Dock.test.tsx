import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Dock from "../../components/Dock";
import type { ReactNode } from "react";

const mockUseLogin = vi.fn();
const mockUseWindowActions = vi.fn();
const mockUseDockPosition = vi.fn();
const mockUseDockIconMaxSize = vi.fn();
const mockMotionSet = vi.fn();

vi.mock("../../stores/loginStore", () => ({
  useLogin: () => mockUseLogin(),
}));

vi.mock("../../stores/windowStore", () => ({
  useWindowActions: () => mockUseWindowActions(),
}));

vi.mock("../../stores/settingsStore", () => ({
  useDockPosition: () => mockUseDockPosition(),
  useDockIconMaxSize: () => mockUseDockIconMaxSize(),
}));

vi.mock("framer-motion", () => ({
  useMotionValue: () => ({
    set: mockMotionSet,
  }),
  useTransform: (value: unknown) => value,
  useSpring: (value: unknown) => value,
  motion: {
    div: ({ children, ...props }: { children: ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  Reorder: {
    Group: ({ children, ...props }: { children: ReactNode }) => {
      const { _, ...rest } = props as Record<string, unknown>;
      return <ul {...rest}>{children}</ul>;
    },
    Item: ({ children, ...props }: { children: ReactNode }) => {
      const { _, ...rest } = props as Record<string, unknown>;
      return <li {...rest}>{children}</li>;
    },
  },
}));

vi.mock("../../components/DockIcon", () => ({
  default: ({ id, onClick }: { id: string; onClick: () => void }) => (
    <button
      type="button"
      data-testid={`dock-icon-${id}`}
      onClick={id === "finder" ? undefined : onClick}
    >
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
    mockUseDockPosition.mockReturnValue("bottom");
    mockUseDockIconMaxSize.mockReturnValue(null);
  });

  it("renders all dock icons", () => {
    render(<Dock />);

    expect(screen.getByTestId("dock-icon-finder")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-launchpad")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-about")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-weather")).toBeInTheDocument();
    expect(screen.getByTestId("dock-icon-text-editor")).toBeInTheDocument();
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
    await user.click(screen.getByTestId("dock-icon-launchpad"));
    await user.click(screen.getByTestId("dock-icon-about"));
    await user.click(screen.getByTestId("dock-icon-weather"));
    await user.click(screen.getByTestId("dock-icon-text-editor"));

    expect(openWindow).toHaveBeenCalledTimes(3);
    expect(openWindow).toHaveBeenNthCalledWith(1, "about");
    expect(openWindow).toHaveBeenNthCalledWith(2, "weather");
    expect(openWindow).toHaveBeenNthCalledWith(3, "text-editor");
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

  it("uses vertical motion on left dock", () => {
    mockUseDockPosition.mockReturnValue("left");
    const { container } = render(<Dock />);
    const dock = container.querySelector(".c-dock");

    if (!dock) throw new Error("Dock root not found");

    fireEvent.mouseMove(dock, { clientY: 180 });
    expect(mockMotionSet).toHaveBeenCalledWith(180);
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
