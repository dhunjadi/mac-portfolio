import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutThisDevWindow from "../../../components/windows/AboutThisDevWindow";
import userEvent from "@testing-library/user-event";

describe("AboutThisDevWindow", () => {
  const mockOnClose = vi.fn();
  const user = userEvent.setup();

  it("renders the developer's job and location", () => {
    render(<AboutThisDevWindow onClose={mockOnClose} />);

    const job = screen.getByText("Software Engineer");
    const location = screen.getByText("Zagreb, Croatia");
    expect(job).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  it("renders the correct number of experience items", () => {
    render(<AboutThisDevWindow onClose={mockOnClose} />);

    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThan(0);
  });

  it("toggles the Skill accordion when clicked", async () => {
    render(<AboutThisDevWindow onClose={mockOnClose} />);

    const skillsTrigger = screen.getByRole("button", { name: /skills/i });
    expect(skillsTrigger).toHaveAttribute("aria-expanded", "false");

    await user.click(skillsTrigger);

    expect(screen.getByText(/zustand/i, { selector: "p" })).toBeInTheDocument();
    expect(skillsTrigger).toHaveAttribute("aria-expanded", "true");
  });
});
