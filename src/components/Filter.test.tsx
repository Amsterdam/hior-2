import { fireEvent, render, screen } from "@testing-library/react";
import { FilterContext } from "../filter/FilterContext";
import { initialState, SET_FILTER } from "../filter/reducer";
import { withTheme } from "../test/utils";
import Filter from "./Filter";

describe("Filter", () => {
  it("renders correctly", () => {
    const dispatchSpy = jest.fn();
    const { container } = render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState, dispatch: dispatchSpy }}>
            <Filter />
          </FilterContext.Provider>
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

  it("should reset filter when reset button is clicked", () => {
    const dispatchSpy = jest.fn();
    const mockState = {
      ...initialState,
      filter: {
        ...initialState.filter,
        query: "overtoom",
      },
    };

    render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: mockState, dispatch: dispatchSpy }}>
            <Filter />
          </FilterContext.Provider>
        </>,
      ),
    );

    fireEvent.click(screen.getByTestId("reset"));

    expect(dispatchSpy).toHaveBeenCalledWith({ type: SET_FILTER, payload: initialState.filter });
  });
});
