import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "../test/mock-data/List.fixtures";
import FilterContextProvider from "../filter/FilterContext";
import selectEvent from "react-select-event";

describe("List", () => {
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
    render(
      withTheme(
        <FilterContextProvider>
          <List />
        </FilterContextProvider>,
      ),
    );

    await screen.findByText("Resultaten (1)");

    expect(screen.getByTestId("list")).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: /bron/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /thema/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /niveau/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /type/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /stadsdeel/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /amsterdam wil een leefbare stad zijn voor mens en dier/i,
      }),
    ).toBeInTheDocument();
  });

  it("should show different results when selecting a different area", async () => {
    render(
      withTheme(
        <FilterContextProvider>
          <List />
        </FilterContextProvider>,
      ),
    );

    await screen.findByText("Resultaten (1)");

    userEvent.click(screen.getByRole("button", { name: /wis filter/i }));

    expect(screen.getByTestId("item-2")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /remove heel amsterdam/i }));

    await screen.findByText("Resultaten (3)");

    await selectEvent.select(
      screen.getByRole("combobox", {
        name: /algemeen beleid \(heel amsterdam\) of aanvullend beleid per stadsdeel\?/i,
      }),
      ["Centrum"],
    );

    await screen.findByText("Resultaten (1)");

    expect(
      screen.getByRole("button", {
        name: /behoudens voor verplanten wordt de vergunning of jaarvergunning geweigerd voor zover dit het vellen van een houtopstand betreft/i,
      }),
    ).toBeInTheDocument();
  });

  it("should show different results when filtering theme", async () => {
    render(
      withTheme(
        <FilterContextProvider>
          <List />
        </FilterContextProvider>,
      ),
    );

    await screen.findByText("Resultaten (1)");

    userEvent.click(screen.getByRole("button", { name: /wis filter/i }));

    await screen.findByText("Resultaten (1)");

    await selectEvent.clearFirst(
      screen.getByRole("combobox", {
        name: /algemeen beleid \(heel amsterdam\) of aanvullend beleid per stadsdeel\?/i,
      }),
    );

    await screen.findByText("Resultaten (3)");

    await selectEvent.select(
      screen.getByRole("combobox", {
        name: /thema/i,
      }),
      ["7. Auto"],
    );

    await screen.findByText("Resultaten (1)");

    expect(screen.queryByTestId("item-2")).not.toBeInTheDocument();

    await selectEvent.select(
      screen.getByRole("combobox", {
        name: /algemeen beleid \(heel amsterdam\) of aanvullend beleid per stadsdeel\?/i,
      }),
      ["Centrum"],
    );

    await screen.findByText("Resultaten (1)");

    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });
});
