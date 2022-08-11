import { render, screen } from "@testing-library/react";
import nock from "nock";
import { FilterContext } from "../filter/FilterContext";
import { initialState } from "../filter/reducer";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "./List.fixtures";

jest.mock("../components/Filter", () => () => "Filter");
jest.mock("../components/GroupSelector", () => () => "GroupSelector");

describe("List", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    nock("http://localhost")
      .get("/vsd/hior_items/?page=1&page_size=100000&format=json")
      .reply(200, mockItems)
      .get("/vsd/hior_properties/?page=1&page_size=100000&format=json")
      .reply(200, mockProperties)
      .get("/vsd/hior_attributes/?page=1&page_size=100000&format=json")
      .reply(200, mockAttributes);
  });

  it("renders correctly", async () => {
    const mockState = {
      ...initialState,
      groups: {
        ...initialState.groups,
        theme: ["12. Groen"],
      },
    };

    render(
      withTheme(
        <FilterContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
          <List />
        </FilterContext.Provider>,
      ),
    );

    await screen.findByText("Resultaten (1)");

    expect(screen.getByTestId("list")).toBeInTheDocument();

    expect(screen.getByText("Resultaten (1)")).toBeInTheDocument();

    expect(screen.getByText("Bron")).toBeInTheDocument();
    expect(screen.getByText("Thema")).toBeInTheDocument();
    expect(screen.getByText("12. Groen")).toBeInTheDocument();
    expect(screen.getByText("Niveau")).toBeInTheDocument();
    expect(screen.getByText("Strategisch Niveau")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Ambitie")).toBeInTheDocument();
    expect(screen.getByText("Stadsdeel")).toBeInTheDocument();
    expect(screen.getByText("Heel Amsterdam")).toBeInTheDocument();
  });
});
