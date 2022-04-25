import { fireEvent, render, screen } from "@testing-library/react";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import GroupSelector from "./GroupSelector";

describe("GroupSelector", () => {
  it("renders correctly", () => {
    render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState }}>
            <GroupSelector />
            {/* @ts-ignore */}
          </FilterContext.Provider>
        </>,
      ),
    );

    expect(screen.queryByTestId("group-selector")).toBeInTheDocument();

    expect(screen.queryByText("Bron")).toBeInTheDocument();
    expect(screen.queryByText("Niveau")).toBeInTheDocument();
    expect(screen.queryByText("Thema")).toBeInTheDocument();
    expect(screen.queryByText("Type")).toBeInTheDocument();
    expect(screen.queryByText("Stadsdeel")).toBeInTheDocument();
  });

  it("should select a group when clicked", () => {
    const spy = jest.fn();
    
    render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState, dispatch: spy }}>
            <GroupSelector />
            {/* @ts-ignore */}
          </FilterContext.Provider>
        </>,
      ),
    );

    fireEvent.click(screen.getByTestId("button-level"));
    
    expect(spy).toBeCalledWith({"payload": "level", "type": "SET_GROUP"})
  });
});
