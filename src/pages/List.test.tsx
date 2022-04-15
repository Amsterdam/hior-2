import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "./List.fixtures";

jest.mock("axios");

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

    const { container } = render(
      withTheme(
        <>
          {/* @ts-ignore */}
          <FilterContext.Provider value={{ state: initialState }}>
            <List />
          </FilterContext.Provider>
        </>,
      ),
    );

    await act(async () => {
      //
    });

    expect(await screen.queryByTestId("list")).toBeInTheDocument();
    expect(await screen.queryByTestId("filter")).toBeInTheDocument();
    expect(await screen.queryByTestId("group-selector")).toBeInTheDocument();

    // there should be 2 items
    expect(await container.querySelectorAll("button").length).toBe(7);

    // there should be 3 images
    expect(await container.querySelectorAll("img").length).toBe(3);

    // there should be 1 document
    expect(await screen.queryByText("Omgevingsvisie 2050 (2021)")).toBeInTheDocument();
  });
});
