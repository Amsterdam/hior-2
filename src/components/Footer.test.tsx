import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Footer from "./Footer";
import { vi } from 'vitest'

vi.mock("./UpdatedDate", () => ({ default: () => 'UpdatedDate' }));

describe("Footer", () => {
  it("renders correctly", () => {
    render(withTheme(<Footer />));

    expect(screen.queryByTestId("footer")).toBeInTheDocument();
  });
});