import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import MenuBar from "../../components/MenuBar";

test("MenuBar renders Apple icon and date", () => {
  render(<MenuBar />);

  const appleButton = screen.getByRole("button", { name: "Apple menu" });
  expect(appleButton).toBeInTheDocument();

  const dateDiv = screen.getByText(/\d{1,2} \w{3} \d{2}:\d{2}/);
  expect(dateDiv).toBeInTheDocument();
});

test("MenuBar opens Apple menu and logs selected option", () => {
  const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  render(<MenuBar />);

  const appleButton = screen.getByRole("button", { name: "Apple menu" });
  fireEvent.click(appleButton);

  const calculatorOption = screen.getByRole("menuitem", { name: "Calculator" });
  fireEvent.click(calculatorOption);

  expect(consoleSpy).toHaveBeenCalledWith("Calculator");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
