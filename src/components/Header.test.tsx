import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/home"
  })
}));

describe("Header", () => {
  it("renders correctly", () => {
    render(withTheme(<Header />));

    expect(screen.queryByTestId("header")).toBeInTheDocument();

    expect(screen.queryByText("Startpagina")).toBeInTheDocument();
    expect(screen.queryByText("Zoek")).toBeInTheDocument();
    expect(screen.queryByText("FAQ")).toBeInTheDocument();
    expect(screen.queryByText("Contact")).toBeInTheDocument();

    // home should be active now
    expect(screen.queryByTestId("header-home-button")).toHaveStyleRule('color', "#ec0000");
  });
});
