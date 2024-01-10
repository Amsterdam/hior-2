import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import nock from "nock";
import { withTheme } from "../test/utils";
import List from "./List";
import { mockItems, mockProperties, mockAttributes } from "../test/mock-data/List.fixtures";
import FilterContextProvider from "../filter/FilterContext";

describe("List", () => {
  beforeEach(() => {
    nock("http://127.0.0.1:3000")
      .get("/static/data/items.csv")
      .reply(200, mockItems)
      .get("/static/data/properties.csv")
      .reply(200, mockProperties)
      .get("/static/data/attributes.csv")
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

    expect(screen.getByTestId("button-source")).toBeInTheDocument();
    expect(screen.getByTestId("button-theme")).toBeInTheDocument();
    expect(screen.getByTestId("button-level")).toBeInTheDocument();
    expect(screen.getByTestId("button-type")).toBeInTheDocument();
    expect(screen.getByTestId("button-area")).toBeInTheDocument();

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

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /wis filter/i }));
    });

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

  it("should show different results when filtering source", async () => {
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

    await selectEvent.select(screen.getByRole("combobox", { name: /bron/i }), ["Omgevingsvisie 2050 (2021)"]);

    expect(screen.queryByTestId("item-3")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
  });

  it("should show different results when filtering level", async () => {
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

    userEvent.click(screen.getByRole("button", { name: /remove heel amsterdam/i }));

    await screen.findByText("Resultaten (3)");

    await selectEvent.select(
      screen.getByRole("combobox", {
        name: /algemeen beleid \(heel amsterdam\) of aanvullend beleid per stadsdeel\?/i,
      }),
      ["Centrum"],
    );

    await screen.findByText("Resultaten (1)");

    await selectEvent.select(screen.getByRole("combobox", { name: /niveau/i }), ["Proces"]);

    expect(screen.queryByTestId("item-2")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });
});
