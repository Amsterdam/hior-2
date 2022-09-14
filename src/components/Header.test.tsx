import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/home",
  }),
}));

describe("Header", () => {
  it("renders correctly", () => {
    render(withTheme(<Header />));

    expect(screen.queryByTestId("header")).toBeInTheDocument();

    expect(screen.queryAllByText("Startpagina")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Zoek")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("FAQ")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Contact")[0]).toBeInTheDocument();

    // home should be active now
    expect(screen.queryAllByTestId("header-home-button")[1]).toHaveStyleRule("color", "#ec0000");
  });
});
