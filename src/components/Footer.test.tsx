import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Footer from "./Footer";


describe("Footer", () => {
  it("renders correctly", async () => {
    render(withTheme(<Footer />));

    expect(await screen.queryByTestId("footer")).toBeInTheDocument();
  });
});