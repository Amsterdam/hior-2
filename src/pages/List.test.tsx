import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "./List.fixtures";

jest.mock("axios");

jest.mock("../components/Filter", () => () => "Filter");
jest.mock("../components/GroupSelector", () => () => "GroupSelector");

describe("List", () => {
  it("renders correctly", async () => {
    // items
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockItems });
    // properties
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockProperties });
    // attributes
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mockAttributes });

    const mockState = {
      ...initialState,
      groups: {
        ...initialState.groups,
        theme: ["12. Groen"],
      },
    };

    const dispatchSpy = jest.fn();

    const { container } = render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: mockState, dispatch: dispatchSpy }}>
            <List />
          </FilterContext.Provider>
        </>,
      ),
    );

    await act(async () => {
      //
    });

    expect(await screen.queryByTestId("list")).toBeInTheDocument();

    expect(await screen.queryByText("Thema")).toBeInTheDocument();
    expect(await screen.queryByText("Bron")).toBeInTheDocument();
    expect(await screen.queryByText("Niveau")).toBeInTheDocument();
    expect(await screen.queryByText("Stadsdeel")).toBeInTheDocument();
    expect(await screen.queryByText("Type")).toBeInTheDocument();

    // there should be 1 item
    expect(container.querySelectorAll("button").length).toBe(1);

    // there should be 3 images
    expect(container.querySelectorAll("img").length).toBe(3);
  });
});
