import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Footer from "./Footer";

jest.mock("./UpdatedDate", () => () => 'UpdatedDate');

describe("Footer", () => {
  it("renders correctly", () => {
    render(withTheme(<Footer />));

    expect(screen.queryByTestId("footer")).toBeInTheDocument();
  });
});