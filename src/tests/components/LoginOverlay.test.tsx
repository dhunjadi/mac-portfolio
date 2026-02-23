import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LoginOverlay from "../../components/LoginOverlay";
import userEvent from "@testing-library/user-event";

describe("LoginOverlay", () => {
  test("renders correctly", () => {
    render(<LoginOverlay />);

    const img = screen.getByRole("img", { name: "user icon" });
    expect(img).toBeInTheDocument();

    const passwordInput = screen.getByRole("textbox");
    expect(passwordInput).toBeInTheDocument();
  });

  test("input handles user interactions", async () => {
    const user = userEvent.setup();
    render(<LoginOverlay />);

    const passwordInput = screen.getByRole("textbox");
    await user.type(passwordInput, "123");
    expect(passwordInput).toHaveValue("123");
  });
});
