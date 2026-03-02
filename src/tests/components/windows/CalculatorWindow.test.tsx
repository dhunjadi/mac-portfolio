import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CalculatorWindow from "../../../components/windows/CalculatorWindow";
import userEvent from "@testing-library/user-event";

describe("CalculatorWindow", () => {
  const onClose = vi.fn();
  const user = userEvent.setup();

  it("renders correctly", () => {
    render(<CalculatorWindow onClose={onClose} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(22);
  });

  it("adds 2 + 2", async () => {
    render(<CalculatorWindow onClose={onClose} />);

    const buttonTwo = screen.getByText("2");
    const buttonPlus = screen.getByText("+");
    const buttonEquals = screen.getByText("=");
    const result = screen.getByRole("result");

    expect(buttonTwo).toBeInTheDocument();
    expect(buttonPlus).toBeInTheDocument();
    expect(buttonEquals).toBeInTheDocument();
    expect(result).toBeInTheDocument();

    await user.click(buttonTwo);
    await user.click(buttonPlus);
    await user.click(buttonTwo);
    await user.click(buttonEquals);

    expect(result).toHaveTextContent("4");
  });

  it("resets (AC)", async () => {
    render(<CalculatorWindow onClose={onClose} />);

    const buttonTwo = screen.getByText("2");
    const buttonPlus = screen.getByText("+");
    const buttonClear = screen.getByText("AC");
    const result = screen.getByRole("result");

    await user.click(buttonTwo);
    await user.click(buttonPlus);
    await user.click(buttonTwo);
    await user.click(buttonClear);

    expect(result).toHaveTextContent("0");
  });
});
