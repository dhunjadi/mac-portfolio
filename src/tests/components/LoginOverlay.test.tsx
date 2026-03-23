import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginOverlay from "../../components/LoginOverlay";
import userEvent from "@testing-library/user-event";
import i18n from "../../i18n";

describe("LoginOverlay", () => {
  it("renders correctly", () => {
    render(<LoginOverlay />);

    const img = screen.getByRole("img", {
      name: i18n.t("login.userAvatarAlt"),
    });
    expect(img).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(
      i18n.t("login.passwordPlaceholder"),
    );
    expect(passwordInput).toBeInTheDocument();
  });

  it("input handles user interactions", async () => {
    const user = userEvent.setup();
    render(<LoginOverlay />);

    const passwordInput = screen.getByPlaceholderText(
      i18n.t("login.passwordPlaceholder"),
    );
    await user.type(passwordInput, "123");
    expect(passwordInput).toHaveValue("123");
  });
});
