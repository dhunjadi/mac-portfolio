import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MenuBar from "../../components/MenuBar";
import userEvent from "@testing-library/user-event";

describe("MenuBar", () => {
  it("renders Apple icon and date", () => {
    render(<MenuBar />);

    const appleButton = screen.getByRole("button", { name: "Apple menu" });
    expect(appleButton).toBeInTheDocument();

    const dateDiv = screen.getByText(/\d{1,2} \w{3} \d{2}:\d{2}/);
    expect(dateDiv).toBeInTheDocument();
  });

  it("opens Apple menu loses focus after selecting an option", async () => {
    const user = userEvent.setup();
    render(<MenuBar />);

    const appleButton = screen.getByRole("button", { name: "Apple menu" });
    await user.click(appleButton);

    const calculatorOption = screen.getByRole("menuitem", {
      name: /calculator/i,
    });
    await user.click(calculatorOption);
    expect(appleButton).not.toHaveFocus();
  });
});
