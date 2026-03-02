import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import TurnOnScreen from "../../screens/TurnOnScreen";

describe("TurnOnScreen", () => {
  it("renders Apple icon and loader", () => {
    render(
      <MemoryRouter>
        <TurnOnScreen />
      </MemoryRouter>,
    );

    const appleIcon = screen.getByRole("img", { hidden: true });
    expect(appleIcon).toBeInTheDocument();

    const loader = screen.getByTestId("boot-loader");
    expect(loader).toBeInTheDocument();
  });
});
