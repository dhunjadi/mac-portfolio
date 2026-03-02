import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WindowWrapper from "../../components/WindowWrapper";

describe("WindowWrapper", () => {
  it("renders correctly", () => {
    const onClose = vi.fn();
    render(<WindowWrapper onClose={onClose}> </WindowWrapper>);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
