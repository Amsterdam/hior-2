import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders correctly", () => {
    const { container } = render(withTheme(<Loader />));

    expect(screen.queryByTestId("loader")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
