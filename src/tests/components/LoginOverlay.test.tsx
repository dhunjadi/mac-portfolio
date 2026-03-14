import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginOverlay from "../../components/LoginOverlay";
import userEvent from "@testing-library/user-event";

describe("LoginOverlay", () => {
  it("renders correctly", () => {
    render(<LoginOverlay />);

    const img = screen.getByRole("img", { name: "avatar" });
    expect(img).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Enter anything...");
    expect(passwordInput).toBeInTheDocument();
  });

  it("input handles user interactions", async () => {
    const user = userEvent.setup();
    render(<LoginOverlay />);

    const passwordInput = screen.getByPlaceholderText("Enter anything...");
    await user.type(passwordInput, "123");
    expect(passwordInput).toHaveValue("123");
  });
});
