import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { MemoryRouter } from "react-router";
import TurnOnScreen from "../../screens/TurnOnScreen";
import { AppProviders } from "../../providers/app-providers";

test("TurnOnScreen renders Apple icon and loader", () => {
  render(
    <MemoryRouter>
      <TurnOnScreen />
    </MemoryRouter>,
    { wrapper: AppProviders },
  );

  const appleIcon = screen.getByRole("img", { hidden: true });
  expect(appleIcon).toBeInTheDocument();

  const loader = screen.getByTestId("boot-loader");
  expect(loader).toBeInTheDocument();
});
