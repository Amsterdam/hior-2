import { render, screen } from "@testing-library/react";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import GroupSelector from "./GroupSelector";

describe("GroupSelector", () => {
  const mockGroup = {
    source: ["Omgevingsvisie 2050 (2021)"],
    level: ["Proces"],
    theme: ["Openbare Ruimte Algemeen"],
    type: ["Advies"],
  };

  it("renders correctly", () => {
    render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState }}>
            <GroupSelector groups={mockGroup} />
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
  });
});