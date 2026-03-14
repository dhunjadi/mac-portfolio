import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { ReactNode } from "react";
import DesktopPdfIcon from "../../components/DesktopPdfIcon";

const mockOnOpen = vi.fn();

vi.mock("react-rnd", () => ({
  Rnd: ({ children }: { children: ReactNode }) => (
    <div data-testid="rnd">{children}</div>
  ),
}));

vi.mock("/resume-preview.jpg", () => ({
  default: "resume-preview.jpg",
}));

describe("DesktopPdfIcon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 0, 1, 0, 0, 1, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("selects the icon on tap", () => {
    render(<DesktopPdfIcon onOpen={mockOnOpen} />);

    const button = screen.getByRole("button", { name: "Open PDF window" });

    fireEvent.pointerDown(button, { clientX: 10, clientY: 10 });
    fireEvent.pointerUp(button, { clientX: 10, clientY: 10 });

    expect(button).toHaveClass("isSelected");
    expect(mockOnOpen).not.toHaveBeenCalled();
  });

  it("opens the PDF on double tap", () => {
    render(<DesktopPdfIcon onOpen={mockOnOpen} />);

    const button = screen.getByRole("button", { name: "Open PDF window" });

    fireEvent.pointerDown(button, { clientX: 10, clientY: 10 });
    fireEvent.pointerUp(button, { clientX: 10, clientY: 10 });

    vi.advanceTimersByTime(200);

    fireEvent.pointerDown(button, { clientX: 10, clientY: 10 });
    fireEvent.pointerUp(button, { clientX: 10, clientY: 10 });

    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });
});
