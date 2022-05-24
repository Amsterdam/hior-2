import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import useEnrichItems from "../hooks/useEnrichItems";
import List from "./List";
import { mockItems, mockProperties, mockAttributes, mockEnriched } from "./List.fixtures";

jest.mock("axios");
jest.mock("../hooks/useEnrichItems");

jest.mock("../components/Filter", () => () => "Filter");
jest.mock("../components/GroupSelector", () => () => "GroupSelector");

describe("List", () => {
  it("renders correctly", async () => {
    // @ts-ignore
    useEnrichItems.mockImplementation(() => {
      return {
        enrichedItems: mockEnriched,
        allGroups: {},
      };
    });

    // items
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockItems, statusText: "OK" });
    // properties
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockProperties, statusText: "OK" });
    // attributes
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockAttributes, statusText: "OK" });

    const mockState = {
      ...initialState,
      groups: {
        ...initialState.groups,
        theme: ["12. Groen"],
      },
    };

    const spy = jest.fn();

    render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: mockState, dispatch: spy }}>
            <List />
          </FilterContext.Provider>
        </>,
      ),
    );

    await act(async () => {
      //
    });

    expect(await screen.queryByTestId("list")).toBeInTheDocument();

    expect(await screen.queryByText("Resultaten (1)")).not.toBeNull();

    expect(await screen.queryByText("Bron")).not.toBeNull();
    expect(await screen.queryByText("Thema")).not.toBeNull();
    expect(await screen.queryByText("12. Groen")).not.toBeNull();
    expect(await screen.queryByText("Niveau")).not.toBeNull();
    expect(await screen.queryByText("Strategisch Niveau")).not.toBeNull();
    expect(await screen.queryByText("Type")).not.toBeNull();
    expect(await screen.queryByText("Ambitie")).not.toBeNull();
    expect(await screen.queryByText("Stadsdeel")).not.toBeNull();
    expect(await screen.queryByText("Heel Amsterdam")).not.toBeNull();
  });
});
