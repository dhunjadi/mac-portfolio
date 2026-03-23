import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SettingsWindow from "../../../components/windows/SettingsWindow";
import { settingsCategories } from "../../../data/settingsCategories";
import { colorOptions } from "../../../data/colorOptions";
import i18n from "../../../i18n";

describe("SettingsWindow", () => {
  const mockOnClose = vi.fn();
  const user = userEvent.setup();

  it("renders settings window correctly", () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const searchBar = screen.getByRole("textbox");
    const img = screen.getByRole("img", { name: "user" });
    const categories = screen.getAllByRole("img", { name: "item icon" });

    expect(searchBar).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(categories.length === settingsCategories.length);
  });

  it("puts focus on searchBar when clicked and types correct text", async () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const searchBar = screen.getByRole("textbox");

    await user.click(searchBar);
    await user.type(searchBar, "abc");

    expect(searchBar).toHaveFocus();
    expect(searchBar).toHaveValue("abc");
  });

  it("renders appearance panel and changes color, fill and blur", async () => {
    render(<SettingsWindow onClose={mockOnClose} />);

    const appearanceTab = screen.getAllByRole("button")[0];

    await user.click(appearanceTab);

    const panelTitle = screen.getByText(/appearance/i, { selector: "h2" });
    expect(panelTitle).toBeInTheDocument();

    const glassGroup = screen.getByRole("radiogroup", {
      name: i18n.t("windows.settings.categories.appearance.glassColorLabel"),
    });
    const colorButtons = within(glassGroup).getAllByRole("radio");
    expect(colorButtons.length === colorOptions.length);

    await user.click(colorButtons[1]);

    expect(colorButtons[1]).toHaveAttribute("aria-checked", "true");

    const colorFillSlider = screen.getByLabelText(
      /color fill:/i,
    ) as HTMLInputElement;
    expect(colorFillSlider.value).toBe("0.25");
    expect(screen.getByText("Color fill: 25%")).toBeInTheDocument();

    fireEvent.change(colorFillSlider, { target: { value: "0.50" } });

    expect(colorFillSlider.value).toBe("0.5");
    expect(screen.getByText("Color fill: 50%")).toBeInTheDocument();

    const blurSlider = screen.getByLabelText(/blur:/i) as HTMLInputElement;
    expect(blurSlider.value).toBe("16");
    expect(screen.getByText("Blur: 16")).toBeInTheDocument();

    fireEvent.change(blurSlider, { target: { value: "70" } });

    expect(blurSlider.value).toBe("70");
    expect(screen.getByText("Blur: 70")).toBeInTheDocument();
  });
});
