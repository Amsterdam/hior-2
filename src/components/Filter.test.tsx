import { render, screen } from "@testing-library/react";
import nock from "nock";
import FilterContextProvider from "../filter/FilterContext";
import { mockAttributes } from "../test/mock-data/List.fixtures";
import { withTheme } from "../test/utils";
import Filter from "./Filter";

describe("Filter", () => {
  beforeEach(() => {
    nock("http://localhost")
      .get("/vsd/hior_attributes/?page=1&page_size=100000&format=json")
      .reply(200, mockAttributes);
  });

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
