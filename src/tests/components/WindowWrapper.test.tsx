import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import WindowWrapper from "../../components/WindowWrapper";

describe("WindowWrapper", () => {
  test("renders correctly", () => {
    const onClose = vi.fn();
    render(<WindowWrapper onClose={onClose}> </WindowWrapper>);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
