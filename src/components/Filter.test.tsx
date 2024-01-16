import { render, screen } from "@testing-library/react";
import FilterContextProvider from "../filter/FilterContext";
import { mockAttributes } from "../test/mock-data/List.fixtures";
import { withTheme } from "../test/utils";
import Filter from "./Filter";

jest.mock("../hooks/useFetchAttributes", () => ({
  useFetchAttributes: () => ({ data: mockAttributes, isLoading: false }),
}));

describe("Filter", () => {
  it("renders correctly", () => {
    const { container } = render(
      withTheme(
        <>
          <FilterContextProvider>
            <Filter />
          </FilterContextProvider>
        </>,
      ),
    );

    expect(screen.queryByTestId("filter")).toBeInTheDocument();
    expect(screen.queryByTestId("reset")).toBeInTheDocument();

    // all selects
    expect(container.querySelectorAll("input[type=hidden]").length).toBe(5);
    // query input = 1 + 5 selects
    expect(container.querySelectorAll("input[type=text]").length).toBe(6);
    // reset button
    expect(container.querySelectorAll("button").length).toBe(1);
  });
});
