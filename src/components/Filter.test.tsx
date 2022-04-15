import { render, screen } from "@testing-library/react";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
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

    const { container } = render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState }}>
            <Filter groups={groups} />
          </FilterContext.Provider>
        </>,
      ),
    );

    expect(screen.queryByTestId("filter")).toBeInTheDocument();
    expect(screen.queryByTestId("reset")).toBeInTheDocument();
    
    // all selects
    expect(container.querySelectorAll("select").length).toBe(5);
    // query input
    expect(container.querySelectorAll("input").length).toBe(1);
    // reset button
    expect(container.querySelectorAll("button").length).toBe(1);

    screen.debug();
  });
});
