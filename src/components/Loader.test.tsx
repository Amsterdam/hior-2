import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Loader from "./Loader";

describe("Header", () => {
  it("renders correctly", () => {
    render(withTheme(<Loader />));

    expect(screen.queryByTestId("loader")).toBeInTheDocument();
  });
});
