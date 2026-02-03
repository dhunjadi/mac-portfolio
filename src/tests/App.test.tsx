import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test("App renders", () => {
  render(<App />);

  const header = screen.getByText("App");
  expect(header).toBeInTheDocument();
});
