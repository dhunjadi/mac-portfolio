import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ShutDownModal from "../../components/ShutDownModal";

describe("ShutDownModal", () => {
  test("renders correctly", () => {
    render(<ShutDownModal />);

    const img = screen.getByRole("img", { name: "power on/off icon" });
    expect(img).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
