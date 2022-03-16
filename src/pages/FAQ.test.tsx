import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("renders correctly", () => {
    render(withTheme(<FAQ />));

    expect(screen.queryByTestId("faq")).toBeInTheDocument();
    expect(screen.queryByText("Veelgestelde vragen")).toBeInTheDocument();
  });
});
