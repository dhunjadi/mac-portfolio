import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MenuBar from "../../components/MenuBar";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";

describe("MenuBar", () => {
  it("renders Apple icon and date", () => {
    render(<MenuBar />);

    const appleButton = screen.getByRole("button", {
      name: i18n.t("menuBar.appleMenuLabel"),
    });
    expect(appleButton).toBeInTheDocument();

    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
    expect(screen.getByText(/\w{3} \d{1,2} \w{3}/)).toBeInTheDocument();
  });

  it("opens Apple menu loses focus after selecting an option", async () => {
    const user = userEvent.setup();
    render(<MenuBar />);

    const appleButton = screen.getByRole("button", {
      name: i18n.t("menuBar.appleMenuLabel"),
    });
    await user.click(appleButton);

    const calculatorOption = screen.getByRole("menuitem", {
      name: /calculator/i,
    });
    await user.click(calculatorOption);
    expect(appleButton).not.toHaveFocus();
  });
});
