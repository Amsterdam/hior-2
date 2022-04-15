import { render, screen } from "@testing-library/react";
import { withTheme } from "../test/utils";
import Filter from "./Filter";

describe("Filter", () => {
  it("renders correctly", () => {
    const groups = {
      source: [],
      level: [],
      theme: [],
      type: [],
      area: [],
      query: "",
    };

    render(withTheme(<Filter groups={groups} />));

    expect(screen.queryByTestId("filter")).toBeInTheDocument();
  });
});
