import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CalculatorWindow from "../../components/windows/CalculatorWindow";
import userEvent from "@testing-library/user-event";

describe("CalculatorWindow", () => {
  test("renders correctly", () => {
    const onClick = vi.fn();
    render(<CalculatorWindow onClose={onClick} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(22);
  });

  test("adds 2 + 2", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CalculatorWindow onClose={onClick} />);

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

  test("resets (AC)", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CalculatorWindow onClose={onClick} />);

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
