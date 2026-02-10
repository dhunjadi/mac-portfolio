import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MenuBar from "../../components/MenuBar";

test("MenuBar renders Apple icon and date", () => {
  render(<MenuBar />);

  const appleIcon = screen.getByRole("img", { hidden: true });
  expect(appleIcon).toBeInTheDocument();

  const dateDiv = screen.getByText(/\d{1,2} \w{3} \d{2}:\d{2}/);
  expect(dateDiv).toBeInTheDocument();
});
